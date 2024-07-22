import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

import { isWhoamiError } from '../../utils/type-guards';

import { whoamiAsyncThunk } from './asyncThunks';
import { initialState } from './initialState';
import type { AuthSlice, User } from './types';

const rootSelector = (state: AuthSlice) => state;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      if (!state.user) {
        state.user = {} as User;
      }

      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.sex = action.payload.sex;
      state.user.age = action.payload.age;
      console.log(action.payload);
    },
    editDescription: (state, action) => {
      if (!state.user) {
        state.user = {} as User;
      }

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
    selectUser: createDraftSafeSelector(rootSelector, (state) => (state.user ? { ...state.user } : null)),
    selectUserPermissions: createDraftSafeSelector(rootSelector, (state) => state.permissions),
  },
});

export const authReducer = authSlice.reducer;

export const { editProfile, editDescription, setIsAuthenticated } = authSlice.actions;

export const { selectIsAuthenticated, selectUser, selectUserPermissions } = authSlice.selectors;
