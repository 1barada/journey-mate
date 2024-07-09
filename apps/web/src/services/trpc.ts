import type { AppRouter } from '@project/api/trpc';
import { createTRPCProxyClient, httpLink } from '@trpc/client';

import { config } from '../config/app.config';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: config.get('apiUrl'),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
