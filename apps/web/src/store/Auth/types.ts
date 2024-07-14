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
  isLoading: boolean;
  error: null | string;
  isAuthenticated: boolean;
}
