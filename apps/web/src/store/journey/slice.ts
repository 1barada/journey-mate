import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import { joinJourneyAsyncThunk } from './asyncThunk';
import { initialState } from './initialState';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: (creator) => ({
    joinJourney: joinJourneyAsyncThunk(creator),
  }),
  selectors: {
    selectJourney: (state) => state.journey,
    selectRequestState: (state) => ({
      isLoading: state.loading,
      isError: Boolean(state.error),
      error: state.error,
    }),
  },
});

export const journeyReducer = journeySlice.reducer;
export const journeyActions = journeySlice.actions;
export const journeySelectors = journeySlice.selectors;
