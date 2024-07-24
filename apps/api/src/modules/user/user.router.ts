import { config } from '@project/api/config';

import { authenticateProcedure, publicProcedure, router } from '../../trpc/trpc';
import { GoogleAuthRequestSchema, GoogleAuthResponseSchema } from '../auth/domain/usecases/googleAuth.usecase';
import { LoginRequestSchema, LoginRouterResponseSchema } from '../auth/domain/usecases/login.usecase';
import {
  ConfirmEmailRequestSchema,
  ConfirmEmailResponseSchema,
  RegisterWithEmailRequestSchema,
  RegisterWithEmailResponseSchema,
} from '../auth/domain/usecases/register.usecase';
import { WhoAmIResponseSchema } from '../auth/domain/usecases/whoami.usecase';
import { createGoogleAuthService } from '../auth/service/googleAuth/googleAuth.factory';
import { createLoginService } from '../auth/service/login/login.factory';
import { createRegisterService } from '../auth/service/register/register.factory';
import { createWhoamiService } from '../auth/service/whoami/whoami.factory';

import {
  ChangeDescriptionInputSchema,
  ChangeDescriptionResponseSchema,
  createChangeDescriptionUsecase,
} from './domain/usecases/changeDescription.usecase';
import { ChangeProfileRequestSchema, ChangeProfileResponseSchema } from './domain/usecases/changeUserProfile.usecase';

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return [{ id: 1, name: 'user1' }];
  }),
  login: publicProcedure
    .input(LoginRequestSchema)
    .output(LoginRouterResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createLoginService(ctx.db);

      const { user, token } = await service.login(input);

      ctx.res.setCookie('access-token', token);
      return user;
    }),
  changeDescription: publicProcedure
    .input(ChangeDescriptionInputSchema)
    .output(ChangeDescriptionResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const usecase = createChangeDescriptionUsecase(ctx.db);
      if (ctx.userTokenData && ctx.userTokenData.userId) {
        try {
          const result = await usecase.changeDescription({
            id: ctx.userTokenData.userId.toString(),
            description: input.description,
          });
          return result;
        } catch (error) {
          console.error('Error in usecase.changeDescription:', error);
          throw new Error('Failed to change description');
        }
      }

      throw new Error('User ID not found in token data');
    }),
  // changeProfileData: publicProcedure
  //   .input(ChangeProfileRequestSchema)
  //   .output(ChangeProfileResponseSchema)
  //   .mutation(async ({ input, ctx }) => {
  //     console.log(input);
  //     console.log(ctx);

  //     return input;
  //   }),
  changeAvatar: publicProcedure
    // .input()
    // .output()
    .mutation(async ({ input }) => {
      console.log(input);
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
  googleAuth: publicProcedure
    .input(GoogleAuthRequestSchema)
    .output(GoogleAuthResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createGoogleAuthService(ctx.db);
      const { user, token } = await service.googleAuth(input.token);

      ctx.res.setCookie('access-token', token, { signed: true });
      return user;
    }),
});
