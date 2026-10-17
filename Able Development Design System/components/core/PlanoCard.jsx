import React from 'react';
export function PlanoCard({ name, total, unit, items=[], style }) {
  return <div style={{ border:'1px solid var(--cor-borda-sutil)', borderRadius:16, overflow:'hidden', background:'var(--cor-papel)', display:'flex', flexDirection:'column', ...style }}>
    <header style={{ padding:22, background:'var(--cor-grafite)', color:'var(--cor-papel)' }}>
      <div style={{ fontSize:13, lineHeight:1.4, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--cor-grafite-texto-secundario)' }}>{name}</div>
      <div style={{ marginTop:8, fontSize:'clamp(1.9rem, 6vw, 2.4rem)', lineHeight:1.1, fontWeight:600, letterSpacing:'-0.02em', fontVariantNumeric:'tabular-nums' }}>{total}{unit && <small style={{ fontSize:'0.45em', fontWeight:500, color:'var(--cor-grafite-texto-secundario)', letterSpacing:0 }}>{unit}</small>}</div>
    </header>
    <ul style={{ listStyle:'none', margin:0, padding:'10px 22px 18px' }}>
      {items.map((it,i)=> <li key={i} style={{ display:'flex', justifyContent:'space-between', gap:16, padding:'12px 0', borderTop: i? '1px solid var(--cor-borda-sutil)':0, fontSize:15, lineHeight:1.5 }}>
        <span style={{ color:'var(--cor-texto-secundario)' }}>{it.label}</span>
        <span style={{ fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap', fontWeight: it.absent?400:500, color: it.absent?'var(--cor-texto-secundario)':'var(--cor-tinta)' }}>{it.value}</span>
      </li>)}
    </ul>
  </div>;
}
