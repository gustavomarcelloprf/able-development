/** Lista numerada de próximos passos (01, 02…), números tabulares, separadores por borda. */
export interface PassoListaProps {
  items: { text: React.ReactNode; note?: React.ReactNode }[];
  /** Padrão dark: vive no fechamento grafite dos decks. */
  tone?: 'light' | 'dark';
  style?: React.CSSProperties;
}
export function PassoLista(props: PassoListaProps): JSX.Element;
