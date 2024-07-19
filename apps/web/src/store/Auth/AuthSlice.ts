import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector, PayloadAction } from '@reduxjs/toolkit';

import { changeDescriptionAsyncThunk, loginAsyncThunk, registerAsyncThunk } from './asyncThunk';
import { initialState } from './initialState';
import type { ProfileDataPayload } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (creator) => ({
    editDescription: changeDescriptionAsyncThunk(creator),
    loginUser: loginAsyncThunk(creator),
    registerUser: registerAsyncThunk(creator),
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

export const { loginUser, registerUser, editDescription } = authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectIsAuthLoading } = authSlice.selectors;
