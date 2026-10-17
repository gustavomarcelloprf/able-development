/* ==========================================================================
   cta.js — seção final: batidas digitadas sobre a mira.

   A seção trava na tela. Ao fundo, uma grade de linhas finas sobe com o
   scroll (como o fundo da referência) e a mira se desenha (vertical no
   centro, horizontal embaixo, "+" no cruzamento). A pergunta vem em duas
   batidas gigantes de duas linhas:
     1. "Pronto para tirar / seu projeto do papel" é digitada letra por
        letra — cada letra surge com fade e uma leve subida, numa borda
        macia de algumas letras;
     2. ela sobe e se dissolve enquanto "e destravar / a sua operação?"
        começa a ser digitada (a tela nunca fica vazia); junto, uma onda de
        degradê tangelo sobe de baixo e cobre a tela;
     3. no fim a onda segue subindo e sai por cima; entram, abaixo da linha,
        o texto de apoio e o contato.
   Na grade, algumas cruzes tangelo espalhadas (posições sorteadas com
   semente fixa, sempre as mesmas) acendem girando quando entram na tela.

   Tudo é função do scroll (volta para trás certinho). Só transform e
   opacity, e só nas letras que mudaram: leve para o Safari.
   Sem JS ou com motion reduzido: pergunta, texto e contato empilhados.
   ========================================================================== */
(function () {
  'use strict';

  var scroll = document.getElementById('cta-scroll');
  if (!scroll) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var secao = scroll.closest('.cta');
  var v = scroll.querySelector('.cta-v');
  var h = scroll.querySelector('.cta-h');
  var cruz = scroll.querySelector('.cta-cruz');
  var grade = scroll.querySelector('.cta-grade');
  var onda = scroll.querySelector('.cta-onda');
  var fim = scroll.querySelector('.cta-fim');
  var batidas = Array.prototype.slice.call(scroll.querySelectorAll('.cta-batida'));

  secao.classList.add('anim');
  scroll.classList.add('anim');

  // ---- linha do tempo (t: 0 com o topo da seção no meio da tela, 1 quando
  // o pin solta) ----------------------------------------------------------
  var MIRA = [0.02, 0.12];
  var DIGITA = [[0.03, 0.3], [0.45, 0.7]];   // digitação de cada batida
  var SAI1 = [0.36, 0.47];                    // a 1ª sobe e se dissolve (a 2ª só começa quando ela já saiu do lugar)
  var ONDA_SOBE = [0.44, 0.66];
  var ONDA_SAI = [0.76, 0.92];               // continua subindo e sai por cima
  var FIM = [0.84, 0.95];
  var CRUZES = 9;                             // poucas, espalhadas
  var PASSO_GRADE = 120;                      // igual ao background-size do CSS
  var MACIA = 5;                              // borda macia, em letras
  var GRADE = 0.9;                            // quanto a grade sobe (× altura da tela)

  // ---- cruzes: cruzamentos sorteados da grade (semente fixa) -------------
  var cruzes = [];
  function semente(n) { return function () { n = (n * 16807) % 2147483647; return (n - 1) / 2147483646; }; }
  function montarCruzes() {
    cruzes.forEach(function (c) { c.el.remove(); });
    cruzes = [];
    var L = grade.clientWidth, H = grade.clientHeight;
    // as verticais do CSS caem em (50% + 60px) + k·120
    var x0 = ((L / 2 + 60) % PASSO_GRADE + PASSO_GRADE) % PASSO_GRADE;
    var cols = Math.floor((L - x0) / PASSO_GRADE), lins = Math.floor(H / PASSO_GRADE);
    var sorte = semente(7), usados = {};
    for (var tentativa = 0; cruzes.length < CRUZES && tentativa < 200; tentativa++) {
      var c = 1 + Math.floor(sorte() * (cols - 1)), l = 2 + Math.floor(sorte() * (lins - 3));
      // nunca duas vizinhas nem na coluna do meio (a mira já mora lá)
      var x = x0 + c * PASSO_GRADE;
      if (Math.abs(x - L / 2) < PASSO_GRADE * 0.6 || usados[c + ':' + l] || usados[c + ':' + (l - 1)] || usados[c + ':' + (l + 1)] || usados[(c - 1) + ':' + l] || usados[(c + 1) + ':' + l]) continue;
      usados[c + ':' + l] = 1;
      var el = document.createElement('span');
      el.className = 'grade-mira';
      el.style.left = x + 'px';
      el.style.top = (l * PASSO_GRADE) + 'px';
      grade.appendChild(el);
      cruzes.push({ el: el, y: l * PASSO_GRADE, m: -1 });
    }
  }

  // letras: cada palavra num span sem quebra; os espaços ficam como texto
  var dados = batidas.map(function (b) {
    var nos = Array.prototype.slice.call(b.childNodes);
    b.textContent = '';
    var letras = [];
    nos.forEach(function (no) {
      // quebra: um espaço + <br> (no celular o <br> some e o espaço fica)
      if (no.nodeType === 1 && no.tagName === 'BR') { b.appendChild(document.createTextNode(' ')); b.appendChild(document.createElement('br')); return; }
      no.textContent.split(/(\s+)/).forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { b.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span');
        w.style.whiteSpace = 'nowrap';
        for (var i = 0; i < p.length; i++) {
          var s = document.createElement('span');
          s.className = 'cta-letra';
          s.textContent = p[i];
          w.appendChild(s);
          letras.push({ el: s, a: -1 });
        }
        b.appendChild(w);
      });
    });
    return { el: b, letras: letras, est: '' };
  });

  function limita(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function trecho(u, a, b) { return limita((u - a) / (b - a)); }
  function saida(x) { return 1 - Math.pow(1 - x, 3); }
  function vaivem(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  // digitação macia: a "cabeça" anda pelas letras; cada letra leva MACIA
  // letras para acender por completo
  function digitar(d, p) {
    var n = d.letras.length, pos = p * (n + MACIA);
    for (var i = 0; i < n; i++) {
      var a = Math.round(saida(limita((pos - i) / MACIA)) * 50) / 50;
      var l = d.letras[i];
      if (a === l.a) continue;
      l.a = a;
      l.el.style.opacity = a;
      l.el.style.transform = a >= 1 ? 'none' : 'translate3d(0,' + ((1 - a) * 0.22).toFixed(3) + 'em,0)';
    }
  }

  var ultimo = '';
  function atualizar() {
    var A = window.innerHeight;
    var r = scroll.getBoundingClientRect();
    var altura = scroll.offsetHeight - A;
    var t = limita((A * 0.5 - r.top) / (altura + A * 0.5));

    var chave = Math.round(t * 2000) + '';
    if (chave === ultimo) return;
    ultimo = chave;

    // grade sobe o tempo todo; mira se desenha no começo
    var desloca = -t * GRADE * A;
    grade.style.transform = 'translate3d(0,' + desloca.toFixed(1) + 'px,0)';
    // cruzes: acendem girando ao subir do fundo da tela até 80% da altura
    // topo do pin na tela: entrando (r.top), preso (0) ou soltando (negativo)
    var topoPin = r.top > 0 ? r.top : Math.min(0, r.bottom - A);
    for (var c = 0; c < cruzes.length; c++) {
      var cz = cruzes[c], ys = topoPin + cz.y + desloca;
      var m = Math.round(saida(limita((A * 0.98 - ys) / (A * 0.18))) * 50) / 50;
      if (m === cz.m) continue;
      cz.m = m;
      cz.el.style.opacity = m;
      cz.el.style.transform = 'scale(' + (0.4 + 0.6 * m).toFixed(2) + ') rotate(' + ((1 - m) * 90).toFixed(0) + 'deg)';
    }
    var mv = saida(trecho(t, MIRA[0], MIRA[1]));
    var mh = saida(trecho(t, MIRA[0] + 0.03, MIRA[1] + 0.03));
    var mc = trecho(t, MIRA[1], MIRA[1] + 0.04);
    v.style.transform = 'scaleY(' + mv.toFixed(4) + ')';
    h.style.transform = 'scaleX(' + mh.toFixed(4) + ')';
    cruz.style.opacity = mc.toFixed(3);
    cruz.style.transform = 'rotate(' + ((1 - mc) * 90).toFixed(1) + 'deg)';

    // batidas
    digitar(dados[0], trecho(t, DIGITA[0][0], DIGITA[0][1]));
    var s1 = vaivem(trecho(t, SAI1[0], SAI1[1]));
    dados[0].el.style.opacity = (1 - s1).toFixed(3);
    dados[0].el.style.transform = 'translate(-50%,-50%) translate3d(0,' + (-s1 * 0.32 * A).toFixed(1) + 'px,0)';
    if (dados[1]) digitar(dados[1], trecho(t, DIGITA[1][0], DIGITA[1][1]));

    // onda (faixa de 2,6 telas): entra por baixo até o topo dela encostar no
    // topo da tela, segura, e segue subindo até sair inteira por cima
    var sobe = vaivem(trecho(t, ONDA_SOBE[0], ONDA_SOBE[1]));
    var sai = vaivem(trecho(t, ONDA_SAI[0], ONDA_SAI[1]));
    var yOnda = (1 - sobe) * A - sai * 2.6 * A;
    onda.style.transform = 'translate3d(0,' + yOnda.toFixed(1) + 'px,0)';

    var f = saida(trecho(t, FIM[0], FIM[1]));
    fim.style.opacity = f.toFixed(3);
    fim.style.transform = f >= 1 ? 'none' : 'translate3d(0,' + ((1 - f) * 24).toFixed(1) + 'px,0)';
  }

  // ---- ciclo: só quando há scroll e a seção está perto da tela ------------
  var visivel = false, pedido = false;
  function pedir() {
    if (!visivel || pedido) return;
    pedido = true;
    requestAnimationFrame(function () { pedido = false; atualizar(); });
  }
  new IntersectionObserver(function (e) { visivel = e[0].isIntersecting; pedir(); }, { rootMargin: '20% 0px' }).observe(scroll);
  window.addEventListener('scroll', pedir, { passive: true });
  // cruzes só remontam se a largura mudou (a barra do iPhone mexe só na altura)
  var largAnt = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth !== largAnt) { largAnt = window.innerWidth; montarCruzes(); }
    ultimo = ''; atualizar();
  }, { passive: true });
  montarCruzes();
  atualizar();
})();
