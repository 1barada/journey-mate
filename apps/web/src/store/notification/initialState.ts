import { NotificationSlice } from './types';

export const initialState: NotificationSlice = {
  loading: true,
  error: null,
  notifications: [],
  selectedNotification: null,
  selectedNotificationEvents: [],
};
