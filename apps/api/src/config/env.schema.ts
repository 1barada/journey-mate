import { z } from 'zod';

const SERVER_PORT = z.coerce.number().readonly().default(5000);
const SERVER_HOST = z.string().min(1).readonly().default('localhost');
const SERVER_CONFIG_FILE_PATH = z.string().url().readonly();

/**
 * schema with env keys needed for server app
 */
export const serverAppEnvSchema = z.object({
  SERVER_PORT,
  SERVER_HOST,
  SERVER_CONFIG_FILE_PATH,
});
/**
 * server app config schema
 */
export const serverAppConfigSchema = z.object({
  aa: z.string().min(1),
});

// TYPES
export type ServerAppEnvVariables = Readonly<z.infer<typeof serverAppEnvSchema>>;
export type ServerAppConfig = Readonly<z.infer<typeof serverAppConfigSchema>>;
