import { toast } from 'react-toastify';
import { CredentialResponse } from '@react-oauth/google';
import type { ReducerCreators } from '@reduxjs/toolkit';
import axios from 'axios';

import type { FormInputsTypes } from '../../components/Forms/Login/types';
import { trpcClient } from '../../services/trpc';
import { isTRPCError, isWhoamiError } from '../../utils/type-guards';

import { type AuthSlice, type DataTypes, type FormData, Sex, type User, UserPermission } from './types';

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
        toast.success("You've successfully registered! Please proceed to your email to activate your account.");
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
      const newData = {
        ...data,
        name: data.name || '',
      };

      try {
        const newDate = await trpcClient.user.changeProfileData.mutate(newData);

        return newDate;
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

        state.user = {
          ...state.user,
          age: state.user.age,
          dateOfBirth: action.payload.dateOfBirth ? new Date(action.payload.dateOfBirth) : null,
          email: action.payload.email,
          name: action.payload.name,
          sex: action.payload.sex === 'male' ? Sex.Male : action.payload.sex === 'female' ? Sex.Female : null,
        };
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

        const user: User | null = res.user
          ? {
              ...res.user,
              sex: Sex[res.user.sex as keyof typeof Sex],
              dateOfBirth: res.user.dateOfBirth ? new Date(res.user.dateOfBirth) : null,
            }
          : null;

        const permissions: UserPermission[] = [...res.permissions];

        return { user, permissions };
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
        state.isAuthenticated = payload.user !== null;
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

export const updateAvatarAsyncThunk = (creator: ReducerCreators<AuthSlice>) =>
  creator.asyncThunk(
    async ({ formData }: FormData, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/dyttdvqkh/image/upload', formData);

        await trpcClient.user.changeAvatar.mutate({ avatarUrl: data.public_id });

        return data.public_id;
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

        if (!state.user) {
          state.user = {} as User;
        }

        state.user.avatarUrl = action.payload;

        toast.success('Avatar uploaded!');
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );

export const logoutAsyncThunk = (creator: ReducerCreators<AuthSlice>) =>
  creator.asyncThunk(
    async (_, { rejectWithValue }) => {
      try {
        await trpcClient.user.logout.mutate();
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
        state.user = null;
        toast.success('See you later!');
      },
      rejected: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
        toast.error(payload as string);
      },
    }
  );
