import { publicProcedure, router } from '../../trpc/trpc';

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return [{ id: 1, name: 'user1' }];
  }),
});
