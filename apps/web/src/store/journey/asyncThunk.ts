import type { ReducerCreators } from '@reduxjs/toolkit';

import { trpcClient } from '../../services/trpc';

import type { CreateJourney, JourneySlice, Milestone } from './types';

export const joinJourneyAsyncThunk = (creator: ReducerCreators<JourneySlice>) =>
  creator.asyncThunk(
    async (milestoneIds: number[], { rejectWithValue }) => {
      try {
        const res = await trpcClient.journey.joinJourney.mutate(milestoneIds);

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
    async (journey: CreateJourney, { rejectWithValue }) => {
      try {
        const res = await trpcClient.journey.createJourney.mutate(journey);

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
