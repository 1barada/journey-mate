import { fastifyCookie, FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';
import ws from '@fastify/websocket';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import 'dotenv/config';

import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';
import { config } from './config';
import { server } from './server';

const host = config.get('host');
const port = config.get('port');

// const origin = config.get('frontendUrl');

// server.register(cors, {
//   origin: [origin],
//   credentials: true,
// });

if (config.get('nodeEnv') === 'development') {
  server.register(cors, {
    origin: ['*'],
    credentials: true,
  });
}

server.register(fastifyCookie, {
  hook: 'onRequest',
  parseOptions: {
    httpOnly: false,
    secure: false,
    path: '/',
    sameSite: false,
    maxAge: 60_4800,
  },
} as FastifyCookieOptions);

server.register(ws);

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
  useWSS: true,
});

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
