/* @ds-bundle: {"format":4,"namespace":"AbleDevelopmentDesignSystem_544bee","components":[{"name":"Abre","sourcePath":"components/core/Abre.jsx"},{"name":"BrandMark","sourcePath":"components/core/BrandMark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Comparacao","sourcePath":"components/core/Comparacao.jsx"},{"name":"DeckNav","sourcePath":"components/core/DeckNav.jsx"},{"name":"FatoLista","sourcePath":"components/core/FatoLista.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"LinkDoc","sourcePath":"components/core/LinkDoc.jsx"},{"name":"Modal","sourcePath":"components/core/Modal.jsx"},{"name":"NotaTecnica","sourcePath":"components/core/NotaTecnica.jsx"},{"name":"PassoLista","sourcePath":"components/core/PassoLista.jsx"},{"name":"Pendencia","sourcePath":"components/core/Pendencia.jsx"},{"name":"Placa","sourcePath":"components/core/Placa.jsx"},{"name":"PlanoCard","sourcePath":"components/core/PlanoCard.jsx"}],"sourceHashes":{"components/core/Abre.jsx":"d0c84c4bff3f","components/core/BrandMark.jsx":"a81e80a8e6b3","components/core/Button.jsx":"7238e65ea816","components/core/Card.jsx":"035766736945","components/core/Comparacao.jsx":"585247444541","components/core/DeckNav.jsx":"35cc6e96d5e3","components/core/FatoLista.jsx":"5902e30aa29c","components/core/Input.jsx":"1722dee19f36","components/core/LinkDoc.jsx":"8060ce8c98e0","components/core/Modal.jsx":"bb4ae2cfa725","components/core/NotaTecnica.jsx":"c0325fd88f32","components/core/PassoLista.jsx":"30e94d9ce00c","components/core/Pendencia.jsx":"d6cf8d7cb399","components/core/Placa.jsx":"423965739310","components/core/PlanoCard.jsx":"d42220d4ab16","ui_kits/identidade/Screens.jsx":"619dc2842165","ui_kits/proposta/Slides.jsx":"3004232c801c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AbleDevelopmentDesignSystem_544bee = window.AbleDevelopmentDesignSystem_544bee || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Abre.jsx
try { (() => {
function Abre({
  children,
  tone = 'light',
  size = 'deck',
  style
}) {
  const w = size === 'doc' ? 14 : size === 'social' ? 44 : 36,
    h = size === 'doc' ? 2 : size === 'social' ? 4 : 3;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: size === 'doc' ? 10 : 14,
      flex: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: w,
      height: h,
      background: 'var(--cor-tangelo)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: tone === 'dark' ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)'
    }
  }, children));
}
Object.assign(__ds_scope, { Abre });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Abre.jsx", error: String((e && e.message) || e) }); }

// components/core/BrandMark.jsx
try { (() => {
function BrandMark({
  variant = 'logo',
  height = 40,
  assetsBase = 'assets',
  style
}) {
  const file = {
    logo: 'logo.svg',
    'logo-inverted': 'logo-invertido.svg',
    symbol: 'simbolo.svg',
    tile: 'icone-app.svg'
  }[variant] || 'logo.svg';
  return /*#__PURE__*/React.createElement("img", {
    src: assetsBase.replace(/\/$/, '') + '/' + file,
    alt: variant === 'symbol' ? '' : 'Able Development',
    style: {
      height,
      width: 'auto',
      display: 'block',
      borderRadius: variant === 'tile' ? height * 0.22 : 0,
      ...style
    }
  });
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHover() {
  const [h, setH] = React.useState(false);
  return [h, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }];
}
const eyebrowless = {
  fontFamily: 'var(--fonte-familia)',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.2,
  borderRadius: 'var(--raio-controle)',
  padding: '10px 18px',
  minHeight: 'var(--alvo-toque)',
  cursor: 'pointer',
  transition: 'background var(--duracao-hover) var(--able-enter), border-color var(--duracao-hover) var(--able-enter)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  whiteSpace: 'nowrap'
};
function Button({
  variant = 'primary',
  tone = 'light',
  disabled = false,
  children,
  style,
  type = 'button',
  ...rest
}) {
  const [h, hp] = useHover();
  let s;
  if (tone === 'dark') s = {
    color: 'var(--cor-papel)',
    background: h ? 'var(--cor-grafite-hover)' : 'transparent',
    border: '1px solid var(--cor-grafite-borda)'
  };else if (variant === 'primary') s = {
    color: 'var(--cor-papel)',
    background: h ? 'var(--cor-grafite)' : 'var(--cor-tinta)',
    border: '1px solid ' + (h ? 'var(--cor-grafite)' : 'var(--cor-tinta)')
  };else s = {
    color: 'var(--cor-tinta)',
    background: h ? 'var(--cor-papel-hover)' : 'transparent',
    border: '1px solid var(--cor-borda-controle)'
  };
  if (disabled) s = {
    ...s,
    opacity: .35,
    cursor: 'default'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled
  }, hp, rest, {
    style: {
      ...eyebrowless,
      ...s,
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  label,
  title,
  children,
  dashed = false,
  tone = 'light',
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px ' + (dashed ? 'dashed var(--cor-borda-controle)' : 'solid ' + (dark ? 'var(--cor-grafite-borda)' : 'var(--cor-borda-sutil)')),
      borderRadius: 'var(--raio-superficie)',
      padding: '26px 22px',
      background: dark ? 'var(--cor-grafite)' : 'var(--cor-papel)',
      color: dark ? 'var(--cor-papel)' : 'var(--cor-tinta)',
      boxSizing: 'border-box',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: dark ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)',
      marginBottom: 12
    }
  }, label), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 10px',
      fontSize: 22,
      lineHeight: 1.35,
      letterSpacing: '-0.01em',
      fontWeight: 600,
      textWrap: 'balance'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: dark ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)'
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Comparacao.jsx
try { (() => {
function Comparacao({
  a,
  b,
  variant = 'default',
  direction = 'row',
  style
}) {
  const bloco = {
    borderRadius: 'var(--raio-superficie)',
    padding: '24px 26px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    minWidth: 0,
    boxSizing: 'border-box'
  };
  const tag = {
    fontSize: 13,
    lineHeight: 1.4,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 14
  };
  const neg = variant === 'voz';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: direction === 'column' ? 'column' : 'row',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...bloco,
      background: 'var(--cor-grafite)',
      color: 'var(--cor-papel)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tag,
      color: 'var(--cor-grafite-texto-secundario)'
    }
  }, a.tag), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
      fontWeight: 600,
      textWrap: 'balance'
    }
  }, a.text)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...bloco,
      background: neg ? 'var(--cor-papel-hover)' : 'var(--cor-papel)',
      border: neg ? 0 : '1px solid var(--cor-borda-controle)',
      color: neg ? 'var(--cor-texto-secundario)' : 'var(--cor-tinta)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...tag,
      color: 'var(--cor-texto-secundario)'
    }
  }, b.tag), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
      fontWeight: 400,
      textWrap: 'balance'
    }
  }, b.text)));
}
Object.assign(__ds_scope, { Comparacao });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Comparacao.jsx", error: String((e && e.message) || e) }); }

// components/core/DeckNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHover() {
  const [h, setH] = React.useState(false);
  return [h, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }];
}
function NavBtn({
  children,
  ...p
}) {
  const [h, hp] = useHover();
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button"
  }, hp, p, {
    style: {
      fontFamily: 'var(--fonte-familia)',
      fontSize: 18,
      color: 'var(--cor-tinta)',
      background: h && !p.disabled ? 'var(--cor-papel-hover)' : 'var(--cor-papel)',
      border: '1px solid var(--cor-borda-controle)',
      borderRadius: 'var(--raio-controle)',
      width: 44,
      height: 44,
      cursor: p.disabled ? 'default' : 'pointer',
      opacity: p.disabled ? .35 : 1,
      transition: 'background .25s var(--able-enter)'
    }
  }), children);
}
function DeckNav({
  index = 0,
  total = 1,
  onPrev,
  onNext,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Navega\xE7\xE3o de slides",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement(NavBtn, {
    onClick: onPrev,
    disabled: index <= 0,
    "aria-label": "Anterior"
  }, "\u2190"), /*#__PURE__*/React.createElement(NavBtn, {
    onClick: onNext,
    disabled: index >= total - 1,
    "aria-label": "Pr\xF3ximo"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: '0.06em',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--cor-texto-secundario)',
      marginLeft: 6
    }
  }, index + 1, " / ", total));
}
Object.assign(__ds_scope, { DeckNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DeckNav.jsx", error: String((e && e.message) || e) }); }

// components/core/FatoLista.jsx
try { (() => {
function FatoLista({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      gap: 16,
      padding: '20px 0',
      borderTop: '1px solid var(--cor-borda-sutil)',
      borderBottom: i === items.length - 1 ? '1px solid var(--cor-borda-sutil)' : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 3,
      marginTop: 11,
      background: it.yes ? 'var(--cor-tangelo)' : 'var(--cor-borda-controle)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      lineHeight: 1.5,
      color: 'var(--cor-texto-secundario)'
    }
  }, it.strong && /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500,
      color: 'var(--cor-tinta)'
    }
  }, it.strong, " "), it.text))));
}
Object.assign(__ds_scope, { FatoLista });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FatoLista.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  id,
  label,
  help,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  tone = 'light',
  style
}) {
  const [f, setF] = React.useState(false);
  const dark = tone === 'dark';
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: dark ? 'var(--cor-papel)' : 'var(--cor-tinta)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    id: uid,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      fontFamily: 'var(--fonte-familia)',
      fontSize: 16,
      color: dark ? 'var(--cor-papel)' : 'var(--cor-tinta)',
      background: dark ? 'var(--cor-grafite)' : 'var(--cor-papel)',
      border: '1px solid ' + (f ? dark ? 'var(--cor-papel)' : 'var(--cor-tinta)' : dark ? 'var(--cor-grafite-borda)' : 'var(--cor-borda-controle)'),
      borderRadius: 'var(--raio-controle)',
      padding: '10px 12px',
      minHeight: 'var(--alvo-toque)',
      width: '100%',
      boxSizing: 'border-box',
      outline: f ? '2px solid ' + (dark ? 'var(--cor-papel)' : 'var(--cor-tinta)') : 'none',
      outlineOffset: 2
    }
  }), help && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      lineHeight: 1.4,
      color: dark ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)'
    }
  }, help));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/LinkDoc.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHover() {
  const [h, setH] = React.useState(false);
  return [h, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }];
}
function LinkDoc({
  href = '#',
  inline = false,
  children,
  style,
  ...rest
}) {
  const [h, hp] = useHover();
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, hp, rest, {
    style: {
      display: inline ? 'inline' : 'inline-block',
      padding: inline ? 0 : '12px 0',
      color: 'var(--cor-tangelo)',
      fontSize: inline ? 'inherit' : 16,
      textDecoration: 'underline',
      textDecorationColor: 'var(--cor-tangelo)',
      textUnderlineOffset: 3,
      textDecorationThickness: h ? 2 : 1,
      whiteSpace: inline ? 'normal' : 'nowrap',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { LinkDoc });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LinkDoc.jsx", error: String((e && e.message) || e) }); }

// components/core/Modal.jsx
try { (() => {
function Modal({
  title,
  children,
  primaryLabel = 'Confirmar',
  secondaryLabel = 'Cancelar',
  onPrimary,
  onSecondary,
  open = true,
  fixed = false,
  style
}) {
  if (!open) return null;
  const veil = fixed ? {
    position: 'fixed',
    inset: 0,
    zIndex: 50
  } : {
    borderRadius: 10,
    padding: '24px 16px',
    width: '100%',
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--veil)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...veil,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      background: 'var(--cor-papel)',
      border: '1px solid var(--cor-borda-sutil)',
      borderRadius: 'var(--raio-superficie)',
      padding: 22,
      maxWidth: 340,
      width: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.25,
      color: 'var(--cor-tinta)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--cor-texto-secundario)'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: onSecondary
  }, secondaryLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: onPrimary
  }, primaryLabel))));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Modal.jsx", error: String((e && e.message) || e) }); }

// components/core/NotaTecnica.jsx
try { (() => {
function NotaTecnica({
  strong,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderLeft: '3px solid var(--cor-tangelo)',
      background: 'var(--cor-papel-hover)',
      borderRadius: '0 10px 10px 0',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--cor-texto-secundario)',
      maxWidth: '70ch',
      ...style
    }
  }, strong && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cor-tinta)',
      fontWeight: 500
    }
  }, strong, " "), children);
}
Object.assign(__ds_scope, { NotaTecnica });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NotaTecnica.jsx", error: String((e && e.message) || e) }); }

// components/core/PassoLista.jsx
try { (() => {
function PassoLista({
  items = [],
  tone = 'dark',
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '44px 1fr',
      gap: 14,
      alignItems: 'baseline',
      padding: '18px 0',
      borderTop: '1px solid ' + (dark ? 'var(--cor-grafite-borda)' : 'var(--cor-borda-sutil)')
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      color: dark ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      lineHeight: 1.5,
      color: dark ? 'var(--cor-papel)' : 'var(--cor-tinta)'
    }
  }, it.text, it.note && /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: 15,
      marginTop: 4,
      color: dark ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)'
    }
  }, it.note)))));
}
Object.assign(__ds_scope, { PassoLista });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PassoLista.jsx", error: String((e && e.message) || e) }); }

// components/core/Pendencia.jsx
try { (() => {
function Pendencia({
  children = 'Em aberto',
  tone = 'light',
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      flex: 'none',
      whiteSpace: 'nowrap',
      fontSize: 13,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: dark ? 'var(--cor-grafite-texto-secundario)' : 'var(--cor-texto-secundario)',
      border: '1px dashed ' + (dark ? 'var(--cor-grafite-borda)' : 'var(--cor-borda-controle)'),
      borderRadius: 14,
      padding: '7px 14px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 3,
      background: 'var(--cor-tangelo)',
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Pendencia });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pendencia.jsx", error: String((e && e.message) || e) }); }

// components/core/Placa.jsx
try { (() => {
function Placa({
  label,
  value,
  highlight,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cor-tinta)',
      color: 'var(--cor-papel)',
      borderRadius: 16,
      padding: '30px 24px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--cor-tangelo)',
      marginBottom: 14
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value, highlight && /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'normal',
      color: 'var(--cor-tangelo)'
    }
  }, highlight)), children && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--cor-papel)',
      opacity: .82,
      maxWidth: '52ch'
    }
  }, children));
}
Object.assign(__ds_scope, { Placa });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Placa.jsx", error: String((e && e.message) || e) }); }

// components/core/PlanoCard.jsx
try { (() => {
function PlanoCard({
  name,
  total,
  unit,
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--cor-borda-sutil)',
      borderRadius: 16,
      overflow: 'hidden',
      background: 'var(--cor-papel)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      padding: 22,
      background: 'var(--cor-grafite)',
      color: 'var(--cor-papel)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.4,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--cor-grafite-texto-secundario)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 'clamp(1.9rem, 6vw, 2.4rem)',
      lineHeight: 1.1,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, total, unit && /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: '0.45em',
      fontWeight: 500,
      color: 'var(--cor-grafite-texto-secundario)',
      letterSpacing: 0
    }
  }, unit))), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: '10px 22px 18px'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      padding: '12px 0',
      borderTop: i ? '1px solid var(--cor-borda-sutil)' : 0,
      fontSize: 15,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cor-texto-secundario)'
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap',
      fontWeight: it.absent ? 400 : 500,
      color: it.absent ? 'var(--cor-texto-secundario)' : 'var(--cor-tinta)'
    }
  }, it.value)))));
}
Object.assign(__ds_scope, { PlanoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PlanoCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/identidade/Screens.jsx
try { (() => {
const {
  Abre,
  Card,
  Pendencia,
  Button,
  LinkDoc,
  Input,
  Modal,
  BrandMark,
  Comparacao
} = window.AbleDevelopmentDesignSystem_544bee;
const A = '../../assets';
function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    }), {
      threshold: .15
    });
    document.querySelectorAll('.rv').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
}
function Eyebrow({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      display: 'block',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 14,
      height: 2,
      background: 'var(--cor-tangelo)',
      marginRight: 10,
      verticalAlign: 3
    }
  }), children);
}
function Abertura({
  n,
  titulo,
  desc,
  cor
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      marginBottom: '6vh'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, n), /*#__PURE__*/React.createElement("h2", {
    className: "display-xl",
    style: cor ? {
      color: cor
    } : null
  }, titulo), desc && /*#__PURE__*/React.createElement("p", {
    className: "desc"
  }, desc));
}
function Swatch({
  nome,
  hex,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid ' + (dark ? 'var(--cor-grafite-borda)' : 'var(--cor-borda-sutil)'),
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 88,
      background: hex
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px 14px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2px',
      fontSize: 14,
      fontWeight: 500
    }
  }, nome), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      letterSpacing: 0,
      textTransform: 'none'
    }
  }, hex)));
}
function Regra({
  r,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 16,
      padding: '16px 0',
      borderTop: '1px solid var(--cor-borda-sutil)',
      fontSize: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      paddingTop: 4
    }
  }, r), /*#__PURE__*/React.createElement("span", null, v));
}
function IdentidadePage() {
  useReveal();
  const [modal, setModal] = React.useState(false);
  const CLARO = [['papel', '#F5F4F1'], ['papel-hover', '#EBEAE6'], ['borda-sutil', '#DEDCD6'], ['borda-controle', '#8A867F'], ['texto-secundário', '#5F5C56'], ['tinta', '#1D1C1A']];
  const ESCURO = [['grafite', '#2A2927'], ['grafite-hover', '#353431'], ['grafite-borda', '#8F8C85'], ['grafite-texto-secundário', '#A9A59D']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
    style: {
      maxWidth: 1020,
      margin: '0 auto',
      padding: '24px 24px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "Identidade Visual \xB7 Able Development"), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "v3 \xB7 apple-minimal")), /*#__PURE__*/React.createElement("section", {
    className: "momento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "01 \xB7 Framework",
    titulo: "Sistemas complexos n\xE3o precisam ser dif\xEDceis de usar.",
    desc: "Essa \xE9 a tese que guia todo projeto da Able: engenharia robusta por dentro, simplicidade por fora. Toda a identidade deriva dela, da paleta ao movimento."
  }), /*#__PURE__*/React.createElement("h3", {
    className: "sub"
  }, "Plataforma de marca"), /*#__PURE__*/React.createElement("div", {
    className: "g2 rv"
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Prop\xF3sito",
    title: "Tornar sistemas complexos simples de usar."
  }, "A raz\xE3o de existir \xE9 a pr\xF3pria tese: pegar a complexidade real de um neg\xF3cio ou processo e entregar algo que qualquer pessoa opere sem fric\xE7\xE3o."), /*#__PURE__*/React.createElement(Card, {
    label: "Miss\xE3o",
    title: "Projetar e construir software sob medida, com o ciclo completo em um s\xF3 time."
  }, "Sites, SaaS, plataformas e sistemas internos, da arquitetura ao deploy, sem fragmentar a entrega entre equipes desconectadas."), /*#__PURE__*/React.createElement(Card, {
    label: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, "Vis\xE3o ", /*#__PURE__*/React.createElement(Pendencia, null, "em aberto")),
    title: "Olhar para frente, n\xE3o para tr\xE1s."
  }, "Um enunciado formal de vis\xE3o ainda n\xE3o existe, e redigi-lo \xE9 decis\xE3o do fundador, ent\xE3o este documento n\xE3o inventa um."), /*#__PURE__*/React.createElement(Card, {
    label: "Valores"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 12,
      fontSize: 16,
      color: 'var(--cor-tinta)'
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Precis\xE3o."), " Preferimos dizer menos e garantir que cada palavra seja verdadeira."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Simplicidade sem superficialidade.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Entrega inteira.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Trabalho acima do adjetivo."))))), /*#__PURE__*/React.createElement("h3", {
    className: "sub"
  }, "Tr\xEAs tra\xE7os"), /*#__PURE__*/React.createElement("div", {
    className: "g3 rv"
  }, [['Direta', 'Dizemos o que o sistema faz, não o que o mercado quer ouvir. Frases curtas, verbos ativos.'], ['Confiante', 'O trabalho fala mais alto que o adjetivo. Nenhum superlativo genérico.'], ['Precisa', 'Preferimos dizer menos e garantir que cada palavra seja verdadeira.']].map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-.015em',
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--cor-texto-secundario)',
      margin: 0
    }
  }, d)))), /*#__PURE__*/React.createElement("h3", {
    className: "sub"
  }, "Tom de voz nos contextos reais"), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginBottom: 12
    }
  }, "Erro de sistema (UI)"), /*#__PURE__*/React.createElement("div", {
    className: "rv"
  }, /*#__PURE__*/React.createElement(Comparacao, {
    variant: "voz",
    a: {
      tag: 'Assim soamos',
      text: '“Não foi possível salvar: o servidor não respondeu. Suas alterações estão preservadas neste navegador. Tente novamente.”'
    },
    b: {
      tag: 'Assim não soamos',
      text: '“Ops! Algo deu muito errado… :( Desculpe o transtorno!”'
    }
  })))), /*#__PURE__*/React.createElement("section", {
    className: "momento suave"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "02 \xB7 Princ\xEDpio visual",
    titulo: /*#__PURE__*/React.createElement(React.Fragment, null, "Minimalismo, com ", /*#__PURE__*/React.createElement("span", {
      style: {
        textDecoration: 'underline',
        textDecorationColor: 'var(--cor-tangelo)',
        textDecorationThickness: '.055em',
        textUnderlineOffset: '.14em'
      }
    }, "um acento"), ", contado."),
    desc: "A base \xE9 100% neutra, e a hierarquia vem de peso tipogr\xE1fico, espa\xE7amento e contraste tonal, nunca de cor. O tangelo percorre o documento como marca\xE7\xE3o: sempre como detalhe fino, nunca como fundo."
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      border: '1px solid var(--cor-borda-sutil)',
      borderRadius: 10,
      padding: 20,
      background: 'var(--cor-papel-hover)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 8,
      height: 64
    }
  }, Array.from({
    length: 12
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'rgba(29,28,26,.06)',
      borderRadius: 4
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      marginTop: 12
    }
  }, "12 colunas \xB7 gutter 8 px \xB7 espa\xE7amento 8 \u2192 16 \u2192 24 \u2192 32 \u2192 48 \u2192 64 \u2192 96 \u2192 128 \u2192 192")), /*#__PURE__*/React.createElement("h3", {
    className: "sub"
  }, "Composi\xE7\xE3o e hierarquia espacial"), /*#__PURE__*/React.createElement("div", {
    className: "rv"
  }, /*#__PURE__*/React.createElement(Regra, {
    r: "Alinhamento",
    v: "\xC0 esquerda por padr\xE3o. Texto centrado s\xF3 existe em momentos de display isolados."
  }), /*#__PURE__*/React.createElement(Regra, {
    r: "Hierarquia por espa\xE7o",
    v: "Quanto mais alta a hierarquia, mais respiro ao redor."
  }), /*#__PURE__*/React.createElement(Regra, {
    r: "Uma ideia por bloco",
    v: "Cada momento da composi\xE7\xE3o sustenta um argumento."
  }), /*#__PURE__*/React.createElement(Regra, {
    r: "Largura de leitura",
    v: "Texto corrido vai at\xE9 cerca de 65 caracteres por linha."
  }), /*#__PURE__*/React.createElement(Regra, {
    r: "N\xFAmeros alinham",
    v: "Dado tabular usa algarismos de largura fixa."
  })))), /*#__PURE__*/React.createElement("section", {
    className: "momento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "03 \xB7 Paleta",
    titulo: "Papel, tinta, grafite.",
    desc: "Nunca preto ou branco puros. S\xE3o seis tons para o contexto claro, quatro para o escuro e um \xFAnico acento de detalhe, e todo par de texto e fundo foi aferido por script."
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6,1fr)',
      gap: 12
    }
  }, CLARO.map(([n, h]) => /*#__PURE__*/React.createElement(Swatch, {
    key: n,
    nome: n,
    hex: h
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start',
      marginTop: '5vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Swatch, {
    nome: "tangelo \xB7 acento",
    hex: "#FB4D00"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 440,
      fontSize: 16,
      color: 'var(--cor-texto-secundario)'
    }
  }, "O \xFAnico acento do sistema, por decis\xE3o do fundador. Entra como marca\xE7\xE3o e detalhe: o tra\xE7o que abre cada se\xE7\xE3o, os links, os valores em destaque, um sublinhado, um ponto, um tra\xE7o fino. Nunca vira fundo, nunca substitui a base neutra e nunca entra no s\xEDmbolo.")))), /*#__PURE__*/React.createElement("section", {
    className: "momento escuro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "03 \xB7 Paleta \xB7 contexto escuro",
    titulo: "O mesmo sistema, sobre grafite.",
    cor: "var(--cor-papel)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 12
    }
  }, ESCURO.map(([n, h]) => /*#__PURE__*/React.createElement(Swatch, {
    key: n,
    nome: n,
    hex: h,
    dark: true
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "momento suave"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "04 \xB7 S\xEDmbolo",
    titulo: "Abertura. O s\xEDmbolo.",
    desc: "Aprovado pelo fundador como definitivo. \xC9 uma silhueta \xFAnica: sem container, sem letra, sem v\xE9rtice, sem aresta reta."
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 88,
      padding: '5vh 0 2vh'
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    variant: "symbol",
    height: 230,
    assetsBase: A
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 420,
      fontSize: 16,
      color: 'var(--cor-texto-secundario)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-.015em',
      color: 'var(--cor-tinta)',
      marginBottom: 10
    }
  }, "Abertura"), "Tr\xEAs l\xE2minas curvas giram em volta de um centro vazio, como o diafragma de uma c\xE2mera abrindo. A complexidade gira em volta; o que fica n\xEDtido \xE9 a abertura no meio.")))), /*#__PURE__*/React.createElement("section", {
    className: "momento escuro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "05 \xB7 Logo",
    titulo: "Um asset, n\xE3o um estilo de texto.",
    cor: "var(--cor-papel)",
    desc: "S\xEDmbolo \xE0 esquerda, nome \xE0 direita, sempre sobre um campo de cor \xFAnico. Linha \xFAnica, peso \xFAnico, uma cor."
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '6vh 0'
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    variant: "logo-inverted",
    height: 100,
    assetsBase: A
  })))), /*#__PURE__*/React.createElement("section", {
    className: "momento suave"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "06 \xB7 Tipografia",
    titulo: "Switzer. Fam\xEDlia \xFAnica."
  }), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      fontSize: 'clamp(40px,7vw,80px)',
      fontWeight: 600,
      letterSpacing: '-.03em',
      lineHeight: 1
    }
  }, "Complexo por dentro,", /*#__PURE__*/React.createElement("br", null), "simples por fora."), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      display: 'flex',
      gap: 48,
      marginTop: '5vh',
      fontSize: 16
    }
  }, [[400, 'Regular', 'texto corrido'], [500, 'Médio', 'UI, labels'], [600, 'Semibold', 'títulos, display']].map(([w, n, u]) => /*#__PURE__*/React.createElement("div", {
    key: w
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: w,
      display: 'block',
      fontSize: 22
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cor-texto-secundario)'
    }
  }, w, " \xB7 ", u)))))), /*#__PURE__*/React.createElement("section", {
    className: "momento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement(Abertura, {
    n: "07 \xB7 Interface",
    titulo: "A marca vira produto aqui.",
    desc: "Eleva\xE7\xE3o vem de borda e contraste, nunca de sombra; hierarquia vem de peso e espa\xE7o; o acento marca a navega\xE7\xE3o, nunca a superf\xEDcie."
  }), /*#__PURE__*/React.createElement("div", {
    className: "g3 rv",
    style: {
      gap: 14,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--cor-borda-sutil)',
      borderRadius: 14,
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Button, null, "Publicar projeto"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Cancelar"), /*#__PURE__*/React.createElement(LinkDoc, {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Ver hist\xF3rico de deploys"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'auto 0 0',
      fontSize: 14,
      color: 'var(--cor-texto-secundario)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cor-tinta)',
      fontWeight: 500
    }
  }, "Bot\xE3o e link."), " Cantos de 8 px, peso m\xE9dio, alvo de toque de 44 px.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--cor-borda-sutil)',
      borderRadius: 14,
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nome do projeto",
    placeholder: "ex.: sistema-juridico",
    help: "Min\xFAsculas e h\xEDfens; vira o identificador do deploy."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'auto 0 0',
      fontSize: 14,
      color: 'var(--cor-texto-secundario)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cor-tinta)',
      fontWeight: 500
    }
  }, "Input."), " Label sempre vis\xEDvel; no foco, borda escura e contorno.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--cor-borda-sutil)',
      borderRadius: 14,
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setModal(true)
  }, "Arquivar projeto"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'auto 0 0',
      fontSize: 14,
      color: 'var(--cor-texto-secundario)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cor-tinta)',
      fontWeight: 500
    }
  }, "Modal."), " Papel com borda sutil sobre v\xE9u escuro; a a\xE7\xE3o principal nomeada pelo efeito."))), /*#__PURE__*/React.createElement("div", {
    className: "rv",
    style: {
      marginTop: '6vh'
    }
  }, /*#__PURE__*/React.createElement(Regra, {
    r: "Raios",
    v: "Dois raios, sem exce\xE7\xE3o: 8 px em controles, 14 px em superf\xEDcies."
  }), /*#__PURE__*/React.createElement(Regra, {
    r: "Foco e teclado",
    v: "Todo elemento interativo tem foco vis\xEDvel e funciona por teclado."
  }), /*#__PURE__*/React.createElement(Regra, {
    r: "Toque",
    v: "Todo controle tem \xE1rea de toque de pelo menos 44 por 44 px."
  })))), /*#__PURE__*/React.createElement(Modal, {
    open: modal,
    fixed: true,
    title: "Arquivar projeto?",
    primaryLabel: "Arquivar",
    onPrimary: () => setModal(false),
    onSecondary: () => setModal(false)
  }, "O projeto sai da lista ativa. Nada \xE9 apagado, e d\xE1 para restaurar quando quiser."));
}
window.IdentidadePage = IdentidadePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/identidade/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposta/Slides.jsx
try { (() => {
const {
  Abre,
  Card,
  PlanoCard,
  PassoLista,
  DeckNav,
  Button,
  BrandMark,
  NotaTecnica,
  Pendencia
} = window.AbleDevelopmentDesignSystem_544bee;
const A = '../../assets';
const Campo = ({
  rotulo,
  vazio,
  texto
}) => /*#__PURE__*/React.createElement("div", {
  className: "campo campo-bloco"
}, /*#__PURE__*/React.createElement("div", {
  className: "campo-rotulo"
}, rotulo), /*#__PURE__*/React.createElement("div", {
  className: "campo-texto",
  contentEditable: true,
  suppressContentEditableWarning: true,
  spellCheck: false,
  "data-vazio": vazio
}, texto));
const Inline = ({
  vazio,
  texto
}) => /*#__PURE__*/React.createElement("span", {
  className: "campo campo-inline",
  contentEditable: true,
  suppressContentEditableWarning: true,
  spellCheck: false,
  "data-vazio": vazio
}, texto);
const SLIDES = [() => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o1"
}, /*#__PURE__*/React.createElement(BrandMark, {
  variant: "logo",
  height: 48,
  assetsBase: A
})), /*#__PURE__*/React.createElement("h1", {
  "data-item": true,
  className: "o2",
  style: {
    marginTop: 'clamp(40px,8vh,72px)',
    fontSize: 'clamp(2.6rem,9vw,4.6rem)',
    lineHeight: 1.05,
    letterSpacing: '-.025em',
    fontWeight: 600,
    textWrap: 'balance',
    maxWidth: '15ch'
  }
}, /*#__PURE__*/React.createElement(Inline, {
  vazio: "Nome do prospect"
}), " \xD7 Able Development"), /*#__PURE__*/React.createElement("p", {
  "data-item": true,
  className: "o3 lede"
}, "Proposta comercial \xB7 ", /*#__PURE__*/React.createElement("strong", null, "sistemas complexos, simples de usar."))), () => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o1"
}, /*#__PURE__*/React.createElement(Abre, null, "02 \xB7 O contexto")), /*#__PURE__*/React.createElement("h2", {
  "data-item": true,
  className: "o2"
}, "O que ouvimos de voc\xEAs."), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o3",
  style: {
    marginTop: 32
  }
}, /*#__PURE__*/React.createElement(Campo, {
  rotulo: "Dor do prospect",
  vazio: "Descreva em duas ou tr\xEAs frases o problema que ouvimos na conversa inicial."
}))), () => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o1"
}, /*#__PURE__*/React.createElement(Abre, null, "03 \xB7 Como a Able resolve")), /*#__PURE__*/React.createElement("h2", {
  "data-item": true,
  className: "o2"
}, "Complexo por dentro, simples por fora."), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o3",
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 16,
    marginTop: 'clamp(32px,5vh,48px)'
  }
}, /*#__PURE__*/React.createElement(Card, {
  label: "01",
  title: "Desenvolvimento sob medida"
}, "Sites, SaaS, plataformas, sistemas internos. Qualquer tipo, sem nicho fechado."), /*#__PURE__*/React.createElement(Card, {
  label: "02",
  title: "Experi\xEAncia centrada no usu\xE1rio"
}, "A complexidade fica por tr\xE1s; a superf\xEDcie \xE9 simples de usar."), /*#__PURE__*/React.createElement(Card, {
  label: "03",
  title: "Ciclo completo"
}, "Arquitetura, backend, frontend, banco de dados, deploy. Um time s\xF3."))), () => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o1"
}, /*#__PURE__*/React.createElement(Abre, null, "04 \xB7 Por que a Able")), /*#__PURE__*/React.createElement("h2", {
  "data-item": true,
  className: "o2"
}, "O que sustenta a entrega."), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o3",
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 16,
    marginTop: 'clamp(32px,5vh,48px)'
  }
}, /*#__PURE__*/React.createElement(Card, {
  title: "Simplificar complexidade real"
}, "Workflows, dados, automa\xE7\xE3o de processo, sem virar superficial."), /*#__PURE__*/React.createElement(Card, {
  title: "Ciclo completo, time pequeno e fixo"
}, "O produto nunca se perde entre equipes desconectadas."), /*#__PURE__*/React.createElement(Card, {
  title: "Versatilidade"
}, "De sites institucionais a SaaS complexos, sem depender de um nicho \xFAnico."))), () => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o1"
}, /*#__PURE__*/React.createElement(Abre, null, "05 \xB7 Os planos")), /*#__PURE__*/React.createElement("h2", {
  "data-item": true,
  className: "o2"
}, "Tr\xEAs formatos de entrada."), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o3",
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 14,
    marginTop: 'clamp(24px,4vh,40px)',
    alignItems: 'stretch'
  }
}, /*#__PURE__*/React.createElement(PlanoCard, {
  name: /*#__PURE__*/React.createElement(Inline, {
    vazio: "Plano 1",
    texto: "Sistema fechado"
  }),
  total: "R$4.000",
  unit: " a partir",
  items: [{
    label: 'Escopo',
    value: /*#__PURE__*/React.createElement(Inline, {
      vazio: "a definir"
    })
  }, {
    label: 'Prazo',
    value: /*#__PURE__*/React.createElement(Inline, {
      vazio: "a definir"
    })
  }, {
    label: 'Manutenção',
    value: 'R$1.000/mês'
  }]
}), /*#__PURE__*/React.createElement(PlanoCard, {
  name: /*#__PURE__*/React.createElement(Inline, {
    vazio: "Plano 2"
  }),
  total: /*#__PURE__*/React.createElement(Inline, {
    vazio: "R$ \u2014"
  }),
  items: [{
    label: 'Escopo',
    value: /*#__PURE__*/React.createElement(Inline, {
      vazio: "a definir"
    })
  }, {
    label: 'Prazo',
    value: /*#__PURE__*/React.createElement(Inline, {
      vazio: "a definir"
    })
  }]
}), /*#__PURE__*/React.createElement(PlanoCard, {
  name: /*#__PURE__*/React.createElement(Inline, {
    vazio: "Plano 3"
  }),
  total: /*#__PURE__*/React.createElement(Inline, {
    vazio: "R$ \u2014"
  }),
  items: [{
    label: 'Escopo',
    value: /*#__PURE__*/React.createElement(Inline, {
      vazio: "a definir"
    })
  }, {
    label: 'Prazo',
    value: /*#__PURE__*/React.createElement(Inline, {
      vazio: "a definir"
    })
  }]
})), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o4",
  style: {
    marginTop: 24
  }
}, /*#__PURE__*/React.createElement(NotaTecnica, {
  strong: "\xDAnico valor fixo e real:"
}, "piso de R$4.000 por sistema fechado + R$1.000/m\xEAs de manuten\xE7\xE3o (m\xEDnimo)."))), () => /*#__PURE__*/React.createElement("div", {
  className: "wrap"
}, /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o1"
}, /*#__PURE__*/React.createElement(Abre, {
  tone: "dark"
}, "06 \xB7 Pr\xF3ximos passos")), /*#__PURE__*/React.createElement("h2", {
  "data-item": true,
  className: "o2"
}, "O caminho a partir daqui."), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o3",
  style: {
    marginTop: 'clamp(32px,5vh,48px)'
  }
}, /*#__PURE__*/React.createElement(PassoLista, {
  items: [{
    text: 'Alinhamento de escopo',
    note: 'Uma conversa de 45 minutos para fechar o que entra no Plano escolhido.'
  }, {
    text: 'Proposta assinada'
  }, {
    text: 'Kick-off e ambiente de homologação',
    note: 'Você fica sabendo do prazo antes, não depois.'
  }]
})), /*#__PURE__*/React.createElement("div", {
  "data-item": true,
  className: "o4",
  style: {
    marginTop: 'clamp(40px,7vh,64px)'
  }
}, /*#__PURE__*/React.createElement(BrandMark, {
  variant: "logo-inverted",
  height: 44,
  assetsBase: A
})))];
function PropostaDeck() {
  const [i, setI] = React.useState(0);
  const [apres, setApres] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.toggle('apresentando', apres);
  }, [apres]);
  React.useEffect(() => {
    const k = e => {
      if (e.target.isContentEditable) return;
      if (e.key === 'ArrowRight') setI(v => Math.min(v + 1, SLIDES.length - 1));
      if (e.key === 'ArrowLeft') setI(v => Math.max(v - 1, 0));
      if (e.key === 'e' || e.key === 'E') setApres(v => !v);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "palco"
  }, SLIDES.map((S, n) => /*#__PURE__*/React.createElement("section", {
    key: n,
    "data-screen-label": String(n + 1).padStart(2, '0'),
    className: 'slide' + (n === i ? ' ativo' : n < i ? ' antes' : '') + (n === SLIDES.length - 1 ? ' fecho' : '')
  }, /*#__PURE__*/React.createElement(S, null))), !apres && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    tone: i === SLIDES.length - 1 ? 'dark' : 'light',
    onClick: () => setApres(true),
    style: {
      position: 'fixed',
      right: 'var(--margem)',
      top: 24,
      zIndex: 10
    }
  }, "Modo apresenta\xE7\xE3o"), /*#__PURE__*/React.createElement(DeckNav, {
    index: i,
    total: SLIDES.length,
    onPrev: () => setI(i - 1),
    onNext: () => setI(i + 1),
    style: {
      position: 'fixed',
      left: 'var(--margem)',
      bottom: 32,
      zIndex: 10
    }
  }));
}
window.PropostaDeck = PropostaDeck;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposta/Slides.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Abre = __ds_scope.Abre;

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Comparacao = __ds_scope.Comparacao;

__ds_ns.DeckNav = __ds_scope.DeckNav;

__ds_ns.FatoLista = __ds_scope.FatoLista;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.LinkDoc = __ds_scope.LinkDoc;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.NotaTecnica = __ds_scope.NotaTecnica;

__ds_ns.PassoLista = __ds_scope.PassoLista;

__ds_ns.Pendencia = __ds_scope.Pendencia;

__ds_ns.Placa = __ds_scope.Placa;

__ds_ns.PlanoCard = __ds_scope.PlanoCard;

})();
