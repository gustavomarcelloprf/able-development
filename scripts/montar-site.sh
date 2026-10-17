#!/bin/sh
# montar-site.sh — monta a versão publicada em _site/ (usado pelo GitHub
# Pages, ver .github/workflows/pages.yml; também roda local).
#
#   /        → a landing (landing/), com os caminhos ajustados
#   /docs/   → os documentos de docs/ (identidade, investidores)
#
# A fonte de verdade continua em landing/, com tokens/, assets/ e fonts/ ao
# lado. A Switzer local é trocada pelo CDN da Fontshare: a licença
# (fonts/FFL.txt) permite servir a fonte no próprio site.
#
# Uso: sh scripts/montar-site.sh   (depois: python3 -m http.server -d _site)
set -e

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
SITE="$RAIZ/_site"
rm -rf "$SITE"
mkdir -p "$SITE/tokens" "$SITE/assets" "$SITE/vendor"

# só os arquivos que a página usa (sem demos nem ferramentas de medição)
for f in index.html abertura.js cta.js diferenciais.js publicos.js revela-texto.js; do
  cp "$RAIZ/landing/$f" "$SITE/$f"
done
cp "$RAIZ/landing/vendor/lenis.min.js" "$RAIZ/landing/vendor/lenis.css" "$RAIZ/landing/vendor/LENIS-LICENSE.txt" "$SITE/vendor/"
cp "$RAIZ/tokens/able-tokens.css" "$SITE/tokens/"
cp "$RAIZ/assets/icone-app.svg" "$RAIZ/assets/logo-invertido.svg" "$SITE/assets/"
[ -d "$RAIZ/docs" ] && cp -R "$RAIZ/docs" "$SITE/docs"
touch "$SITE/.nojekyll"

# caminhos e fonte
python3 - "$SITE/index.html" <<'EOF'
import re, sys
p = sys.argv[1]
s = open(p, encoding='utf-8').read()
s = s.replace('../tokens/', 'tokens/').replace('../assets/', 'assets/')
s, n = re.subn(r"\n  @font-face \{[^}]*\}", '', s)
assert n == 3, 'esperava 3 @font-face, achei %d' % n
fonte = ('<link rel="preconnect" href="https://api.fontshare.com" crossorigin>\n'
         '<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap">\n')
s = s.replace('<link rel="stylesheet" href="tokens/', fonte + '<link rel="stylesheet" href="tokens/', 1)
assert '../' not in s, 'sobrou caminho ../ no index.html'
open(p, 'w', encoding='utf-8').write(s)
EOF

echo "Site montado em $SITE"
