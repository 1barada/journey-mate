export interface NotificationSlice {
  loading: boolean;
  error: string | null;
  notifications: Notification[];
  selectedNotification: Notification | null;
  selectedNotificationEvents: NotificationEvent[];
}

export interface Notification {
  id: number;
  title: string;
  userId: number;
  journeyId: number;
  totalEvents: number;
}

export interface NotificationEvent {
  id: number;
  userId: number | null;
  userName: string | null;
  type: NotificationEventType;
  createdAt: string;
}

export enum NotificationEventType {
  JoinRequest = 'joinRequest',
  ChatMessage = 'chatMessage',
}
