import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { config } from './config/app.config';
import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';
import { server } from './server';

const host = config.get('host');
const port = config.get('port');

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
