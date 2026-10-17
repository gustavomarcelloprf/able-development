import React from 'react';
export function Card({ label, title, children, dashed=false, tone='light', style }) {
  const dark = tone==='dark';
  return <div style={{ border:'1px '+(dashed?'dashed var(--cor-borda-controle)':'solid '+(dark?'var(--cor-grafite-borda)':'var(--cor-borda-sutil)')), borderRadius:'var(--raio-superficie)', padding:'26px 22px', background: dark?'var(--cor-grafite)':'var(--cor-papel)', color: dark?'var(--cor-papel)':'var(--cor-tinta)', boxSizing:'border-box', ...style }}>
    {label && <div style={{ fontSize:13, lineHeight:1.4, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color: dark?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)', marginBottom:12 }}>{label}</div>}
    {title && <h3 style={{ margin:'0 0 10px', fontSize:22, lineHeight:1.35, letterSpacing:'-0.01em', fontWeight:600, textWrap:'balance' }}>{title}</h3>}
    {children && <div style={{ fontSize:15, lineHeight:1.5, color: dark?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)' }}>{children}</div>}
  </div>;
}
