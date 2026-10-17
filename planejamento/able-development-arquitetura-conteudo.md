# Able Development — Arquitetura de Conteúdo v1

Antes de qualquer grid, motion ou código: isto é o esqueleto de informação do site. Como só existe 1 case study hoje mas mais virão, o objetivo aqui não é escrever "a página do projeto X" — é desenhar o **modelo** que qualquer case study futuro vai preencher, sem precisar redesenhar nada.

---

## 1. Sitemap (confirmado)

```
/               Home
/trabalhos      Lista de case studies (grid de cards)
/trabalhos/[slug]   Case study individual
/sobre          Sobre a Able Development
```

Contato vive como CTA embutido (não é página própria) — mantém o site enxuto, como decidido.

---

## 2. Schema do Case Study (o molde reutilizável)

Isto vira o frontmatter de cada `content/case-studies/*.mdx`. Todo projeto futuro preenche exatamente estes campos — é o que garante que o 2º, 3º, 10º case study encaixem no design sem ajuste manual.

| Campo | O que é | Exemplo/observação |
|---|---|---|
| `slug` | identificador da URL | `sistema-gestao-clinica-x` |
| `client` | nome do cliente ou setor (se sigiloso) | pode ser anonimizado: "Rede de clínicas — confidencial" |
| `title` | nome do projeto/produto | |
| `year` | ano de entrega | |
| `category` | tipo de projeto | `Sistema de Gestão` / `Automação de Processos` / `Ferramenta de Eficiência` |
| `role` | o que a Able fez especificamente | ex: "Arquitetura, desenvolvimento full-stack, automação de fluxo" |
| `stack` | tecnologias usadas no projeto (não do site) | |
| `summary` | 1 frase para o card na listagem `/trabalhos` | precisa ser forte sozinha, sem contexto |
| `problem` | qual era a dor do cliente antes | situação/contexto de negócio |
| `challenge` | o obstáculo técnico ou de escopo específico | o que tornava isso não-trivial |
| `solution` | o que foi construído | pode ter sub-blocos técnicos |
| `results` | métricas de impacto, se houver | tempo economizado, redução de erro, volume processado, etc. Se não houver número, usar resultado qualitativo honesto — nunca inventar métrica. |
| `testimonial` | opcional | citação do cliente, se existir e puder ser usada |
| `assets` | checklist de mídia necessária | hero image, 2-4 screenshots/diagramas, opcional: vídeo curto de demo |

Isso é exatamente o `01 — Intro / 02 — Challenge / 03 — Solution / 04 — Result` que vimos na referência da Obscura — mesma lógica narrativa, adaptada para provar rigor de engenharia em vez de identidade visual.

---

## 3. Esqueleto de copy — Home (rascunho para sua edição)

Isto é ponto de partida, não texto final — ajusta com sua voz.

**Hero (posicionamento):**
> "Engenharia que já provou. Agora, também bonita."
> *(alternativas: "Rigor de engenharia, superfície de estúdio criativo" / "Sistemas sérios, apresentados como arte")*

**Parágrafo de abertura:**
Able Development constrói sistemas de gestão, automações de processos complexos e ferramentas de eficiência para negócios que não podem se dar ao luxo de software frágil. Este é o registro desse trabalho — e o começo de uma nova fase, onde a mesma engenharia ganha uma superfície à altura.

**Seções da Home:**
1. Hero + posicionamento
2. Teaser do case study (o único que existe hoje, tratado como destaque único — não como "1 de N")
3. Bloco "Sobre" resumido (link pra página completa)
4. CTA de contato

---

## 4. Esqueleto de copy — Sobre (rascunho)

- Origem: fundação como estúdio de engenharia de software sério (sistemas de gestão, automação, eficiência)
- O ponto de virada: por que agora também design/motion/arte generativa — qual é a tese (engenharia robusta + design de alto nível não são opostos, são reforço mútuo)
- Como a Able trabalha (processo, não genérico — o que difere de agência de design comum: fundação técnica real)

---

## Próximo passo

Preciso dos "dados soltos" do case study que você já tem — specs, métricas, prints, contexto do cliente (mesmo que anonimizado) — cole aqui que eu estruturo no schema acima. A partir disso fechamos o wireframe/grid da página de case study com conteúdo real, não placeholder.

---

## 5. Prompt de Intake (reutilizável a cada novo case study)

Use este prompt — aqui ou em qualquer conversa com Claude — para extrair as informações de um projeto e já deixá-las no formato do schema da seção 2. Reutilizável para todo case study futuro, não só o primeiro.

```
Preciso estruturar as informações de um projeto da Able Development para virar um
case study no nosso portfólio. Me entreviste, uma pergunta de cada vez, cobrindo
exatamente estes campos (nessa ordem):

1. Nome do cliente ou do projeto (me pergunte também se precisa ser anonimizado
   por confidencialidade, e nesse caso sugira uma forma neutra de descrever o
   cliente, ex: "rede de clínicas de médio porte")
2. Ano de entrega
3. Categoria: Sistema de Gestão / Automação de Processos / Ferramenta de
   Eficiência (ou proponha uma categoria nova se não encaixar)
4. Papel exato da Able no projeto (arquitetura? dev full-stack? só automação?
   consultoria?)
5. Stack técnica usada no projeto entregue (não confundir com o stack do
   site do portfólio)
6. Qual era o problema/dor do cliente antes do projeto existir
7. Qual foi o desafio específico — técnico, de escopo ou de prazo — que tornava
   isso não trivial
8. O que foi construído como solução (pode ter sub-partes técnicas)
9. Resultados mensuráveis, se existirem (tempo economizado, redução de erro,
   volume processado, etc.). Se eu não souber um número, não invente — me
   pergunte por um resultado qualitativo honesto em vez disso
10. Se existe algum depoimento do cliente que possa ser usado
11. Quais assets visuais já existem hoje (screenshots, prints de dashboard,
    diagramas, vídeo de demonstração) e quais precisariam ser produzidos

Depois de eu responder tudo, organize as respostas no formato de frontmatter +
corpo MDX, seguindo o schema documentado em
docs/able-development-arquitetura-conteudo.md, pronto para colar em
content/case-studies/[slug].mdx.
```

### 5.1 Variante: quando o Claude tem acesso ao projeto real (código/repo/docs)

Use esta versão quando for pedir para uma instância de Claude (ex: Claude Code, com
acesso à pasta do projeto) extrair as informações direto da fonte, em vez de
entrevistar você. Ela investiga primeiro e só pergunta o que não dá para inferir.

```
Este projeto vai virar um case study no portfólio da Able Development. Preciso que
você levante as informações abaixo — investigando o código, README, documentação,
histórico de commits, configuração de deploy e qualquer outro artefato disponível
neste repositório/pasta antes de me perguntar qualquer coisa. Só me pergunte o que
genuinamente não dá pra inferir a partir do projeto (ex: nome real do cliente se
for confidencial, métricas de negócio que não estão no código, depoimentos).

Campos que preciso, nesta ordem:

1. Nome do cliente ou do projeto (se não estiver explícito, pergunte se precisa
   ser anonimizado e sugira uma descrição neutra)
2. Ano de entrega (pode inferir do histórico de commits/changelog se não houver
   data explícita)
3. Categoria: Sistema de Gestão / Automação de Processos / Ferramenta de
   Eficiência (proponha uma nova se nenhuma encaixar, com base no que o projeto
   realmente faz)
4. Papel da Able no projeto (infira pela estrutura do repo: é só backend? só
   automação de um fluxo específico? produto completo?)
5. Stack técnica real usada (linguagens, frameworks, infra — extraia de
   package.json/requirements/Dockerfile/configs, não invente)
6. Qual problema de negócio o projeto resolve — descreva com base no domínio do
   código e na documentação, mas pergunte para confirmar se a leitura está certa
7. O desafio técnico ou de escopo mais relevante do projeto — o que era
   genuinamente difícil aqui (escala, integração complexa, regra de negócio
   complicada, prazo, legado). Aponte evidência concreta do código para
   justificar essa escolha
8. O que foi construído como solução — resumo técnico de arquitetura/decisões
   principais
9. Resultados mensuráveis — SE não houver essa informação no projeto (normal,
   código não mostra métrica de negócio), me pergunte diretamente por números
   reais em vez de estimar ou inventar
10. Pergunte se existe depoimento de cliente utilizável
11. Assets visuais: liste o que já existe (screenshots de UI, dashboards,
    diagramas de arquitetura já documentados) e o que precisaria ser gerado

Ao final, me devolva tudo em Markdown simples, com um cabeçalho claro por campo
(não precisa ser o MDX final — isso eu fecho depois). Seja honesto sobre o que é
fato extraído do código vs. o que é inferência sua — marque inferências como tal.
```

### 5.2 Prompt de Pesquisa Aprofundada (caso 1: sistema de gestão/automação de Due Diligence)

Contexto real já levantado: o projeto é um sistema de gestão e automação de
processos de Due Diligence, produto de um cliente mas desenvolvido inteiramente
pela Able (backend, frontend, banco de dados, deploy — sozinho). Começou este ano,
está próximo do produto final mas ainda não em uso/produção. Problema original:
desorganização e fragmentação de documentos e processos de DD. Maior desafio:
decisões de workflow e validar uma interface simples e intuitiva. Ainda sem
depoimento de cliente. Use o prompt abaixo para aprofundar isso numa sessão de
pesquisa completa (com acesso ao projeto e, se disponível, pesquisa na web sobre o
domínio de Due Diligence).

```
Vou te dar contexto de um projeto que vai virar case study no portfólio da Able
Development, e preciso que você aprofunde a pesquisa em várias camadas antes de eu
escrever o case study final. Contexto inicial:

- É um sistema de gestão e automação de processos de Due Diligence.
- É um produto do cliente, mas foi desenvolvido inteiramente pela Able (uma única
  pessoa cuidou de backend, frontend, banco de dados e deploy).
- Começou a ser desenvolvido este ano, está próximo da versão final mas AINDA NÃO
  está em uso/produção — sem métricas reais de uso ainda.
- Problema original do cliente: desorganização e fragmentação de documentos e
  processos de due diligence, cada coisa guardada/gerenciada em um lugar diferente.
- Maior desafio até agora: decisões de arquitetura de workflow e validar uma
  interface simples e intuitiva para um processo que naturalmente é complexo.
- Ainda não existe depoimento de cliente.

Preciso que você investigue e aprofunde nas seguintes camadas:

CAMADA 1 — Domínio (Due Diligence):
Se você tiver acesso à web, pesquise como processos de due diligence tipicamente
funcionam (M&A, jurídico, financeiro — o que for aplicável), quais são as dores
mais comuns nesse processo (fragmentação de documentos, controle de acesso,
auditoria, prazos, comunicação entre partes) e como ferramentas existentes no
mercado (data rooms virtuais, VDRs, softwares de gestão de DD) resolvem isso hoje.
Isso vai me ajudar a posicionar o produto de forma informada, não genérica.

CAMADA 2 — Arquitetura técnica:
Se você tiver acesso ao código/repositório do projeto, levante: stack real
(linguagens, frameworks, banco de dados, infraestrutura de deploy), modelagem de
dados principal, como controle de acesso e permissões são tratados (crítico em
due diligence — dados sensíveis, múltiplas partes com níveis de acesso
diferentes), se há trilha de auditoria/log de ações, e qualquer consideração de
conformidade com a LGPD (o produto provavelmente lida com dados sensíveis de
processos societários/jurídicos no Brasil).

CAMADA 3 — Decisões de UX/workflow:
Este foi o ponto mais difícil segundo o que já sei. Aprofunde: quais são as etapas
do fluxo de due diligence que o sistema automatiza, quais telas/interações
resolvem a desorganização de documentos, e que decisões de design tornaram a
interface "simples e intuitiva" apesar da complexidade do processo por trás. Se
possível, descreva isso como uma progressão de decisões (o que foi tentado, o que
não funcionou, o que funcionou) — isso é o tipo de profundidade que separa um case
study raso de um que prova rigor de engenharia de verdade.

CAMADA 4 — Confidencialidade:
O produto pertence a um cliente. Pergunte diretamente: o nome do cliente pode ser
usado, ou precisa ser anonimizado? Se precisar, proponha 2-3 formas neutras de
descrever o cliente (ex: "escritório de assessoria em fusões e aquisições") sem
comprometer a confidencialidade nem soar genérico demais.

CAMADA 5 — Resultado honesto:
O produto ainda não está em produção. Não invente métricas de uso. Em vez disso,
me ajude a articular o valor qualitativo real: o que muda estruturalmente para
quem for usar isso versus o processo manual/fragmentado de antes. Se houver algo
mensurável só na comparação estrutural (ex: número de sistemas/planilhas/pastas
diferentes que o produto substitui), levante isso — é dado real, não estimativa
inventada.

Me devolva tudo organizado por camada, em Markdown, deixando claro o que é fato
levantado (do código, de documentos, de pesquisa) versus o que é uma pergunta em
aberto que só eu posso responder.
```
