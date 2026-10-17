/** Botão Able: cantos 8 px, peso médio, alvo de toque 44 px, foco sempre visível.
 * @startingPoint section="Able · Core" subtitle="Botão primário e secundário" viewport="700x260" */
export interface ButtonProps {
  /** primary = tinta sobre papel (escurece para grafite no hover); secondary = transparente com borda visível. Um primário por vista. */
  variant?: 'primary' | 'secondary';
  /** dark = versão sobre grafite (borda grafite-borda, hover grafite-hover) */
  tone?: 'light' | 'dark';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  /** Rótulo nomeado pela ação que executa: "Arquivar", nunca "OK". */
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
