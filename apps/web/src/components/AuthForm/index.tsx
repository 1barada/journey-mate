import { useState } from 'react';

import { Login } from '../Login';
import { Register } from '../Register';

import type { AuthFormProps } from './types';

const AuthForm: React.FC<AuthFormProps> = ({ form }) => {
  const [formType, setFormType] = useState<'sign in' | 'sign up'>(form);

  return (
    <>
      {form === 'sign in' && formType !== 'sign up' && <Login switchToRegisterForm={setFormType} />}
      {form === 'sign up' || (formType === 'sign up' && <Register temp={''} />)}
    </>
  );
};

export { AuthForm };
