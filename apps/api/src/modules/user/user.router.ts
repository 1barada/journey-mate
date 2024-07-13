import { publicProcedure, router } from '../../trpc/trpc';
import { LoginRequestSchema, LoginResponseSchema } from '../auth/domain/usecases/login.usecase';
import { createLoginService } from '../auth/service/login/login.factory';

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return [{ id: 1, name: 'user1' }];
  }),
  login: publicProcedure
    .input(LoginRequestSchema)
    .output(LoginResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createLoginService(ctx.db);

      const { user, token } = await service.login(input);

      ctx.res.setCookie('access-token', token, { signed: true });
      return user;
    }),
});
