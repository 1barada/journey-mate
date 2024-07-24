import { Role } from '@project/permissions';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import '@fastify/cookie';

import { prisma } from '../database';
import { server } from '../server';
import { transporter } from '../transporter';

import { cookiesValidation } from './utils/cookieValidation';
import { UserTokenDataTypes } from './types';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const log = req.log || server.log;
  const cookies = req.cookies || server.parseCookie(req.headers.cookie || '');

  const validatedCookies = cookiesValidation(cookies);

  const userTokenData: UserTokenDataTypes = {
    userId: null,
    userRole: Role.Guest,
    userEmail: null,
  };

  return { req, res, log, db: prisma, validatedCookies, userTokenData, transporter };
}

export type Context = inferAsyncReturnType<typeof createContext>;
