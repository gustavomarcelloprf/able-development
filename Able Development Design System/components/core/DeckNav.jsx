import React from 'react';
function useHover(){const [h,setH]=React.useState(false);return [h,{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false)}];}
function NavBtn({ children, ...p }) { const [h,hp]=useHover(); return <button type="button" {...hp} {...p} style={{ fontFamily:'var(--fonte-familia)', fontSize:18, color:'var(--cor-tinta)', background: h&&!p.disabled?'var(--cor-papel-hover)':'var(--cor-papel)', border:'1px solid var(--cor-borda-controle)', borderRadius:'var(--raio-controle)', width:44, height:44, cursor: p.disabled?'default':'pointer', opacity: p.disabled?.35:1, transition:'background .25s var(--able-enter)' }}>{children}</button>; }
export function DeckNav({ index=0, total=1, onPrev, onNext, style }) {
  return <nav aria-label="Navegação de slides" style={{ display:'flex', alignItems:'center', gap:10, ...style }}>
    <NavBtn onClick={onPrev} disabled={index<=0} aria-label="Anterior">←</NavBtn>
    <NavBtn onClick={onNext} disabled={index>=total-1} aria-label="Próximo">→</NavBtn>
    <span style={{ fontSize:13, fontWeight:500, letterSpacing:'0.06em', fontVariantNumeric:'tabular-nums', color:'var(--cor-texto-secundario)', marginLeft:6 }}>{index+1} / {total}</span>
  </nav>;
}
