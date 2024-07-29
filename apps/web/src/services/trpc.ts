import type { AppRouter } from '@project/api/trpc';
import { createTRPCProxyClient, createWSClient, httpLink, splitLink, wsLink } from '@trpc/client';

import { config } from '../config/app.config';

const apiUrl = new URL(config.get('apiUrl'));
const wsUrl = `ws://${apiUrl.host}${apiUrl.pathname}`;

const httpLinkClient = httpLink({
  url: apiUrl,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: 'include',
    });
  },
});
let wsClient: ReturnType<typeof createWSClient> | null = null;

export let trpcClient: ReturnType<typeof createTRPCProxyClient<AppRouter>> = createTrpcClient();

export function openWsConnection() {
  if (wsClient) return;

  wsClient = createWsClient();
  trpcClient = createTrpcClient();
}

export function closeWsConnection() {
  if (!wsClient) return;
  if (wsClient.getConnection().readyState in [WebSocket.CLOSED, WebSocket.CLOSING]) return;

  wsClient.close();
  wsClient = null;
  trpcClient = createTrpcClient();
}

function createTrpcClient(): ReturnType<typeof createTRPCProxyClient<AppRouter>> {
  if (wsClient) {
    return createTRPCProxyClient<AppRouter>({
      links: [
        splitLink({
          condition: (operation) => operation.context.useWsConnection === true,
          true: wsLink<AppRouter>({ client: wsClient }),
          false: httpLinkClient,
        }),
      ],
    });
  } else {
    return createTRPCProxyClient<AppRouter>({
      links: [httpLinkClient],
    });
  }
}

function createWsClient() {
  return createWSClient({
    url: wsUrl,
    retryDelayMs: (attemptIndex) => (attemptIndex === 0 ? 0 : 1000),
  });
}
