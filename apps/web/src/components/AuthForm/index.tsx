import { useState } from 'react';

import { Login } from '../Forms/Login';
import { Register } from '../Forms/Register';

import type { AuthFormProps } from './types';
import { AuthFormTypes } from './types';

const AuthForm: React.FC<AuthFormProps> = ({ form, toggleModal }) => {
  const [formType, setFormType] = useState<AuthFormTypes>(form);

  return (
    <>
      {formType === AuthFormTypes.SignIn && <Login switchToRegisterForm={setFormType} toggleModal={toggleModal} />}
      {formType === AuthFormTypes.SignUp && <Register temp={''} />}
    </>
  );
};

export { AuthForm };
