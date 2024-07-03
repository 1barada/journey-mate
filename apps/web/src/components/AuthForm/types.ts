export interface AuthFormProps {
  form: AuthFormTypes;
}

export enum AuthFormTypes {
  SignIn = 'sign in',
  SignUp = 'sign up',
  Login = 'login',
  Register = 'register',
}
