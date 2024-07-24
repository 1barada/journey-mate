import { ReducerCreators } from '@reduxjs/toolkit';
import { NotificationEventType, NotificationSlice } from './types';

export const getAllNotificationsAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    (_, thunkApi) => {
      try {
        // TODO:
        return [
          {
            id: 1,
            journeyId: 1,
            title: 'Kyiv - Odesa',
            userId: 1,
            totalEvents: 2,
          },
          {
            id: 2,
            journeyId: 2,
            title: 'Kyiv - Odesa',
            userId: 1,
            totalEvents: 3,
          },
          {
            id: 3,
            journeyId: 3,
            title: 'Kyiv - Odesa',
            userId: 1,
            totalEvents: 1,
          },
          {
            id: 4,
            journeyId: 4,
            title: 'Kyiv - Odesa',
            userId: 1,
            totalEvents: 0,
          },
        ];
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        if (!action.payload) throw Error('getAllNotificationsAsyncThunk: Empty payload');

        state.notifications = action.payload.map((notification) => ({
          ...notification,
          events: [],
        }));
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );

export const getAllNotificationEventsAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    (notification: { id: number }, thunkApi) => {
      try {
        // TODO:
        const notificationEvents = [
          {
            id: 1,
            userName: 'Jack',
            userId: 1,
            type: 'chatMessage',
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            userName: 'Yong',
            userId: 2,
            type: 'joinRequest',
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            userName: 'Jack',
            userId: 1,
            type: 'joinRequest',
            createdAt: new Date().toISOString(),
          },
          {
            id: 4,
            userName: 'Lala',
            userId: 3,
            type: 'chatMessage',
            createdAt: new Date().toISOString(),
          },
        ].map((event) => ({ ...event, type: NotificationEventType[event.type as keyof typeof NotificationEventType] }));

        return {
          notificationId: 1,
          events: notificationEvents,
        };
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        if (!action.payload) throw new Error('getAllNotificationsAsyncThunk: Empty payload');

        const notificationIndex = state.notifications.findIndex(
          (notification) => notification.id === action.payload?.notificationId
        );
        if (notificationIndex < 0) throw new Error('getAllNotificationsAsyncThunk: there is no notification in state');

        state.selectedNotificationEvents = action.payload.events;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );

export const acceptJoinRequestAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    (_, thunkApi) => {
      try {
        // TODO:
        return;
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );

export const declineJoinRequestAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    (_, thunkApi) => {
      try {
        // TODO:
        return;
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state, action) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );
