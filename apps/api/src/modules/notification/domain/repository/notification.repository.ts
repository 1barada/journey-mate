import { Journey } from '@project/api/modules/journey/domain/entities/journey.entity';

import { Notification } from '../entities/notification.entity';

export interface FindAllNotificationByUserIdParams {
  id: string;
}

export interface FindNotificationEventsByNotificationIdParams {
  id: string;
}

export type NotificationSummary =
  | Pick<Notification, 'id' | 'userId' | 'journeyId'> & Pick<Journey, 'title'> & { totalEvents: number };

export type GetAllNotificationsResult = NotificationSummary[] | null;

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

export interface NotificationRepositoryPort {
  getAllNotifications(params: FindAllNotificationByUserIdParams): Promise<GetAllNotificationsResult>;
  getNotificationEvents(params: FindNotificationEventsByNotificationIdParams): Promise<GetNotificationEventsResult>;
}
