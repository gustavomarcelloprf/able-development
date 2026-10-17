import React from 'react';
export function NotaTecnica({ strong, children, style }) {
  return <div style={{ padding:'18px 20px', borderLeft:'3px solid var(--cor-tangelo)', background:'var(--cor-papel-hover)', borderRadius:'0 10px 10px 0', fontSize:15, lineHeight:1.5, color:'var(--cor-texto-secundario)', maxWidth:'70ch', ...style }}>
    {strong && <strong style={{ color:'var(--cor-tinta)', fontWeight:500 }}>{strong} </strong>}{children}
  </div>;
}
