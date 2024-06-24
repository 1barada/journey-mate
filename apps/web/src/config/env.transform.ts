import type { ViteConfigEnvVariables, WebAppEnvVariables } from './env.schema';

interface NormalizedWebbAppEnvVariables {
  apiUrl: WebAppEnvVariables['APP_API_URL'];
}
export const normalizeWebAppEnv = (env: WebAppEnvVariables): NormalizedWebbAppEnvVariables => ({
  apiUrl: env.APP_API_URL,
});

interface NormalizeViteConfigEnvVariables {
  serverPort: ViteConfigEnvVariables['APP_SERVER_PORT'];
  serverHost: ViteConfigEnvVariables['APP_SERVER_HOST'];
  previewServerPort: ViteConfigEnvVariables['APP_PREVIEW_SERVER_PORT'];
  previewServerHost: ViteConfigEnvVariables['APP_PREVIEW_SERVER_HOST'];
}
export const normalizeViteConfigEnv = (env: ViteConfigEnvVariables): NormalizeViteConfigEnvVariables => ({
  serverPort: env.APP_SERVER_PORT,
  serverHost: env.APP_SERVER_HOST,
  previewServerPort: env.APP_PREVIEW_SERVER_PORT,
  previewServerHost: env.APP_PREVIEW_SERVER_HOST,
});
