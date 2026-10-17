const { Abre, Card, Pendencia, Button, LinkDoc, Input, Modal, BrandMark, Comparacao } = window.AbleDevelopmentDesignSystem_544bee;
const A = '../../assets';
function useReveal(){ React.useEffect(()=>{ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);} }),{threshold:.15}); document.querySelectorAll('.rv').forEach(n=>io.observe(n)); return ()=>io.disconnect(); },[]); }
function Eyebrow({children}){ return <span className="mono" style={{display:'block',marginBottom:20}}><span style={{display:'inline-block',width:14,height:2,background:'var(--cor-tangelo)',marginRight:10,verticalAlign:3}}/>{children}</span>; }
function Abertura({n,titulo,desc,cor}){ return <div className="rv" style={{marginBottom:'6vh'}}><Eyebrow>{n}</Eyebrow><h2 className="display-xl" style={cor?{color:cor}:null}>{titulo}</h2>{desc&&<p className="desc">{desc}</p>}</div>; }
function Swatch({nome,hex,dark}){ return <div style={{border:'1px solid '+(dark?'var(--cor-grafite-borda)':'var(--cor-borda-sutil)'),borderRadius:10,overflow:'hidden'}}><div style={{height:88,background:hex}}/><div style={{padding:'12px 14px 14px'}}><p style={{margin:'0 0 2px',fontSize:14,fontWeight:500}}>{nome}</p><span className="mono" style={{letterSpacing:0,textTransform:'none'}}>{hex}</span></div></div>; }
function Regra({r,v}){ return <div style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:16,padding:'16px 0',borderTop:'1px solid var(--cor-borda-sutil)',fontSize:16}}><span className="mono" style={{paddingTop:4}}>{r}</span><span>{v}</span></div>; }

function IdentidadePage(){
  useReveal();
  const [modal,setModal]=React.useState(false);
  const CLARO=[['papel','#F5F4F1'],['papel-hover','#EBEAE6'],['borda-sutil','#DEDCD6'],['borda-controle','#8A867F'],['texto-secundário','#5F5C56'],['tinta','#1D1C1A']];
  const ESCURO=[['grafite','#2A2927'],['grafite-hover','#353431'],['grafite-borda','#8F8C85'],['grafite-texto-secundário','#A9A59D']];
  return <div>
    <header style={{maxWidth:1020,margin:'0 auto',padding:'24px 24px 0',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><span className="mono">Identidade Visual · Able Development</span><span className="mono">v3 · apple-minimal</span></header>

    <section className="momento"><div className="wrap">
      <Abertura n="01 · Framework" titulo="Sistemas complexos não precisam ser difíceis de usar." desc="Essa é a tese que guia todo projeto da Able: engenharia robusta por dentro, simplicidade por fora. Toda a identidade deriva dela, da paleta ao movimento."/>
      <h3 className="sub">Plataforma de marca</h3>
      <div className="g2 rv">
        <Card label="Propósito" title="Tornar sistemas complexos simples de usar.">A razão de existir é a própria tese: pegar a complexidade real de um negócio ou processo e entregar algo que qualquer pessoa opere sem fricção.</Card>
        <Card label="Missão" title="Projetar e construir software sob medida, com o ciclo completo em um só time.">Sites, SaaS, plataformas e sistemas internos, da arquitetura ao deploy, sem fragmentar a entrega entre equipes desconectadas.</Card>
        <Card label={<span style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>Visão <Pendencia>em aberto</Pendencia></span>} title="Olhar para frente, não para trás.">Um enunciado formal de visão ainda não existe, e redigi-lo é decisão do fundador, então este documento não inventa um.</Card>
        <Card label="Valores"><ul style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:12,fontSize:16,color:'var(--cor-tinta)'}}><li><strong>Precisão.</strong> Preferimos dizer menos e garantir que cada palavra seja verdadeira.</li><li><strong>Simplicidade sem superficialidade.</strong></li><li><strong>Entrega inteira.</strong></li><li><strong>Trabalho acima do adjetivo.</strong></li></ul></Card>
      </div>
      <h3 className="sub">Três traços</h3>
      <div className="g3 rv">{[['Direta','Dizemos o que o sistema faz, não o que o mercado quer ouvir. Frases curtas, verbos ativos.'],['Confiante','O trabalho fala mais alto que o adjetivo. Nenhum superlativo genérico.'],['Precisa','Preferimos dizer menos e garantir que cada palavra seja verdadeira.']].map(([t,d])=><div key={t}><p style={{fontSize:26,fontWeight:600,letterSpacing:'-.015em',margin:'0 0 8px'}}>{t}</p><p style={{fontSize:16,color:'var(--cor-texto-secundario)',margin:0}}>{d}</p></div>)}</div>
      <h3 className="sub">Tom de voz nos contextos reais</h3>
      <div className="mono" style={{marginBottom:12}}>Erro de sistema (UI)</div>
      <div className="rv"><Comparacao variant="voz" a={{tag:'Assim soamos',text:'“Não foi possível salvar: o servidor não respondeu. Suas alterações estão preservadas neste navegador. Tente novamente.”'}} b={{tag:'Assim não soamos',text:'“Ops! Algo deu muito errado… :( Desculpe o transtorno!”'}}/></div>
    </div></section>

    <section className="momento suave"><div className="wrap">
      <Abertura n="02 · Princípio visual" titulo={<>Minimalismo, com <span style={{textDecoration:'underline',textDecorationColor:'var(--cor-tangelo)',textDecorationThickness:'.055em',textUnderlineOffset:'.14em'}}>um acento</span>, contado.</>} desc="A base é 100% neutra, e a hierarquia vem de peso tipográfico, espaçamento e contraste tonal, nunca de cor. O tangelo percorre o documento como marcação: sempre como detalhe fino, nunca como fundo."/>
      <div className="rv" style={{border:'1px solid var(--cor-borda-sutil)',borderRadius:10,padding:20,background:'var(--cor-papel-hover)'}}><div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:8,height:64}}>{Array.from({length:12}).map((_,i)=><div key={i} style={{background:'rgba(29,28,26,.06)',borderRadius:4}}/>)}</div><div className="mono" style={{marginTop:12}}>12 colunas · gutter 8 px · espaçamento 8 → 16 → 24 → 32 → 48 → 64 → 96 → 128 → 192</div></div>
      <h3 className="sub">Composição e hierarquia espacial</h3>
      <div className="rv"><Regra r="Alinhamento" v="À esquerda por padrão. Texto centrado só existe em momentos de display isolados."/><Regra r="Hierarquia por espaço" v="Quanto mais alta a hierarquia, mais respiro ao redor."/><Regra r="Uma ideia por bloco" v="Cada momento da composição sustenta um argumento."/><Regra r="Largura de leitura" v="Texto corrido vai até cerca de 65 caracteres por linha."/><Regra r="Números alinham" v="Dado tabular usa algarismos de largura fixa."/></div>
    </div></section>

    <section className="momento"><div className="wrap">
      <Abertura n="03 · Paleta" titulo="Papel, tinta, grafite." desc="Nunca preto ou branco puros. São seis tons para o contexto claro, quatro para o escuro e um único acento de detalhe, e todo par de texto e fundo foi aferido por script."/>
      <div className="rv" style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:12}}>{CLARO.map(([n,h])=><Swatch key={n} nome={n} hex={h}/>)}</div>
      <div className="rv" style={{display:'flex',gap:24,alignItems:'flex-start',marginTop:'5vh'}}><div style={{width:210,flex:'none'}}><Swatch nome="tangelo · acento" hex="#FB4D00"/></div><p style={{margin:0,maxWidth:440,fontSize:16,color:'var(--cor-texto-secundario)'}}>O único acento do sistema, por decisão do fundador. Entra como marcação e detalhe: o traço que abre cada seção, os links, os valores em destaque, um sublinhado, um ponto, um traço fino. Nunca vira fundo, nunca substitui a base neutra e nunca entra no símbolo.</p></div>
    </div></section>
    <section className="momento escuro"><div className="wrap">
      <Abertura n="03 · Paleta · contexto escuro" titulo="O mesmo sistema, sobre grafite." cor="var(--cor-papel)"/>
      <div className="rv" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>{ESCURO.map(([n,h])=><Swatch key={n} nome={n} hex={h} dark/>)}</div>
    </div></section>

    <section className="momento suave"><div className="wrap">
      <Abertura n="04 · Símbolo" titulo="Abertura. O símbolo." desc="Aprovado pelo fundador como definitivo. É uma silhueta única: sem container, sem letra, sem vértice, sem aresta reta."/>
      <div className="rv" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:88,padding:'5vh 0 2vh'}}><BrandMark variant="symbol" height={230} assetsBase={A}/><div style={{maxWidth:420,fontSize:16,color:'var(--cor-texto-secundario)'}}><span style={{display:'block',fontSize:24,fontWeight:600,letterSpacing:'-.015em',color:'var(--cor-tinta)',marginBottom:10}}>Abertura</span>Três lâminas curvas giram em volta de um centro vazio, como o diafragma de uma câmera abrindo. A complexidade gira em volta; o que fica nítido é a abertura no meio.</div></div>
    </div></section>

    <section className="momento escuro"><div className="wrap">
      <Abertura n="05 · Logo" titulo="Um asset, não um estilo de texto." cor="var(--cor-papel)" desc="Símbolo à esquerda, nome à direita, sempre sobre um campo de cor único. Linha única, peso único, uma cor."/>
      <div className="rv" style={{display:'flex',justifyContent:'center',padding:'6vh 0'}}><BrandMark variant="logo-inverted" height={100} assetsBase={A}/></div>
    </div></section>

    <section className="momento suave"><div className="wrap">
      <Abertura n="06 · Tipografia" titulo="Switzer. Família única."/>
      <div className="rv" style={{fontSize:'clamp(40px,7vw,80px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1}}>Complexo por dentro,<br/>simples por fora.</div>
      <div className="rv" style={{display:'flex',gap:48,marginTop:'5vh',fontSize:16}}>{[[400,'Regular','texto corrido'],[500,'Médio','UI, labels'],[600,'Semibold','títulos, display']].map(([w,n,u])=><div key={w}><strong style={{fontWeight:w,display:'block',fontSize:22}}>{n}</strong><span style={{color:'var(--cor-texto-secundario)'}}>{w} · {u}</span></div>)}</div>
    </div></section>

    <section className="momento"><div className="wrap">
      <Abertura n="07 · Interface" titulo="A marca vira produto aqui." desc="Elevação vem de borda e contraste, nunca de sombra; hierarquia vem de peso e espaço; o acento marca a navegação, nunca a superfície."/>
      <div className="g3 rv" style={{gap:14,alignItems:'stretch'}}>
        <div style={{border:'1px solid var(--cor-borda-sutil)',borderRadius:14,padding:22,display:'flex',flexDirection:'column',gap:14,alignItems:'flex-start'}}><Button>Publicar projeto</Button><Button variant="secondary">Cancelar</Button><LinkDoc href="#" onClick={e=>e.preventDefault()}>Ver histórico de deploys</LinkDoc><p style={{margin:'auto 0 0',fontSize:14,color:'var(--cor-texto-secundario)'}}><strong style={{color:'var(--cor-tinta)',fontWeight:500}}>Botão e link.</strong> Cantos de 8 px, peso médio, alvo de toque de 44 px.</p></div>
        <div style={{border:'1px solid var(--cor-borda-sutil)',borderRadius:14,padding:22,display:'flex',flexDirection:'column',gap:14}}><Input label="Nome do projeto" placeholder="ex.: sistema-juridico" help="Minúsculas e hífens; vira o identificador do deploy."/><p style={{margin:'auto 0 0',fontSize:14,color:'var(--cor-texto-secundario)'}}><strong style={{color:'var(--cor-tinta)',fontWeight:500}}>Input.</strong> Label sempre visível; no foco, borda escura e contorno.</p></div>
        <div style={{border:'1px solid var(--cor-borda-sutil)',borderRadius:14,padding:22,display:'flex',flexDirection:'column',gap:14}}><Button variant="secondary" onClick={()=>setModal(true)}>Arquivar projeto</Button><p style={{margin:'auto 0 0',fontSize:14,color:'var(--cor-texto-secundario)'}}><strong style={{color:'var(--cor-tinta)',fontWeight:500}}>Modal.</strong> Papel com borda sutil sobre véu escuro; a ação principal nomeada pelo efeito.</p></div>
      </div>
      <div className="rv" style={{marginTop:'6vh'}}><Regra r="Raios" v="Dois raios, sem exceção: 8 px em controles, 14 px em superfícies."/><Regra r="Foco e teclado" v="Todo elemento interativo tem foco visível e funciona por teclado."/><Regra r="Toque" v="Todo controle tem área de toque de pelo menos 44 por 44 px."/></div>
    </div></section>
    <Modal open={modal} fixed title="Arquivar projeto?" primaryLabel="Arquivar" onPrimary={()=>setModal(false)} onSecondary={()=>setModal(false)}>O projeto sai da lista ativa. Nada é apagado, e dá para restaurar quando quiser.</Modal>
  </div>;
}
window.IdentidadePage = IdentidadePage;