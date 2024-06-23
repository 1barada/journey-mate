import type { AppRouter } from '@project/api/trpc';
import { createTRPCProxyClient, httpLink } from '@trpc/client';

import { envConfig } from '../../env.config';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpLink({ url: envConfig.get('apiUrl') })],
});
