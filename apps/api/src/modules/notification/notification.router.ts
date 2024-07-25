import { PermissionAction, PermissionEntity } from '@project/permissions';

import { authorizedProcedure, router } from '../../trpc/trpc';

// import { createJourneyService } from '../journey/service/journey/journey.factory';
// import { Journey } from './../journey/domain/entities/journey.entity';
import { NotificationEventTypeSchema } from './domain/entities/notificationEvent.entity';
import { createNotificationService } from './domain/service/notification.factory';
import { EventNotExists } from './errors/event-not-exists.error';
import { JoinRequestEventUserIdNotProvided } from './errors/join-request-event-user-id-not-provided.error';
import { NotificationNotExists } from './errors/notification-not-exists.error';
import { UserNotAllow } from './errors/user-not-allow.error';
import { UserIdRequiredError } from './errors/userid-required.error';
import {
  CreateNotificationEventRequestSchema,
  CreateNotificationEventResultSchema,
  CreateNotificationRequestSchema,
  CreateNotificationResultSchema,
  DeleteNotificationEventRequestSchema,
  DeleteNotificationEventResultSchema,
  GetAllNotificationEventsRequestSchema,
  GetAllNotificationEventsResultSchema,
  GetAllNotificationsResponseSchema,
  GetNotificationRequestSchema,
  GetNotificationResponseSchema,
} from './schemas/router.schema';

export const notificationRouter = router({
  getNotification: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Notification,
  })
    .input(GetNotificationRequestSchema)
    .output(GetNotificationResponseSchema)
    .query(async ({ input, ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId: userTokenId } = ctx.userTokenData;
      const { notificationId } = input;
      if (!userTokenId) {
        throw new UserIdRequiredError('User ID required to get notifications');
      }

      const notification = await service.getNotification({ id: notificationId });

      if (notification?.userId.toString() !== userTokenId) {
        throw new UserNotAllow('Access denied. Not allowed to get different user notifications');
      }

      return notification;
    }),
  getAllNotifications: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Notification,
  })
    .output(GetAllNotificationsResponseSchema || [])
    .query(async ({ ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId: userTokenId } = ctx.userTokenData;
      if (!userTokenId) {
        throw new UserIdRequiredError('User ID required to get notifications');
      }

      const notifications = await service.getAllNotifications({ userId: Number(userTokenId) });
      if (notifications.length !== 0 && notifications[0].userId !== Number(userTokenId)) {
        throw new UserNotAllow('Access denied. Not allowed to get different user notifications');
      }

      return notifications;
    }),
  getAllNotificationsEvents: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Notification,
  })
    .input(GetAllNotificationEventsRequestSchema)
    .output(GetAllNotificationEventsResultSchema)
    .query(async ({ input, ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId: userTokenId } = ctx.userTokenData;
      const { notificationId } = input;
      if (!userTokenId) {
        throw new UserIdRequiredError('User ID required to get notifications events');
      }

      const events = await service.getNotificationEvents({ notificationId: notificationId });

      if (!events) {
        return [];
      }

      const notification = await service.getNotification({ id: notificationId });

      if (notification?.userId !== Number(userTokenId)) {
        throw new UserNotAllow('Access denied. Not allowed to get different user notifications events');
      }

      return events;
    }),
  deleteNotificationsEvents: authorizedProcedure({
    requiredAction: PermissionAction.Delete,
    requiredEntity: PermissionEntity.Notification,
  })
    .input(DeleteNotificationEventRequestSchema)
    .output(DeleteNotificationEventResultSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId: userTokenId } = ctx.userTokenData;
      const { notificationId, id } = input;
      if (!userTokenId) {
        throw new UserIdRequiredError('User ID required to delete notification event');
      }

      const notification = await service.getNotification({ id: notificationId });

      if (!notification) {
        throw new NotificationNotExists('Notification with this notificationId does not exist.');
      }

      if (notification.userId !== Number(userTokenId)) {
        throw new UserNotAllow('Access denied. Not allowed to delete different user notifications event');
      }

      const didEventExists = notification.events.find((event) => event.id === Number(id));

      if (!didEventExists) {
        throw new EventNotExists('The event does not belong to the current user.');
      }

      const result = await service.deleteNotificationEvent({ id: id });

      return result;
    }),
  createNotification: authorizedProcedure({
    requiredAction: PermissionAction.Create,
    requiredEntity: PermissionEntity.Notification,
  })
    .input(CreateNotificationRequestSchema)
    .output(CreateNotificationResultSchema)
    .mutation(async ({ input, ctx }) => {
      const notificationService = createNotificationService(ctx.db);
      // const journeyService = createJourneyService(ctx.db);
      const { userId: userTokenId } = ctx.userTokenData;
      const { journeyId, userId } = input;
      if (!userTokenId) {
        throw new UserIdRequiredError('User ID required to create notifications');
      }
      //Waiting for completion of the journey service
      // const journey = await journeyService.getJourney({ id: journeyId });
      // if (!journey) {
      //   throw new JourneyNotExists('Journey with this journeyId does not exist.');
      // }
      // if (journey.userId !== Number(userTokenId)) {
      //   throw new UserNotAllow('Access denied. Only the owner of the journey can create notifications for other users when they apply for a join request.');
      // }

      const result = await notificationService.createNotification({
        journeyId,
        userId,
      });

      return result;
    }),
  createNotificationEvent: authorizedProcedure({
    requiredAction: PermissionAction.Create,
    requiredEntity: PermissionEntity.Notification,
  })
    .input(CreateNotificationEventRequestSchema)
    .output(CreateNotificationEventResultSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId: userTokenId } = ctx.userTokenData;
      const { notificationId, type, userId } = input;
      if (!userTokenId) {
        throw new UserIdRequiredError('User ID required to get notifications events');
      }

      if (userId !== Number(userTokenId) && type === NotificationEventTypeSchema.Values.joinRequest) {
        throw new UserNotAllow(
          'Access denied. Not allowed to create joinRequest notificationEvent for different user.'
        );
      }

      if (!userId && type === NotificationEventTypeSchema.Values.joinRequest) {
        throw new JoinRequestEventUserIdNotProvided('User ID required to create joinRequest notificationEvent');
      }

      const notification = await service.getNotification({ id: notificationId });

      if (!notification) {
        throw new NotificationNotExists('Notification with this notificationId does not exist.');
      }

      if (notification.userId === Number(userTokenId)) {
        throw new UserNotAllow('Access denied. Not allowed to create notificationEvent for yourself.');
      }

      const result = await service.createNotificationEvent({
        notificationId,
        userId,
        type,
      });

      return result;
    }),
});
