import type { ReducerCreators } from '@reduxjs/toolkit';

import { FormInputsTypes } from '../../components/Forms/Login/types';
import { trpcClient } from '../../services/trpc';

import type { IAuthSlice } from './types';

export const loginAsyncThunk = (creator: ReducerCreators<IAuthSlice>) =>
  creator.asyncThunk(
    async (data: FormInputsTypes, { rejectWithValue }) => {
      try {
        await trpcClient.user.login.mutate(data);
        return;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      fulfilled: (state) => {
        state.isLoading = false;
        state.error = null;
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      },
    }
  );
