import { config } from '@project/api/config';
import { publicProcedure, router } from '../../trpc/trpc';
import { LoginRequestSchema, LoginResponseSchema } from '../auth/domain/usecases/login.usecase';
import {
  ConfirmEmailRequestSchema,
  ConfirmEmailResponseSchema,
  RegisterWithEmailRequestSchema,
  RegisterWithEmailResponseSchema,
} from '../auth/domain/usecases/register.usecase';
import { createLoginService } from '../auth/service/login/login.factory';
import { createRegisterService } from '../auth/service/register/register.factory';

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
  registerWithEmail: publicProcedure
    .input(RegisterWithEmailRequestSchema)
    .output(RegisterWithEmailResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createRegisterService(ctx.db, ctx.transporter);

      const baseUrl = `${ctx.req.protocol}://${ctx.req.hostname}/trpc`;

      return await service.registerWithEmail({
        email: input.email,
        password: input.password,
        baseUrl,
      });
    }),
  confirm: publicProcedure
    .input(ConfirmEmailRequestSchema)
    .output(ConfirmEmailResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createRegisterService(ctx.db, ctx.transporter);

      await service.confirm(input);

      return ctx.res.redirect(303, `${config.get('frontendUrl')}/auth/confirm`);
    }),
});
