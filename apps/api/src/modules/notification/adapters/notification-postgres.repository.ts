import { PrismaClient } from '@prisma/client';

import {
  FindAllNotificationByUserIdParams,
  FindNotificationEventsByNotificationIdParams,
  GetAllNotificationsResult,
  GetNotificationEventsResult,
  NotificationRepositoryPort,
} from '../domain/repository/notification.repository';

export class NotificationPostgresRepository implements NotificationRepositoryPort {
  constructor(private prisma: PrismaClient) {}
  async getAllNotifications(params: FindAllNotificationByUserIdParams): Promise<GetAllNotificationsResult> {
    const notification = await this.prisma.notification.findMany({
      where: { userId: Number(params.id) },
      select: {
        id: true,
        journeyId: true,
        journey: { select: { title: true } },
        userId: true,
        _count: { select: { events: true } },
      },
    });
    if (!notification) return [];

    return notification.map((n) => ({
      id: n.id,
      userId: n.userId,
      journeyId: n.journeyId,
      title: n.journey.title,
      totalEvents: n._count.events,
    }));
  }
  async getNotificationEvents(
    params: FindNotificationEventsByNotificationIdParams
  ): Promise<GetNotificationEventsResult> {
    // const

    throw new Error('Method not implemented.');
  }
}
