/** Link tangelo sublinhado; no hover/foco o traço engrossa. O acento marcando a navegação. */
export interface LinkDocProps {
  href?: string;
  /** inline = corre dentro da prosa (sem padding de alvo de toque). Padrão: link isolado com 12 px de padding vertical. */
  inline?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export function LinkDoc(props: LinkDocProps): JSX.Element;
