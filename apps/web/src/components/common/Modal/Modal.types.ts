import React from 'react';

export interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
  title?: string;
}
