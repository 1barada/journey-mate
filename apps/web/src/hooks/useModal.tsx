import { useState } from 'react';

type UseModalReturnType = [boolean, () => void];
interface ModalHookProps {
  isLoading?: boolean;
}

export const useModal = ({ isLoading }: ModalHookProps): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    if (isLoading) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return [isOpen, toggle];
};
