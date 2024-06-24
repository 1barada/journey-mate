import type { AppEnvVariables, ViteConfigEnvVariables } from './env.schema';

interface NormalizedAppEnvVariables {
  apiUrl: AppEnvVariables['APP_API_URL'];
}
export const normalizeAppEnv = (env: AppEnvVariables): NormalizedAppEnvVariables => ({
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
