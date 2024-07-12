import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

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
  isAuthenticated: true,
};

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
  },
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

export const { editProfile, editDescription } = authSlice.actions;

export const { selectIsAuthenticated, selectUser } = authSlice.selectors;
