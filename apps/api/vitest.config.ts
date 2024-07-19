/// <reference types="vitest" />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
  return {
    root: __dirname,

    plugins: [nxViteTsPaths()],
    envDir: './environment',
    envPrefix: 'APP',
    test: {
      globals: true,
    },
  };
});
