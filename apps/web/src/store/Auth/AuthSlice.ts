import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import {
  changeDescriptionAsyncThunk,
  changeProfileDataAsyncThunk,
  loginAsyncThunk,
  registerAsyncThunk,
} from './asyncThunk';
import { initialState } from './initialState';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (creator) => ({
    changeProfileData: changeProfileDataAsyncThunk(creator),
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

export const { loginUser, registerUser, editDescription, changeProfileData } = authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectIsAuthLoading } = authSlice.selectors;
