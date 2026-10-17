# Able Development — Novo Conceito: Foco
### Substitui o Selo de Aferição. Ponto de partida para o brand book v3.

> **Em espera desde o ajuste "Apple-minimal".** Não descartado, mas não é a direção
> ativa. Fonte de verdade para identidade visual passou a ser o repo
> [`ABLE`](https://github.com/gustavomarcelloprf/ABLE) — este documento fica como
> registro histórico do processo.

---

## 1. Conceito, em uma frase

**Complexidade não desaparece. Sai de foco.**

Simples não é a ausência de complexidade — é a complexidade posicionada fora do centro de atenção, ainda ali, ainda sustentando tudo, só que fora do plano nítido. É exatamente o que a Able faz: o sistema por trás pode ser tão complexo quanto precisar ser; o que a pessoa usando vê é só o que está em foco.

## 2. Por que resolve a tensão do selo

O selo de aferição certificava — apontava para trás, para uma verificação já feita. Foco é presente contínuo: uma lente está sempre focando, a cada instante, não guarda histórico do que já focou antes. Não pede portfólio nem case study para fazer sentido — pede só que, agora, o que importa esteja nítido e o resto esteja consciente e deliberadamente fora do centro. Bate direto com "olhamos para frente, não para trás" sem forçar a barra.

## 3. O elemento gráfico: moldura de foco

Em vez do selo circular, o objeto único da marca vira uma **moldura de foco** — os quatro cantos em L que aparecem em qualquer visor de câmera ou tela de captura quando o sistema está mirando em algo. É vocabulário de software nativo (todo mundo já viu isso numa tela), não precisa de explicação, e não é o clichê de lente/câmera fotográfica batido (não é um ícone de câmera, é o *indicador* de foco).

Lógica de construção (ponto de partida — validar no ferramental de design antes de travar):

- Quatro cantos em L, ângulo reto, espessura de traço consistente com a régua do wordmark antigo (reaproveitar a mesma lógica de peso).
- Gap entre os cantos e o conteúdo enquadrado: proporcional, nunca fixo em px — mesma disciplina de "área de respiro" que o selo já tinha.
- Um estado: **em foco** (cantos em verde, o acento único) vs. **fora de foco** (cantos em grafite, neutro) — dois estados, nunca um terceiro. É o mesmo tipo de regra binária que o selo tinha ("duas aplicações, nenhuma variação").
- Aplicação: envolve o "A" no ícone/favicon (assim como o selo envolvia o "A"), e pode envolver blocos de conteúdo real no site (a moldura literalmente foca um case, uma métrica, um bloco de destaque) — isso dá ao elemento um uso funcional, não só decorativo.

## 4. O que sobrevive do sistema anterior

Praticamente toda a disciplina construída para o selo continua de pé, porque não era sobre o selo — era sobre rigor:

- **Regra anti-AI-slop inteira**: tipografia fora do circuito óbvio, nenhuma cor sem derivação de conceito, sem preto/branco puros, contraste aferido por script. Nada disso dependia do selo.
- **"A complexidade fica no verso"** — o trilho de marginália em mono com dados técnicos na lateral esquerda fica *mais* justificado agora, não menos: é literalmente a complexidade fora de foco, visível para quem quer olhar, fora do centro de atenção de quem não quer.
- **Base neutra**: grafite, papel osso, tinta — nenhuma dessas cores é sobre "aferição", são só a regra de nunca usar preto/branco puro. Seguem válidas.

## 5. Cor: reaproveita o valor, reescreve o motivo

O verde-aferição (`#007975` · oklch(52% .090 191), 4,79:1 sobre papel) e o verde claro (`#51B0AC` · oklch(70% .090 191), 5,28:1 sobre grafite) **não precisam de nova aferição de contraste** — os números já passam. Só o conceito muda:

> Verde é a cor de foco confirmado. Toda câmera, todo visualizador, todo editor de imagem usa verde para dizer "isso aqui está nítido, isso aqui está certo". A Able usa a mesma convenção: verde não é mais "a leitura do instrumento", é "o foco travou aqui".

Isso preserva o trabalho de aferição de contraste já feito (não é pouco — foi construído com script dedicado) e só rescreve o parágrafo de justificativa, exatamente como já aconteceu uma vez quando o acento mudou de cobre para teal.

## 6. Tipografia: um ajuste, uma sugestão a prototipar

**Cabinet Grotesk continua** como família de display/UI/números — não tinha nada a ver com a tensão do selo, é distintiva, já teria passado no crivo anti-AI-slop de qualquer jeito.

**Spectral entra em questão.** Não por ser "ruim", mas porque a leitura de "serifa de cartório, autoridade antiga" reforçava exatamente o clima institucional-retrospectivo que estamos abandonando. Sugestão a testar antes de travar: **Fraunces**, uma serifa com eixos variáveis reais de tamanho óptico e "soft" — ou seja, dá para literalmente variar a letra entre uma forma mais suave/arredondada e uma forma mais afiada/precisa dentro da mesma família. Isso não é só coerente com o conceito de Foco por metáfora — é uma capacidade técnica real da fonte que pode ser usada de verdade (texto de apoio um pouco mais "soft", títulos de destaque mais "sharp"). Precisa ser testada em texto corrido real antes de virar regra; é sugestão, não decisão travada.

## 7. Frase-manifesto e ajuste de voz

Manifesto revisado, mesma cadência do antigo ("Capacidade não se declara. Afere-se."):

> **Complexidade não desaparece. Sai de foco.**

As regras de voz (Direta / Confiante / Precisa) continuam válidas sem alteração — não eram sobre o selo.

Ajuste necessário no exemplo "assim soamos": trocar **"Entregamos em 6 semanas. Não em 'em breve'."** por um prazo real de vocês, ou por uma frase-exemplo que não seja um compromisso comercial disfarçado (ex: "Dizemos o prazo. Não 'em breve'." — mantém a estrutura sem assumir um número que ninguém verificou ainda).

## 8. Próximos passos

1. Prototipar a moldura de foco (os quatro cantos) em SVG e testar tamanho mínimo, do mesmo jeito que o selo foi testado.
2. Testar Fraunces em texto corrido real antes de substituir Spectral definitivamente.
3. Reescrever a página 02 (elemento gráfico) e a 03 (wordmark) do brand book em cima do novo elemento — as páginas 04 (cores) e 05 (tipografia, depois do teste) precisam só de ajuste de texto, não de reconstrução.
4. Decidir o prazo real para substituir "6 semanas" antes de qualquer peça ir pro público.
