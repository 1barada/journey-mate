import type { ServerAppEnvVariables } from './env.schema';

interface NormalizeServerAppEnvVariables {
  port: ServerAppEnvVariables['SERVER_PORT'];
  host: ServerAppEnvVariables['SERVER_HOST'];
  configUrl: ServerAppEnvVariables['SERVER_CONFIG_FILE_PATH'];
}
export const normalizeServerAppEnv = (env: ServerAppEnvVariables): NormalizeServerAppEnvVariables => ({
  port: env.SERVER_PORT,
  host: env.SERVER_HOST,
  configUrl: env.SERVER_CONFIG_FILE_PATH,
});
