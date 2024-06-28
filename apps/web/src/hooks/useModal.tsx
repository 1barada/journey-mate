import { useState } from 'react';

type UseModalReturnType = [boolean, () => void];

export const useModal = (): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggle];
};
