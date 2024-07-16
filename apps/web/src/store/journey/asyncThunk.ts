import type { ReducerCreators } from '@reduxjs/toolkit';

import type { JourneySlice, Milestone } from './types';

// !TODO replace with trpc later
const sleep = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res({ aa: true });
    }, ms);
  });

export const joinJourneyAsyncThunk = (creator: ReducerCreators<JourneySlice>) =>
  creator.asyncThunk(
    async (_, { rejectWithValue }) => {
      try {
        const res = await sleep(2000);

        return res;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.error = null;
        state.loading = true;
      },
      fulfilled: (state) => {
        state.loading = false;
      },
      rejected: (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      },
    }
  );

export const createNewJourneyAsyncThunk = (creator: ReducerCreators<JourneySlice>) =>
  creator.asyncThunk(
    async (
      journey: { title: string; description: string; category: string; milestones: Milestone[] },
      { rejectWithValue }
    ) => {
      try {
        const res = await sleep(10000);

        return {
          ...journey,
          id: performance.now(),
        };

        return res;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.error = null;
        state.loading = true;
      },
      fulfilled: (state) => {
        state.loading = false;
      },
      rejected: (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      },
    }
  );
