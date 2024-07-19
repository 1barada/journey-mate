import type { ReducerCreators } from '@reduxjs/toolkit';

import { trpcClient } from '../../services/trpc';

import { IAuthSlice } from './types';

export const changeDescriptionAsyncThunk = (creator: ReducerCreators<IAuthSlice>) => {
  creator.asyncThunk(
    async (description: string, { rejectWithValue }) => {
      try {
        const newDescription = await trpcClient.user.changeDescription.mutate({ description });
        return newDescription;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.user.description = action.payload.description;
        state.loading = false;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );
};

export const changeProfileDataAsyncThunk = (creator: ReducerCreators<IAuthSlice>) => {
  creator.asyncThunk(
    async (data, { rejectWithValue }) => {
      try {
        const newData = await trpcClient.user.changeProfileData.mutate(data);

        return newData;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.user.dateOfBirth = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );
};
