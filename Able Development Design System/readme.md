# Able Development · Design System

Able Development é um estúdio brasileiro de desenvolvimento de software (sites, SaaS, plataformas, sistemas internos) com foco em experiência do usuário. Tese da marca: **"Sistemas complexos não precisam ser difíceis de usar"** — engenharia robusta por dentro, simplicidade por fora. Público: empresas que precisam de sistemas internos sérios (jurídico, financeiro, operações), startups em estágio inicial, e outras agências/estúdios que precisam de um parceiro técnico.

Direção vigente: **v3 — minimalismo estilo Apple**. Paleta 100% neutra (papel / tinta / grafite) com um único acento (tangelo #FB4D00) usado só como marcação. Família tipográfica única (Switzer). Hierarquia vem de peso, espaço e contraste tonal — nunca de cor. Idioma de tudo: **português do Brasil**.

## Fontes

- Codebase montado: `ABLE/` (identidade, tokens, assets, fontes, decks, carrosséis).
- GitHub: https://github.com/gustavomarcelloprf/ABLE (mesmo conteúdo; commit lido `d668dac2ed0f`). Explore o repo para aprofundar: `docs/index.html` é o manual de identidade completo com contraste calculado ao vivo.
- Arquivos-chave lidos: `tokens/able-tokens.css`, `docs/able-development-contexto-marca.md`, `docs/able-ajustes-v3-apple-minimal.md`, `docs/proveniencia-conteudo.md`, `docs/index.html` (identidade visual), `docs/investidores.html` / `investidores-2.html` (deck scroll), `comercial/proposta-cliente.html` (deck de slides), `social/carrosseis/*` (templates Instagram 1080×1350), `assets/*.svg`, `fonts/*.woff2`.

## Superfícies representadas

1. **Documento de identidade / site** (`docs/index.html`): página longa, um "momento" por ideia, fundos alternando papel / papel-hover / grafite.
2. **Decks** — proposta comercial (slides em palco 100svh, navegação por botões) e apresentação para investidores (scroll, seções com `border-top`).
3. **Carrosséis Instagram** (`social/carrosseis`): canvas 1080×1350, cinco layouts (abertura, showcase, numerado, comparação, encerramento).
4. **UI de produto** (seção 07 do manual): botão, link, input, modal — a marca "virando produto".

---

## CONTENT FUNDAMENTALS

**Idioma e pessoa.** Português do Brasil. A Able fala em primeira pessoa do plural ("Olhamos para frente", "Preferimos dizer menos") e trata o leitor por "você" quando necessário ("você fica sabendo antes do prazo"). Nunca "a gente".

**Tom.** Direto e técnico sem ser frio; confiante sem exagero; precisão como valor central. Três traços: **Direta** (dizemos o que o sistema faz), **Confiante** (o trabalho fala mais alto que o adjetivo), **Precisa** (dizer menos e garantir que cada palavra seja verdadeira).

**Casing.** Sentence case em títulos e botões ("Publicar projeto", "Arquivar"). Eyebrows e rótulos técnicos em CAIXA-ALTA espaçada (0.08em) e numerados: "01 · Framework", "05 · Os planos". Separador de metadados é o ponto centrado "·".

**Forma das frases.** Curtas, verbos ativos, ponto final em títulos ("Papel, tinta, grafite." · "Três frentes."). Títulos de display raramente passam de 6 palavras. Frase-tese como estrutura recorrente: "X por dentro, Y por fora."

**Números e fatos.** Tudo o que é medido aparece medido: "15,48:1", "R$4.000", "44 px". Nunca estimativas vagas. O que não foi decidido é marcado como pendência ("em aberto", "aguarda o fundador") — nunca preenchido com texto genérico.

**Botões e ações.** Nomeados pelo efeito: "Arquivar", nunca "OK"; "Publicar projeto", "Cancelar". Um primário por vista.

**Erros e sistema.** Diz o que aconteceu, o que está preservado, o que fazer: *"Não foi possível salvar: o servidor não respondeu. Suas alterações estão preservadas neste navegador. Tente novamente."*

**O que evitar.** Emoji (nunca). Exclamações e "superempolgados". Superlativos genéricos ("disruptivo", "inovador", "revolucionando"). Hashtags. "Em breve". Narrativa de portfólio/cases antigos. Linguagem de agência de growth.

**Assim soamos / assim não soamos**
- ✔ "O ambiente de homologação fica pronto quarta, às 14h." — ✘ "Estamos superempolgados em compartilhar novidades incríveis!"
- ✔ "Um formulário de 40 campos virou 6 decisões. O resto o sistema deduz sozinho." — ✘ "Revolucionando a experiência digital com soluções inovadoras! #tech"

---

## VISUAL FOUNDATIONS

**Cor.** Seis tons claros (papel #F5F4F1 → tinta #1D1C1A), quatro escuros (grafite #2A2927 → papel como texto), um acento (tangelo #FB4D00). Nunca #FFF nem #000. Todo par texto/fundo tem contraste calculado (ver `tokens/colors.css`). O tangelo tem teto de 2–3% da superfície: traço de abertura de seção (36×3 px), sublinhado de destaque (`border-bottom: 3px`), links, ponto de pendência, "valores aferidos". Nunca fundo, nunca preenchimento grande, nunca dentro do símbolo. Como **texto**, só sobre tinta (5,00:1) — ex.: rótulo de uma "placa" tinta.

**Tipografia.** Switzer, três pesos: 400 corpo, 500 UI/labels/ênfase, 600 títulos/display. Escala 13 / 15 / 17 (corpo padrão) / 22 / 28 / 40 / 56 px; tracking negativo cresce com o corpo (−0.01 → −0.025em). Display em clamp (`clamp(40px, 5.4vw, 56px)`), `text-wrap: balance`, `max-width` em ch (15–22ch para títulos, 62–65ch para leitura). Números tabulares (`font-variant-numeric: tabular-nums`) em qualquer dado. Sem mono na marca (questão em aberto; o manual usa mono só como interface do documento).

**Espaço e composição.** Escala 8 → 16 → 24 → 32 → 48 → 64 → 96 → 128 → 192. Grid de 12 colunas, gutter 8 px. Alinhado à esquerda por padrão; centrado só em display isolado (frase ou símbolo sozinho). "Uma ideia por bloco": seções ("momentos") com padding vertical `clamp(72px, 14vh, 140px)`, separadas por `border-top: 1px` sutil ou por troca de fundo (papel → papel-hover → grafite). Margem mínima 20 px; conteúdo em `max-width: 1020–1060px`. Quanto mais alta a hierarquia, mais respiro em volta.

**Fundos e imagem.** Campos de cor sólidos, um por peça. Sem fotografias, sem ilustração, sem gradiente, sem textura, sem padrão. O material da marca é *flat* ("Liquid Glass" descartado). A única "imagem" é o símbolo Abertura em silhueta.

**Bordas, cartões e elevação.** Elevação vem de **borda e contraste, nunca sombra**. Card: `border: 1px solid --cor-borda-sutil; border-radius: 14px; padding: 26px 22px; background: papel`. Controle (botão, input): raio 8 px. Card de plano/nível: raio 16 px, header grafite com texto papel. Pendência: borda **tracejada** `--cor-borda-controle`, raio 14 px, traço tangelo 20×3 como marcador (sem pill, sem dot). Nota técnica: `border-left: 3px tangelo` sobre papel-hover, raio `0 10px 10px 0`. Sem sombras em lugar nenhum; nenhum `box-shadow`.

**Transparência e blur.** Só o véu de modal: `rgba(29,28,26,.6)`, sem blur. Marca e assets nunca usam translucidez.

**Hover / press / foco.** Botão primário (tinta) → grafite no hover. Secundário (transparente + borda controle) → fundo papel-hover. Sobre grafite, hover → grafite-hover. Links: traço do sublinhado engrossa (1 → 2 px). Sem mudança de escala, sem shrink no press. Foco: `outline: 2px solid tinta; outline-offset: 2px` — nunca removido. Transição de hover `.25s var(--able-enter)`.

**Motion.** Narrativo, nunca decorativo. Só `transform` e `opacity`. Duas curvas num só lugar: `ableEnter cubic-bezier(.16,1,.3,1)` (entrada de conteúdo: translateY 18–24 → 0 + opacity, .6–.7s, cascata com delays .15/.27/.39/.51s) e `ablePage cubic-bezier(.65,.05,.18,1)` (troca de slide: translateX 3% + opacity, .55s). `prefers-reduced-motion` zera tudo. Sem bounce, sem spring, sem parallax.

**Layout fixo.** Decks: navegação fixa (setas + contador "n / N") no rodapé; botão "Modo apresentação" no topo direito, some ao apresentar. Manual: rolagem natural, sem indicador de progresso. Nada de header sticky.

**Contexto escuro.** Os mesmos componentes existem sobre grafite com os tons escuros (`--cor-grafite-*`). Fechamento de decks e slide final de carrossel são sempre grafite com logo invertido.

**Controles.** Alvo de toque ≥ 44 px em todo botão/input; corpo 16 px no input (evita zoom iOS). Label sempre visível (placeholder não substitui label). Estado de erro: em aberto (sem token).

---

## ICONOGRAPHY

**Não há sistema de ícones.** O manual proíbe explicitamente ícones de biblioteca padrão (Lucide, Heroicons) como parte da disciplina anti-slop. Não há icon font, nem SVGs de ícone, nem PNGs. Emoji: nunca. Caracteres Unicode usados como sinal tipográfico: "·" (separador), "→" (escala/sequência), "×" (par "Prospect × Able"), "≥/≤" em notas técnicas. Setas de navegação de deck são texto ("←" "→").

**Marca (assets/):**
- `simbolo.svg` — o símbolo "Abertura": três lâminas curvas (espiral de Arquimedes) em volta de um vazio central. Sempre em silhueta, orientação canônica, nunca redesenhado, nunca com tangelo. Mínimo 16 px em tela.
- `logo.svg` (tinta) e `logo-invertido.svg` (papel) — lockup símbolo + wordmark em curvas (Switzer Semibold, 716,58×120). Mínimo 108 px de largura; abaixo, só o símbolo. Área de proteção: ¼ da caixa do símbolo. Nunca recompor como texto.
- `icone-app.svg` — tile de plataforma (squircle tinta, símbolo papel a 78%). Só para favicon/app icon/avatar; não é parte da marca.

Se um projeto precisar de ícones funcionais (UI de produto), isso é uma decisão em aberto no repo — sinalize ao fundador em vez de escolher uma biblioteca.

---

## Intentional additions

- `BrandMark` — wrapper React para símbolo/logo/tile (referencia os SVGs de `assets/`), para que nenhum consumidor redesenhe a marca.
- Aliases semânticos em inglês (`--surface-page`, `--text-secondary`…) ao lado dos tokens originais em português, para agentes que consomem em inglês. Os nomes canônicos continuam sendo os do repo.
- `--cor-erro-doc` registrado como cor de documentação (não é token de marca; o repo deixa erro em aberto).

## Índice

- `styles.css` — entrada única; importa `tokens/{fonts,colors,typography,spacing,base}.css`.
- `assets/` — `logo.svg`, `logo-invertido.svg`, `simbolo.svg`, `icone-app.svg`, `fonts/Switzer-*.woff2` + `FFL.txt`.
- `guidelines/` — cards de fundação (cores, tipo, espaço, marca, voz).
- `components/core/` — Button, LinkDoc, Input, Modal, Card, Abre (abertura de seção), Pendencia, Placa, PlanoCard, FatoLista, PassoLista, Comparacao, NotaTecnica, BrandMark, DeckNav.
- `ui_kits/identidade/` — página do manual de identidade (site).
- `ui_kits/proposta/` — deck de proposta comercial (slides, modo edição/apresentação).
- `slides/` — carrossel Instagram 1080×1350 (5 layouts) e slides de deck 16:9.
- `SKILL.md` — skill para Claude Code.
- `github.md` — associação com o repo de origem.

## Pendências herdadas do repo (não inventar)

Enunciado formal de visão; aprovação da personalidade ("Constrói como quem assina. Prova como quem mede."); fonte mono para dado tabular; token de estado de erro; valores finais de `ableEnter`/`ablePage`; registro da regra ampliada do acento (tangelo como texto sobre papel mede 3,10:1); CTA de contato (site/handle/e-mail) não documentado.
