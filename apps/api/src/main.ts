import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';
import { server } from './server';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

await server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
