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
import {
  RestorePasswordRouteRequestSchema,
  RestorePasswordRouteResponseSchema,
} from '../auth/domain/usecases/restorePassword.usecase';
import {
  RestorePasswordViaEmailRequestSchema,
  RestorePasswordViaEmailResponseSchema,
} from '../auth/domain/usecases/restorePasswordViaEmail.usecase';
import { WhoAmIResponseSchema } from '../auth/domain/usecases/whoami.usecase';
import { createGoogleAuthService } from '../auth/service/googleAuth/googleAuth.factory';
import { createLoginService } from '../auth/service/login/login.factory';
import { createRegisterService } from '../auth/service/register/register.factory';
import { createRestorePasswordService } from '../auth/service/restorePassword/restore-password.factory';
import { createWhoamiService } from '../auth/service/whoami/whoami.factory';

import { UserNotFoundError } from './domain/errors/user-not-found.error';
import {
  ChangeDescriptionInputSchema,
  ChangeDescriptionResponseSchema,
} from './domain/usecases/changeDescription.usecase';
import { ChangeProfileRequestInput, ChangeProfileResponseSchema } from './domain/usecases/changeUserProfile.usecase';
import { GetUserRequestSchema, GetUserResponceSchema } from './domain/usecases/getUser.usecase';
import { UpdateUserAvatarRequestInput, UpdateUserAvatarResponseSchema } from './domain/usecases/updateAvatar.usecase';
import { createChangeDescriptionUsecase } from './service/changeDescription/changeDescription.factory';
import { createChangeUserProfileUsecase } from './service/changeUserProfile/changeUserProfile.factory';
import { createGetUserUsecase } from './service/getUser/getUser.factory';
import { createUpdateAvatarUseCase } from './service/updateAvatar/updateAvatar.factory';

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return [{ id: 1, name: 'user1' }];
  }),
  login: publicProcedure
    .input(LoginRequestSchema)
    .output(LoginRouterResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createLoginService(ctx.db);

      const { token } = await service.login(input);

      ctx.res.setCookie('access-token', token);
      return;
    }),
  changeDescription: authenticateProcedure
    .input(ChangeDescriptionInputSchema)
    .output(ChangeDescriptionResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const usecase = createChangeDescriptionUsecase(ctx.db);
      if (ctx.userTokenData && ctx.userTokenData.userId) {
        try {
          const result = await usecase.changeDescription({
            id: Number(ctx.userTokenData.userId),
            description: input.description,
          });
          return result;
        } catch (error) {
          throw UserNotFoundError;
        }
      }

      throw UserNotFoundError;
    }),
  changeProfileData: authenticateProcedure
    .input(ChangeProfileRequestInput)
    .output(ChangeProfileResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const usecase = createChangeUserProfileUsecase(ctx.db);

      if (ctx.userTokenData && ctx.userTokenData.userId) {
        try {
          const result = await usecase.changeProfileData({
            id: Number(ctx.userTokenData.userId),
            dateOfBirth: input.dateOfBirth,
            email: input.email,
            name: input.name,
            sex: input.sex,
          });
          return result;
        } catch (error) {
          throw UserNotFoundError;
        }
      }

      throw UserNotFoundError;
    }),
  changeAvatar: authenticateProcedure
    .input(UpdateUserAvatarRequestInput)
    .output(UpdateUserAvatarResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const usecase = createUpdateAvatarUseCase(ctx.db);

      if (ctx.userTokenData && ctx.userTokenData.userId) {
        try {
          const updatedUser = await usecase.updateUserAvatar({
            id: Number(ctx.userTokenData.userId),
            avatarUrl: input.avatarUrl,
          });

          return updatedUser;
        } catch (error) {
          throw UserNotFoundError;
        }
      }
      throw UserNotFoundError;
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

      ctx.res.setCookie('access-token', token);

      return user;
    }),
  getUser: publicProcedure
    .input(GetUserResponceSchema)
    .output(GetUserRequestSchema)
    .query(async ({ input, ctx }) => {
      const service = createGetUserUsecase(ctx.db);
      console.log(input);
      const user = service.getUser({ id: input.id });

      return user;
    }),
  restorePasswordViaEmailRequest: publicProcedure
    .input(RestorePasswordViaEmailRequestSchema)
    .output(RestorePasswordViaEmailResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { email } = input;
      const service = createRestorePasswordService(ctx.db, ctx.transporter);

      await service.restorePasswordEmail({ email });

      return;
    }),
  restorePasswordViaEmail: publicProcedure
    .input(RestorePasswordRouteRequestSchema)
    .output(RestorePasswordRouteResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const { newPassword, restoreToken } = input;

      const service = createRestorePasswordService(ctx.db, ctx.transporter);

      const response = await service.restorePassword({ newPassword, restoreToken });

      return response;
    }),
});
