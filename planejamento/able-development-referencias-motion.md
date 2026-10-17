# Able Development — Análise de Referências (Motion/Interação)

Nota sobre método: o Chrome não estava conectado nesta sessão, então não consegui ver o scroll e o cursor rodando ao vivo — a leitura abaixo é sobre a estrutura/conteúdo de cada site (via fetch de página) cruzada com os padrões técnicos conhecidos para esse tipo de efeito. Vale você mesmo passar o mouse nesses três com o devtools aberto (Network + Sources) pra eu confirmar as libs exatas depois, se quiser precisão total.

## O que cada referência mostra

- **obscurastudio.webflow.io/lumen** — case study estruturado exatamente como eu já desenhei no plano: `01 — Intro / 02 — Challenge / 03 — Solution / 04 — Result`, um cliente por página, imagens grandes, texto mínimo. Loader com contador percentual (`Connecting 0%`) antes de revelar o conteúdo — técnica clássica de site premium: atrasa a entrada até os assets carregarem, sincronizado com uma animação de reveal.
- **russellnumo.nl** — construído em Next.js/React por um dev que se define como "creative frontend developer" focado em "craft, motion, interaction". É a referência mais próxima do que estamos construindo tecnicamente. Sinais na estrutura: headline que cicla entre "Frontend developer / UX/UI Designer / Creative" (rotação de texto, típico de GSAP timeline em loop), navegação numerada (`01 About / 02 Projects / 03 Contact` — mesma lógica de label técnico que já adotamos), serviços com anotação `( ) ← click me` (sugere hover/accordion revelando detalhe), loader percentual no rodapé.
- **nexola.framer.website** — vale menos como referência: é um template Framer à venda (`Get Your Template $89`), copy genérica de agência de growth/conversão. Estruturalmente é site de vendas, não portfólio autoral — eu tiraria da lista de inspiração direta.

## Traduzindo o que você disse gostar em decisões técnicas

| O que você gosta | Como isso se chama tecnicamente | Onde entra no nosso stack |
|---|---|---|
| Scroll liso | Virtual scroll suavizado | Já coberto: `ScrollSmoother` (GSAP, grátis desde 2025) já estava no plano — nenhuma dependência nova. |
| Efeito ao passar o mouse | Cursor customizado + "magnetic hover" (elemento se desloca em direção ao cursor dentro de um raio) | **Novo componente a adicionar**: `components/motion/Cursor.tsx` — um dot/círculo com `mix-blend-mode: difference` (funciona sobre qualquer fundo, reforça a paleta neutra), posição via `gsap.quickTo()` (lerp por frame, mais leve que recalcular tween a cada mousemove). |
| Estilo neutro, layout simétrico | Já é exatamente a direção "Technical Minimalism" que fechamos — grid de 12 colunas, paleta neutra + 1 accent. Nenhuma mudança. |
| Texto com motion a cada scroll | Reveal por linha (não só fade) — texto mascarado (`overflow: hidden`) com `translateY(110% → 0%)` por linha, via `SplitText` + stagger + `ScrollTrigger` | **Refinamento do que já existe**: o `Reveal.tsx` do scaffold hoje só faz fade+translateY em blocos inteiros (bom pra cards/imagens). Para headlines especificamente, vamos precisar de um segundo componente, `TextReveal.tsx`, com a técnica de linha mascarada — é o que dá aquele efeito "premium" de texto entrando linha por linha. |

## Decisão de arquitetura resultante

Nenhuma mudança de stack. Duas adições ao escopo de componentes de motion, para quando a codificação for retomada:

1. `components/motion/Cursor.tsx` — cursor customizado + magnetic hover, usando `gsap.quickTo()`.
2. `components/motion/TextReveal.tsx` — reveal de texto mascarado por linha via `SplitText`, separado do `Reveal.tsx` (que fica para blocos/imagens).

Isso vira instrução de código só quando você decidir seguir — por enquanto fica registrado aqui como decisão de direção.
