export interface AuthFormProps {
  form: AuthFormTypes;
  toggleModal: () => void;
}

export enum AuthFormTypes {
  SignIn = 'sign in',
  SignUp = 'sign up',
  Login = 'login',
  Register = 'register',
}
