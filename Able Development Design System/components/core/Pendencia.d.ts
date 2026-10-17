/** Marcador de pendência: borda tracejada, raio 14, traço tangelo. Nunca preencher com genérico — marcar o que falta. */
export interface PendenciaProps {
  /** "Em aberto", "A definir", "Aguarda o fundador". */
  children?: React.ReactNode;
  tone?: 'light' | 'dark';
  style?: React.CSSProperties;
}
export function Pendencia(props: PendenciaProps): JSX.Element;
