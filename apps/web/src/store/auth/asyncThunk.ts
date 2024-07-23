import { toast } from 'react-toastify';
import { CredentialResponse } from '@react-oauth/google';
import type { ReducerCreators } from '@reduxjs/toolkit';

import { FormInputsTypes } from '../../components/Forms/Login/types';
import { trpcClient } from '../../services/trpc';
import { isTRPCError, isWhoamiError } from '../../utils/type-guards';

import type { AuthSlice, DataTypes, User } from './types';

export const loginAsyncThunk = (creator: ReducerCreators<AuthSlice>) =>
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
        state.isAuthenticated = true;
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );

export const registerAsyncThunk = (creator: ReducerCreators<AuthSlice>) =>
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

export const changeProfileDataAsyncThunk = (creator: ReducerCreators<AuthSlice>) => {
  return creator.asyncThunk(
    async (data: DataTypes, { rejectWithValue }) => {
      try {
        // return await trpcClient.user.changeProfileData.mutate(data);
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

export const changeDescriptionAsyncThunk = (creator: ReducerCreators<AuthSlice>) => {
  return creator.asyncThunk(
    async (description: string, { rejectWithValue }) => {
      console.log(description);
      try {
        const newD = await trpcClient.user.changeDescription.mutate({ description });
        return newD;
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

        if (!state.user) {
          state.user = {} as User;
        }

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

export const whoamiAsyncThunk = (creator: ReducerCreators<AuthSlice>) =>
  creator.asyncThunk(
    async (_, { rejectWithValue, signal }) => {
      try {
        const res = await trpcClient.user.whoami.query(undefined, { signal });
        return res;
      } catch (error) {
        const payload = {
          message: (error as Error)?.message || '',
          statusCode: 500,
        };

        if (isTRPCError(error)) {
          payload.message = error.message;
          payload.statusCode = error.data.httpStatus as number;
        }

        return rejectWithValue(payload);
      }
    },
    {
      pending: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.permissions = payload.permissions;
      },
      rejected: (state, { payload }) => {
        if (isWhoamiError(payload)) {
          state.error = payload.message;
          state.statusCode = payload.statusCode;

          if (payload.statusCode === 401) {
            state.isAuthenticated = false;
          }
        }

        state.isLoading = false;
      },
    }
  );

export const googleAuthAsyncThunk = (creator: ReducerCreators<AuthSlice>) =>
  creator.asyncThunk(
    async (response: CredentialResponse, { rejectWithValue }) => {
      const token = response.credential;
      if (token) {
        try {
          const backendResponse = await trpcClient.user.googleAuth.mutate({ token });
          return backendResponse;
        } catch (error) {
          return rejectWithValue((error as Error).message);
        }
      } else {
        return rejectWithValue('No credential received from Google');
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
        toast.success('Google OAuth success!');
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );
