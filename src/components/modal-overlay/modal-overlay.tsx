import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onclose: () => void;
};

export const ModalOverlay = ({ onclose }: TModalOverlayProps): React.JSX.Element => {
  return <div className={styles.modal_overlay} onClick={() => onclose()}></div>;
};
