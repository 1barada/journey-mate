import { FC } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

import { useEscapeKeyClose } from '../../../hooks/useEscapeKeyClose';

import s from './Modal.module.scss';
import { ModalProps } from './Modal.types';

const modalRoot = document.querySelector('#modalRoot')!;
export const Modal: FC<ModalProps> = ({ children, toggleModal, title }) => {
  useEscapeKeyClose(toggleModal);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div className={s.backdrop} onClick={handleClickOnBackdrop}>
      <div className={s.modalContent}>
        <button onClick={toggleModal} className={s.closeButton}>
          <CloseIcon className="icon" />
        </button>
        {title && <h2 className={s.title}>{title}</h2>}
        {children}
      </div>
    </div>,
    modalRoot
  );
};
