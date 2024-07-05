import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { prisma } from '../database';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const log = req.log;
  const cookies = req.cookies;

  return { req, res, log, db: prisma, cookies };
}

export type Context = inferAsyncReturnType<typeof createContext>;
