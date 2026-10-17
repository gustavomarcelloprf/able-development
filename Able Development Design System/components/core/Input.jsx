import React from 'react';
export function Input({ id, label, help, placeholder, value, defaultValue, onChange, type='text', tone='light', style }) {
  const [f, setF] = React.useState(false);
  const dark = tone==='dark';
  const uid = id || React.useId();
  return <div style={{ display:'flex', flexDirection:'column', gap:8, ...style }}>
    <label htmlFor={uid} style={{ fontSize:15, fontWeight:500, color: dark?'var(--cor-papel)':'var(--cor-tinta)' }}>{label}</label>
    <input id={uid} type={type} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={onChange} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{ fontFamily:'var(--fonte-familia)', fontSize:16, color: dark?'var(--cor-papel)':'var(--cor-tinta)', background: dark?'var(--cor-grafite)':'var(--cor-papel)', border:'1px solid '+(f ? (dark?'var(--cor-papel)':'var(--cor-tinta)') : (dark?'var(--cor-grafite-borda)':'var(--cor-borda-controle)')), borderRadius:'var(--raio-controle)', padding:'10px 12px', minHeight:'var(--alvo-toque)', width:'100%', boxSizing:'border-box', outline: f ? '2px solid '+(dark?'var(--cor-papel)':'var(--cor-tinta)') : 'none', outlineOffset:2 }} />
    {help && <span style={{ fontSize:13, lineHeight:1.4, color: dark?'var(--cor-grafite-texto-secundario)':'var(--cor-texto-secundario)' }}>{help}</span>}
  </div>;
}
