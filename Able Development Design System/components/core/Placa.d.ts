/** Placa de destaque em tinta: onde o tangelo vira texto. Para um número que sustenta a tese.
 * @startingPoint section="Able · Core" subtitle="Placa de destaque (número)" viewport="700x260" */
export interface PlacaProps {
  /** Rótulo em tangelo sobre tinta — o único par em que o acento vira texto (5,00:1). */
  label?: React.ReactNode;
  /** Valor grande, números tabulares: "R$4.000". */
  value: React.ReactNode;
  /** Sufixo do valor em tangelo: " por sistema". */
  highlight?: React.ReactNode;
  /** Apoio em corpo-sm. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Placa(props: PlacaProps): JSX.Element;
