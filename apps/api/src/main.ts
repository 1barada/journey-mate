import { fastifyCookie, FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import 'dotenv/config';

import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';
import { config } from './config';
import { server } from './server';

const host = config.get('host');
const port = config.get('port');

server.register(cors, {
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : `${host}:${port}`,
  credentials: true,
});

server.register(fastifyCookie, {
  hook: 'onRequest',
} as FastifyCookieOptions);

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
