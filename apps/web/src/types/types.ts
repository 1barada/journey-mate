// FIXME: change IAuthSlice to AuthSlice
export interface IAuthSlice {
  user: { name: string; email: string };
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
}

export interface RegisterProps {
  temp: string;
}

export interface LoginProps {
  temp: string;
}
