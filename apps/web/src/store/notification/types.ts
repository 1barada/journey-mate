export interface NotificationSlice {
  loading: boolean;
  error: string | null;
  notifications: Notification[];
  selectedNotification: Notification | null;
  selectedNotificationEvents: NotificationEvent[];
}

export interface Notification {
  id: number;
  journeyId: number;
  title: string;
  userId: number;
  totalEvents: number;
}

export interface NotificationEvent {
  id: number;
  userId: number;
  userName: string;
  type: NotificationEventType;
  createdAt: string;
}

export enum NotificationEventType {
  JoinRequest = 'joinRequest',
  ChatMessage = 'chatMessage',
}
