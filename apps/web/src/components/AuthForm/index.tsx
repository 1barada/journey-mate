import { useState } from 'react';

import type { AuthFormTypes } from '../../types/types';
import { Login } from '../Login';
import { Register } from '../Register';

import type { AuthFormProps } from './types';

const AuthForm: React.FC<AuthFormProps> = ({ form }) => {
  const [formType, setFormType] = useState<AuthFormTypes>(form);

  return (
    <>
      {formType === 'sign in' && <Login switchToRegisterForm={setFormType} />}
      {formType === 'sign up' && <Register temp={''} />}
    </>
  );
};

export { AuthForm };
