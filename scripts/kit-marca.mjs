/* kit-marca.mjs — gera os PNGs do kit de marca (perfil, símbolo, logo,
   ícone) a partir dos SVGs de assets/. Cores trocadas só entre os pares
   aferidos (tinta, papel, grafite) — a marca nunca vai em tangelo.
   Uso: node scripts/kit-marca.mjs   →  social/kit-marca/ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAIDA = path.join(RAIZ, 'social/kit-marca');
fs.rmSync(SAIDA, { recursive: true, force: true });
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright-core');

const TINTA = '#1D1C1A', PAPEL = '#F5F4F1', GRAFITE = '#2A2927';
const svg = n => fs.readFileSync(path.join(RAIZ, 'assets', n), 'utf8');
const cor = (s, de, para) => s.split(de).join(para);
const simbolo = svg('simbolo.svg'), logo = svg('logo.svg'), icone = svg('icone-app.svg');

// [arquivo, largura, altura, fundo (null = transparente), svg, largura do desenho (fração)]
const ITENS = [
  // foto de perfil (Instagram, WhatsApp, LinkedIn): quadrado cheio, símbolo na
  // proporção do tile oficial (78%) — cabe inteiro no recorte redondo
  ['foto-de-perfil/perfil-tinta.png', 1080, 1080, TINTA, cor(simbolo, TINTA, PAPEL), 0.78],
  ['foto-de-perfil/perfil-grafite.png', 1080, 1080, GRAFITE, cor(simbolo, TINTA, PAPEL), 0.78],
  ['foto-de-perfil/perfil-papel.png', 1080, 1080, PAPEL, simbolo, 0.78],
  // símbolo sozinho
  ['simbolo/simbolo-tinta-transparente.png', 1200, 1200, null, simbolo, 0.86],
  ['simbolo/simbolo-papel-transparente.png', 1200, 1200, null, cor(simbolo, TINTA, PAPEL), 0.86],
  ['simbolo/simbolo-sobre-papel.png', 1200, 1200, PAPEL, simbolo, 0.62],
  ['simbolo/simbolo-sobre-tinta.png', 1200, 1200, TINTA, cor(simbolo, TINTA, PAPEL), 0.62],
  ['simbolo/simbolo-sobre-grafite.png', 1200, 1200, GRAFITE, cor(simbolo, TINTA, PAPEL), 0.62],
  // logo (símbolo + nome), sempre o lockup oficial — nunca recomposto
  ['logo/logo-tinta-transparente.png', 2400, 600, null, logo, 0.84],
  ['logo/logo-papel-transparente.png', 2400, 600, null, cor(logo, TINTA, PAPEL), 0.84],
  ['logo/logo-sobre-papel.png', 2400, 1260, PAPEL, logo, 0.62],
  ['logo/logo-sobre-tinta.png', 2400, 1260, TINTA, cor(logo, TINTA, PAPEL), 0.62],
  ['logo/logo-sobre-grafite.png', 2400, 1260, GRAFITE, cor(logo, TINTA, PAPEL), 0.62],
  // tile de plataforma (favicon, ícone de app)
  ['icone-app/icone-app.png', 1024, 1024, null, icone, 1],
];

const b = await chromium.launch({ channel: 'chrome' });
for (const [arq, w, h, fundo, desenho, frac] of ITENS) {
  // uma página por arquivo, em metade do tamanho com densidade 2 (redimensionar
  // a mesma página deixava emendas no desenho grande)
  const p = await b.newPage({ viewport: { width: w / 2, height: h / 2 }, deviceScaleFactor: 2 });
  await p.setContent(`<html><body style="margin:0;width:${w / 2}px;height:${h / 2}px;display:flex;align-items:center;justify-content:center;background:${fundo || 'transparent'}">
    <div style="width:${Math.round(w * frac / 2)}px;line-height:0">${desenho.replace('<svg ', '<svg style="width:100%;height:auto;overflow:visible" ')}</div></body></html>`);
  const destino = path.join(SAIDA, arq);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  await p.screenshot({ path: destino, omitBackground: !fundo });
  await p.close();
  console.log('✓', arq);
}
await b.close();

// originais em vetor (para gráfica, designers, apresentações)
fs.mkdirSync(path.join(SAIDA, 'vetor'), { recursive: true });
for (const n of ['simbolo.svg', 'logo.svg', 'logo-invertido.svg', 'icone-app.svg']) fs.copyFileSync(path.join(RAIZ, 'assets', n), path.join(SAIDA, 'vetor', n));
console.log('✓ vetor/');
