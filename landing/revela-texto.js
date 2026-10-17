/* ==========================================================================
   revela-texto.js — revela texto letra a letra conforme o scroll.

   Qualquer elemento com [data-revela] é processado ao carregar. Cada letra
   vai de "apagada" (--revela-min, padrão 0.18) a cheia, com uma borda suave
   de --revela-suave letras entre o aceso e o apagado, atrelada à posição do
   topo do elemento na viewport:
     data-revela-inicio  fração da altura da viewport em que o efeito começa
                         (topo do elemento passa dessa linha). Padrão 0.85.
     data-revela-fim     fração em que termina. Padrão 0.35.
     data-revela-suave   largura da borda suave, em letras. Padrão 6.
   (aceitam 0–1 ou porcentagem: "0.85", "85", "85%")

   Custo por frame: só as letras cuja opacidade MUDOU recebem escrita (as da
   borda suave, umas poucas por frame). Uma variável herdada no pai (--p)
   seria 1 escrita só, mas forçaria recalcular o estilo de TODAS as letras
   a cada frame — medido: ~2,5× mais recálculo de estilo na página.

   Acessibilidade: cada nó de texto original vira um par
     <span class="rv-sr">texto original</span>       ← lido pelo leitor de tela
     <span class="rv-vis" aria-hidden="true">…</span> ← letras animadas
   no MESMO lugar da árvore. Isso preserva a semântica dos filhos inline
   (link continua link, <em> continua ênfase) — um aria-label no elemento
   pai não faria isso, e aria-label é ignorado em <p>/<span>/<div> (papel
   genérico) pela maioria dos leitores de tela.

   Sem JS ou com prefers-reduced-motion: nada é tocado, texto normal.

   API (window.RevelaTexto):
     atualizar()        recalcula o progresso dos elementos visíveis. Chame a
                        cada frame de scroll de um scroll externo (Lenis).
     modoExterno()      desliga a escuta interna do evento 'scroll' — use
                        junto com atualizar() vindo do Lenis. Equivale a
                        <script src="revela-texto.js" data-scroll="externo">.
     processar(el)      processa um elemento adicionado depois do load.
     restaurar(el?)     desfaz (um elemento ou todos) e devolve o texto original.
   ========================================================================== */
(function () {
  'use strict';

  var PADRAO = { inicio: 0.85, fim: 0.35, suave: 6 };
  var script = document.currentScript;
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var segmentador = (window.Intl && Intl.Segmenter) ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;

  var itens = new Map();      // el -> estado
  var visiveis = new Set();   // estados visíveis agora
  var escutaNativa = !(script && script.getAttribute('data-scroll') === 'externo');
  var pedido = null;
  var observador = null;

  function reduzido() { return !!(mq && mq.matches); }

  // Apagado via COR com transparência (color-mix sobre a cor herdada), não
  // via opacity: no Safari cada span com opacity < 1 é pintado numa camada
  // de transparência própria — centenas delas por frame travam o scroll.
  // Sem color-mix, cai para opacity.
  var usaCor = !!(window.CSS && CSS.supports && CSS.supports('color', 'color-mix(in srgb, currentColor 50%, transparent)'));
  function valorCor(v) { return 'color-mix(in srgb, currentColor ' + Math.round(v * 100) + '%, transparent)'; }

  // ---- CSS: injetado com especificidade zero (:where) para a página poder
  // sobrescrever. Só vale com .rv-pronto, que o JS põe depois de quebrar. ----
  function injetarCSS() {
    if (document.getElementById('revela-texto-css')) return;
    var s = document.createElement('style');
    s.id = 'revela-texto-css';
    s.textContent =
      ':where(.rv-pronto){--revela-min:.18;--revela-suave:6}' +
      ':where(.rv-pronto .rv-palavra){white-space:nowrap}' +
      // estado inicial (apagado); o JS sobrescreve letra a letra conforme acende
      (usaCor
        ? ':where(.rv-pronto .rv-c){color:color-mix(in srgb,currentColor calc(var(--revela-min) * 100%),transparent)}'
        : ':where(.rv-pronto .rv-c){opacity:var(--revela-min)}') +
      ':where(.rv-sr){position:absolute!important;width:1px!important;height:1px!important;' +
        'margin:-1px!important;padding:0!important;overflow:hidden!important;' +
        'clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important;' +
        'border:0!important;-webkit-user-select:none;user-select:none}' +
      '@media (prefers-reduced-motion: reduce){:where(.rv-pronto .rv-c){opacity:1;color:inherit}}';
    document.head.appendChild(s);
  }

  function lerFracao(el, nome, padrao) {
    var v = el.getAttribute(nome);
    if (v == null || v === '') return padrao;
    var n = parseFloat(v);
    if (!isFinite(n)) return padrao;
    return (n > 1 || /%\s*$/.test(v)) ? n / 100 : n;
  }

  function grafemas(txt) {
    if (segmentador) {
      var out = [];
      var it = segmentador.segment(txt)[Symbol.iterator]();
      for (var r = it.next(); !r.done; r = it.next()) out.push(r.value.segment);
      return out;
    }
    return Array.from(txt);
  }

  // ---- quebra: troca cada nó de texto por (rv-sr + rv-vis). Palavras viram
  // span nowrap com uma span por letra; espaços ficam como texto (são as
  // oportunidades de quebra de linha). Filhos inline continuam no lugar. ----
  function processar(el) {
    if (!el || itens.has(el) || reduzido()) return;

    var nos = [];
    var andador = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function (no) {
        var pai = no.parentNode;
        if (!no.nodeValue || !/\S/.test(no.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (pai.closest('script,style,noscript,textarea,svg,.rv-sr,[data-revela-ignorar]')) return NodeFilter.FILTER_REJECT;
        // data-revela aninhado: o de dentro é processado por conta própria
        if (pai.closest('[data-revela]') !== el) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    for (var n = andador.nextNode(); n; n = andador.nextNode()) nos.push(n);

    var i = 0;
    var letras = [], indices = [];
    nos.forEach(function (no) {
      var texto = no.nodeValue;
      var sr = document.createElement('span');
      sr.className = 'rv-sr';
      sr.textContent = texto;
      var vis = document.createElement('span');
      vis.className = 'rv-vis';
      vis.setAttribute('aria-hidden', 'true');

      texto.split(/(\s+)/).forEach(function (pedaco) {
        if (!pedaco) return;
        if (/^\s+$/.test(pedaco)) {
          // o espaço também apaga (senão o sublinhado de um link/destaque
          // fica aceso entre as palavras); herda o índice da próxima letra
          // sem contá-la, e continua sendo oportunidade de quebra de linha
          var esp = document.createElement('span');
          esp.className = 'rv-c';
          letras.push(esp); indices.push(i);
          esp.textContent = pedaco;
          vis.appendChild(esp);
          return;
        }
        var palavra = document.createElement('span');
        palavra.className = 'rv-palavra';
        grafemas(pedaco).forEach(function (g) {
          var c = document.createElement('span');
          c.className = 'rv-c';
          letras.push(c); indices.push(i++);
          c.textContent = g;
          palavra.appendChild(c);
        });
        vis.appendChild(palavra);
      });

      var frag = document.createDocumentFragment();
      frag.appendChild(sr);
      frag.appendChild(vis);
      no.parentNode.replaceChild(frag, no);
    });

    if (el.hasAttribute('data-revela-suave')) {
      el.style.setProperty('--revela-suave', Math.max(1, parseFloat(el.getAttribute('data-revela-suave')) || PADRAO.suave));
    }
    el.classList.add('rv-pronto');
    // lidos uma vez (aceita sobrescrita das variáveis pela página)
    var cs = getComputedStyle(el);
    var min = parseFloat(cs.getPropertyValue('--revela-min'));
    var suave = parseFloat(cs.getPropertyValue('--revela-suave'));
    min = isFinite(min) ? min : 0.18;
    suave = isFinite(suave) && suave >= 1 ? suave : PADRAO.suave;

    var estado = {
      el: el,
      inicio: lerFracao(el, 'data-revela-inicio', PADRAO.inicio),
      fim: lerFracao(el, 'data-revela-fim', PADRAO.fim),
      p: -1,
      n: i,
      min: min,
      suave: suave,
      letras: letras,
      indices: indices,
      // valor atual de cada letra; começa no apagado que o CSS já mostra
      vals: letras.map(function () { return min; })
    };
    itens.set(el, estado);

    if (observador) observador.observe(el);
    return estado;
  }

  // Estado inicial correto antes do primeiro paint (evita piscar
  // cheio→apagado). Lê todos, depois escreve todos: 1 layout só.
  function posicionar(estados) {
    var vh = window.innerHeight;
    var ps = estados.map(function (e) { return calcular(e, e.el.getBoundingClientRect(), vh); });
    estados.forEach(function (e, k) { escrever(e, ps[k]); });
  }

  function calcular(estado, r, vh) {
    var a = estado.inicio * vh, b = estado.fim * vh;
    var p = a === b ? (r.top <= a ? 1 : 0) : (a - r.top) / (a - b);
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    return Math.round(p * 1000) / 1000;
  }

  // Opacidade de cada letra: borda suave de `suave` letras que avança com p.
  // Só escreve nas letras cujo valor (arredondado a 0.01) mudou.
  function escrever(estado, p) {
    if (p === estado.p) return;
    estado.p = p;
    var s = estado.suave, min = estado.min;
    var frente = p * (estado.n + s);
    var letras = estado.letras, indices = estado.indices, vals = estado.vals;
    for (var k = 0; k < letras.length; k++) {
      var v = (frente - indices[k]) / s;
      v = v < min ? min : v > 1 ? 1 : Math.round(v * 100) / 100;
      if (v !== vals[k]) {
        vals[k] = v;
        // no mínimo, volta ao valor do CSS; aceso, herda a cor normal
        if (usaCor) letras[k].style.color = v === min ? '' : v === 1 ? 'inherit' : valorCor(v);
        else letras[k].style.opacity = v === min ? '' : v;
      }
    }
  }

  // Todas as leituras primeiro, depois todas as escritas: 1 layout por frame.
  function atualizar() {
    if (!visiveis.size) return;
    posicionar(Array.from(visiveis));
  }

  function agendar() {
    if (pedido !== null) return;
    pedido = requestAnimationFrame(function () { pedido = null; atualizar(); });
  }

  function aoRolarNativo() { if (escutaNativa) agendar(); }

  function restaurar(el) {
    var alvos = el ? [el] : Array.from(itens.keys());
    alvos.forEach(function (alvo) {
      var estado = itens.get(alvo);
      if (!estado) return;
      if (observador) observador.unobserve(alvo);
      visiveis.delete(estado);
      itens.delete(alvo);
      alvo.querySelectorAll('.rv-vis').forEach(function (v) {
        if (v.closest('[data-revela]') === alvo) v.remove();
      });
      alvo.querySelectorAll('.rv-sr').forEach(function (s) {
        if (s.closest('[data-revela]') === alvo) s.replaceWith(document.createTextNode(s.textContent));
      });
      alvo.normalize();
      alvo.classList.remove('rv-pronto');
      ['--revela-suave'].forEach(function (k) { alvo.style.removeProperty(k); });
      if (!alvo.getAttribute('style')) alvo.removeAttribute('style');
    });
  }

  var iniciado = false;
  function iniciar() {
    if (iniciado || reduzido()) return;
    iniciado = true;
    injetarCSS();

    if ('IntersectionObserver' in window) {
      observador = new IntersectionObserver(function (entradas) {
        var vh = window.innerHeight;
        entradas.forEach(function (en) {
          var estado = itens.get(en.target);
          if (!estado) return;
          if (en.isIntersecting) visiveis.add(estado); else visiveis.delete(estado);
          // na saída também: um scroll rápido pode pular o último frame útil,
          // então o elemento fica cravado em 0 ou 1 conforme o lado que saiu.
          escrever(estado, calcular(estado, en.boundingClientRect, vh));
        });
      }, { rootMargin: '10% 0px 10% 0px' });
    }

    posicionar(Array.from(document.querySelectorAll('[data-revela]'), processar).filter(Boolean));
    if (!observador) itens.forEach(function (e) { visiveis.add(e); });

    window.addEventListener('scroll', aoRolarNativo, { passive: true });
    window.addEventListener('resize', agendar, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(agendar);
  }

  if (mq) {
    var aoMudar = function () {
      if (reduzido()) restaurar();
      else if (!iniciado) iniciar();
      else posicionar(Array.from(document.querySelectorAll('[data-revela]'), processar).filter(Boolean));
    };
    if (mq.addEventListener) mq.addEventListener('change', aoMudar); else if (mq.addListener) mq.addListener(aoMudar);
  }

  window.RevelaTexto = {
    atualizar: atualizar,
    modoExterno: function () { escutaNativa = false; return atualizar; },
    processar: function (el) {
      if (!iniciado) return; // ainda não carregou (ou motion reduzido): o início pega o [data-revela]
      var e = processar(el);
      if (e) posicionar([e]);
    },
    restaurar: restaurar
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
