import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import {
  changeDescriptionAsyncThunk,
  changeProfileDataAsyncThunk,
  googleAuthAsyncThunk,
  loginAsyncThunk,
  registerAsyncThunk,
  updateAvatarAsyncThunk,
  whoamiAsyncThunk,
} from './asyncThunk';
import { initialState } from './initialState';
import { AuthSlice } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const rootSelector = (state: AuthSlice) => state;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (creator) => ({
    changeProfileData: changeProfileDataAsyncThunk(creator),
    editDescription: changeDescriptionAsyncThunk(creator),
    loginUser: loginAsyncThunk(creator),
    registerUser: registerAsyncThunk(creator),
    whoami: whoamiAsyncThunk(creator),
    googleAuth: googleAuthAsyncThunk(creator),
    updateAvatar: updateAvatarAsyncThunk(creator),
  }),
  selectors: {
    selectIsAuthenticated: createDraftSafeSelector(
      (state) => state.isAuthenticated,
      (isAuthenticated) => Boolean(isAuthenticated)
    ),
    selectUser: createDraftSafeSelector(rootSelector, (state) => (state.user ? { ...state.user } : null)),
    selectUserPermissions: createDraftSafeSelector(rootSelector, (state) => state.permissions),
    selectIsAuthLoading: createDraftSafeSelector(
      (state) => state.isLoading,
      (isLoading) => Boolean(isLoading)
    ),
  },
});

export const authReducer = authSlice.reducer;

export const { loginUser, registerUser, editDescription, changeProfileData, whoami, googleAuth, updateAvatar } =
  authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectIsAuthLoading, selectUserPermissions } = authSlice.selectors;
