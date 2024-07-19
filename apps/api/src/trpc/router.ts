import { userRouter } from '../modules/user/user.router';

import { journeyRouter } from './../modules/journey/journey.router';
import { router } from './trpc';

export const appRouter = router({
  user: userRouter,
  journey: journeyRouter,
});

export type AppRouter = typeof appRouter;
