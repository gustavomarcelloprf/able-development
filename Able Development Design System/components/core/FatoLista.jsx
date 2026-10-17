import React from 'react';
export function FatoLista({ items=[], style }) {
  return <div style={{ display:'grid', ...style }}>
    {items.map((it,i)=> <div key={i} style={{ display:'grid', gridTemplateColumns:'24px 1fr', gap:16, padding:'20px 0', borderTop:'1px solid var(--cor-borda-sutil)', borderBottom: i===items.length-1?'1px solid var(--cor-borda-sutil)':0 }}>
      <span style={{ width:20, height:3, marginTop:11, background: it.yes?'var(--cor-tangelo)':'var(--cor-borda-controle)' }} />
      <p style={{ margin:0, fontSize:17, lineHeight:1.5, color:'var(--cor-texto-secundario)' }}>{it.strong && <strong style={{ fontWeight:500, color:'var(--cor-tinta)' }}>{it.strong} </strong>}{it.text}</p>
    </div>)}
  </div>;
}
