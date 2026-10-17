/* ==========================================================================
   abertura.js — faixa que se abre na entrada da página.

   Tela tinta; uma linha papel cresce no centro e vira uma faixa (o vão entre
   duas barras que se afastam). Dentro dela, as palavras da manchete sobem
   pela máscara, uma de cada vez, com um contador ao lado; a faixa cresce um
   pouco a cada palavra. No fim, a faixa se expande até a tela toda e entrega
   o hero com o símbolo girando no centro.

   A linha e a 1ª palavra entram sozinhas, por tempo. Dali em diante quem
   manda é o scroll: o começo do pin do hero ganha um trecho a mais
   (--abertura-vh, no CSS) e a linha do tempo anda com ele — dá para ir no
   ritmo que quiser e voltar para rever. Só com html.abrindo (posta no
   <head>); sem ela, nada aparece.
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var ab = document.querySelector('.abertura');
  if (!ab || !raiz.classList.contains('abrindo')) return;

  var cima = ab.querySelector('.ab-cima');
  var baixo = ab.querySelector('.ab-baixo');
  var linha = ab.querySelector('.ab-linha');
  var contador = ab.querySelector('.ab-contador');
  var ano = ab.querySelector('.ab-ano');
  var pista = ab.querySelector('.ab-pista');
  var palavras = Array.prototype.slice.call(ab.querySelectorAll('.ab-palavra'));
  var n = palavras.length;

  // ---- linha do tempo (em "segundos" da animação) -------------------------
  var LINHA = [0.15, 0.75];     // a linha cresce do centro para as bordas
  var ABRE = [0.65, 1.15];      // a linha vira faixa
  var P0 = 0.85;                // 1ª palavra começa a subir
  var PASSO = 0.42;             // intervalo entre palavras
  var ENTRA = 0.36, SAI = 0.24; // duração da subida / da saída
  var ATRASO = 0.13;            // a próxima palavra espera a anterior quase sair
  var FAIXA0 = 0.24, CRESCE = 0.06; // altura da faixa (× tela) e quanto cresce por palavra
  var FINAL = P0 + (n - 1) * PASSO + 0.6;  // última palavra sai, faixa expande
  var EXPANDE = 0.9;
  var FIM = FINAL + EXPANDE + 0.05;
  var SOZINHA = P0 + ENTRA;     // até aqui roda por tempo; depois, pelo scroll

  function limita(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function trecho(a, b, t) { return limita((t - a) / (b - a)); }
  function suave(x) { return x * x * (3 - 2 * x); }
  function saida(x) { return 1 - Math.pow(1 - x, 4); }
  function vaivem(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  // trecho de scroll da abertura: o mesmo número que o CSS soma ao hero
  function trilho() {
    return (parseFloat(getComputedStyle(raiz).getPropertyValue('--abertura-vh')) || 2.2) * window.innerHeight;
  }

  // ---- quadro -------------------------------------------------------------
  var ultimoT = -1, ultimaPalavra = -1, cobre = true;
  function pintar(t) {
    if (t === ultimoT) return;
    ultimoT = t;
    var A = window.innerHeight;

    ab.style.visibility = t >= FIM ? 'hidden' : '';
    var deveCobrir = t < FINAL + 0.25;   // o símbolo do hero entra quando a faixa abre
    if (deveCobrir !== cobre) { cobre = deveCobrir; raiz.classList.toggle('ab-cobre', cobre); }
    if (t >= FIM) return;

    linha.style.transform = 'scaleX(' + vaivem(trecho(LINHA[0], LINHA[1], t)).toFixed(4) + ')';
    linha.style.opacity = (1 - trecho(ABRE[0] + 0.2, ABRE[1], t)).toFixed(3);

    // altura da faixa: abre, cresce a cada palavra, expande no final
    var faixa = FAIXA0 * saida(trecho(ABRE[0], ABRE[1], t));
    for (var k = 1; k < n; k++) faixa += CRESCE * saida(trecho(P0 + k * PASSO, P0 + k * PASSO + ENTRA, t));
    var fe = vaivem(trecho(FINAL + 0.1, FINAL + EXPANDE, t));
    faixa = faixa + (1.02 - faixa) * fe;
    var meio = faixa * A / 2;
    cima.style.transform = 'translate3d(0,' + (-meio).toFixed(1) + 'px,0)';
    baixo.style.transform = 'translate3d(0,' + meio.toFixed(1) + 'px,0)';

    // palavras: a anterior sai por cima e a próxima entra logo atrás
    var atual = -1;
    for (var i = 0; i < n; i++) {
      var ini = P0 + i * PASSO;
      var fimP = i < n - 1 ? P0 + (i + 1) * PASSO : FINAL;
      var entraEm = i > 0 ? ini + ATRASO : ini;
      var y = 105 * (1 - saida(trecho(entraEm, entraEm + ENTRA, t)));
      y -= 105 * vaivem(trecho(fimP, fimP + SAI, t));
      palavras[i].style.transform = 'translate3d(0,' + y.toFixed(2) + '%,0)';
      if (t >= ini) atual = i;
    }
    if (atual !== ultimaPalavra && atual >= 0) {
      ultimaPalavra = atual;
      contador.textContent = '00' + (atual + 1);
    }
    var meta = suave(trecho(P0, P0 + 0.3, t)) * (1 - suave(trecho(FINAL, FINAL + 0.25, t)));
    contador.style.opacity = ano.style.opacity = meta.toFixed(3);
    // convite para rolar: aparece quando a 1ª palavra assenta, some ao rolar
    pista.style.opacity = (suave(trecho(SOZINHA - 0.25, SOZINHA, t)) * (1 - suave(trecho(SOZINHA + 0.02, SOZINHA + 0.25, t)))).toFixed(3);
  }

  // tempo da animação: a parte automática até SOZINHA; depois, o scroll
  var inicio = null, relogio = 0, pedido = false;
  function tempo() {
    var y = window.scrollY;
    var auto = Math.min(relogio, SOZINHA);
    if (y <= 0) return auto;
    return Math.max(auto, SOZINHA + (FIM - SOZINHA) * limita(y / trilho()));
  }
  function quadro(agora) {
    if (inicio === null) inicio = agora;
    relogio = (agora - inicio) / 1000;
    pintar(tempo());
    if (relogio < SOZINHA) requestAnimationFrame(quadro);   // depois, só no scroll
  }
  window.addEventListener('scroll', function () {
    if (relogio < SOZINHA || pedido) return;   // o laço automático já pinta
    pedido = true;
    requestAnimationFrame(function () { pedido = false; pintar(tempo()); });
  }, { passive: true });
  window.addEventListener('resize', function () { ultimoT = -1; pintar(tempo()); }, { passive: true });

  // espera a fonte (no máx. ~0,6s) para a 1ª palavra não trocar de forma ao subir
  var comecou = false;
  function comecar() { if (comecou) return; comecou = true; requestAnimationFrame(quadro); }
  if (document.fonts && document.fonts.load) {
    document.fonts.load('600 1em Switzer').then(comecar, comecar);
    setTimeout(comecar, 600);
  } else comecar();
})();
