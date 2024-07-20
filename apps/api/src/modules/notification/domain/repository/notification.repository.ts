import { Journey } from '@project/api/modules/journey/domain/entities/journey.entity';

import { Notification, NotificationEvent } from '../entities/notification.entity';

export interface FindAllNotificationByUserIdParams {
  id: string;
}

export interface FindNotificationEventsByNotificationIdParams {
  id: string;
}

export type NotificationSummary =
  | (Pick<Notification, 'id' | 'userId' | 'journeyId'> & Pick<Journey, 'title'> & { totalEvents: number })
  | null;

export type GetAllNotificationsResult = NotificationSummary[];

export type GetNotificationEventsResult = NotificationEvent[];

export interface NotificationRepositoryPort {
  getAllNotifications(params: FindAllNotificationByUserIdParams): Promise<GetAllNotificationsResult>;
  getNotificationEvents(params: FindNotificationEventsByNotificationIdParams): Promise<GetNotificationEventsResult>;
}
