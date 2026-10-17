# Able Development — Plano de Arquitetura v2
### Auditoria do Setup Inicial + Instrução Técnica #2

---

## 1. Auditoria da Instrução #1

Aprovado. Versões, estrutura de pastas, tokens CSS-first e o pipeline de motion batem exatamente com o especificado. Dois pontos:

- **Commit duplicado ("Initial commit from Create Next App" + o seu):** não é problema. É o comportamento padrão do `create-next-app` quando a pasta já inicializa um repo git. Seu commit é o HEAD, histórico limpo. Nenhuma ação necessária.
- **Accent `#2e45ff`:** aprovado como escolha, mas com uma ressalva técnica. Calculei o contraste WCAG: sobre branco dá **6.16:1** (passa AA confortavelmente para texto normal). Sobre preto dá **3.41:1** — passa para UI/large text (limiar 3:1) mas **não passa para texto pequeno/labels mono sobre fundo escuro** (limiar 4.5:1). Regra a documentar: `#2e45ff` pode ser usado como texto/label em seções claras, botões, bordas e elementos grandes em qualquer fundo, mas nunca como texto pequeno sobre fundo escuro — nesses casos, usar uma variante mais clara (sugiro `#5a6bff` como `--accent-on-dark`, ainda não testado, peça para o Claude Code validar o contraste antes de aplicar).

## 2. Parâmetros Matemáticos Finais dos Eases

Substitua os valores placeholder de `lib/motion/eases.ts` pelos definitivos abaixo (não são mais provisórios):

```js
import { CustomEase } from "gsap/CustomEase";

// ableEnter — reveal de conteúdo em scroll. Decelera com confiança, sem overshoot
// (overshoot quebraria o tom de rigor técnico). Equivale a cubic-bezier(0.16, 1, 0.3, 1).
CustomEase.create("ableEnter", "M0,0 C0.16,1 0.3,1 1,1");

// ablePage — transição de página inteira. Acelera e desacelera de forma mecânica,
// sem anticipation/bounce. Equivale a cubic-bezier(0.83, 0, 0.17, 1).
CustomEase.create("ablePage", "M0,0 C0.83,0 0.17,1 1,1");
```

Durações e stagger de referência (documentar junto dos eases):

- `Reveal.tsx` (ableEnter): duration **0.9s**, stagger entre filhos **0.1s**, `start: "top 85%"` no ScrollTrigger.
- Transição de página (ablePage): duration **0.7s** — mais curta e mecânica que o reveal de conteúdo, para não competir com ele.

## 3. Instrução Técnica #2 (para colar no Claude Code CLI)

```
Vamos evoluir o scaffold da Able Development. Duas frentes nesta instrução: (1) fechar
os parâmetros de motion que estavam provisórios, (2) construir a navegação com
transição de página via GSAP Flip. Ainda NÃO crie conteúdo real de case studies.

1. Em lib/motion/eases.ts, substitua os valores placeholder pelos definitivos:
   CustomEase.create("ableEnter", "M0,0 C0.16,1 0.3,1 1,1")
   CustomEase.create("ablePage", "M0,0 C0.83,0 0.17,1 1,1")
   Remova o comentário de "provisório". Atualize Reveal.tsx para usar duration: 0.9,
   stagger: 0.1 entre filhos, e ScrollTrigger start: "top 85%".

2. Ajuste a variável de accent no @theme: mantenha --color-accent: #2e45ff como
   padrão, e adicione --color-accent-on-dark: #5a6bff para uso como texto/label
   sobre fundos escuros. Rode uma checagem de contraste WCAG (pode usar uma lib
   simples ou calcular manualmente) confirmando que --color-accent-on-dark atinge
   pelo menos 4.5:1 sobre a cor de fundo escuro definida na paleta. Se não atingir,
   ajuste o tom até passar, e documente o valor final e o contraste calculado em
   comentário no CSS.

3. Crie components/ui/Nav.tsx: navegação fixa, minimalista, com os labels técnicos
   já estabelecidos (ex: [ 01 / 03 ], estilo mono). Deve conter links para
   Home, Trabalhos e Sobre.

4. Implemente transição de página com GSAP Flip entre app/trabalhos (lista) e
   app/trabalhos/[slug] (detalhe): o elemento de thumbnail/título clicado na lista
   deve fazer Flip.from() para a posição equivalente no header do case study,
   usando duration: 0.7 e o ease "ablePage". Use Flip.getState() antes da
   navegação e Flip.from() depois que a rota trocar (pode usar um estado
   compartilhado simples ou sessionStorage temporário para passar o elemento
   entre as duas telas — decida a abordagem mais simples que funcione com App
   Router e documente a escolha no README).

5. Garanta que a transição de página respeita prefers-reduced-motion: quando
   ativo, pule o Flip e faça a navegação instantânea, sem animação.

6. Rode pnpm build e pnpm lint, confirme zero erros, teste manualmente a
   transição entre lista e detalhe no navegador, e dê commit com a mensagem
   "feat: navegação com transição Flip + eases finais".

Pare aqui após o commit. Não crie o design system completo de componentes nem
os case studies reais — isso vai ser a próxima instrução, depois que eu auditar
a sensação da transição Flip.
```

---

## Próximos passos

Depois que isso voltar, eu quero ver a transição Flip rodando antes de fechar os parâmetros — timing de transição de página costuma precisar de ajuste fino no olho, não só no papel. A Instrução #3 será o design system de componentes (cards de case study, botões, tags técnicas) + a primeira estrutura real de conteúdo MDX.
