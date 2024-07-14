import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector, PayloadAction } from '@reduxjs/toolkit';

import { loginAsyncThunk } from './asyncThunk';
import { initialState } from './initialState';
import type { ProfileDataPayload } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (creator) => ({
    editProfile: creator.reducer((state, action: PayloadAction<ProfileDataPayload>) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.sex = action.payload.sex;
      state.user.age = action.payload.age;
    }),
    editDescription: creator.reducer((state, action: PayloadAction<string>) => {
      state.user.description = action.payload;
    }),
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

export const { editProfile, editDescription, login } = authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectIsAuthLoading } = authSlice.selectors;
