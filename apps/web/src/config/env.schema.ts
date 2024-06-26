import { z } from 'zod';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * prefix APP_ is must. Can be configured in vite.config.ts file
 * see more https://vitejs.dev/guide/env-and-mode#env-files
 * */
const APP_SERVER_PORT = z.coerce.number().readonly();
const APP_SERVER_HOST = z.string().min(1).readonly();
const APP_PREVIEW_SERVER_PORT = z.coerce.number().readonly();
const APP_PREVIEW_SERVER_HOST = z.string().min(1).readonly();
const APP_API_URL = z.string().url().readonly();

if (isDevelopment) {
  APP_SERVER_PORT.default(4200);
  APP_PREVIEW_SERVER_PORT.default(4300);
  APP_SERVER_HOST.default('localhost');
  APP_PREVIEW_SERVER_HOST.default('localhost');
  APP_API_URL.default('http://localhost:5000/trcp');
}

/**
 * schema with env keys needed in vite.config.ts file
 */
export const webAppEnvConfigSchema = z.object({
  APP_SERVER_PORT,
  APP_SERVER_HOST,
  APP_PREVIEW_SERVER_PORT,
  APP_PREVIEW_SERVER_HOST,
  APP_API_URL,
});

// TYPES
export type WebAppEnvConfigSchema = z.infer<typeof webAppEnvConfigSchema>;
