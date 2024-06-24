import { z } from 'zod';

/**
 * prefix APP_ is must. Can be configured in vite.config.ts file
 * see more https://vitejs.dev/guide/env-and-mode#env-files
 * */
const APP_SERVER_PORT = z.coerce.number().readonly().default(4200);
const APP_SERVER_HOST = z.string().min(1).readonly().default('localhost');
const APP_PREVIEW_SERVER_PORT = z.coerce.number().readonly().default(4300);
const APP_PREVIEW_SERVER_HOST = z.string().min(1).readonly().default('localhost');
const APP_API_URL = z.string().url().readonly();

/**
 * schema with env keys needed in vite.config.ts file
 */
export const viteConfigEnvSchema = z.object({
  APP_SERVER_PORT,
  APP_SERVER_HOST,
  APP_PREVIEW_SERVER_PORT,
  APP_PREVIEW_SERVER_HOST,
});
/**
 * schema with env keys needed in vite.config.ts file
 */
export const appConfigEnvSchema = z.object({
  APP_API_URL,
});

// TYPES
export type AppEnvVariables = z.infer<typeof appConfigEnvSchema>;
export type ViteConfigEnvVariables = z.infer<typeof viteConfigEnvSchema>;
