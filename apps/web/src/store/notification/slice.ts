import { asyncThunkCreator, buildCreateSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import {
  acceptJoinRequestAsyncThunk,
  declineJoinRequestAsyncThunk,
  getAllNotificationEventsAsyncThunk,
  getAllNotificationsAsyncThunk,
} from './asyncThunk';
import { NotificationSlice } from './types';

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const selectRoot = (state: NotificationSlice) => state;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: (creator) => ({
    setSelectedNotification: creator.reducer<{ id: number }>((state, action) => {
      const notification = state.notifications.find((value) => value.id === action.payload.id) || null;
      if (notification === null)
        throw new Error(`setSelectedNotification. Notification ${action.payload.id} not found`);

      state.selectedNotification = notification;
      state.selectedNotificationEvents = [];
    }),

    getAllNotifications: getAllNotificationsAsyncThunk(creator),
    getAllNotificationEvents: getAllNotificationEventsAsyncThunk(creator),
    acceptJoinRequest: acceptJoinRequestAsyncThunk(creator),
    declineJoinRequest: declineJoinRequestAsyncThunk(creator),
  }),
  selectors: {
    selectAllNotifications: createDraftSafeSelector(selectRoot, (state) => state.notifications),
    selectSelectedNotification: createDraftSafeSelector(selectRoot, (state) => ({
      notification: state.selectedNotification,
      events: state.selectedNotificationEvents,
    })),
    selectNotificationRequestState: createDraftSafeSelector(selectRoot, (state) => ({
      loading: state.loading,
      error: state.error,
    })),
  },
});

export const notificationReducer = notificationSlice.reducer;
export const {
  acceptJoinRequest,
  declineJoinRequest,
  getAllNotificationEvents,
  getAllNotifications,
  setSelectedNotification,
} = notificationSlice.actions;
export const { selectAllNotifications, selectNotificationRequestState, selectSelectedNotification } =
  notificationSlice.selectors;
