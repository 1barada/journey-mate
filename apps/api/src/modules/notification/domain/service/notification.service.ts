import type {
  CreateNotificationEventParams,
  CreateNotificationEventResult,
  CreateNotificationParams,
  CreateNotificationResult,
  DeleteNotificationEventParams,
  DeleteNotificationEventResult,
  GetAllNotificationParams,
  GetAllNotificationResult,
  GetNotificationEventsParams,
  GetNotificationEventsResult,
  NotificationUsecase,
} from '../../domain/usecases/notification.usecase';
import { NotificationRepositoryPort } from '../repository/notification.repository';

export class NotificationService implements NotificationUsecase {
  constructor(private db: NotificationRepositoryPort) {}

  async getAllNotifications(params: GetAllNotificationParams): Promise<GetAllNotificationResult> {
    return (await this.db.getAllNotifications({ id: params.userId })) as GetAllNotificationResult;
  }
  async getNotificationEvents(params: GetNotificationEventsParams): Promise<GetNotificationEventsResult> {
    return (await this.db.getNotificationEvents({
      notificationId: params.notificationId,
    })) as GetNotificationEventsResult;
  }
  async deleteNotificationEvent(params: DeleteNotificationEventParams): Promise<DeleteNotificationEventResult> {
    return (await this.db.deleteNotificationEvent({ id: params.id })) as DeleteNotificationEventResult;
  }
  async createNotification(params: CreateNotificationParams): Promise<CreateNotificationResult> {
    return (await this.db.createNotification({
      journeyId: params.journeyId,
      userId: params.userId,
    })) as CreateNotificationResult;
  }
  async createNotificationEvent(params: CreateNotificationEventParams): Promise<CreateNotificationEventResult> {
    return (await this.db.createNotificationEvent({
      userId: params.userId,
      notificationId: params.userId,
      type: params.type,
    })) as CreateNotificationEventResult;
  }
}
