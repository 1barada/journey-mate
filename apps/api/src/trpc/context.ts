import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { prisma } from '../database';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const log = req.log;

  return { req, res, log, db: prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
