/** Card de plano/nível: header grafite com total tabular, lista item/preço separada por bordas sutis. Raio 16.
 * @startingPoint section="Able · Core" subtitle="Card de plano com preços" viewport="700x260" */
export interface PlanoCardProps {
  /** Nome do plano/nível (eyebrow no header grafite). */
  name: React.ReactNode;
  /** Total: "R$12.000". */
  total: React.ReactNode;
  /** Sufixo pequeno: "/mês". */
  unit?: React.ReactNode;
  /** Linhas item/preço; absent = linha não incluída (cinza, regular). */
  items?: { label: React.ReactNode; value: React.ReactNode; absent?: boolean }[];
  style?: React.CSSProperties;
}
export function PlanoCard(props: PlanoCardProps): JSX.Element;
