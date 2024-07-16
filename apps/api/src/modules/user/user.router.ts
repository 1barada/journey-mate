import { config } from '@project/api/config';

import { authenticateProcedure, publicProcedure, router } from '../../trpc/trpc';
import { LoginRequestSchema, LoginResponseSchema } from '../auth/domain/usecases/login.usecase';
import {
  ConfirmEmailRequestSchema,
  ConfirmEmailResponseSchema,
  RegisterWithEmailRequestSchema,
  RegisterWithEmailResponseSchema,
} from '../auth/domain/usecases/register.usecase';
import { WhoAmIResponseSchema } from '../auth/domain/usecases/whoami.usecase';
import { createLoginService } from '../auth/service/login/login.factory';
import { createRegisterService } from '../auth/service/register/register.factory';
import { createWhoamiService } from '../auth/service/whoami/whoami.factory';

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
  confirm: publicProcedure.output(ConfirmEmailResponseSchema).query(async ({ ctx }) => {
    const query = ConfirmEmailRequestSchema.parse(ctx.req.query);
    const service = createRegisterService(ctx.db, ctx.transporter);

    await service.confirm(query);

    return ctx.res.redirect(303, `${config.get('frontendUrl')}/auth/confirm`);
  }),
  whoami: authenticateProcedure.output(WhoAmIResponseSchema).query(async ({ ctx }) => {
    const service = createWhoamiService(ctx.db);

    const email = ctx.userTokenData.userEmail;
    const role = ctx.userTokenData.userRole;

    return await service.whoami({ email, role });
  }),
});
