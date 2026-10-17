# Able Development — Plano de Arquitetura v1
### Portfólio: Engenharia Séria, Superfície Imersiva

---

## 1. Direção Criativa

Proponho a direção **"Technical Minimalism"** (referência de tom: Basement.studio, Cuberto, Active Theory, Resn, Ueno, Zajno) — o ponto de encontro entre a estética de engenharia (grid suíço, tipografia monoespaçada como elemento de credibilidade, densidade informacional controlada) e a linguagem de estúdio criativo premium (motion cinematográfico, generosidade de espaço negativo, transições que contam uma história).

Princípios que vão reger toda decisão de design daqui pra frente:

- **Grid como personagem visível.** Números de seção, coordenadas, labels técnicos (ex: `[ 01 / 06 ]`, `CASE_STUDY.exe`) aparecem como elementos de design — não são decoração, são prova de rigor de engenharia.
- **Tipografia dupla.** Uma grotesca geométrica para headlines (peso editorial, grande escala) + uma monoespaçada para metadados, labels e microcopy (reforça "engenharia").
- **Motion com propósito narrativo**, nunca decorativo. Cada scroll-trigger avança um argumento sobre o case study — não é firula.
- **Silêncio visual.** Espaço negativo generoso é o que faz o motion parecer caro. Densidade de informação alta, densidade visual baixa.

Essa direção será a régua contra a qual eu vou auditar tudo que voltar do Claude Code.

---

## 2. Stack Técnica (checada em julho/2026)

| Camada | Escolha | Justificativa |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack estável, React 19.2, React Compiler) | Melhor equilíbrio SSG/ISR para case studies + DX de produção. Turbopack estável reduz build time, importante com múltiplas instâncias do Claude Code iterando. |
| Estilo | **Tailwind CSS 4.3** (config CSS-first via `@theme`, sem `tailwind.config.js`) | Tokens de design (grid, espaçamento, escala tipográfica) vivem como CSS var nativa — impede que instâncias do Claude Code "inventem" valores arbitrários de pixel. |
| Motion | **GSAP 3.13+** (core + ScrollTrigger, ScrollSmoother, SplitText, Flip) | Desde abril/2025 a Webflow tornou o GSAP **100% gratuito, incluindo todos os plugins antes pagos (Club GSAP)** — sem mais fricção de licença/registry privado. `npm install gsap` já traz tudo. |
| Fontes | **next/font** (self-hosted, variable fonts) | Zero layout shift, zero request a terceiros — requisito de performance não-negociável. |
| 3D/generativo (opcional, lazy) | **Three.js / React Three Fiber** apenas se decidirmos um hero generativo | Carregado sob demanda (`next/dynamic`, `ssr:false`), nunca bloqueia o LCP. |
| Conteúdo dos case studies | **MDX local** no primeiro momento (migração futura para Sanity se o time editorial crescer) | Evita dependência de CMS externo enquanto o site é só nós dois iterando. |
| Deploy | **Vercel** | Integração nativa com Next.js, edge network, otimização de imagem automática. |
| Qualidade | TypeScript strict, ESLint + Prettier, `pnpm` | Consistência entre instâncias diferentes do Claude Code é o maior risco operacional deste fluxo — strict mode e lint são a rede de segurança. |

**Regra de ouro de performance:** animações só em `transform`/`opacity` (nunca propriedades que disparam layout/paint), `prefers-reduced-motion` sempre respeitado, GSAP plugins carregados por rota (não no bundle global), orçamento Lighthouse: LCP < 2.5s, CLS < 0.1, TBT < 200ms.

---

## 3. Sistema de Grid & Motion (diretrizes que vou fazer cumprir)

- Grid base de **12 colunas**, unidade de espaçamento **8px**, com quebras assimétricas intencionais só em momentos de hero/transição de case study.
- Toda animação nasce de **uma timeline mestre por seção** (`gsap.context()` escopado ao componente), nunca tweens soltos espalhados pelo código — isso é o que vai permitir eu auditar e recalibrar parâmetros (easing, duration, stagger) sem caçar animação em 10 arquivos.
- **Easing padronizado**: vamos fechar 2 curvas custom (uma para entrada de conteúdo, uma para transição de página) documentadas em `lib/motion/eases.ts` — nenhuma instância do Claude Code deve inventar easing novo sem essa referência.
- Scroll storytelling via `ScrollTrigger` com `scrub`, pinning controlado, e `ScrollSmoother` para a sensação de "peso" no scroll global do site.

---

## 4. Estrutura de Pastas Alvo

```
able-development/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                # Home
│   │   └── sobre/page.tsx
│   ├── trabalhos/
│   │   ├── page.tsx                # Lista de case studies
│   │   └── [slug]/page.tsx         # Case study individual
│   └── layout.tsx
├── components/
│   ├── ui/                         # Componentes atômicos (button, tag, label técnico)
│   └── motion/                     # Wrappers GSAP reutilizáveis (Reveal, Pin, Stagger)
├── lib/
│   ├── motion/
│   │   ├── eases.ts                # Curvas custom centralizadas
│   │   └── gsap-context.ts         # Setup único de registerPlugin + ScrollSmoother
│   └── content/                    # Loaders de MDX dos case studies
├── content/case-studies/*.mdx
├── styles/globals.css              # @theme do Tailwind 4 — tokens de design
└── public/
```

---

## 5. Instrução Técnica #1 — Setup Inicial (para colar no Claude Code CLI)

Copie o bloco abaixo integralmente no terminal, na pasta onde quer criar o projeto.

```
Você vai fazer o scaffolding inicial do site institucional da Able Development. Este é
APENAS um setup de fundação — não crie conteúdo de páginas, não escreva copy, não crie
case studies reais. O objetivo desta etapa é ter um esqueleto técnico validável.

1. Inicialize um projeto Next.js 16 com:
   npx create-next-app@latest able-development --typescript --tailwind --app --eslint --use-pnpm
   Confirme que a versão instalada do Next.js é a 16.x e do React é 19.2.x. Se o
   scaffold vier com uma versão diferente, atualize as dependências manualmente para
   as versões mais recentes estáveis antes de prosseguir.

2. Configure o Tailwind CSS na v4 usando o novo modelo CSS-first (@theme em
   styles/globals.css), SEM criar tailwind.config.js. Defina como tokens iniciais:
   - Escala de espaçamento em base 8px (8, 16, 24, 32, 48, 64, 96, 128, 192)
   - Grid de 12 colunas com gutter de 24px
   - Duas famílias tipográficas via next/font: uma sans geométrica variável para
     headlines (ex: "Geist" ou similar) e uma monoespaçada variável para labels/
     metadados (ex: "Geist Mono" ou "JetBrains Mono"). Ambas self-hosted, sem
     requisição externa a Google Fonts.
   - Paleta neutra (preto/branco/cinzas) com UMA cor de destaque técnica (defina
     um azul-elétrico ou verde-terminal como accent — escolha e documente).

3. Instale o GSAP com: pnpm add gsap
   Confirme que o pacote já inclui ScrollTrigger, ScrollSmoother, SplitText e Flip
   sem necessidade de registry privado (desde abril/2025 todos os plugins são
   gratuitos via Webflow/GSAP). Crie lib/motion/gsap-context.ts centralizando:
   - Um único ponto de registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip)
   - Um hook useGsapContext() que envolve gsap.context() com cleanup automático
   - Um check de window.matchMedia('(prefers-reduced-motion: reduce)') que
     desativa ScrollSmoother e reduz durations para próximo de zero quando ativo

4. Crie lib/motion/eases.ts com dois custom eases via CustomEase (ex:
   "ableEnter" e "ablePage") — pode usar valores placeholder por enquanto, eu vou
   recalibrar os parâmetros matemáticos depois. Documente no arquivo, em comentário,
   que estes valores são PROVISÓRIOS e serão ajustados por revisão.

5. Monte a estrutura de pastas exatamente assim:
   app/(marketing)/page.tsx, app/(marketing)/sobre/page.tsx,
   app/trabalhos/page.tsx, app/trabalhos/[slug]/page.tsx,
   components/ui/, components/motion/, lib/motion/, lib/content/,
   content/case-studies/

6. Crie UM componente de teste em components/motion/Reveal.tsx que recebe children
   e anima fade+translateY(24px)->0 disparado por ScrollTrigger ao entrar no
   viewport, usando o ease "ableEnter". Use esse componente na home (app/(marketing)/
   page.tsx) envolvendo três blocos de texto placeholder, só para eu conseguir ver
   o motion pipeline funcionando de ponta a ponta no navegador.

7. Configure ESLint + Prettier com regras estritas (TypeScript strict: true no
   tsconfig). Adicione um README.md curto documentando: como rodar o projeto,
   onde ficam os tokens de design, onde ficam os eases centralizados, e a regra
   de que NENHUMA animação deve ser escrita fora de components/motion ou sem
   passar pelos eases centralizados.

8. Rode o projeto localmente, confirme que builda sem erros de tipo/lint, e dê
   git init + commit inicial com a mensagem "chore: scaffold inicial Able
   Development".

Não avance para nenhuma página de conteúdo real, nenhum case study, nenhum
componente de navegação complexo. Pare aqui e aguarde a próxima instrução.
```

---

## Próximos passos (depois que esse setup voltar)

Vou auditar: se a versão do Next/Tailwind bateu, se o `Reveal.tsx` está limpo o bastante para eu recalibrar easing/duration diretamente, e se a estrutura de pastas foi respeitada. A partir daí, a Instrução #2 será o design system de tokens + o primeiro componente de navegação com transição de página via GSAP Flip.
