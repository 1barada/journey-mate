import { useState } from 'react';

import { Login } from '../Login';
import { Register } from '../Register';

import type { AuthFormProps } from './types';
import { AuthFormTypes } from './types';

const AuthForm: React.FC<AuthFormProps> = ({ form }) => {
  const [formType, setFormType] = useState<AuthFormTypes>(form);

  return (
    <>
      {formType === AuthFormTypes.SignIn && <Login switchToRegisterForm={setFormType} />}
      {formType === AuthFormTypes.SignUp && <Register temp={''} />}
    </>
  );
};

export { AuthForm };
