/** Campo de texto: papel, borda visível, corpo 16 px; no foco a borda escurece e ganha contorno. Estado de erro em aberto no repo.
 * @startingPoint section="Able · Core" subtitle="Input com label e ajuda" viewport="700x260" */
export interface InputProps {
  id?: string;
  /** Sempre visível — placeholder não substitui label. */
  label: string;
  /** Texto de ajuda em legenda 13 px, cinza secundário. */
  help?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  tone?: 'light' | 'dark';
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
