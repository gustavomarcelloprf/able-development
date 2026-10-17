import React from 'react';
function useHover(){const [h,setH]=React.useState(false);return [h,{onMouseEnter:()=>setH(true),onMouseLeave:()=>setH(false)}];}
export function LinkDoc({ href='#', inline=false, children, style, ...rest }) {
  const [h, hp] = useHover();
  return <a href={href} {...hp} {...rest} style={{ display: inline?'inline':'inline-block', padding: inline?0:'12px 0', color:'var(--cor-tangelo)', fontSize: inline?'inherit':16, textDecoration:'underline', textDecorationColor:'var(--cor-tangelo)', textUnderlineOffset:3, textDecorationThickness: h?2:1, whiteSpace: inline?'normal':'nowrap', ...style }}>{children}</a>;
}
