import { chatRouter } from '../modules/chat/chat.router';
import { notificationRouter } from '../modules/notification/notification.router';
import { userRouter } from '../modules/user/user.router';

import { journeyRouter } from './../modules/journey/journey.router';
import { router } from './trpc';

export const appRouter = router({
  user: userRouter,
  journey: journeyRouter,
  chat: chatRouter,
  notification: notificationRouter,
});

export type AppRouter = typeof appRouter;
