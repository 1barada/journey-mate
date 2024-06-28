import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEscapeKeyClose } from '../../../hooks/useEscapeKeyClose';

import s from './Modal.module.scss';
import { ModalProps } from './Modal.types';

export const Modal: FC<ModalProps> = ({ children, toggleModal, title }) => {
  useEscapeKeyClose(toggleModal);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <Box className={s.backdrop} onClick={handleClickOnBackdrop}>
      <Box className={s.modalContent}>
        {title && (
          <Typography className={s.title} variant="h2">
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
};
