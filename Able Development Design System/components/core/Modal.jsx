import React from 'react';
import { Button } from './Button.jsx';
export function Modal({ title, children, primaryLabel='Confirmar', secondaryLabel='Cancelar', onPrimary, onSecondary, open=true, fixed=false, style }) {
  if (!open) return null;
  const veil = fixed ? { position:'fixed', inset:0, zIndex:50 } : { borderRadius:10, padding:'24px 16px', width:'100%', boxSizing:'border-box' };
  return <div style={{ background:'var(--veil)', display:'flex', alignItems:'center', justifyContent:'center', ...veil, ...style }}>
    <div role="dialog" aria-modal="true" style={{ background:'var(--cor-papel)', border:'1px solid var(--cor-borda-sutil)', borderRadius:'var(--raio-superficie)', padding:22, maxWidth:340, width:'100%', boxSizing:'border-box' }}>
      <p style={{ margin:0, fontSize:20, fontWeight:600, letterSpacing:'-0.015em', lineHeight:1.25, color:'var(--cor-tinta)' }}>{title}</p>
      <p style={{ margin:'10px 0 0', fontSize:15, lineHeight:1.5, color:'var(--cor-texto-secundario)' }}>{children}</p>
      <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:20 }}>
        <Button variant="secondary" onClick={onSecondary}>{secondaryLabel}</Button>
        <Button onClick={onPrimary}>{primaryLabel}</Button>
      </div>
    </div>
  </div>;
}
