import { JourneyStatus, PrismaClient } from '@prisma/client';

import {
  CreateNotificationEventResult,
  CreateNotificationEventWithTypeParams,
  CreateNotificationResult,
  CreateNotificationWithIdsParams,
  DeleteNotificationEventByIdParams,
  DeleteNotificationEventResult,
  GetAllNotificationByUserIdParams,
  GetAllNotificationsResult,
  GetNotificationEventsByNotificationIdParams,
  GetNotificationEventsResult,
  getNotificationFromJourneyIdParams,
  getNotificationFromJourneyIdResult,
  GetNotificationParams,
  GetNotificationResult,
  NotificationRepositoryPort,
} from '../domain/repository/notification.repository';

export class NotificationPostgresRepository implements NotificationRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async getNotification(params: GetNotificationParams): Promise<GetNotificationResult> {
    const notification = await this.prisma.notification.findFirst({
      where: { id: params.id },
      select: {
        id: true,
        journeyId: true,
        journey: { select: { title: true } },
        userId: true,
        events: {
          select: {
            id: true,
            type: true,
            createdAt: true,
            user: { select: { name: true } },
            userId: true,
            notificationId: true,
          },
        },
        _count: { select: { events: true } },
      },
    });
    return notification;
  }

  async getAllNotifications(params: GetAllNotificationByUserIdParams): Promise<GetAllNotificationsResult> {
    const notifications = await this.prisma.notification.findMany({
      where: { userId: params.id },
      select: {
        id: true,
        journeyId: true,
        journey: { select: { title: true } },
        userId: true,
        _count: { select: { events: true } },
      },
    });

    return notifications;
  }

  async getNotificationEvents(
    params: GetNotificationEventsByNotificationIdParams
  ): Promise<GetNotificationEventsResult> {
    const events = await this.prisma.notificationEvent.findMany({
      where: { notificationId: params.notificationId },
      select: {
        id: true,
        notificationId: true,
        type: true,
        userId: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });

    return events;
  }

  async deleteNotificationEvent(params: DeleteNotificationEventByIdParams): Promise<DeleteNotificationEventResult> {
    const notificationEvent = await this.prisma.notificationEvent.findFirst({
      where: { id: params.id },
      include: { notification: true },
    });

    if (notificationEvent && notificationEvent.userId) {
      const journeyUsersMilestones = await this.prisma.journeyUsersMilestone.findMany({
        where: {
          userId: notificationEvent.userId,
          journeyId: notificationEvent.notification.journeyId,
          status: JourneyStatus.requestedToJoinMilestone,
        },
      });

      if (journeyUsersMilestones) {
        await Promise.all(
          journeyUsersMilestones.map((journeyUsersMilestone) =>
            this.prisma.journeyUsersMilestone.update({
              where: {
                journeyId_userId_milestoneId: {
                  journeyId: notificationEvent.notification.journeyId,
                  userId: journeyUsersMilestone.userId,
                  milestoneId: journeyUsersMilestone.milestoneId,
                },
              },
              data: {
                status: params.accept ? JourneyStatus.approvedJoinMilestone : JourneyStatus.declinedJoinMilestone,
              },
            })
          )
        );
      }
    }

    return await this.prisma.notificationEvent.delete({ where: { id: params.id } });
  }

  async createNotification(params: CreateNotificationWithIdsParams): Promise<CreateNotificationResult> {
    const newNotification = await this.prisma.notification.create({
      data: {
        journey: { connect: { id: params.journeyId } },
        user: { connect: { id: params.userId } },
      },
    });

    return newNotification;
  }

  async createNotificationEvent(params: CreateNotificationEventWithTypeParams): Promise<CreateNotificationEventResult> {
    const newNotificationEvent = await this.prisma.notificationEvent.create({
      data: {
        type: params.type,
        notification: {
          connect: { id: params.notificationId },
        },
        user: params.userId
          ? {
              connect: { id: params.userId },
            }
          : undefined,
      },
    });

    return newNotificationEvent;
  }

  async getNotificationFromJourneyId(
    params: getNotificationFromJourneyIdParams
  ): Promise<getNotificationFromJourneyIdResult> {
    const notification = await this.prisma.notification.findUniqueOrThrow({
      where: {
        userId_journeyId: {
          journeyId: params.journeyId,
          userId: params.userId,
        },
      },
    });

    return {
      id: notification.id,
      userId: notification.userId,
      journeyId: notification.journeyId,
      createdAt: notification.createdAt,
    };
  }
}
