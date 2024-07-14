import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import { loginAsyncThunk } from './asyncThunk';
import { initialState } from './initialState';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (creator) => ({
    // editProfile: (state, action) => {
    //   state.user.email = action.payload.email;
    //   state.user.name = action.payload.name;
    //   state.user.sex = action.payload.sex;
    //   state.user.age = action.payload.age;
    // },
    // editDescription: (state, action) => {
    //   state.user.description = action.payload;
    // },
    login: loginAsyncThunk(creator),
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

    selectIsAuthLoading: createDraftSafeSelector(
      (state) => state.isLoading,
      (isLoading) => Boolean(isLoading)
    ),
  },
});

export const authReducer = authSlice.reducer;

export const { login } = authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectIsAuthLoading } = authSlice.selectors;
