/** Lista de fatos ("o que existe hoje, sem inflar"): traço como marcador, bordas sutis, strong em tinta. */
export interface FatoListaProps {
  /** yes = traço tangelo (o que existe); false = traço cinza (o que não existe ainda). */
  items: { strong?: React.ReactNode; text: React.ReactNode; yes?: boolean }[];
  style?: React.CSSProperties;
}
export function FatoLista(props: FatoListaProps): JSX.Element;
