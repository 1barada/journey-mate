import type { AppRouter } from '@project/api/trpc';
import { createTRPCProxyClient, createWSClient, httpLink, splitLink, wsLink } from '@trpc/client';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { config } from '../config/app.config';

const apiUrl = new URL(config.get('apiUrl'));
const wsUrl = `ws://${apiUrl.host}${apiUrl.pathname}`;

const wsLinkClient = wsLink({
  client: createWSClient({ url: wsUrl }),
});
const httpLinkClient = httpLink({
  url: apiUrl,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: 'include',
    });
  },
});

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (operation) => operation.type === 'subscription',
      true: wsLinkClient,
      false: httpLinkClient,
    }),
  ],
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
