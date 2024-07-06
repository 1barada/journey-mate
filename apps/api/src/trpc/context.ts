import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import '@fastify/cookie';

import { prisma } from '../database';
import { roles } from '../permissions/permissions';

import { cookieSchema } from './schemas/cookieSchema';
import { cookiesValidation } from './utils/cookieValidation';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const log = req.log;

  const validation = cookiesValidation({ cookieObj: req.cookies, cookiesValidationSchema: cookieSchema });

  const validatedCookies = validation.success ? validation.data : null;
  const userTokenData: null | { userId: string; userRole: roles } = null;

  return { req, res, log, db: prisma, validatedCookies, userTokenData };
}

export type Context = inferAsyncReturnType<typeof createContext>;
