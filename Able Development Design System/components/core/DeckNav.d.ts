/** Navegação de deck: setas 44×44 com borda controle e contador "n / N" tabular. Fixa no rodapé do palco. */
export interface DeckNavProps {
  /** Índice 0-based do slide ativo. */
  index?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  style?: React.CSSProperties;
}
export function DeckNav(props: DeckNavProps): JSX.Element;
