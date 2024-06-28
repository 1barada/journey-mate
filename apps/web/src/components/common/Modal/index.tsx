import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import s from './Modal.module.scss';
import { ModalProps } from './Modal.types';

const modalRoot = document.querySelector('#modalRoot')!;

export const Modal: FC<ModalProps> = ({ children, toggleModal, title }) => {
  return (
    <Box className={s.backdrop}>
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
