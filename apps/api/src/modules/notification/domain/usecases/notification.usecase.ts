import { Notification } from '../entities/notification.entity';
import { NotificationEvent, NotificationEventTypeSchema } from '../entities/notificationEvent.entity';

export type GetNotificationParams = {
  id: string;
};

export type GetNotificationResult = {
  id: number;
  journeyId: number;
  title: string;
  totalEvents: number;
  userId: number;
  events: NotificationEvent[] | [];
} | null;

export type GetAllNotificationParams = {
  userId: string;
};

export type GetAllNotificationsResult =
  | {
      id: number;
      journeyId: number;
      title: string;
      totalEvents: number;
      userId: number;
    }[]
  | [];

export type GetNotificationEventsParams = {
  notificationId: string;
};

export type GetNotificationEventsResult =
  | {
      id: number;
      notificationId: number;
      type: string;
      userId: number | null;
      user: string | null;
      createdAt: Date;
    }[]
  | [];

export type DeleteNotificationEventParams = {
  id: string;
};

export type DeleteNotificationEventResult = NotificationEvent | null;

export type CreateNotificationParams = {
  journeyId: string;
  userId: string;
};

export type CreateNotificationResult = Notification | null;

export type CreateNotificationEventParams = {
  notificationId: string;
  userId: string | null;
  type: keyof typeof NotificationEventTypeSchema.Values;
};

export type CreateNotificationEventResult = NotificationEvent | null;

export interface NotificationUsecase {
  getNotification(params: GetNotificationParams): Promise<GetNotificationResult>;
  getAllNotifications(params: GetAllNotificationParams): Promise<GetAllNotificationsResult>;
  getNotificationEvents(params: GetNotificationEventsParams): Promise<GetNotificationEventsResult>;
  deleteNotificationEvent(params: DeleteNotificationEventParams): Promise<DeleteNotificationEventResult>;
  createNotification(params: CreateNotificationParams): Promise<CreateNotificationResult>;
  createNotificationEvent(params: CreateNotificationEventParams): Promise<CreateNotificationEventResult>;
}
