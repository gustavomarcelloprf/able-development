/* ==========================================================================
   publicos.js — "Para quem construímos": teleprompter + partículas.

   Mecânica (inspirada em pola.co.jp/special/o/wecaremore/mothersday):
   as MESMAS ~2600 peças passam por uma sequência de formações conforme o
   scroll — símbolo da Able → uma forma por público → símbolo de novo, que
   então se dispersa para fora da tela. Narrativa: a mesma equipe vira
   qualquer solução.

   Transição fluida: cada peça tem um "ângulo" fixo e ocupa sempre o ponto
   de ângulo equivalente na próxima forma (caminhos curtos, sem embaralhar),
   parte com um pequeno atraso (onda que gira em volta da forma) e faz uma
   curva em redemoinho em vez de se soltar aleatoriamente.

   Poeira: a cada forma, parte das peças fica de fora e vira poeira que
   atravessa a tela (entra por um lado, sai pelo outro, sobe com o scroll).
   Na troca de forma, umas saem da forma para a poeira e outras entram.

   Movimento contínuo: cada forma tem a própria animação (engrenagens giram,
   pulsos correm nas trilhas do chip, barras respiram, globo gira, funil
   rodopia) e o mouse espalha as peças em volta do cursor.

   Degradê com função: a cor de cada peça vem da profundidade (perto =
   tinta, longe = quase papel). ~3% das peças em tangelo (regra do acento).

   Desempenho: canvas 2D, peças agrupadas por faixa de cor (1 fill por
   faixa), loop só enquanto a seção está na tela.
   Sem JS, sem canvas ou com motion reduzido: lista estática do CSS.
   ========================================================================== */
(function () {
  'use strict';

  var scroll = document.getElementById('publicos-scroll');
  if (!scroll) return;
  var secao = scroll.closest('.publicos');
  var tela = scroll.querySelector('.publicos-tela');
  var ctx = tela && tela.getContext ? tela.getContext('2d') : null;
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduz || !ctx || !('IntersectionObserver' in window)) return;

  var pin = scroll.querySelector('.publicos-pin');
  var conteudo = scroll.querySelector('.publicos-conteudo');
  var escurece = scroll.querySelector('.publicos-escurece');
  var degrade = scroll.querySelector('.pq-degrade');
  var janela = scroll.querySelector('.publicos-janela');
  var lista = scroll.querySelector('.publicos-lista');
  var itens = Array.prototype.slice.call(lista.children);

  secao.classList.add('anim');
  scroll.classList.add('anim');

  // ---- parâmetros -------------------------------------------------------
  // peças: no celular, cerca de um terço (a forma é pequena na tela e com
  // mais peças fica densa demais; também alivia o desenho por quadro)
  var N = window.innerWidth < 700 ? 900 : 2600;
  var TANGELO = 0.03;       // fração de peças no acento
  var JANELA = [0.08, 0.92];// trecho de cada passo em que a transição acontece
  var ONDA = 0.2;           // atraso máximo de cada peça (fração da transição):
                            // onda curta = todas andam quase juntas, sem tremer
  var FOCO = 0.6;           // distância da câmera (menor = perspectiva mais forte)
  // rampa de profundidade: perto → longe (tinta → grafite claro → quase papel)
  var RAMPA = [[29, 28, 26], [95, 92, 86], [176, 172, 164], [214, 211, 204]];
  var FAIXAS = 14;
  var REPULSA = 95;         // raio de alcance do mouse (px)

  // ---- aleatório determinístico (mesma "escultura" a cada carregamento) --
  var semente = 20261007;
  function rnd() { semente = (semente * 16807) % 2147483647; return (semente - 1) / 2147483646; }
  function entre(a, b) { return a + (b - a) * rnd(); }
  function naBorda(x0, y0, x1, y1) {
    var l = x1 - x0, a = y1 - y0, u = rnd() * 2 * (l + a);
    if (u < l) return [x0 + u, y0];
    if (u < l + a) return [x1, y0 + (u - l)];
    if (u < 2 * l + a) return [x1 - (u - l - a), y1];
    return [x0, y1 - (u - 2 * l - a)];
  }
  function naEsfera(r) {
    var u = rnd() * 2 - 1, f = rnd() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    return [r * s * Math.cos(f), r * u, r * s * Math.sin(f)];
  }

  // ---- formações (espaço normalizado ~[-1,1], y para baixo) -------------
  // cada uma devolve [x, y, z, a1, a2]: a1/a2 alimentam a animação da forma

  // símbolo "Abertura": mesma espiral de scripts/geometria.mjs
  // (r = 18 + 24t, θ = θ0 + 100°·t, traço 16, num quadro 120×120)
  function simbolo() {
    var b = Math.floor(rnd() * 3), t = rnd(), w = entre(-8, 8);
    var RAD = Math.PI / 180, th = (-90 + 120 * b + 100 * t) * RAD, r = 18 + 24 * t;
    var dth = 100 * RAD, tx = 24 * Math.cos(th) - r * dth * Math.sin(th), ty = 24 * Math.sin(th) + r * dth * Math.cos(th);
    var n = Math.hypot(tx, ty);
    var px = 60 + r * Math.cos(th) + w * (-ty / n), py = 60 + r * Math.sin(th) + w * (tx / n);
    return [(px - 60) / 46, (py - 60) / 46, entre(-0.05, 0.05), 0, 0];
  }

  // 01 · SaaS: camadas empilhadas (plataforma), flutuando defasadas
  function camadas() {
    var nivel = Math.floor(rnd() * 3), y = -0.62 + nivel * 0.62;
    var p = rnd() < 0.62 ? naBorda(-0.68, -0.68, 0.68, 0.68) : [entre(-0.68, 0.68), entre(-0.68, 0.68)];
    return [p[0], y + entre(-0.01, 0.01), p[1], nivel, 0];
  }

  // 02 · processos manuais → automação: duas engrenagens engrenadas
  var ENG = [
    { c: [-0.3, 0.16], R: 0.5, n: 11, h: 0.085, w: 0.28 },
    { c: [0.5, -0.42], R: 0.4, n: 9, h: 0.085, w: -0.28 * 0.5 / 0.4 }
  ];
  function engrenagens() {
    var g = rnd() < 0.6 ? 0 : 1, e = ENG[g], u = rnd(), f = rnd() * Math.PI * 2, r, z;
    var face = rnd() < 0.5 ? -0.05 : 0.05;
    if (u < 0.72) {                       // contorno dentado (nas duas faces e na lateral)
      var dente = Math.max(-1, Math.min(1, Math.sin(e.n * f) * 2.6));
      r = e.R + e.h * dente;
      if (rnd() < 0.3) { f = Math.round(f * e.n / Math.PI) * Math.PI / e.n; r = e.R + e.h * entre(-1, 1); }
      z = rnd() < 0.25 ? entre(-0.05, 0.05) : face;
    } else if (u < 0.88) {                // furo do eixo
      r = e.R * 0.26; z = face;
    } else {                              // face, mais esparsa
      r = Math.sqrt(entre(0.07, 0.72)) * e.R; z = face;
    }
    return [e.c[0] + r * Math.cos(f), e.c[1] + r * Math.sin(f), z, g, 0];
  }

  // 03 · IA: chip com pinos e trilhas; pulsos correm pelas trilhas
  var CHIP = 0.4, PINOS = 7, TRILHA_PINOS = [0, 2, 4, 6];
  var tr0 = 0, tr1 = 0;
  function lado(s, fora, lat) {           // (para fora, lateral) → xy por lado
    if (s === 0) { tr0 = fora; tr1 = lat; }
    else if (s === 1) { tr0 = -fora; tr1 = -lat; }
    else if (s === 2) { tr0 = -lat; tr1 = fora; }
    else { tr0 = lat; tr1 = -fora; }
  }
  function trilha(id, u) {                // ponto u ∈ [0,1) da trilha id
    var s = id >> 2, j = TRILHA_PINOS[id & 3], lat = -0.3 + j * 0.1, desvio = (j < 3 ? -1 : 1) * 0.1;
    var fora, l;
    if (u < 0.33) { fora = 0.52 + u / 0.33 * 0.14; l = lat; }
    else if (u < 0.66) { var q = (u - 0.33) / 0.33; fora = 0.66 + q * 0.13; l = lat + desvio * q; }
    else { fora = 0.79 + (u - 0.66) / 0.34 * 0.15; l = lat + desvio; }
    lado(s, fora, l);
  }
  function chip() {
    var u = rnd();
    if (u < 0.2) { var b = naBorda(-CHIP, -CHIP, CHIP, CHIP); return [b[0], b[1], -0.05, 0, 0]; }
    if (u < 0.36) return [entre(-CHIP, CHIP), entre(-CHIP, CHIP), -0.05, 0, 0];   // corpo preenchido
    if (u < 0.45) { var d = naBorda(-0.18, -0.18, 0.18, 0.18); return [d[0], d[1], -0.09, 0, 0]; }
    if (u < 0.63) {                       // pinos
      var s = Math.floor(rnd() * 4), j = Math.floor(rnd() * PINOS);
      lado(s, entre(CHIP, 0.52), -0.3 + j * 0.1 + entre(-0.018, 0.018));
      return [tr0, tr1, 0, 0, 0];
    }
    var id = Math.floor(rnd() * 16);
    if (rnd() < 0.22) {                   // ilha no fim da trilha
      trilha(id, 0.999); var a = rnd() * Math.PI * 2, r = 0.03 * Math.sqrt(rnd());
      return [tr0 + r * Math.cos(a), tr1 + r * Math.sin(a), 0.04, 0, 0];
    }
    var t = rnd(); trilha(id, t);
    return [tr0, tr1, 0.04, id + t, rnd() < 0.4 ? 1 : 0];
  }

  // 04 · operações/dashboards: gráfico de barras com eixos e tendência de alta
  var BX = [-0.56, -0.26, 0.04, 0.34, 0.64], BH = [0.42, 0.62, 0.54, 0.86, 1.12], BASE = 0.6, BL = 0.1, BZ = 0.06;
  function barras() {
    var u = rnd();
    if (u < 0.08) return [entre(-0.84, 0.9), BASE, 0, -1, 0];               // eixo x
    if (u < 0.13) return [-0.84, BASE - rnd() * 1.36, 0, -1, 0];            // eixo y
    if (u < 0.88) {
      var b = Math.floor(rnd() * 5), x, z, f, e = rnd();
      if (e < 0.45) {                       // contorno frontal da barra
        var q = naBorda(-BL, 0, BL, 1); x = BX[b] + q[0]; f = q[1]; z = -BZ;
      } else if (e < 0.6) {                 // profundidade: topo e aresta direita
        if (rnd() < 0.5) { x = BX[b] + entre(-BL, BL); f = 1; } else { x = BX[b] + BL; f = rnd(); }
        z = entre(-BZ, BZ);
      } else {                              // face frontal preenchida
        x = BX[b] + entre(-BL, BL); f = rnd(); z = -BZ;
      }
      return [x, BASE - f * BH[b], z, b, f];
    }
    // linha de tendência 0.16 acima dos topos das barras (sem ponta de seta)
    var k = Math.floor(rnd() * 4), t = rnd();
    return [BX[k] + (BX[k + 1] - BX[k]) * t, BASE - 0.16 - (BH[k] + (BH[k + 1] - BH[k]) * t), 0, -1, 0];
  }

  // 05 · sites/portais: globo em malha (a web), girando no eixo
  function globo() {
    var R = 0.82, u = rnd();
    if (u < 0.42) {                         // meridianos
      var l = Math.floor(rnd() * 6) * Math.PI / 6, a = rnd() * Math.PI * 2;
      return [R * Math.sin(a) * Math.cos(l), -R * Math.cos(a), R * Math.sin(a) * Math.sin(l), 0, 0];
    }
    if (u < 0.84) {                         // paralelos (equador mais denso)
      var lat = [-60, -30, 0, 0, 30, 60][Math.floor(rnd() * 6)] * Math.PI / 180, f = rnd() * Math.PI * 2;
      var r = R * Math.cos(lat);
      return [r * Math.cos(f), R * Math.sin(lat), r * Math.sin(f), 0, 0];
    }
    var p = naEsfera(R);
    return [p[0], p[1], p[2], 0, 0];
  }

  // 06 · landing pages: funil convergindo num ponto, rodopiando
  function funil() {
    if (rnd() < 0.24) { var s = naEsfera(entre(0, 0.035)); return [s[0], entre(0.42, 0.86), s[2], 0, 1]; }
    var u = rnd(), y = -0.78 + u * 1.2, r = 0.88 * Math.pow(1 - u, 1.15) + 0.04, f = rnd() * Math.PI * 2;
    return [r * Math.cos(f), y, r * Math.sin(f), 0, 0];
  }

  var FORMAS = [simbolo, camadas, engrenagens, chip, barras, globo, funil, simbolo];
  var M = FORMAS.length;
  // por formação: inclinação da câmera (X), guinada fixa (Y), amplitude do
  // balanço em Y, giro no próprio plano (só o símbolo) e fração de poeira
  var INCLINA = [0, 0.62, 0.38, 0.22, 0.12, 0.3, 0.35, 0];
  var GUINADA = [0, 0.785, 0.2, 0.25, 0.32, 0, 0, 0];
  var BALANCO = [0.08, 0.2, 0.18, 0.14, 0.14, 0.12, 0.5, 0.08];
  var GIRO = [0.9, 0, 0, 0, 0, 0, 0, 0.9];
  var POEIRA = [0.12, 0.2, 0.2, 0.18, 0.2, 0.2, 0.2, 0.12];

  // ---- peças -------------------------------------------------------------
  var P = new Float32Array(N * M * 5);       // [x,y,z,a1,a2] de cada peça em cada formação
  var naForma = new Uint8Array(N * M);       // 1 = na forma, 0 = poeira
  var angulo = new Float32Array(N);          // posição angular fixa (correspondência + onda)
  var solta = new Float32Array(N * 3);       // desvio orgânico na transição / dispersão
  var fase = new Float32Array(N);
  var raio = new Float32Array(N);
  var acento = new Uint8Array(N);
  // poeira: posição na tela (fração), profundidade, velocidade
  var pX = new Float32Array(N), pY = new Float32Array(N), pZ = new Float32Array(N), pV = new Float32Array(N);

  var raioSlot = new Float32Array(N), poeiraBase = new Uint8Array(N);
  var ordem = [];
  for (var i = 0; i < N; i++) {
    angulo[i] = rnd();
    var d = naEsfera(entre(0.35, 1));
    solta[i * 3] = d[0]; solta[i * 3 + 1] = d[1]; solta[i * 3 + 2] = d[2];
    fase[i] = rnd() * Math.PI * 2;
    raio[i] = rnd() < 0.05 ? entre(2, 2.8) : entre(0.8, 1.6);
    acento[i] = rnd() < TANGELO ? 1 : 0;
    pX[i] = rnd(); pY[i] = rnd(); pZ[i] = entre(0.25, 1); pV[i] = entre(0.012, 0.035);
    raioSlot[i] = rnd();
    poeiraBase[i] = rnd() < 0.2 ? 1 : 0;
    ordem.push(i);
  }
  ordem.sort(function (a, b) { return angulo[a] - angulo[b]; });

  // correspondência: cada peça tem (ângulo, raio) fixos e ocupa o ponto de
  // mesmo ângulo e mesma "camada" do raio em toda forma — quem está por
  // fora continua por fora, quem está no miolo continua no miolo. Assim os
  // caminhos quase não se cruzam e a troca fica calma.
  var FATIAS = 40;
  function emFatias(lista, chaveFatia, chaveRaio) {
    lista.sort(function (a, b) { return chaveFatia(a) - chaveFatia(b); });
    var saida = [], n = lista.length;
    for (var f = 0; f < FATIAS; f++) {
      var fatia = lista.slice(Math.round(f * n / FATIAS), Math.round((f + 1) * n / FATIAS));
      fatia.sort(function (a, b) { return chaveRaio(a) - chaveRaio(b); });
      saida = saida.concat(fatia);
    }
    return saida;
  }

  for (var m = 0; m < M; m++) {
    // quem fica na forma: poeira quase sempre a mesma (só ~5% troca por
    // forma) — algumas entram e saem da tela, sem revoada a cada troca
    var dentro = ordem.filter(function (i) {
      var pd = rnd() < 0.05 ? 1 - poeiraBase[i] : poeiraBase[i];
      return !(pd && rnd() < POEIRA[m] / 0.2);
    });
    // pontos da forma com ângulo e raio na vista fixa da formação
    var cy0 = Math.cos(GUINADA[m]), sy0 = Math.sin(GUINADA[m]), cx0 = Math.cos(INCLINA[m]), sx0 = Math.sin(INCLINA[m]);
    var pts = [];
    for (var j = 0; j < dentro.length; j++) {
      var p = FORMAS[m]();
      var x2 = p[0] * cy0 + p[2] * sy0, z2 = -p[0] * sy0 + p[2] * cy0, y3 = p[1] * cx0 - z2 * sx0;
      p.push(Math.atan2(y3, x2), Math.hypot(x2, y3));
      pts.push(p);
    }
    pts = emFatias(pts, function (p) { return p[5]; }, function (p) { return p[6]; });
    dentro = emFatias(dentro, function (i) { return angulo[i]; }, function (i) { return raioSlot[i]; });
    for (var q = 0; q < dentro.length; q++) {
      var o = (dentro[q] * M + m) * 5;
      for (var c = 0; c < 5; c++) P[o + c] = pts[q][c];
      naForma[dentro[q] * M + m] = 1;
    }
  }

  // faixas de cor pela profundidade
  var CORES = [];
  for (var f = 0; f < FAIXAS; f++) {
    var t = f / (FAIXAS - 1) * (RAMPA.length - 1), k = Math.min(RAMPA.length - 2, Math.floor(t)), qq = t - k;
    var a = RAMPA[k], b = RAMPA[k + 1];
    CORES.push('rgb(' + Math.round(a[0] + (b[0] - a[0]) * qq) + ',' + Math.round(a[1] + (b[1] - a[1]) * qq) + ',' + Math.round(a[2] + (b[2] - a[2]) * qq) + ')');
  }
  var corTangelo = getComputedStyle(document.documentElement).getPropertyValue('--cor-tangelo').trim() || '#FB4D00';

  // buffers do quadro + física do mouse
  var sx = new Float32Array(N), sy = new Float32Array(N), sr = new Float32Array(N), faixa = new Uint8Array(N);
  var ox = new Float32Array(N), oy = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N);

  // ---- medidas -----------------------------------------------------------
  var L = 0, A = 0, dpr = 1, altura = 0, desktop = true;
  var centros = [], janelaA = 0, degradeA = 0, ultimoEsc = null, limpo = false;
  // celular: desvio que leva o centro da caixa da forma (já girada e em
  // perspectiva) ao centro do enquadramento — os modelos não são simétricos
  var desvX = 0, desvY = 0;
  var ultimoT = null, giroAcum = 0;
  function medir() {
    degradeA = degrade ? degrade.offsetHeight : 0;
    ultimoEsc = null;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    L = pin.clientWidth; A = pin.clientHeight;
    desktop = L >= 1000;
    // só realoca o canvas se o tamanho mudou de fato (no iPhone a barra de
    // endereço dispara resize a todo momento, com o canvas do mesmo tamanho)
    var nl = Math.round(L * dpr), na = Math.round(A * dpr);
    if (tela.width !== nl || tela.height !== na) { tela.width = nl; tela.height = na; }
    altura = scroll.offsetHeight - window.innerHeight;
    janelaA = janela.clientHeight;
    lista.style.transform = 'none';
    centros = itens.map(function (el) { return el.offsetTop + el.offsetHeight / 2; });
  }

  function limita(x) { return Math.min(1, Math.max(0, x)); }
  function suave(a, b, x) {
    var u = limita((x - a) / (b - a));
    return u * u * (3 - 2 * u);
  }
  function mistura(arr, x) {
    var k = Math.max(0, Math.min(arr.length - 2, Math.floor(x))), q = limita(x - k);
    return arr[k] + (arr[k + 1] - arr[k]) * q;
  }

  // ---- texto (teleprompter) -----------------------------------------------
  // anda sempre (sem platô parado): a tela nunca "segura"
  var ultimoAtivo = null, ultimaOp = null;
  function texto(ativo) {
    if (ativo === ultimoAtivo) return;
    ultimoAtivo = ativo;
    var n = centros.length, y;
    if (ativo < 0) y = centros[0] + (centros[1] - centros[0]) * ativo;                 // entra por baixo
    else if (ativo > n - 1) y = centros[n - 1] + (centros[n - 1] - centros[n - 2]) * (ativo - n + 1); // sai por cima
    else { var k = Math.min(n - 2, Math.floor(ativo)), q = ativo - k; y = centros[k] + (centros[k + 1] - centros[k]) * q; }
    lista.style.transform = 'translate3d(0,' + (janelaA / 2 - y).toFixed(1) + 'px,0)';
    for (var i = 0; i < itens.length; i++) {
      var dist = Math.abs(i - ativo);
      itens[i].style.opacity = String(Math.max(0.1, 1 - dist * 0.85).toFixed(3));
    }
  }

  // ---- mouse: espalha as peças em volta do cursor -------------------------
  var mX = 0, mY = 0, mVX = 0, mVY = 0, mouse = false;
  pin.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = pin.getBoundingClientRect(), nx = e.clientX - r.left, ny = e.clientY - r.top;
    if (mouse) { mVX += nx - mX; mVY += ny - mY; }
    mX = nx; mY = ny; mouse = true;
  }, { passive: true });
  pin.addEventListener('pointerleave', function () { mouse = false; });

  // ---- posição de uma peça numa formação (com a animação da forma) --------
  var gx = 0, gy = 0, gz = 0;
  var engC = [1, 1], engS = [0, 0], gloC = 1, gloS = 0;
  function modelo(m, i, t) {
    var o = (i * M + m) * 5, x = P[o], y = P[o + 1], z = P[o + 2], a1 = P[o + 3], a2 = P[o + 4];
    if (m === 1) {
      y += Math.sin(t * 0.9 + a1 * 1.3) * 0.035;
    } else if (m === 2) {
      var e = ENG[a1], dx = x - e.c[0], dy = y - e.c[1];
      x = e.c[0] + dx * engC[a1] - dy * engS[a1]; y = e.c[1] + dx * engS[a1] + dy * engC[a1];
    } else if (m === 3) {
      if (a2 > 0) { var id = Math.floor(a1); trilha(id, (a1 - id + t * 0.16) % 1); x = tr0; y = tr1; }
    } else if (m === 4) {
      if (a1 >= 0) y = BASE - a2 * BH[a1] * (1 + 0.08 * Math.sin(t * 1.2 + a1 * 0.9));
    } else if (m === 5) {
      var x5 = x * gloC - z * gloS; z = x * gloS + z * gloC; x = x5;
    } else if (m === 6) {
      if (a2 > 0) y = 0.42 + ((y - 0.42) / 0.44 + t * 0.2) % 1 * 0.44;
      // balanço limitado e quase rígido (não acumula nem cisalha): as peças
      // continuam perto do ponto correspondente no símbolo que vem depois
      var ang = Math.sin(t * 0.3) * (0.35 + 0.25 * limita((y + 0.78) / 1.64)), c6 = Math.cos(ang), s6 = Math.sin(ang);
      var x6 = x * c6 - z * s6; z = x * s6 + z * c6; x = x6;
    }
    gx = x; gy = y; gz = z;
  }

  // ---- quadro --------------------------------------------------------------
  function desenhar(agora) {
    var r = scroll.getBoundingClientRect();
    var prog = altura > 0 ? limita(-r.top / altura) : 0;
    var passo = prog * M;                       // 0 … M: M-1 transições + dispersão final
    var tempo = agora / 1000;

    // passo atual: formação A → B, fração local da transição
    var kA, local, fim = 0;
    if (passo >= M - 1) { kA = M - 2; local = 1; fim = passo - (M - 1); }
    else { kA = Math.floor(passo); local = limita((passo - kA - JANELA[0]) / (JANELA[1] - JANELA[0])); }
    var kB = kA + 1;
    var x = kA + suave(0, 1, local);           // posição "da câmera" entre formações
    var redemoinho = (kA % 2 ? 1 : -1) * 0.12;

    // texto: anda sempre; no 1º passo já entra em movimento (ease-out)
    var ativo;
    if (passo < 1) { var u0 = limita(passo / 0.9); ativo = 1 - (1 - u0) * (1 - u0) - 1; }
    else { var kk = Math.floor(passo), uu = passo - kk; ativo = kk + 0.4 * uu + 0.6 * suave(0, 1, uu) - 1; }
    texto(Math.round(ativo * 1000) / 1000);
    // fase final: todo o texto some; fica só o símbolo
    var op = Math.round((1 - suave(6.2, 6.6, passo)) * 1000) / 1000;
    if (op !== ultimaOp) { ultimaOp = op; conteudo.style.opacity = op === 1 ? '' : String(op); conteudo.style.visibility = op === 0 ? 'hidden' : ''; }

    // enquadramento: a forma fica à direita; o símbolo final vai ao centro
    var centra = suave(6.1, 6.9, passo);
    var cx, cy, S;
    if (desktop) { cx = L * (0.72 - 0.22 * centra); cy = A * (0.52 - 0.02 * centra); S = Math.min(L * 0.2, A * 0.34) * (1 + 0.15 * centra); }
    else { cx = L * 0.5; cy = A * (0.47 + 0.03 * centra); S = Math.min(L * 0.34, A * 0.15) * (1 + 0.25 * centra); }

    // câmera
    var inclina = mistura(INCLINA, x), bal = mistura(BALANCO, x), giro = mistura(GIRO, x);
    var ry = mistura(GUINADA, x) + Math.sin(tempo * 0.35) * bal;
    var rx = inclina + Math.sin(tempo * 0.23) * 0.05;
    // giro acumulado quadro a quadro: a velocidade muda na transição, mas o
    // ângulo não salta (tempo × velocidade fazia o símbolo dar voltas ao formar)
    // Só acumula com o símbolo montado e guarda o ângulo entre ±180° (a volta
    // de 360° é invisível). Nas outras formas o giro vale 0: o ângulo é
    // multiplicado pelo peso do giro, que cai a zero na transição — a forma
    // desgira pelo caminho mais curto em vez de ficar torta.
    var dt = ultimoT === null ? 0 : Math.min(0.05, (agora - ultimoT) / 1000);
    ultimoT = agora;
    var peso = giro / 0.9;
    if (peso > 0.999) {
      giroAcum += dt * 0.6;   // ~1 volta a cada 10 s (o hero faz 1 a cada 7 s)
      if (giroAcum > Math.PI) giroAcum -= Math.PI * 2;
    }
    var rz = giroAcum * peso;
    var cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx), cZ = Math.cos(rz), sZ = Math.sin(rz);
    // animações das formas (valores do quadro)
    for (var g = 0; g < 2; g++) { engC[g] = Math.cos(tempo * ENG[g].w + g * 0.17); engS[g] = Math.sin(tempo * ENG[g].w + g * 0.17); }
    gloC = Math.cos(tempo * 0.22); gloS = Math.sin(tempo * 0.22);

    // fim: o grafite da próxima seção sobe num degradê até cobrir a tela
    // exatamente quando o pin solta — a próxima seção "vem até nós"
    // (começa 2px dentro da tela, na parte 100% transparente: o Safari já
    // rasteriza a camada na entrada da seção, não no meio do scroll)
    var coberto = false;
    if (escurece) {
      var subida = Math.round((A - 2 - suave(0.2, 1, fim) * (A - 2 + degradeA)) * 10) / 10;
      if (subida !== ultimoEsc) { ultimoEsc = subida; escurece.style.transform = 'translate3d(0,' + subida + 'px,0)'; }
      coberto = subida + degradeA <= 0;
    }
    // tela toda escura: nada de partículas para desenhar
    if (coberto) {
      if (!limpo) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, tela.width, tela.height); limpo = true; }
      return;
    }
    limpo = false;

    // dispersão final: as peças voam para fora da tela, aceleradas
    var dispersa = Math.pow(suave(0.22, 1, fim), 1.5) * 5.5;
    var escR = desktop ? 1 : 0.8;
    if (!desktop) { cx += desvX; cy += desvY; }
    var bx0 = Infinity, bx1 = -Infinity, by0 = Infinity, by1 = -Infinity;

    for (var i = 0; i < N; i++) {
      // atraso pela posição angular: a troca corre em onda em volta da forma
      var si = suave(0, 1, limita((local - angulo[i] * ONDA) / (1 - ONDA)));
      var inA = naForma[i * M + kA], inB = naForma[i * M + kB];
      var px, py, pz, ax = 0, ay = 0, temA = false, temB = false;

      // poeira desta peça (tela): atravessa da direita p/ a esquerda e sobe com o scroll
      var poeiraX = 0, poeiraY = 0;
      if (!inA || !inB) {
        poeiraX = (((pX[i] - tempo * pV[i]) % 1.2 + 1.2) % 1.2 - 0.1) * L;
        poeiraY = (((pY[i] - prog * 2.2 * (1.25 - pZ[i])) % 1.1 + 1.1) % 1.1 - 0.05) * A + Math.sin(tempo * 0.5 + fase[i]) * 14;
      }

      // ponto 3D: mistura das duas formas (ou só a que existe)
      if (inA && inB) {
        modelo(kA, i, tempo); var x0 = gx, y0 = gy, z0 = gz;
        modelo(kB, i, tempo);
        px = x0 + (gx - x0) * si; py = y0 + (gy - y0) * si; pz = z0 + (gz - z0) * si;
        // curva em redemoinho + abertura no meio do caminho
        var meio = Math.sin(Math.PI * si);
        if (meio > 0.001) {
          var aR = redemoinho * meio, cR = Math.cos(aR), sR = Math.sin(aR);
          var xr = px * cR - pz * sR; pz = px * sR + pz * cR; px = xr;
          var abre = 1 + 0.06 * meio;
          px = px * abre + solta[i * 3] * 0.04 * meio; py = py * abre + solta[i * 3 + 1] * 0.04 * meio; pz += solta[i * 3 + 2] * 0.1 * meio;
        }
        temA = temB = true;
      } else if (inA) { modelo(kA, i, tempo); px = gx; py = gy; pz = gz; temA = true; }
      else if (inB) { modelo(kB, i, tempo); px = gx; py = gy; pz = gz; temB = true; }

      // flutuação contínua e dispersão final
      if (temA || temB) {
        // no símbolo a flutuação individual quase some: o giro já dá vida e,
        // somados, os dois fazem as peças "formigarem"
        var fl = 0.012 * (1 - 0.8 * peso);
        px += Math.sin(tempo * 0.9 + fase[i]) * fl;
        py += Math.cos(tempo * 0.7 + fase[i]) * fl;
        if (dispersa > 0) {
          var dn = Math.hypot(px, py) || 1;
          px += (px / dn * 0.7 + solta[i * 3] * 0.6) * dispersa;
          py += (py / dn * 0.7 + solta[i * 3 + 1] * 0.6) * dispersa;
          pz += solta[i * 3 + 2] * dispersa * 0.3;
        }
        // giro no plano (símbolo), balanço em Y, inclinação em X
        var x1 = px * cZ - py * sZ, y1 = px * sZ + py * cZ;
        var x2 = x1 * cY + pz * sY, z2 = -x1 * sY + pz * cY;
        var y3 = y1 * cX - z2 * sX, z3 = y1 * sX + z2 * cX;
        var esc = 1 / (1 + z3 * FOCO * 0.5);
        if (esc < 0.2) esc = 0.2;
        ax = cx + x2 * S * esc; ay = cy + y3 * S * esc;
        if (ax < bx0) bx0 = ax; if (ax > bx1) bx1 = ax;
        if (ay < by0) by0 = ay; if (ay > by1) by1 = ay;
        var rForma = raio[i] * esc * escR;
        var fForma = Math.max(0, Math.min(FAIXAS - 1, Math.round((z3 + 0.55) / 1.9 * (FAIXAS - 1))));
      }
      var rPoeira = raio[i] * (1.1 - pZ[i] * 0.55) * escR, fPoeira = Math.round(5 + pZ[i] * 8);

      if (temA && temB) { sx[i] = ax; sy[i] = ay; sr[i] = rForma; faixa[i] = fForma; }
      else if (temA || temB) {
        // entre a forma e a poeira: caminho na tela
        var w = temB ? si : 1 - si;            // w = quanto está na forma
        var e3 = w * w * (3 - 2 * w);
        sx[i] = poeiraX + (ax - poeiraX) * e3; sy[i] = poeiraY + (ay - poeiraY) * e3;
        sr[i] = rPoeira + (rForma - rPoeira) * e3;
        faixa[i] = Math.round(fPoeira + (fForma - fPoeira) * e3);
      } else { sx[i] = poeiraX; sy[i] = poeiraY; sr[i] = rPoeira; faixa[i] = fPoeira; }

      // mouse: empurra para longe do cursor (e no sentido do arrasto); mola volta
      if (mouse) {
        var dx = sx[i] + ox[i] - mX, dy = sy[i] + oy[i] - mY, d2 = dx * dx + dy * dy;
        if (d2 < REPULSA * REPULSA) {
          var dd = Math.sqrt(d2) || 1, forca = 1 - dd / REPULSA;
          forca *= forca;
          vx[i] += dx / dd * forca * 2.6 + mVX * forca * 0.05;
          vy[i] += dy / dd * forca * 2.6 + mVY * forca * 0.05;
        }
      }
      if (ox[i] !== 0 || oy[i] !== 0 || vx[i] !== 0 || vy[i] !== 0) {
        vx[i] = (vx[i] - ox[i] * 0.06) * 0.82; vy[i] = (vy[i] - oy[i] * 0.06) * 0.82;
        ox[i] += vx[i]; oy[i] += vy[i];
        if (Math.abs(ox[i]) + Math.abs(oy[i]) + Math.abs(vx[i]) + Math.abs(vy[i]) < 0.05) { ox[i] = oy[i] = vx[i] = vy[i] = 0; }
        sx[i] += ox[i]; sy[i] += oy[i];
      }
    }
    mVX *= 0.5; mVY *= 0.5;
    // o desvio persegue o centro da caixa aos poucos (sem pular na troca de
    // forma nem tremer com o balanço); congela na dispersão final
    if (!desktop && dispersa === 0 && bx1 > bx0) {
      desvX += (cx - desvX - (bx0 + bx1) / 2) * 0.06;
      desvY += (cy - desvY - (by0 + by1) / 2) * 0.06;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, tela.width, tela.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1 - suave(0.75, 1, fim);
    // do fundo para a frente: uma faixa de cor por vez (1 fill cada)
    for (var fx = FAIXAS - 1; fx >= 0; fx--) {
      ctx.beginPath();
      var algum = false;
      for (var j = 0; j < N; j++) {
        if (faixa[j] !== fx || acento[j]) continue;
        if (sx[j] < -8 || sx[j] > L + 8 || sy[j] < -8 || sy[j] > A + 8) continue;
        ctx.moveTo(sx[j] + sr[j], sy[j]);
        ctx.arc(sx[j], sy[j], sr[j], 0, Math.PI * 2);
        algum = true;
      }
      if (algum) { ctx.fillStyle = CORES[fx]; ctx.fill(); }
    }
    ctx.beginPath();
    for (var a2 = 0; a2 < N; a2++) {
      if (!acento[a2]) continue;
      ctx.moveTo(sx[a2] + sr[a2], sy[a2]);
      ctx.arc(sx[a2], sy[a2], sr[a2], 0, Math.PI * 2);
    }
    ctx.fillStyle = corTangelo;
    ctx.fill();
  }

  // ---- ciclo: só roda com a seção na tela --------------------------------
  var visivel = false, rodando = false;
  function laco(agora) {
    if (!visivel) { rodando = false; return; }
    desenhar(agora);
    requestAnimationFrame(laco);
  }
  new IntersectionObserver(function (entradas) {
    visivel = entradas[0].isIntersecting;
    if (visivel && !rodando) { rodando = true; requestAnimationFrame(laco); }
  }, { rootMargin: '10% 0px' }).observe(scroll);

  medir();
  desenhar(performance.now());
  window.addEventListener('resize', function () { medir(); ultimoAtivo = null; desenhar(performance.now()); }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { medir(); ultimoAtivo = null; });
})();
