import { Journey } from '@project/api/modules/journey/domain/entities/journey.entity';

import { Notification, NotificationEvent, NotificationEventTypeSchema } from '../entities/notification.entity';

export interface FindAllNotificationByUserIdParams {
  id: string;
}

export type NotificationSummary =
  | Pick<Notification, 'id' | 'userId' | 'journeyId'> & Pick<Journey, 'title'> & { totalEvents: number };

export type GetAllNotificationsResult = NotificationSummary[] | null;

export interface FindNotificationEventsByNotificationIdParams {
  id: string;
}

// export type NotificationEventSummary = Pick<
//   NotificationEvent,
//   'id' | 'notificationId' | 'type' | 'userId' | 'createdAt'
// > & {
//   userName: Pick<User, 'name'> | null;
// };

export type NotificationEventSummary = {
  id: number;
  notificationId: number;
  type: string;
  userId: number | null;
  userName: string | null;
  createdAt: Date;
};

export type GetNotificationEventsResult = NotificationEventSummary[] | null;

export type DeleteNotificationEventByIdParams = { id: string };

export type DeleteNotificationEventResult = NotificationEvent;

export type CreateNotificationWithIdsParams = {
  journeyId: string;
  userId: string;
};

export type CreateNotificationResult = Notification | null;

export type CreateNotificationEventWithTypeParams = {
  type: keyof typeof NotificationEventTypeSchema.Values;
  notificationId: string;
  userId?: string;
};

export type CreateNotificationEventResult = NotificationEvent | null;

export interface NotificationRepositoryPort {
  getAllNotifications(params: FindAllNotificationByUserIdParams): Promise<GetAllNotificationsResult>;
  getNotificationEvents(params: FindNotificationEventsByNotificationIdParams): Promise<GetNotificationEventsResult>;
  deleteNotificationEvent(params: DeleteNotificationEventByIdParams): Promise<DeleteNotificationEventResult>;
  createNotification(params: CreateNotificationWithIdsParams): Promise<CreateNotificationResult>;
  createNotificationEvent(params: CreateNotificationEventWithTypeParams): Promise<CreateNotificationEventResult>;
}
