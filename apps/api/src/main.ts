import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { envConfig } from '../env.config';

import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';
import { server } from './server';

const host = envConfig.get('host');
const port = envConfig.get('port');

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
