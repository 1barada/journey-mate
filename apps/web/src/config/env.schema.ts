import { z } from 'zod';

/**
 * prefix APP_ is must. Can be configured in vite.config.ts file
 * see more https://vitejs.dev/guide/env-and-mode#env-files
 * */
const APP_SERVER_PORT = z.coerce.number().default(4200);
const APP_SERVER_HOST = z.string().min(1).default('localhost');
const APP_PREVIEW_SERVER_PORT = z.coerce.number().default(4300);
const APP_PREVIEW_SERVER_HOST = z.string().min(1).default('localhost');
const APP_API_URL = z.string().url().default('http://localhost:5000/trpc');
const APP_GOOGLE_MAPS_API_KEY = z.string().default('AIzaSyCCm28dWD3_IteVRce4M-nXSXejoZOKp_o');
// const APP_GOOGLE_MAPS_API_KEY = z.string().default('AIzaSyBX1z5nvjcjzyxSMT-QCVS3ERu6Y3iNSb0');

/**
 * schema with env keys needed in vite.config.ts file
 */
export const webAppEnvConfigSchema = z.object({
  APP_SERVER_PORT,
  APP_SERVER_HOST,
  APP_PREVIEW_SERVER_PORT,
  APP_PREVIEW_SERVER_HOST,
  APP_API_URL,
  APP_GOOGLE_MAPS_API_KEY,
});

// TYPES
export type WebAppEnvConfigSchema = z.infer<typeof webAppEnvConfigSchema>;
