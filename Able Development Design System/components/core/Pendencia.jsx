import React from 'react';
export function Pendencia({ children='Em aberto', tone='light', style }) {
  const dark = tone==='dark';
  return <span style={{ display:'inline-flex', alignItems:'center', gap:10, flex:'none', whiteSpace:'nowrap', fontSize:13, lineHeight:1.4, fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', color: dark?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)', border:'1px dashed '+(dark?'var(--cor-grafite-borda)':'var(--cor-borda-controle)'), borderRadius:14, padding:'7px 14px', ...style }}>
    <span style={{ width:20, height:3, background:'var(--cor-tangelo)', flex:'none' }} />{children}</span>;
}
