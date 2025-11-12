import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  children: ReactNode;
  onclose: () => void;
  title?: string;
};

export const Modal = ({ children, onclose, title }: TModalProps): React.JSX.Element => {
  const modalElement = document.getElementById('modal') as Element;
  useEffect(() => {
    function onEsc(event: KeyboardEvent): void {
      if (event.code === 'Escape') {
        onclose();
      }
    }

    document.addEventListener('keydown', onEsc);
    return (): void => document.removeEventListener('keydown', onEsc);
  }, []);

  return createPortal(
    <>
      <div className={`${styles.modal} pt-10 pl-10 pr-10 pb-15`}>
        <div className={styles.modal_header}>
          <div className="text text_type_main-medium">{title}</div>
          <div className={styles.close_icon} onClick={() => onclose()}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onclose={onclose} />
    </>,
    modalElement
  );
};
