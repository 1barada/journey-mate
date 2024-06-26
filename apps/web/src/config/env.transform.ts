import type { WebAppEnvConfigSchema } from './env.schema';

interface NormalizedWebAppEnvConfig {
  serverPort: WebAppEnvConfigSchema['APP_SERVER_PORT'];
  serverHost: WebAppEnvConfigSchema['APP_SERVER_HOST'];
  previewServerPort: WebAppEnvConfigSchema['APP_PREVIEW_SERVER_PORT'];
  previewServerHost: WebAppEnvConfigSchema['APP_PREVIEW_SERVER_HOST'];
  apiUrl: WebAppEnvConfigSchema['APP_API_URL'];
}
export const normalizeWebAppEnvConfig = (env: WebAppEnvConfigSchema): NormalizedWebAppEnvConfig => ({
  serverPort: env.APP_SERVER_PORT,
  serverHost: env.APP_SERVER_HOST,
  previewServerPort: env.APP_PREVIEW_SERVER_PORT,
  previewServerHost: env.APP_PREVIEW_SERVER_HOST,
  apiUrl: env.APP_API_URL,
});
