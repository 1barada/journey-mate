import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import { createNewJourneyAsyncThunk, joinJourneyAsyncThunk } from './asyncThunk';
import { initialState } from './initialState';
import type { JourneySlice, Milestone } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const selectRoot = (state: JourneySlice) => state;

const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: (creator) => ({
    joinJourney: joinJourneyAsyncThunk(creator),
    createNewJourney: createNewJourneyAsyncThunk(creator),
    setEditUnsavedMilestone: creator.reducer<{ milestone: Milestone }>((state, { payload }) => {
      state.editUnsavedMilestone = payload.milestone;
    }),
    clearEditUnsavedMilestone: creator.reducer((state) => {
      state.editUnsavedMilestone = null;
    }),
  }),
  selectors: {
    selectJourney: createDraftSafeSelector(selectRoot, (state) => state.journey),
    selectRequestState: createDraftSafeSelector(selectRoot, (state) => ({
      isLoading: state.loading,
      isError: Boolean(state.error),
      error: state.error,
    })),
    selectEditUnsavedMilestone: createDraftSafeSelector(selectRoot, (state) => state.editUnsavedMilestone),
  },
});

export const journeyReducer = journeySlice.reducer;
export const journeyActions = journeySlice.actions;
export const journeySelectors = journeySlice.selectors;
