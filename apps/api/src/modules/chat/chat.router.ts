import { PermissionAction, PermissionEntity } from '@project/permissions';
import { observable } from '@trpc/server/observable';
import EventEmitter from 'events';

import { authorizedProcedure, router } from '../../trpc/trpc';
import { NotAuthenticatedError } from '../auth/domain/errors/not-authenticated.error';
import { createJourneyService } from '../journey/service/journey/journey.factory';
import { createNotificationService } from '../notification/domain/service/notification.factory';

import { Message } from './domain/entities/chat.entity';
import {
  GetMessagesRequestSchema,
  GetMessagesResponse,
  SendMessageRequestSchema,
} from './domain/usecases/chat.usecase';
import { createChatService } from './service/chat.factory';

const ee = new EventEmitter();

export const chatRouter = router({
  getMessages: authorizedProcedure({ requiredAction: PermissionAction.Read, requiredEntity: PermissionEntity.Chat })
    .input(GetMessagesRequestSchema)
    .subscription(({ input, ctx }) => {
      return observable<GetMessagesResponse>((observer) => {
        const service = createChatService(ctx.db);

        async function init() {
          const messages = await service.getMessages({
            chatId: input.chatId,
            skip: input.skip,
            take: input.take,
          });

          observer.next(messages);

          function sendNewMessage(message: Message) {
            observer.next([message]);
          }

          ee.on(`message:${input.chatId}`, sendNewMessage);

          return () => {
            ee.off(`message:${input.chatId}`, sendNewMessage);
          };
        }

        init();
      });
    }),
  sendMessage: authorizedProcedure({ requiredAction: PermissionAction.Create, requiredEntity: PermissionEntity.Chat })
    .input(SendMessageRequestSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.userTokenData.userId) {
        throw new NotAuthenticatedError();
      }

      const chatService = createChatService(ctx.db);

      // Create NotificationEvents for every participant in journey
      async function createNotificationEvents() {
        const journeyService = createJourneyService(ctx.db);
        const notificationService = createNotificationService(ctx.db);

        const { journeyId, participantIds } = await journeyService.getJourneyParticipantsFromChatId(input.chatId);
        Promise.all(
          participantIds.map((participantId) => {
            return async () => {
              const notification = await notificationService.getNotificationFromJourneyId({
                journeyId,
                userId: participantId,
              });

              await notificationService.createNotificationEvent({
                notificationId: notification.id,
                type: 'chatMessage',
                userId: participantId,
              });
            };
          })
        );
      }

      createNotificationEvents();

      const message = await chatService.sendMessage({
        chatId: input.chatId,
        content: input.content,
        senderId: Number(ctx.userTokenData.userId),
      });

      ee.emit(`message:${input.chatId}`, message);
    }),
});
