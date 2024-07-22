import { Notification } from '../entities/notification.entity';
import { NotificationEvent, NotificationEventTypeSchema } from '../entities/notificationEvent.entity';

export type GetNotificationParams = {
  id: string;
};

export type GetNotificationResult = {
  id: number;
  journeyId: number;
  journey: { title: string };
  userId: number;
  events: NotificationEvent[] | [];
  _count: {
    events: number;
  };
} | null;

export type GetAllNotificationByUserIdParams = {
  id: string;
};

export type NotificationSummary = {
  id: number;
  userId: number;
  journeyId: number;
  journey: {
    title: string;
  };
  _count: {
    events: number;
  };
};

export type GetAllNotificationsResult = NotificationSummary[] | null;

export type GetNotificationEventsByNotificationIdParams = {
  notificationId: string;
};

export type NotificationEventSummary = {
  id: number;
  notificationId: number;
  type: string;
  userId: number | null;
  user: { name: string | null } | null;
  createdAt: Date;
};

export type GetNotificationEventsResult = NotificationEventSummary[] | null;

export type DeleteNotificationEventByIdParams = { id: string };

export type DeleteNotificationEventResult = NotificationEvent | null;

export type CreateNotificationWithIdsParams = {
  journeyId: string;
  userId: string;
};

export type CreateNotificationResult = Notification | null;

export type CreateNotificationEventWithTypeParams = {
  type: keyof typeof NotificationEventTypeSchema.Values;
  notificationId: string;
  userId: string | null;
};

export type CreateNotificationEventResult = NotificationEvent | null;

export interface NotificationRepositoryPort {
  getNotification(params: GetNotificationParams): Promise<GetNotificationResult>;
  getAllNotifications(params: GetAllNotificationByUserIdParams): Promise<GetAllNotificationsResult>;
  getNotificationEvents(params: GetNotificationEventsByNotificationIdParams): Promise<GetNotificationEventsResult>;
  deleteNotificationEvent(params: DeleteNotificationEventByIdParams): Promise<DeleteNotificationEventResult>;
  createNotification(params: CreateNotificationWithIdsParams): Promise<CreateNotificationResult>;
  createNotificationEvent(params: CreateNotificationEventWithTypeParams): Promise<CreateNotificationEventResult>;
}
