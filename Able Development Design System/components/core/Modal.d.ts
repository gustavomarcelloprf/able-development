/** Modal: superfície de papel com borda sutil sobre véu de tinta a 60%; elevação vem do véu, não de sombra.
 * @startingPoint section="Able · Core" subtitle="Modal de confirmação" viewport="700x260" */
export interface ModalProps {
  title: string;
  /** Corpo no cinza secundário. */
  children: React.ReactNode;
  /** Ação principal nomeada pelo efeito ("Arquivar"), nunca "OK". */
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  open?: boolean;
  /** fixed = cobre a viewport; padrão = véu embutido no fluxo (demonstração). */
  fixed?: boolean;
  style?: React.CSSProperties;
}
export function Modal(props: ModalProps): JSX.Element;
