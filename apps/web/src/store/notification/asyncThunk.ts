import { toast } from 'react-toastify';
import { ReducerCreators } from '@reduxjs/toolkit';

import { trpcClient } from '../../services/trpc';

import { Notification, NotificationEvent, NotificationEventType, NotificationSlice } from './types';

export const getAllNotificationsAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    async (_, thunkApi) => {
      try {
        const response = await trpcClient.notification.getAllNotifications.query();
        const notifications: Notification[] = response;

        return notifications;
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        return thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.loading = false;
        state.notifications = payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );

export const getAllNotificationEventsAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    async (notification: { id: number }, thunkApi) => {
      try {
        const response = await trpcClient.notification.getAllNotificationsEvents.query({
          notificationId: notification.id,
        });
        const notificationEvents: NotificationEvent[] = response.map((value) => ({
          ...value,
          type: value.type as NotificationEventType,
        }));

        return {
          events: notificationEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
          notificationId: notification.id,
        };
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        return thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.loading = false;

        if (state.selectedNotification && state.selectedNotification.id !== payload.notificationId) {
          throw new Error(
            'getAllNotificationEventsAsyncThunk: selected notification id and received notification id not equal'
          );
        }

        state.selectedNotificationEvents = payload.events;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    }
  );

export const acceptJoinRequestAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    async (params: { eventId: number; notificationId: number }, thunkApi) => {
      try {
        await trpcClient.notification.deleteNotificationsEvents.mutate({
          id: params.eventId,
          notificationId: params.notificationId,
          accept: true,
        });

        return params.eventId;
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        return thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.loading = false;
        state.selectedNotificationEvents = state.selectedNotificationEvents.filter((events) => events.id !== payload);
        toast.success('Successfully accepted');
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(`Unable to accept. ${action.payload}`);
      },
    }
  );

export const declineJoinRequestAsyncThunk = (creator: ReducerCreators<NotificationSlice>) =>
  creator.asyncThunk(
    async (params: { eventId: number; notificationId: number }, thunkApi) => {
      try {
        await trpcClient.notification.deleteNotificationsEvents.mutate({
          id: params.eventId,
          notificationId: params.notificationId,
          accept: false,
        });

        return params.eventId;
      } catch (error) {
        if (!(error instanceof Error)) throw error;

        return thunkApi.rejectWithValue(error.message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.loading = false;
        state.selectedNotificationEvents = state.selectedNotificationEvents.filter((events) => events.id !== payload);
        toast.success('Successfully declined');
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(`Unable to decline. ${action.payload}`);
      },
    }
  );
