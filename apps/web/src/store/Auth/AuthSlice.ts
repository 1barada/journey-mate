import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';

import type { IAuthSlice } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const initialState: IAuthSlice = {
  user: {
    name: 'Oleksii Korotenko',
    email: 'djshajhb@gmail.com',
    sex: 'Male',
    description: 'asdhjhdbshjbdasjbdas dashg djhvas asdhvbjhsbd jhvdasjhvsd mbnvjhdvas mdjhdvjash dasb jh',
    age: 33,
    avatar: null,
  },
  loading: false,
  error: null,
  token: '',
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (creator) => ({
    example: creator.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          // const response = await axios.post('/endpoint');

          return true;
        } catch (error) {
          return rejectWithValue((error as Error).message);
        }
      },
      {
        pending: (state) => {
          state.error = null;
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.loading = false;
        },
        rejected: (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        },
      }
    ),
  }),
  selectors: {
    selectIsAuthenticated: createDraftSafeSelector(
      (state) => state.isAuthenticated,
      (isAuthenticated) => Boolean(isAuthenticated)
    ),

    selectUser: createDraftSafeSelector(
      (state) => state.user,
      (user) => ({ ...user })
    ),
  },
});

export const authReducer = authSlice.reducer;

export const { example } = authSlice.actions;

export const { selectIsAuthenticated, selectUser } = authSlice.selectors;
