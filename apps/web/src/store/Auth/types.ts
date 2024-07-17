export interface User {
  name: string;
  email: string;
  sex: 'femail' | 'male' | null;
  description: string;
  dateOfBirth: Date | null;
  avatar: string | null;
}

export interface IAuthSlice {
  user: User;
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
}
