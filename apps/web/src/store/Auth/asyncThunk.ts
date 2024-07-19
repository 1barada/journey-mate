import { toast } from 'react-toastify';
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
        toast.success('Welcome back!');
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );

export const registerAsyncThunk = (creator: ReducerCreators<IAuthSlice>) =>
  creator.asyncThunk(
    async (data: FormInputsTypes, { rejectWithValue }) => {
      try {
        await trpcClient.user.registerWithEmail.mutate({ ...data });
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
        toast.success("You've successfully registered!");
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );

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
        state.isLoading = true;
        state.error = null;
      },
      fulfilled: (state) => {
        state.isLoading = false;
        state.error = null;
        toast.success("You've successfully changed your profile data!");
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );
};

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
        state.isLoading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.description = action.payload.description;
        toast.success("You've successfully changed your description!");
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );
};
