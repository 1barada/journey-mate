import { FC } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <Box className={s.backdrop} onClick={handleClickOnBackdrop}>
      <Box className={s.modalContent}>
        <Button onClick={toggleModal} className={s.closeButton}>
          <CloseIcon />
        </Button>
        {title && (
          <Typography className={s.title} variant="h2">
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>,
    modalRoot
  );
};
