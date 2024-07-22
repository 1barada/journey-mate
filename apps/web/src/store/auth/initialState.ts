import type { AuthSlice } from './types';

export const initialState: AuthSlice = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  permissions: [],
  statusCode: null,
};
