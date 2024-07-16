import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import { isWhoamiError } from '../../utils/type-guards';

import { whoamiAsyncThunk } from './asyncThunks';
import type { IAuthSlice } from './types';

export const initialState: IAuthSlice = {
  user: {
    name: 'Oleksii Korotenko',
    email: 'djshajhb@gmail.com',
    sex: null,
    description: 'asdhjhdbshjbdasjbdas dashg djhvas asdhvbjhsbd jhvdasjhvsd mbnvjhdvas mdjhdvjash dasb jh',
    age: null,
    avatar: null,
  },
  loading: false,
  error: null,
  token: '',
  isAuthenticated: false,
  permissions: [],
  statusCode: null,
};

const rootSelector = (state: IAuthSlice) => state;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.sex = action.payload.sex;
      state.user.age = action.payload.age;
      console.log(action.payload);
    },
    editDescription: (state, action) => {
      state.user.description = action.payload;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(whoamiAsyncThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(whoamiAsyncThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.permissions = payload.permissions;
      })
      .addCase(whoamiAsyncThunk.rejected, (state, { payload }) => {
        if (isWhoamiError(payload)) {
          state.error = payload.message;
          state.statusCode = payload.statusCode;

          if (payload.statusCode === 401) {
            state.isAuthenticated = false;
          }
        }

        state.loading = false;
      });
  },
  selectors: {
    selectIsAuthenticated: createDraftSafeSelector(rootSelector, (state) => Boolean(state.isAuthenticated)),
    selectUser: createDraftSafeSelector(rootSelector, (state) => ({ ...state.user })),
    selectUserPermissions: createDraftSafeSelector(rootSelector, (state) => state.permissions),
  },
});

export const authReducer = authSlice.reducer;

export const { loginUser, registerUser, editDescription, changeProfileData } = authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectIsAuthLoading, selectUserPermissions } = authSlice.selectors;
