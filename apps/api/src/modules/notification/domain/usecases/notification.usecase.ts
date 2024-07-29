import { Notification } from '../entities/notification.entity';
import { NotificationEvent, NotificationEventTypeSchema } from '../entities/notificationEvent.entity';

export type GetNotificationParams = {
  id: number;
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
  userId: number;
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
  notificationId: number;
};

export type GetNotificationEventsResult =
  | {
      id: number;
      notificationId: number;
      type: string;
      userId: number | null;
      userName: string | null;
      createdAt: Date;
    }[]
  | [];

export type DeleteNotificationEventParams = {
  id: number;
  accept?: boolean;
};

export type DeleteNotificationEventResult = NotificationEvent | null;

export type CreateNotificationParams = {
  journeyId: number;
  userId: number;
};

export type CreateNotificationResult = Notification | null;

export type CreateNotificationEventParams = {
  notificationId: number;
  userId: number | null;
  type: keyof typeof NotificationEventTypeSchema.Values;
};

export type CreateNotificationEventResult = NotificationEvent | null;

export interface GetNotificationFromJourneyIdParams {
  journeyId: number;
  userId: number;
}

export type GetNotificationFromJourneyIdResult = Omit<Notification, 'events'>;

export interface SendAllPariticipantsNotifcationAboutNewMessageParams {
  journeyId: number;
  userIdsToSend: number[];
}

export interface NotificationUsecase {
  getNotification(params: GetNotificationParams): Promise<GetNotificationResult>;
  getNotificationFromJourneyId(params: GetNotificationFromJourneyIdParams): Promise<GetNotificationFromJourneyIdResult>;
  getAllNotifications(params: GetAllNotificationParams): Promise<GetAllNotificationsResult>;
  getNotificationEvents(params: GetNotificationEventsParams): Promise<GetNotificationEventsResult>;
  deleteNotificationEvent(params: DeleteNotificationEventParams): Promise<DeleteNotificationEventResult>;
  createNotification(params: CreateNotificationParams): Promise<CreateNotificationResult>;
  createNotificationEvent(params: CreateNotificationEventParams): Promise<CreateNotificationEventResult>;
  sendAllPariticipantsNotifcationAboutNewMessage(
    params: SendAllPariticipantsNotifcationAboutNewMessageParams
  ): Promise<void>;
}
