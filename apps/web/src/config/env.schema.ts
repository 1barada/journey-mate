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
const APP_CLOUDINARY_NAME = z.string().default('dyttdvqkh');
const APP_CLOUDINARY_API_KEY = z.string().default('267227526988974');
const APP_CLOUDINARY_API_SECRET = z.string().default('PomZ3p4uXhxrErrWU6k6WeQt8RY');
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
  APP_CLOUDINARY_NAME,
  APP_CLOUDINARY_API_KEY,
  APP_CLOUDINARY_API_SECRET,
});

// TYPES
export type WebAppEnvConfigSchema = z.infer<typeof webAppEnvConfigSchema>;
