// FIXME: change IAuthSlice to AuthSlice

export interface User {
  name: string;
  email: string;
  sex: 'Femail' | 'Male' | '-';
  description: string;
  age: number;
  avatar: string | null;
}

export interface IAuthSlice {
  user: User;
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
}
