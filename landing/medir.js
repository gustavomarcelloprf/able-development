/* Medição de fluidez no próprio navegador (ferramenta de desenvolvimento).
   Carregado só com ?medir na URL (use junto com ?nativo: index.html?nativo&medir).
   Rola cada região em velocidade constante, registra o intervalo entre frames
   e repete as regiões de texto sem a revelação letra a letra, para comparar.
   Resultado: tabela fixa no canto da tela. */
(function () {
  'use strict';
  var VEL = 1.2; // px por ms (~1200px/s, um scroll firme de trackpad)

  function espera(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function rolar(de, ate) {
    return new Promise(function (fim) {
      window.scrollTo(0, de);
      setTimeout(function () {
        var f = [], t0 = null, ult = null;
        function q(t) {
          if (t0 === null) { t0 = t; ult = t; } else { f.push(t - ult); ult = t; }
          var y = de + (t - t0) * VEL;
          window.scrollTo(0, Math.min(y, ate));
          if (y < ate) requestAnimationFrame(q);
          else fim(f);
        }
        requestAnimationFrame(q);
      }, 500);
    });
  }

  function resumo(f) {
    var d = f.slice().sort(function (a, b) { return a - b; });
    var Q = function (p) { return d[Math.floor(d.length * p)].toFixed(1); };
    var perdidos = d.filter(function (x) { return x > 20; }).length;
    return { frames: d.length, p50: Q(0.5), p90: Q(0.9), p99: Q(0.99), max: d[d.length - 1].toFixed(0),
      perdidos: perdidos, pct: (100 * perdidos / d.length).toFixed(0) + '%' };
  }

  function painel() {
    var p = document.createElement('pre');
    p.id = 'painel-medir';
    p.style.cssText = 'position:fixed;top:12px;left:12px;z-index:999;margin:0;padding:14px 16px;' +
      'background:#1D1C1A;color:#F5F4F1;font:12px/1.5 ui-monospace,Menlo,monospace;border-radius:8px;' +
      'max-width:calc(100vw - 24px);white-space:pre;opacity:.95;pointer-events:none';
    document.body.appendChild(p);
    return p;
  }

  async function rodar() {
    await espera(2500);
    var p = painel();
    var max = document.documentElement.scrollHeight - innerHeight;
    var hero = document.getElementById('hero-scroll');
    var fimHero = hero ? hero.offsetHeight - innerHeight : 2400;
    var serv = document.getElementById('servicos');
    var fimServ = serv ? serv.offsetTop + serv.offsetHeight - innerHeight : 4400;
    var regioes = [['hero', 0, fimHero], ['servicos', fimHero, fimServ], ['baixo', fimServ, max]];
    var linhas = [navigator.userAgent.match(/(Version\/[\d.]+ Safari|Chrome\/[\d.]+|Firefox\/[\d.]+)/)?.[0] +
      '  ' + innerWidth + 'x' + innerHeight + ' dpr ' + devicePixelRatio +
      (document.documentElement.classList.contains('lenis') ? '  LENIS' : '  nativo'),
      'frame ideal ~16.7ms · "perdidos" = frames > 20ms', '',
      'regiao                frames  p50   p90   p99   max  perdidos'];
    function linha(nome, r) {
      linhas.push(nome.padEnd(20) + String(r.frames).padStart(7) + r.p50.padStart(6) + r.p90.padStart(6) +
        r.p99.padStart(6) + r.max.padStart(6) + ('  ' + r.perdidos + ' (' + r.pct + ')'));
      p.textContent = linhas.join('\n');
    }
    p.textContent = linhas.join('\n') + '\n\nmedindo… não mexa no mouse';

    for (var i = 0; i < regioes.length; i++) linha(regioes[i][0], resumo(await rolar(regioes[i][1], regioes[i][2])));

    // mesmas regiões de texto sem a revelação letra a letra
    if (window.RevelaTexto) {
      window.RevelaTexto.restaurar();
      for (var k = 1; k < regioes.length; k++) linha(regioes[k][0] + ' sem letras', resumo(await rolar(regioes[k][1], regioes[k][2])));
    }
    // hero com o símbolo escondido (isola o custo do canvas/zoom)
    var wrap = document.getElementById('hero-simbolo-wrap');
    if (wrap) {
      wrap.style.display = 'none';
      linha('hero sem simbolo', resumo(await rolar(regioes[0][1], regioes[0][2])));
    }
    linhas.push('', 'pronto — tire um print desta caixa');
    p.textContent = linhas.join('\n');
  }

  if (document.readyState === 'complete') rodar(); else window.addEventListener('load', rodar);
})();
