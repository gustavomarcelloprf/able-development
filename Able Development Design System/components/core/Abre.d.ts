/** Abertura de seção: traço tangelo + eyebrow em caixa-alta. O gesto que abre cada bloco do sistema. */
export interface AbreProps {
  /** Eyebrow numerado: "03 · Como a Able resolve". */
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  /** Tamanho do traço tangelo: deck 36×3 (padrão), doc 14×2, social 44×4. */
  size?: 'deck' | 'doc' | 'social';
  style?: React.CSSProperties;
}
export function Abre(props: AbreProps): JSX.Element;
