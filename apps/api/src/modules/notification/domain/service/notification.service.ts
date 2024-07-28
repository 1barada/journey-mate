import type {
  CreateNotificationEventParams,
  CreateNotificationEventResult,
  CreateNotificationParams,
  CreateNotificationResult,
  DeleteNotificationEventParams,
  DeleteNotificationEventResult,
  GetAllNotificationParams,
  GetAllNotificationsResult,
  GetNotificationEventsParams,
  GetNotificationEventsResult,
  GetNotificationParams,
  GetNotificationResult,
  NotificationUsecase,
} from '../../domain/usecases/notification.usecase';
import { NotificationRepositoryPort } from '../repository/notification.repository';

export class NotificationService implements NotificationUsecase {
  constructor(private db: NotificationRepositoryPort) {}

  async getNotification(params: GetNotificationParams): Promise<GetNotificationResult> {
    const response = await this.db.getNotification({ id: params.id });
    if (!response) {
      return null;
    }

    const { _count, events, id, journey, journeyId, userId } = response;
    const formattedNotification = {
      id,
      journeyId,
      title: journey.title,
      totalEvents: _count.events,
      userId,
      events,
    };

    return formattedNotification;
  }

  async getAllNotifications(params: GetAllNotificationParams): Promise<GetAllNotificationsResult> {
    const response = await this.db.getAllNotifications({ id: params.userId });

    if (!response) {
      return [];
    }

    const nonEmptyNotifications = response.filter((n) => n._count.events > 0);

    if (nonEmptyNotifications.length === 0) {
      return [];
    }

    const formattedNotifications = nonEmptyNotifications.map((n) => {
      return {
        id: n.id,
        journeyId: n.journeyId,
        title: n.journey.title,
        totalEvents: n._count.events,
        userId: n.userId,
      };
    });

    return formattedNotifications;
  }
  async getNotificationEvents(params: GetNotificationEventsParams): Promise<GetNotificationEventsResult> {
    const response = await this.db.getNotificationEvents({
      notificationId: params.notificationId,
    });

    if (!response) {
      return [];
    }

    const formattedEvents = response.map((n) => {
      return {
        id: n.id,
        notificationId: n.notificationId,
        type: n.type,
        userName: n.user?.name ?? null,
        userId: n.userId ?? null,
        createdAt: n.createdAt,
      };
    });

    return formattedEvents;
  }
  async deleteNotificationEvent(params: DeleteNotificationEventParams): Promise<DeleteNotificationEventResult> {
    return await this.db.deleteNotificationEvent({ id: params.id, accept: params.accept });
  }
  async createNotification(params: CreateNotificationParams): Promise<CreateNotificationResult> {
    return await this.db.createNotification({
      journeyId: params.journeyId,
      userId: params.userId,
    });
  }
  async createNotificationEvent(params: CreateNotificationEventParams): Promise<CreateNotificationEventResult> {
    return await this.db.createNotificationEvent({
      userId: params.userId,
      notificationId: params.notificationId,
      type: params.type,
    });
  }
}
