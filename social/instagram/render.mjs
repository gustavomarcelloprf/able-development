/* render.mjs — transforma os posts (posts/*.json) em PNGs para o Instagram.
   Uso:  node social/instagram/render.mjs [trecho-do-nome ...]   (sem args = todos)
   Saída: social/instagram/saida/<post>/01.png, 02.png … + legenda.txt
   Slides com "animar": true também saem em vídeo (01.mp4), para stories/reels.
   Feed 1080×1350 (4:5) · story 1080×1920 (9:16), no tamanho exato do Instagram.
   Precisa de playwright (ou playwright-core) e do Google Chrome instalado;
   caminho do módulo opcional em PLAYWRIGHT=/caminho/para/playwright. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(DIR, '../..');
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright-core');

const filtro = process.argv.slice(2);
const arquivos = fs.readdirSync(path.join(DIR, 'posts')).filter(f => f.endsWith('.json'))
  .filter(f => !filtro.length || filtro.some(x => f.includes(x))).sort();
if (!arquivos.length) { console.error('Nenhum post em posts/ para', filtro); process.exit(1); }

// SVGs da marca, entregues ao modelo (file:// não deixa o modelo buscar sozinho)
const simbolo = fs.readFileSync(path.join(RAIZ, 'assets/simbolo.svg'), 'utf8');
const MARCA = {
  simbolo,
  logo: fs.readFileSync(path.join(RAIZ, 'assets/logo.svg'), 'utf8'),
  caminhos: [...simbolo.matchAll(/<path d="([^"]+)"/g)].map(m => m[1]),
};

// vídeo: slides com "animar": true viram MP4 H.264 (stories/reels), 30 qps,
// gravados quadro a quadro e juntados pelo codificador nativo do macOS
const FPS = 30;
const CODIFICADOR = path.join(DIR, '.bin/png-para-mp4');
function codificador() {
  if (!fs.existsSync(CODIFICADOR)) {
    console.log('  … compilando o codificador de vídeo (só na primeira vez)');
    fs.mkdirSync(path.dirname(CODIFICADOR), { recursive: true });
    execFileSync('swiftc', ['-O', path.join(RAIZ, 'scripts/png-para-mp4.swift'), '-o', CODIFICADOR], { stdio: ['ignore', 'ignore', 'inherit'] });
  }
  return CODIFICADOR;
}

const b = await chromium.launch({ channel: 'chrome' });
let falhas = 0;
for (const arq of arquivos) {
  const post = JSON.parse(fs.readFileSync(path.join(DIR, 'posts', arq), 'utf8'));
  const formato = post.formato || 'feed';
  const A = formato === 'story' ? 1920 : 1350;
  const destino = path.join(DIR, 'saida', post.post);
  fs.rmSync(destino, { recursive: true, force: true });
  fs.mkdirSync(destino, { recursive: true });

  const p = await b.newPage({ viewport: { width: 1080, height: A } });
  p.on('pageerror', e => { console.error('  ✗ erro no modelo:', e.message); falhas++; });
  await p.addInitScript(m => { window.MARCA = m; }, MARCA);
  await p.goto('file://' + path.join(DIR, 'template.html'));

  for (let i = 0; i < post.slides.length; i++) {
    await p.evaluate(([s, m]) => window.renderSlide(s, m), [post.slides[i], { indice: i + 1, total: post.slides.length, formato }]);
    // texto que estoura o quadro é erro, não corte silencioso
    const estouro = await p.evaluate(() => {
      const c = document.querySelector('.conteudo');
      return c.scrollHeight > c.clientHeight + 1 || c.scrollWidth > c.clientWidth + 1;
    });
    if (estouro) { console.error(`  ✗ ${post.post}/${i + 1}: o texto não coube — encurte ou use um tamanho menor`); falhas++; }
    const base = String(i + 1).padStart(2, '0');
    const nome = base + '.png';
    // o PNG é sempre o estado final (serve de capa/prévia do vídeo)
    await p.locator('.slide').screenshot({ path: path.join(destino, nome) });
    console.log(`  ✓ ${post.post}/${nome} (${post.slides[i].layout})`);
    if (post.slides[i].animar || post.animar) {
      const dur = await p.evaluate(() => window.duracaoAnimacao());
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'able-quadros-'));
      const total = Math.round(dur * FPS);
      for (let q = 0; q < total; q++) {
        await p.evaluate(t => window.quadro(t), q / FPS);
        await p.locator('.slide').screenshot({ path: path.join(tmp, String(q).padStart(5, '0') + '.png') });
      }
      execFileSync(codificador(), [tmp, String(FPS), path.join(destino, base + '.mp4')], { stdio: ['ignore', 'ignore', 'inherit'] });
      fs.rmSync(tmp, { recursive: true, force: true });
      // volta ao estado parado para o próximo slide
      console.log(`  ✓ ${post.post}/${base}.mp4 (${dur}s, ${total} quadros)`);
    }
  }
  await p.close();
  if (post.legenda) fs.writeFileSync(path.join(destino, 'legenda.txt'), post.legenda.trim() + '\n');
}
await b.close();
if (falhas) { console.error(`${falhas} problema(s).`); process.exit(1); }
