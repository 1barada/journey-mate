import type { AuthFormTypes } from '../AuthForm/types';

export interface LoginProps {
  switchToRegisterForm: React.Dispatch<React.SetStateAction<AuthFormTypes>>;
}
