import { IAuthSlice } from './types';

export const initialState: IAuthSlice = {
  user: {
    name: '',
    email: '',
    sex: null,
    description: '',
    dateOfBirth: null,
    avatar: null,
  },
  isLoading: false,
  error: null,
  isAuthenticated: false,
};
