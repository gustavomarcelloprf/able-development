# Posts do Instagram

Os layouts seguem a linguagem da landing, que é o guia de design. O texto de cada post fica num arquivo `.json` dentro de `posts/`. O script transforma esse arquivo em PNGs no tamanho exato do Instagram.

## Gerar as imagens

```sh
node social/instagram/render.mjs              # todos os posts
node social/instagram/render.mjs para-quem    # só os posts com "para-quem" no nome
```

As imagens saem em `saida/<post>/01.png, 02.png…`. A legenda fica junto, em `legenda.txt`.

O script precisa do Google Chrome instalado e do pacote `playwright-core`. Se o pacote estiver instalado em outro lugar, informe o caminho em `PLAYWRIGHT=/caminho/do/playwright`.

Quando um texto não cabe no slide, o script avisa com erro, em vez de cortar o texto sem dizer nada.

## Vídeo (stories e reels)

Coloque `"animar": true` num slide, ou no post inteiro. Além do PNG, o slide passa a sair também em `01.mp4`: vídeo H.264 a 30 quadros por segundo, o formato que o Instagram aceita. O vídeo é gerado quadro a quadro e montado pelo codificador nativo do macOS (`scripts/png-para-mp4.swift`, compilado sozinho na primeira vez), sem precisar instalar ffmpeg.

As animações seguem os movimentos da landing:
- `capa` (6 s): a poeira se junta no símbolo num redemoinho e vira o logo sólido; as palavras do título sobem uma a uma.
- `onda` (7 s): a mira se desenha, a pergunta é digitada letra a letra, a onda tangelo sobe e cobre a tela, e entram o apoio e a chamada.
- demais layouts (5 s): topo, blocos e rodapé entram em sequência.

Para mudar a duração, use `"duracao": 8` (em segundos). O PNG sempre mostra o estado final e serve de prévia.

## Formatos

- Feed (padrão): 1080×1350, proporção 4:5.
- Story: 1080×1920. Use `"formato": "story"` no post.

## Layouts

| layout | uso | campos |
|---|---|---|
| `capa` | primeiro slide do carrossel | `titulo`, `resto` (continuação em cinza), `apoio`, `simbolo: true` (o símbolo da marca) ou `particulas: true` (o símbolo feito de pontos, como na landing), `fundo: "grafite"`, `semente` (muda o sorteio dos pontos) |
| `numerado` | listas: públicos, serviços, passos | `numero`, `titulo`, `apoio`, `fundo: "grafite"` |
| `frase` | uma ideia por slide, como no "Por que a Able" | `numero`, `abertura` (destaque), `resto` (em cinza), `fundo: "papel"` (padrão: grafite) |
| `mira` | pergunta ou tese no centro, com grade e cruzes tangelo | `titulo`, `apoio`, `tamanho: "t-xl"` |
| `onda` | chamada final, com o degradê tangelo do CTA | `titulo`, `apoio`, `chamada` |
| `encerramento` | assinatura com o logo | `assinatura`, `rodape` |

Campos que valem para todos os layouts:
- `rotulo`: a etiqueta com o traço tangelo no topo.
- `\n` dentro de um texto força uma quebra de linha.

## Regras da marca aplicadas

- O tangelo só aparece como acento: traço, números e cruzes. O fundo inteiro em tangelo fica reservado para a chamada final, como na onda da landing.
- O símbolo e o logo só aparecem em tinta ou papel. Nunca em tangelo, nunca girados, nunca esticados.
- O tom de voz segue o guia: direto e técnico, sem superlativos e sem "superempolgados".
