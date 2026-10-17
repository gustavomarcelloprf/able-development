import React from 'react';
export function BrandMark({ variant='logo', height=40, assetsBase='assets', style }) {
  const file = { logo:'logo.svg', 'logo-inverted':'logo-invertido.svg', symbol:'simbolo.svg', tile:'icone-app.svg' }[variant] || 'logo.svg';
  return <img src={assetsBase.replace(/\/$/,'')+'/'+file} alt={variant==='symbol'?'':'Able Development'} style={{ height, width:'auto', display:'block', borderRadius: variant==='tile'? height*0.22 : 0, ...style }} />;
}
