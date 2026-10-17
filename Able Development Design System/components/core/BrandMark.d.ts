/** Marca Able a partir dos SVGs canônicos (assets/). Nunca redesenhar, nunca recompor o nome como texto. */
export interface BrandMarkProps {
  /** logo (tinta) · logo-inverted (papel, sobre grafite/tinta) · symbol (silhueta) · tile (squircle de plataforma). */
  variant?: 'logo' | 'logo-inverted' | 'symbol' | 'tile';
  /** Altura em px. Logo nunca abaixo de 18 px de altura (108 px de largura); símbolo nunca abaixo de 16. */
  height?: number;
  /** Caminho para a pasta assets/ do design system, relativo à página. */
  assetsBase?: string;
  style?: React.CSSProperties;
}
export function BrandMark(props: BrandMarkProps): JSX.Element;
