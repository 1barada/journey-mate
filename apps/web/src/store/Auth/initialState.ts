import type { AuthSlice } from './types';

export const initialState: AuthSlice = {
  user: {
    name: 'Oleksii Korotenko',
    email: 'djshajhb@gmail.com',
    sex: null,
    description: 'asdhjhdbshjbdasjbdas dashg djhvas asdhvbjhsbd jhvdasjhvsd mbnvjhdvas mdjhdvjash dasb jh',
    age: null,
    avatar: null,
    dateOfBirth: null,
  },
  loading: false,
  error: null,
  token: '',
  isAuthenticated: false,
  permissions: [],
  statusCode: null,
};
