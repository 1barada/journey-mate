export interface User {
  name: string;
  email: string;
  sex: 'femail' | 'male' | null;
  description: string;
  age: number | null;
  avatar: string | null;
}

export interface IAuthSlice {
  user: User;
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
}
