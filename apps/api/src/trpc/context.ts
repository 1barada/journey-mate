import { Role } from '@project/permissions';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import '@fastify/cookie';

import { prisma } from '../database';
import { transporter } from '../transporter';

import { cookieSchema } from './schemas/cookieSchema';
import { cookiesValidation } from './utils/cookieValidation';
import { UserTokenDataTypes } from './types';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const log = req.log;

  const validation = cookiesValidation({ cookieObj: req.cookies, cookiesValidationSchema: cookieSchema });

  const validatedCookies = validation.success ? validation.data : null;
  const userTokenData: UserTokenDataTypes = {
    userId: null,
    userRole: Role.Guest,
    userEmail: null,
  };

  return { req, res, log, db: prisma, validatedCookies, userTokenData, transporter };
}

export type Context = inferAsyncReturnType<typeof createContext>;
