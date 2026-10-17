/** Cartão: borda 1 px sutil, raio 14, padding 26×22, sem sombra. Rótulo → título → apoio.
 * @startingPoint section="Able · Core" subtitle="Cartão com rótulo e título" viewport="700x260" */
export interface CardProps {
  /** Eyebrow do card: legenda 13 médio, caixa-alta. */
  label?: React.ReactNode;
  /** Título 3 (22 px semibold). */
  title?: React.ReactNode;
  /** Corpo em corpo-sm 15, cinza secundário. */
  children?: React.ReactNode;
  /** Borda tracejada: vaga/posição em aberto. */
  dashed?: boolean;
  tone?: 'light' | 'dark';
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
