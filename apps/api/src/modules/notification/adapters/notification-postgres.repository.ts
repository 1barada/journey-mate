import { PrismaClient } from '@prisma/client';

import {
  CreateNotificationEventResult,
  CreateNotificationEventWithTypeParams,
  CreateNotificationResult,
  CreateNotificationWithIdsParams,
  DeleteNotificationEventByIdParams,
  FindAllNotificationByUserIdParams,
  FindNotificationEventsByNotificationIdParams,
  GetAllNotificationsResult,
  GetNotificationEventsResult,
  NotificationRepositoryPort,
} from '../domain/repository/notification.repository';

export class NotificationPostgresRepository implements NotificationRepositoryPort {
  constructor(private prisma: PrismaClient) {}
  async getAllNotifications(params: FindAllNotificationByUserIdParams): Promise<GetAllNotificationsResult> {
    const notifications = await this.prisma.notification.findMany({
      where: { userId: Number(params.id) },
      select: {
        id: true,
        journeyId: true,
        journey: { select: { title: true } },
        userId: true,
        _count: { select: { events: true } },
      },
    });
    if (!notifications) return [];

    const notEmptyNotification = notifications.filter((n) => n._count.events > 0);

    return notEmptyNotification.map((n) => ({
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
    const events = await this.prisma.notificationEvent.findMany({
      where: { notificationId: Number(params.id) },
      select: {
        id: true,
        notificationId: true,
        type: true,
        userId: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });

    if (!events) return [];

    return events.map((e) => ({
      id: e.id,
      notificationId: e.notificationId,
      type: e.type,
      userId: e.userId ?? null,
      userName: e.user?.name ?? null,
      createdAt: e.createdAt,
    }));
  }

  async deleteNotificationEvent(params: DeleteNotificationEventByIdParams): Promise<void | null> {
    const event = await this.prisma.notificationEvent.findUnique({ where: { id: Number(params.id) } });

    if (!event) {
      return null;
    }

    await this.prisma.notificationEvent.delete({ where: { id: Number(params.id) } });
    return;
  }

  async createNotification(params: CreateNotificationWithIdsParams): Promise<CreateNotificationResult> {
    const notification = await this.prisma.notification.findFirst({
      where: { journeyId: Number(params.journeyId), userId: Number(params.userId) },
    });

    if (notification) {
      return null;
    }

    const newNotification = await this.prisma.notification.create({
      data: { journeyId: Number(params.journeyId), userId: Number(params.userId) },
    });

    if (!newNotification) {
      return null;
    }

    return newNotification;
  }

  async createNotificationEvent(params: CreateNotificationEventWithTypeParams): Promise<CreateNotificationEventResult> {
    const notification = await this.prisma.notificationEvent.findFirst({
      where: { notificationId: Number(params.notificationId), userId: Number(params.userId), type: params.type },
    });

    if (notification) {
      return null;
    }

    const newNotificationEvent = await this.prisma.notificationEvent.create({
      data: {
        type: params.type,
        notificationId: Number(params.notificationId),
        userId: Number(params.userId),
      },
    });

    if (!newNotificationEvent) {
      return null;
    }

    return newNotificationEvent;
  }
}
