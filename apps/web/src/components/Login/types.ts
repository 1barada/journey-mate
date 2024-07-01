import type { AuthFormTypes } from '../../types/types';

export interface LoginProps {
  switchToRegisterForm: React.Dispatch<React.SetStateAction<AuthFormTypes>>;
}
