/** Par de blocos de comparação (por dentro / por fora; assim soamos / assim não soamos).
 * @startingPoint section="Able · Core" subtitle="Comparação A/B" viewport="700x260" */
export interface ComparacaoProps {
  /** Bloco A — o lado "de dentro"/afirmativo: grafite, semibold. */
  a: { tag: React.ReactNode; text: React.ReactNode };
  /** Bloco B — contraponto: papel com borda; em variant voz, papel-hover rebaixado. */
  b: { tag: React.ReactNode; text: React.ReactNode };
  /** voz = "assim soamos / assim não soamos" (B rebaixado, sem borda). */
  variant?: 'default' | 'voz';
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
}
export function Comparacao(props: ComparacaoProps): JSX.Element;
