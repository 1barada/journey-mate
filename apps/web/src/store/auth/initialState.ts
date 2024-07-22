import type { AuthSlice } from './types';

export const initialState: AuthSlice = {
  user: null,
  loading: false,
  error: null,
  token: '',
  isAuthenticated: false,
  permissions: [],
  statusCode: null,
};
