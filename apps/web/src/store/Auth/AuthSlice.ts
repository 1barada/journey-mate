import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import type { IAuthSlice } from '../../types/types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const initialState: IAuthSlice = {
  user: { name: '', email: '' },
  loading: false,
  error: null,
  token: '',
  isAuthenticated: false,
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
    selectIsAuthenticated: (state) => state.isAuthenticated,
  },
});

export const authReducer = authSlice.reducer;

export const { example } = authSlice.actions;

export const { selectIsAuthenticated } = authSlice.selectors;
