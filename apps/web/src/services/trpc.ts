import type { AppRouter } from '@project/api/trpc';
import { createTRPCProxyClient, httpLink } from '@trpc/client';

export const trpc = createTRPCProxyClient<AppRouter>({
  // TODO: take api url from config (config gets it from .env)
  links: [httpLink({ url: 'http://localhost:5000' })],
});
