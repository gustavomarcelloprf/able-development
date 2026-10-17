/* ==========================================================================
   diferenciais.js — "Por que a Able?": frases grandes e a luz que percorre.

   Scroll natural (sem pin). Tudo é função da posição de cada peça na tela,
   então volta para trás certinho:
     - o título "Por que a Able?" se enche de degradê tangelo→âmbar por
       dentro das letras enquanto sobe pela tela, e fica aceso;
     - cada frase (grande, uma abaixo da outra) é quebrada em linhas; ao
       entrar, as linhas sobem de dentro de máscaras, uma após a outra, e o
       filete se desenha e o número acende;
     - no caminho até o alto, uma onda de cor percorre a frase caractere por
       caractere, na ordem de leitura (linha após linha): cada letra esquenta
       de âmbar para tangelo quando a onda passa e volta à cor original
       (abertura em papel, continuação em cinza);
     - ao chegar no alto da tela, as linhas saem por cima, na mesma ordem.
   Desempenho: cada letra só troca de cor (sem máscara, sem cópia do texto),
   só nas letras que mudaram, e só quando há scroll.
   Sem JS ou com motion reduzido: frases empilhadas do CSS, sem luz.
   ========================================================================== */
(function () {
  'use strict';

  var scroll = document.getElementById('porque-scroll');
  if (!scroll) return;
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduz || !('IntersectionObserver' in window)) return;

  var secao = scroll.closest('.porque');
  var titulo = scroll.querySelector('.porque-titulo');
  var itens = Array.prototype.slice.call(scroll.querySelectorAll('.pa-item'));

  secao.classList.add('anim');
  scroll.classList.add('anim');

  // ---- parâmetros (posição na tela em frações da altura; 1 = base, 0 = topo)
  var TITULO = [0.85, 0.3];   // o título enche entre estas alturas do seu topo
  var ENTRA = [1.08, 0.72];   // as linhas sobem (centro da frase)
  var PASSA = [0.9, 0.2];     // a onda percorre a frase (centro da frase)
  var SAI = [0.24, -0.04];    // as linhas saem por cima (centro da frase)
  var ESCALA = 0.14;          // atraso entre linhas (fração do trecho)
  var BORDA = 14;             // borda macia da máscara do título (%)
  var ONDA = 16;              // meia largura da onda, em caracteres
  var NIVEIS = 24;            // degraus de cor (menos escritas no DOM)

  // tons da onda: a frente chega âmbar claro, o miolo é tangelo
  var AMBAR = [255, 156, 84], TANGELO = [251, 77, 0];

  // ---- título: cópia recortada pelo degradê, por cima do texto papel ------
  var luzTitulo = document.createElement('span');
  luzTitulo.className = 'porque-luz';
  luzTitulo.setAttribute('aria-hidden', 'true');
  luzTitulo.textContent = titulo.textContent;
  titulo.appendChild(luzTitulo);

  // ---- frases: guarda as palavras (com o tom) para montar as linhas -------
  var frases = itens.map(function (item) {
    var frase = item.querySelector('.pa-frase');
    var palavras = [];
    Array.prototype.forEach.call(frase.childNodes, function (no) {
      var cinza = no.nodeType === 1 && no.classList.contains('pa-resto');
      no.textContent.split(/\s+/).forEach(function (p) { if (p) palavras.push({ t: p, cinza: cinza }); });
    });
    // o texto inteiro continua legível para leitores de tela
    frase.setAttribute('aria-label', frase.textContent.replace(/\s+/g, ' ').trim());
    return {
      item: item, frase: frase, palavras: palavras,
      num: item.querySelector('.pa-num'),
      fio: item.querySelector('.pa-fio'),
      linhas: [], letras: [], estado: ''
    };
  });

  function rgb(cor) {
    var m = cor.match(/[\d.]+/g);
    return m ? [+m[0], +m[1], +m[2]] : [245, 244, 241];
  }
  var PAPEL = [245, 244, 241], CINZA = [160, 157, 151];
  function lerCores() {
    var f = frases[0];
    if (!f) return;
    PAPEL = rgb(getComputedStyle(f.frase).color);
    var r = f.frase.querySelector('.pa-resto');
    if (r) CINZA = rgb(getComputedStyle(r).color);
  }

  // palavra = span sem quebra, com um span por letra dentro
  function palavra(p, letras) {
    var s = document.createElement('span');
    s.className = p.cinza ? 'pa-palavra pa-resto' : 'pa-palavra';
    for (var i = 0; i < p.t.length; i++) {
      var l = document.createElement('span');
      l.textContent = p.t[i];
      s.appendChild(l);
      if (letras) letras.push({ el: l, cinza: p.cinza, n: -1 });
    }
    return s;
  }
  // monta as linhas como o navegador quebrou o texto: primeiro as palavras
  // soltas (mede onde cada uma cai), depois agrupa por linha, cada uma
  // dentro de uma máscara
  function montar(f) {
    f.frase.textContent = '';
    var spans = f.palavras.map(function (p, i) {
      var s = document.createElement('span');
      s.textContent = p.t;
      f.frase.appendChild(s);
      if (i < f.palavras.length - 1) f.frase.appendChild(document.createTextNode(' '));
      return s;
    });
    var grupos = [], topoAnt = null;
    spans.forEach(function (s, i) {
      var t = s.offsetTop;
      if (topoAnt === null || Math.abs(t - topoAnt) > 4) { grupos.push([]); topoAnt = t; }
      grupos[grupos.length - 1].push(i);
    });
    f.frase.textContent = '';
    f.letras = [];
    f.linhas = grupos.map(function (g, n) {
      var linha = document.createElement('span');
      linha.className = 'pa-linha';
      linha.setAttribute('aria-hidden', 'true');
      var dentro = document.createElement('span');
      dentro.className = 'pa-linha-in';
      g.forEach(function (i, k) {
        dentro.appendChild(palavra(f.palavras[i], f.letras));
        if (k < g.length - 1) dentro.appendChild(document.createTextNode(' '));
      });
      linha.appendChild(dentro);
      f.frase.appendChild(linha);
      if (n < grupos.length - 1) f.frase.appendChild(document.createTextNode(' '));
      return { el: dentro, y: null };
    });
    f.estado = '';
  }
  function montarTudo() { frases.forEach(montar); lerCores(); ultimoEnche = -1; }

  function limita(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  // fração percorrida de a (começo) até b (fim), com a posição y na tela
  function trecho(y, a, b) { return limita((a - y) / (a - b)); }
  function saida(x) { return 1 - Math.pow(1 - x, 3); }
  function entrada(x) { return x * x * x; }
  function suave(x) { return x * x * (3 - 2 * x); }
  function mistura(a, b, t) {
    return 'rgb(' + Math.round(a[0] + (b[0] - a[0]) * t) + ',' + Math.round(a[1] + (b[1] - a[1]) * t) + ',' + Math.round(a[2] + (b[2] - a[2]) * t) + ')';
  }
  // cor de cada degrau: k = intensidade (0 = cor original, 1 = tangelo);
  // na frente da onda o tom puxa para âmbar, no miolo é tangelo puro
  var paleta = { p: [], c: [] };
  function montarPaleta() {
    paleta.p = []; paleta.c = [];
    for (var n = 0; n <= NIVEIS * 2; n++) {
      var d = n / NIVEIS - 1;                        // −1 (atrás) … 1 (frente)
      var k = 0.5 + 0.5 * Math.cos(Math.PI * d);     // sino: 1 no meio
      var tom = [0, 1, 2].map(function (j) { return AMBAR[j] + (TANGELO[j] - AMBAR[j]) * (1 - limita(d)); });
      paleta.p.push(n === 0 || n === NIVEIS * 2 ? '' : mistura(PAPEL, tom, k));
      paleta.c.push(n === 0 || n === NIVEIS * 2 ? '' : mistura(CINZA, tom, k));
    }
  }

  // ---- quadro -------------------------------------------------------------
  var ultimoEnche = -1;
  function atualizar() {
    var A = window.innerHeight;

    var rt = titulo.getBoundingClientRect();
    var e = saida(trecho(rt.top / A, TITULO[0], TITULO[1]));
    var enche = Math.round(e * (100 + BORDA) * 10) / 10;
    if (enche !== ultimoEnche) { ultimoEnche = enche; luzTitulo.style.setProperty('--enche', enche + '%'); }

    for (var i = 0; i < frases.length; i++) {
      var f = frases[i];
      var rf = f.frase.getBoundingClientRect();
      if (rf.bottom < -A * 0.3 || rf.top > A * 1.3) continue;   // longe da tela
      var c = (rf.top + rf.height / 2) / A;

      // linhas: sobem das máscaras ao entrar, saem por cima no alto
      var te = trecho(c, ENTRA[0], ENTRA[1]);
      var ts = trecho(c, SAI[0], SAI[1]);
      var n = f.linhas.length, passo = n > 1 ? ESCALA : 0, dur = 1 - passo * (n - 1);
      for (var k = 0; k < n; k++) {
        var ek = saida(limita((te - k * passo) / dur));
        var sk = entrada(limita((ts - k * passo) / dur));
        var y = Math.round(((1 - ek) * 130 - sk * 135) * 10) / 10;
        if (y !== f.linhas[k].y) {
          f.linhas[k].y = y;
          f.linhas[k].el.style.transform = y === 0 ? 'none' : 'translate3d(0,' + y + '%,0)';
        }
      }

      // onda: a posição (em caracteres) anda linear com o scroll; cada letra
      // pega o degrau da sua distância até ela
      var L = f.letras.length;
      var w = trecho(c, PASSA[0], PASSA[1]) * (L + 2 * ONDA) - ONDA;
      for (var j = 0; j < L; j++) {
        var d = (w - j) / ONDA;                        // >0: a onda já passou
        var nv = d <= -1 || d >= 1 ? 0 : Math.round((1 - d) * NIVEIS);
        var lt = f.letras[j];
        if (nv !== lt.n) {
          lt.n = nv;
          lt.el.style.color = lt.cinza ? paleta.c[nv] : paleta.p[nv];
        }
      }

      // número e filete: chegam com a 1ª linha, somem com a saída
      var vis = Math.round(saida(te) * (1 - suave(ts)) * 100) / 100;
      var fio = Math.round(saida(te) * 1000) / 1000;
      var chave = vis + '|' + fio;
      if (chave === f.estado) continue;
      f.estado = chave;
      f.num.style.opacity = vis;
      f.fio.style.transform = 'scaleX(' + fio + ')';
      f.fio.style.opacity = 1 - suave(ts);
    }
  }

  // ---- ciclo: só quando há scroll e a seção está perto da tela ------------
  var visivel = false, pedido = false;
  function pedir() {
    if (!visivel || pedido) return;
    pedido = true;
    requestAnimationFrame(function () { pedido = false; atualizar(); });
  }
  new IntersectionObserver(function (e) {
    visivel = e[0].isIntersecting;
    pedir();
  }, { rootMargin: '20% 0px' }).observe(scroll);
  window.addEventListener('scroll', pedir, { passive: true });

  montarTudo();
  montarPaleta();
  atualizar();
  var largAnt = window.innerWidth;
  window.addEventListener('resize', function () {
    // só remonta se a largura mudou (a barra do celular mexe só na altura)
    if (window.innerWidth !== largAnt) { largAnt = window.innerWidth; montarTudo(); }
    atualizar();
  }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { montarTudo(); montarPaleta(); atualizar(); });
})();
