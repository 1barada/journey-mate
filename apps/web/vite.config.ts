/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

import { viteConfigEnvSchema } from './src/config/env.schema';
import { normalizeViteConfigEnv } from './src/config/env.transform';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, 'environment');
  const env = viteConfigEnvSchema.parse(loadEnv(mode, envDir, ''));
  const { serverHost, serverPort, previewServerPort, previewServerHost } = normalizeViteConfigEnv(env);

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

    plugins: [react(), nxViteTsPaths()],
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
