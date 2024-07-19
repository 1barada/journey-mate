import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector, PayloadAction } from '@reduxjs/toolkit';

import { changeDescriptionAsyncThunk, changeProfileDataAsyncThunk } from './asyncThunk';
import type { IAuthSlice } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const initialState: IAuthSlice = {
  user: {
    name: 'Oleksii Korotenko',
    email: 'djshajhb@gmail.com',
    sex: null,
    description: 'asdhjhdbshjbdasjbdas dashg djhvas asdhvbjhsbd jhvdasjhvsd mbnvjhdvas mdjhdvjash dasb jh',
    dateOfBirth: null,
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
    // changeProfileData: changeProfileDataAsyncThunk(creator),
    // editDescription: changeDescriptionAsyncThunk(creator),
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

export const { changeProfileData, editDescription } = authSlice.actions;

export const { selectIsAuthenticated, selectUser } = authSlice.selectors;
