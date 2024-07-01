// FIXME: change IAuthSlice to AuthSlice
export interface IAuthSlice {
  user: { name: string; email: string };
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
}

export type AuthFormTypes = 'sign in' | 'sign up';
