import type { AppRouter } from '@project/api/trpc';
import { createTRPCProxyClient, httpLink } from '@trpc/client';

import { config } from '../config/app.config';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpLink({ url: config.get('apiUrl') })],
});
