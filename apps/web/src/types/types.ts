export interface IAuthSlice {
  user: { name: string; email: string };
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
}
