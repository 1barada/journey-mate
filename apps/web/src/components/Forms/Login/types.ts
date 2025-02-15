import { z } from 'zod';

import type { AuthFormTypes } from '../../AuthForm/types';

import { loginSchema } from './schemas';

export interface LoginProps {
  switchForms: React.Dispatch<React.SetStateAction<AuthFormTypes>>;
  toggleModal: () => void;
}

export type FormInputsTypes = z.infer<typeof loginSchema>;
