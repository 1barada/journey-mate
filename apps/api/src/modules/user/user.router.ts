import { publicProcedure, router } from '../../trpc/trpc';
import { LoginRequestSchema, LoginResponseSchema } from '../auth/domain/usecases/login.usecase';
import { createLoginService } from '../auth/service/login/login.factory';

import {
  ChangeDescriptionRequestSchema,
  ChangeDescriptionResponseSchema,
  createChangeDescriptionUsecase,
} from './domain/usecases/changeDescription.usecase';

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
  changeDescription: publicProcedure
    .input(ChangeDescriptionRequestSchema)
    .output(ChangeDescriptionResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const usecase = createChangeDescriptionUsecase(ctx.db);
      return await usecase.changeDescription({ id: ctx.req.id, description: input.description });
    }),
});
