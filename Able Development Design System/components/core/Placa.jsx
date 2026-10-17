import React from 'react';
export function Placa({ label, value, highlight, children, style }) {
  return <div style={{ background:'var(--cor-tinta)', color:'var(--cor-papel)', borderRadius:16, padding:'30px 24px', ...style }}>
    {label && <div style={{ fontSize:13, lineHeight:1.4, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--cor-tangelo)', marginBottom:14 }}>{label}</div>}
    <div style={{ fontSize:'clamp(2.2rem, 7vw, 3.2rem)', lineHeight:1.1, letterSpacing:'-0.02em', fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{value}{highlight && <em style={{ fontStyle:'normal', color:'var(--cor-tangelo)' }}>{highlight}</em>}</div>
    {children && <p style={{ margin:'12px 0 0', fontSize:15, lineHeight:1.5, color:'var(--cor-papel)', opacity:.82, maxWidth:'52ch' }}>{children}</p>}
  </div>;
}
