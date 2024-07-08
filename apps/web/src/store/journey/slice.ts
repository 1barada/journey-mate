import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import { joinJourneyAsyncThunk } from './asyncThunk';
import { initialState } from './initialState';
import type { JourneySlice } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const selectRoot = (state: JourneySlice) => state;

const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: (creator) => ({
    joinJourney: joinJourneyAsyncThunk(creator),
  }),
  selectors: {
    selectJourney: createDraftSafeSelector(selectRoot, (state) => state.journey),
    selectRequestState: createDraftSafeSelector(selectRoot, (state) => ({
      isLoading: state.loading,
      isError: Boolean(state.error),
      error: state.error,
    })),
  },
});

export const journeyReducer = journeySlice.reducer;
export const journeyActions = journeySlice.actions;
export const journeySelectors = journeySlice.selectors;
