import React from 'react';
function useHover(){const [h,setH]=React.useState(false);return [h,{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false)}];}
const eyebrowless = { fontFamily:'var(--fonte-familia)', fontSize:16, fontWeight:500, lineHeight:1.2, borderRadius:'var(--raio-controle)', padding:'10px 18px', minHeight:'var(--alvo-toque)', cursor:'pointer', transition:'background var(--duracao-hover) var(--able-enter), border-color var(--duracao-hover) var(--able-enter)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, whiteSpace:'nowrap' };
export function Button({ variant='primary', tone='light', disabled=false, children, style, type='button', ...rest }) {
  const [h, hp] = useHover();
  let s;
  if (tone==='dark') s = { color:'var(--cor-papel)', background: h ? 'var(--cor-grafite-hover)' : 'transparent', border:'1px solid var(--cor-grafite-borda)' };
  else if (variant==='primary') s = { color:'var(--cor-papel)', background: h ? 'var(--cor-grafite)' : 'var(--cor-tinta)', border:'1px solid '+(h?'var(--cor-grafite)':'var(--cor-tinta)') };
  else s = { color:'var(--cor-tinta)', background: h ? 'var(--cor-papel-hover)' : 'transparent', border:'1px solid var(--cor-borda-controle)' };
  if (disabled) s = { ...s, opacity:.35, cursor:'default' };
  return <button type={type} disabled={disabled} {...hp} {...rest} style={{ ...eyebrowless, ...s, ...style }}>{children}</button>;
}
