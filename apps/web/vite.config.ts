/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

import { webAppEnvConfigSchema } from './src/config/env.schema';
import { normalizeWebAppEnvConfig } from './src/config/env.transform';

export default defineConfig(async ({ mode }) => {
  const envDir = path.resolve(__dirname, 'environment');
  const envValidation = webAppEnvConfigSchema.safeParse(loadEnv(mode, envDir, ''));

  if (!envValidation.success) {
    console.error('Please, setup all necessary env variables\n', envValidation.error);
    process.exit(1);
  }

  const env = envValidation.data;
  const { serverHost, serverPort, previewServerPort, previewServerHost } = normalizeWebAppEnvConfig(env);

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/web',

    server: {
      port: serverPort,
      host: serverHost,
    },

    preview: {
      port: previewServerPort,
      host: previewServerHost,
    },
    optimizeDeps: {
      include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      nxViteTsPaths(),
    ],
    envDir: './environment',
    envPrefix: 'APP',
    build: {
      outDir: '../../dist/apps/web',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
