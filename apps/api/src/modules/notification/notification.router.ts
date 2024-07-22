import { authorizedProcedure, router } from '../../trpc/trpc';
import { PermissionAction, PermissionEntity } from '../auth/domain/enums/permissions.enums';

import { createNotificationService } from './domain/service/notification.factory';
import { UserNotAllow } from './errors/user-not-allow.error';
import { UserIdRequiredError } from './errors/userid-required.error';
import {
  GetAllNotificationEventsRequestSchema,
  GetAllNotificationResponseSchema,
  GetNotificationEventsResultSchema,
} from './schemas/router.schema';

export const notificationRouter = router({
  getNotifications: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Notification,
  })
    .output(GetAllNotificationResponseSchema || [])
    .query(async ({ ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId } = ctx.userTokenData;
      if (!userId) {
        throw new UserIdRequiredError('User ID required to get notifications');
      }

      const notifications = await service.getAllNotifications({ userId });

      if (notifications[0]?.userId.toString() !== userId) {
        throw new UserNotAllow('Access denied. Not allowed to get different user notifications');
      }

      return notifications;
    }),
  getNotificationsEvents: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Notification,
  })
    .input(GetAllNotificationEventsRequestSchema)
    .output(GetNotificationEventsResultSchema)
    .query(async ({ input, ctx }) => {
      const service = createNotificationService(ctx.db);
      const { userId } = ctx.userTokenData;
      if (!userId) {
        throw new UserIdRequiredError('User ID required to get notifications events');
      }

      const events = await service.getNotificationEvents({ notificationId: input.notificationId });

      if (!events) {
        return [];
      }

      const notification = await service.getNotification({ id: input.notificationId });

      if (notification?.userId !== Number(userId)) {
        throw new UserNotAllow('Access denied. Not allowed to get different user notifications events');
      }

      return events;
    }),
  // deleteNotificationEvent: authorizedProcedure({
  //   requiredAction: PermissionAction.Delete,
  //   requiredEntity: PermissionEntity.Notification,
  // }),
});
