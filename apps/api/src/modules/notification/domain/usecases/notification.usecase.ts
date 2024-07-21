import { Notification } from '../entities/notification.entity';
import { NotificationEvent, NotificationEventTypeSchema } from '../entities/notificationEvent.entity';

export type GetAllNotificationParams = {
  userId: string;
};

export type GetAllNotificationResult = Notification[] | null;

export type GetNotificationEventsParams = {
  notificationId: string;
};

export type GetNotificationEventsResult = NotificationEvent[] | [];

export type DeleteNotificationEventParams = {
  id: string;
};

export type DeleteNotificationEventResult = NotificationEvent;

export type CreateNotificationParams = {
  journeyId: string;
  userId: string;
};

export type CreateNotificationResult = Notification;

export type CreateNotificationEventParams = {
  journeyId: string;
  userId: string;
  type: keyof typeof NotificationEventTypeSchema.Values;
};

export type CreateNotificationEventResult = NotificationEvent;

export interface NotificationUsecase {
  getAllNotifications(params: GetAllNotificationParams): Promise<GetAllNotificationResult>;
  getNotificationEvents(params: GetNotificationEventsParams): Promise<GetNotificationEventsResult>;
  deleteNotificationEvent(params: DeleteNotificationEventParams): Promise<DeleteNotificationEventResult>;
  createNotification(params: CreateNotificationParams): Promise<CreateNotificationResult>;
  createNotificationEvent(params: CreateNotificationEventParams): Promise<CreateNotificationEventResult>;
}
