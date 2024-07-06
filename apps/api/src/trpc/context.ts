import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import '@fastify/cookie';

import { prisma } from '../database';

import { cookieSchema } from './schemas/cookieSchema';
import { cookValidation } from './utils/cookieValidation';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const log = req.log;

  const validation = cookValidation({ cookieObj: req.cookies, cookiesValidationSchema: cookieSchema });

  const validatedCookies = validation.success ? validation.data : null;

  return { req, res, log, db: prisma, validatedCookies };
}

export type Context = inferAsyncReturnType<typeof createContext>;
