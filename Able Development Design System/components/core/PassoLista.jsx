import React from 'react';
export function PassoLista({ items=[], tone='dark', style }) {
  const dark = tone==='dark';
  return <div style={{ display:'grid', ...style }}>
    {items.map((it,i)=> <div key={i} style={{ display:'grid', gridTemplateColumns:'44px 1fr', gap:14, alignItems:'baseline', padding:'18px 0', borderTop:'1px solid '+(dark?'var(--cor-grafite-borda)':'var(--cor-borda-sutil)') }}>
      <span style={{ fontWeight:600, fontVariantNumeric:'tabular-nums', color: dark?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)' }}>{String(i+1).padStart(2,'0')}</span>
      <p style={{ margin:0, fontSize:17, lineHeight:1.5, color: dark?'var(--cor-papel)':'var(--cor-tinta)' }}>{it.text}{it.note && <small style={{ display:'block', fontSize:15, marginTop:4, color: dark?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)' }}>{it.note}</small>}</p>
    </div>)}
  </div>;
}
