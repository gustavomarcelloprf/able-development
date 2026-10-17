import React from 'react';
export function Comparacao({ a, b, variant='default', direction='row', style }) {
  const bloco = { borderRadius:'var(--raio-superficie)', padding:'24px 26px', display:'flex', flexDirection:'column', justifyContent:'flex-start', flex:1, minWidth:0, boxSizing:'border-box' };
  const tag = { fontSize:13, lineHeight:1.4, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14 };
  const neg = variant==='voz';
  return <div style={{ display:'flex', flexDirection: direction==='column'?'column':'row', gap:16, ...style }}>
    <div style={{ ...bloco, background:'var(--cor-grafite)', color:'var(--cor-papel)' }}><div style={{ ...tag, color:'var(--cor-grafite-texto-secundario)' }}>{a.tag}</div><p style={{ margin:0, fontSize:20, lineHeight:1.3, letterSpacing:'-0.015em', fontWeight:600, textWrap:'balance' }}>{a.text}</p></div>
    <div style={{ ...bloco, background: neg?'var(--cor-papel-hover)':'var(--cor-papel)', border: neg?0:'1px solid var(--cor-borda-controle)', color: neg?'var(--cor-texto-secundario)':'var(--cor-tinta)' }}><div style={{ ...tag, color:'var(--cor-texto-secundario)' }}>{b.tag}</div><p style={{ margin:0, fontSize:20, lineHeight:1.3, letterSpacing:'-0.015em', fontWeight:400, textWrap:'balance' }}>{b.text}</p></div>
  </div>;
}
