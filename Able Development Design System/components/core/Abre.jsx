import React from 'react';
export function Abre({ children, tone='light', size='deck', style }) {
  const w = size==='doc'?14:size==='social'?44:36, h = size==='doc'?2:size==='social'?4:3;
  return <div style={{ display:'flex', alignItems:'center', gap: size==='doc'?10:14, flex:'none', ...style }}>
    <span style={{ width:w, height:h, background:'var(--cor-tangelo)', flex:'none' }} />
    <span style={{ fontSize:13, lineHeight:1.4, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', whiteSpace:'nowrap', color: tone==='dark'?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)' }}>{children}</span>
  </div>;
}
