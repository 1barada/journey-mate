import { useState } from 'react';

import { Login } from '../Forms/Login';
import { Register } from '../Forms/Register';
import { RestorePasswordForm } from '../Forms/RestorePassword';
import { RestorePasswordRequestForm } from '../Forms/RestorePasswordRequest';

import type { AuthFormProps } from './types';
import { AuthFormTypes } from './types';

const AuthForm: React.FC<AuthFormProps> = ({ form, toggleModal }) => {
  const [formType, setFormType] = useState<AuthFormTypes>(form);

  return (
    <>
      {formType === AuthFormTypes.SignIn && <Login switchForms={setFormType} toggleModal={toggleModal} />}
      {formType === AuthFormTypes.SignUp && <Register toggleModal={toggleModal} />}
      {formType === AuthFormTypes.RestorePasswordRequest && <RestorePasswordRequestForm toggleModal={toggleModal} />}
      {formType === AuthFormTypes.RestorePassword && <RestorePasswordForm toggleModal={toggleModal} />}
    </>
  );
};

export { AuthForm };
