// apps/web/vite.config.ts
import { nxViteTsPaths } from "file:///E:/it/Eliftech/eliftech-school-project-2024/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
import react from "file:///E:/it/Eliftech/eliftech-school-project-2024/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { defineConfig, loadEnv } from "file:///E:/it/Eliftech/eliftech-school-project-2024/node_modules/vite/dist/node/index.js";

// apps/web/src/config/env.schema.ts
import { z } from "file:///E:/it/Eliftech/eliftech-school-project-2024/node_modules/zod/lib/index.mjs";
var APP_SERVER_PORT = z.coerce.number().default(4200);
var APP_SERVER_HOST = z.string().min(1).default("localhost");
var APP_PREVIEW_SERVER_PORT = z.coerce.number().default(4300);
var APP_PREVIEW_SERVER_HOST = z.string().min(1).default("localhost");
var APP_API_URL = z.string().url().default("http://localhost:5000/trpc");
var APP_GOOGLE_MAPS_API_KEY = z.string().default("AIzaSyBX1z5nvjcjzyxSMT-QCVS3ERu6Y3iNSb0");
var webAppEnvConfigSchema = z.object({
  APP_SERVER_PORT,
  APP_SERVER_HOST,
  APP_PREVIEW_SERVER_PORT,
  APP_PREVIEW_SERVER_HOST,
  APP_API_URL,
  APP_GOOGLE_MAPS_API_KEY
});

// apps/web/src/config/env.transform.ts
var normalizeWebAppEnvConfig = (env) => ({
  serverPort: env.APP_SERVER_PORT,
  serverHost: env.APP_SERVER_HOST,
  previewServerPort: env.APP_PREVIEW_SERVER_PORT,
  previewServerHost: env.APP_PREVIEW_SERVER_HOST,
  apiUrl: env.APP_API_URL,
  googleMapsApiKey: env.APP_GOOGLE_MAPS_API_KEY
});

// apps/web/vite.config.ts
var __vite_injected_original_dirname = "E:\\it\\Eliftech\\eliftech-school-project-2024\\apps\\web";
var vite_config_default = defineConfig(async ({ mode }) => {
  const envDir = path.resolve(__vite_injected_original_dirname, "environment");
  const envValidation = webAppEnvConfigSchema.safeParse(loadEnv(mode, envDir, ""));
  if (!envValidation.success) {
    console.error("Please, setup all necessary env variables\n", envValidation.error);
    process.exit(1);
  }
  const env = envValidation.data;
  const { serverHost, serverPort, previewServerPort, previewServerHost } = normalizeWebAppEnvConfig(env);
  return {
    root: __vite_injected_original_dirname,
    cacheDir: "../../node_modules/.vite/apps/web",
    server: {
      port: serverPort,
      host: serverHost
    },
    preview: {
      port: previewServerPort,
      host: previewServerHost
    },
    plugins: [react(), nxViteTsPaths()],
    envDir: "./environment",
    envPrefix: "APP",
    build: {
      outDir: "../../dist/apps/web",
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy93ZWIvdml0ZS5jb25maWcudHMiLCAiYXBwcy93ZWIvc3JjL2NvbmZpZy9lbnYuc2NoZW1hLnRzIiwgImFwcHMvd2ViL3NyYy9jb25maWcvZW52LnRyYW5zZm9ybS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGl0XFxcXEVsaWZ0ZWNoXFxcXGVsaWZ0ZWNoLXNjaG9vbC1wcm9qZWN0LTIwMjRcXFxcYXBwc1xcXFx3ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGl0XFxcXEVsaWZ0ZWNoXFxcXGVsaWZ0ZWNoLXNjaG9vbC1wcm9qZWN0LTIwMjRcXFxcYXBwc1xcXFx3ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2l0L0VsaWZ0ZWNoL2VsaWZ0ZWNoLXNjaG9vbC1wcm9qZWN0LTIwMjQvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz0ndml0ZXN0JyAvPlxyXG5pbXBvcnQgeyBueFZpdGVUc1BhdGhzIH0gZnJvbSAnQG54L3ZpdGUvcGx1Z2lucy9ueC10c2NvbmZpZy1wYXRocy5wbHVnaW4nO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuXHJcbmltcG9ydCB7IHdlYkFwcEVudkNvbmZpZ1NjaGVtYSB9IGZyb20gJy4vc3JjL2NvbmZpZy9lbnYuc2NoZW1hJztcclxuaW1wb3J0IHsgbm9ybWFsaXplV2ViQXBwRW52Q29uZmlnIH0gZnJvbSAnLi9zcmMvY29uZmlnL2Vudi50cmFuc2Zvcm0nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudkRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdlbnZpcm9ubWVudCcpO1xyXG4gIGNvbnN0IGVudlZhbGlkYXRpb24gPSB3ZWJBcHBFbnZDb25maWdTY2hlbWEuc2FmZVBhcnNlKGxvYWRFbnYobW9kZSwgZW52RGlyLCAnJykpO1xyXG5cclxuICBpZiAoIWVudlZhbGlkYXRpb24uc3VjY2Vzcykge1xyXG4gICAgY29uc29sZS5lcnJvcignUGxlYXNlLCBzZXR1cCBhbGwgbmVjZXNzYXJ5IGVudiB2YXJpYWJsZXNcXG4nLCBlbnZWYWxpZGF0aW9uLmVycm9yKTtcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGVudiA9IGVudlZhbGlkYXRpb24uZGF0YTtcclxuICBjb25zdCB7IHNlcnZlckhvc3QsIHNlcnZlclBvcnQsIHByZXZpZXdTZXJ2ZXJQb3J0LCBwcmV2aWV3U2VydmVySG9zdCB9ID0gbm9ybWFsaXplV2ViQXBwRW52Q29uZmlnKGVudik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByb290OiBfX2Rpcm5hbWUsXHJcbiAgICBjYWNoZURpcjogJy4uLy4uL25vZGVfbW9kdWxlcy8udml0ZS9hcHBzL3dlYicsXHJcblxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IHNlcnZlclBvcnQsXHJcbiAgICAgIGhvc3Q6IHNlcnZlckhvc3QsXHJcbiAgICB9LFxyXG5cclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgcG9ydDogcHJldmlld1NlcnZlclBvcnQsXHJcbiAgICAgIGhvc3Q6IHByZXZpZXdTZXJ2ZXJIb3N0LFxyXG4gICAgfSxcclxuXHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgbnhWaXRlVHNQYXRocygpXSxcclxuICAgIGVudkRpcjogJy4vZW52aXJvbm1lbnQnLFxyXG4gICAgZW52UHJlZml4OiAnQVBQJyxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJy4uLy4uL2Rpc3QvYXBwcy93ZWInLFxyXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXHJcbiAgICAgIGNvbW1vbmpzT3B0aW9uczoge1xyXG4gICAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxpdFxcXFxFbGlmdGVjaFxcXFxlbGlmdGVjaC1zY2hvb2wtcHJvamVjdC0yMDI0XFxcXGFwcHNcXFxcd2ViXFxcXHNyY1xcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGl0XFxcXEVsaWZ0ZWNoXFxcXGVsaWZ0ZWNoLXNjaG9vbC1wcm9qZWN0LTIwMjRcXFxcYXBwc1xcXFx3ZWJcXFxcc3JjXFxcXGNvbmZpZ1xcXFxlbnYuc2NoZW1hLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9pdC9FbGlmdGVjaC9lbGlmdGVjaC1zY2hvb2wtcHJvamVjdC0yMDI0L2FwcHMvd2ViL3NyYy9jb25maWcvZW52LnNjaGVtYS50c1wiO2ltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xyXG5cclxuLyoqXHJcbiAqIHByZWZpeCBBUFBfIGlzIG11c3QuIENhbiBiZSBjb25maWd1cmVkIGluIHZpdGUuY29uZmlnLnRzIGZpbGVcclxuICogc2VlIG1vcmUgaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2Vudi1hbmQtbW9kZSNlbnYtZmlsZXNcclxuICogKi9cclxuY29uc3QgQVBQX1NFUlZFUl9QT1JUID0gei5jb2VyY2UubnVtYmVyKCkuZGVmYXVsdCg0MjAwKTtcclxuY29uc3QgQVBQX1NFUlZFUl9IT1NUID0gei5zdHJpbmcoKS5taW4oMSkuZGVmYXVsdCgnbG9jYWxob3N0Jyk7XHJcbmNvbnN0IEFQUF9QUkVWSUVXX1NFUlZFUl9QT1JUID0gei5jb2VyY2UubnVtYmVyKCkuZGVmYXVsdCg0MzAwKTtcclxuY29uc3QgQVBQX1BSRVZJRVdfU0VSVkVSX0hPU1QgPSB6LnN0cmluZygpLm1pbigxKS5kZWZhdWx0KCdsb2NhbGhvc3QnKTtcclxuY29uc3QgQVBQX0FQSV9VUkwgPSB6LnN0cmluZygpLnVybCgpLmRlZmF1bHQoJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC90cnBjJyk7XHJcbmNvbnN0IEFQUF9HT09HTEVfTUFQU19BUElfS0VZID0gei5zdHJpbmcoKS5kZWZhdWx0KCdBSXphU3lCWDF6NW52amNqenl4U01ULVFDVlMzRVJ1NlkzaU5TYjAnKTtcclxuXHJcbi8qKlxyXG4gKiBzY2hlbWEgd2l0aCBlbnYga2V5cyBuZWVkZWQgaW4gdml0ZS5jb25maWcudHMgZmlsZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdlYkFwcEVudkNvbmZpZ1NjaGVtYSA9IHoub2JqZWN0KHtcclxuICBBUFBfU0VSVkVSX1BPUlQsXHJcbiAgQVBQX1NFUlZFUl9IT1NULFxyXG4gIEFQUF9QUkVWSUVXX1NFUlZFUl9QT1JULFxyXG4gIEFQUF9QUkVWSUVXX1NFUlZFUl9IT1NULFxyXG4gIEFQUF9BUElfVVJMLFxyXG4gIEFQUF9HT09HTEVfTUFQU19BUElfS0VZLFxyXG59KTtcclxuXHJcbi8vIFRZUEVTXHJcbmV4cG9ydCB0eXBlIFdlYkFwcEVudkNvbmZpZ1NjaGVtYSA9IHouaW5mZXI8dHlwZW9mIHdlYkFwcEVudkNvbmZpZ1NjaGVtYT47XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcaXRcXFxcRWxpZnRlY2hcXFxcZWxpZnRlY2gtc2Nob29sLXByb2plY3QtMjAyNFxcXFxhcHBzXFxcXHdlYlxcXFxzcmNcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxpdFxcXFxFbGlmdGVjaFxcXFxlbGlmdGVjaC1zY2hvb2wtcHJvamVjdC0yMDI0XFxcXGFwcHNcXFxcd2ViXFxcXHNyY1xcXFxjb25maWdcXFxcZW52LnRyYW5zZm9ybS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovaXQvRWxpZnRlY2gvZWxpZnRlY2gtc2Nob29sLXByb2plY3QtMjAyNC9hcHBzL3dlYi9zcmMvY29uZmlnL2Vudi50cmFuc2Zvcm0udHNcIjtpbXBvcnQgdHlwZSB7IFdlYkFwcEVudkNvbmZpZ1NjaGVtYSB9IGZyb20gJy4vZW52LnNjaGVtYSc7XHJcblxyXG5pbnRlcmZhY2UgTm9ybWFsaXplZFdlYkFwcEVudkNvbmZpZyB7XHJcbiAgc2VydmVyUG9ydDogV2ViQXBwRW52Q29uZmlnU2NoZW1hWydBUFBfU0VSVkVSX1BPUlQnXTtcclxuICBzZXJ2ZXJIb3N0OiBXZWJBcHBFbnZDb25maWdTY2hlbWFbJ0FQUF9TRVJWRVJfSE9TVCddO1xyXG4gIHByZXZpZXdTZXJ2ZXJQb3J0OiBXZWJBcHBFbnZDb25maWdTY2hlbWFbJ0FQUF9QUkVWSUVXX1NFUlZFUl9QT1JUJ107XHJcbiAgcHJldmlld1NlcnZlckhvc3Q6IFdlYkFwcEVudkNvbmZpZ1NjaGVtYVsnQVBQX1BSRVZJRVdfU0VSVkVSX0hPU1QnXTtcclxuICBhcGlVcmw6IFdlYkFwcEVudkNvbmZpZ1NjaGVtYVsnQVBQX0FQSV9VUkwnXTtcclxuICBnb29nbGVNYXBzQXBpS2V5OiBXZWJBcHBFbnZDb25maWdTY2hlbWFbJ0FQUF9HT09HTEVfTUFQU19BUElfS0VZJ107XHJcbn1cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVdlYkFwcEVudkNvbmZpZyA9IChlbnY6IFdlYkFwcEVudkNvbmZpZ1NjaGVtYSk6IE5vcm1hbGl6ZWRXZWJBcHBFbnZDb25maWcgPT4gKHtcclxuICBzZXJ2ZXJQb3J0OiBlbnYuQVBQX1NFUlZFUl9QT1JULFxyXG4gIHNlcnZlckhvc3Q6IGVudi5BUFBfU0VSVkVSX0hPU1QsXHJcbiAgcHJldmlld1NlcnZlclBvcnQ6IGVudi5BUFBfUFJFVklFV19TRVJWRVJfUE9SVCxcclxuICBwcmV2aWV3U2VydmVySG9zdDogZW52LkFQUF9QUkVWSUVXX1NFUlZFUl9IT1NULFxyXG4gIGFwaVVybDogZW52LkFQUF9BUElfVVJMLFxyXG4gIGdvb2dsZU1hcHNBcGlLZXk6IGVudi5BUFBfR09PR0xFX01BUFNfQVBJX0tFWSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsY0FBYyxlQUFlOzs7QUNKdVYsU0FBUyxTQUFTO0FBTS9ZLElBQU0sa0JBQWtCLEVBQUUsT0FBTyxPQUFPLEVBQUUsUUFBUSxJQUFJO0FBQ3RELElBQU0sa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLFFBQVEsV0FBVztBQUM3RCxJQUFNLDBCQUEwQixFQUFFLE9BQU8sT0FBTyxFQUFFLFFBQVEsSUFBSTtBQUM5RCxJQUFNLDBCQUEwQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxRQUFRLFdBQVc7QUFDckUsSUFBTSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLDRCQUE0QjtBQUN6RSxJQUFNLDBCQUEwQixFQUFFLE9BQU8sRUFBRSxRQUFRLHlDQUF5QztBQUtyRixJQUFNLHdCQUF3QixFQUFFLE9BQU87QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsQ0FBQzs7O0FDYk0sSUFBTSwyQkFBMkIsQ0FBQyxTQUEyRDtBQUFBLEVBQ2xHLFlBQVksSUFBSTtBQUFBLEVBQ2hCLFlBQVksSUFBSTtBQUFBLEVBQ2hCLG1CQUFtQixJQUFJO0FBQUEsRUFDdkIsbUJBQW1CLElBQUk7QUFBQSxFQUN2QixRQUFRLElBQUk7QUFBQSxFQUNaLGtCQUFrQixJQUFJO0FBQ3hCOzs7QUZqQkEsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhLE9BQU8sRUFBRSxLQUFLLE1BQU07QUFDOUMsUUFBTSxTQUFTLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQ3BELFFBQU0sZ0JBQWdCLHNCQUFzQixVQUFVLFFBQVEsTUFBTSxRQUFRLEVBQUUsQ0FBQztBQUUvRSxNQUFJLENBQUMsY0FBYyxTQUFTO0FBQzFCLFlBQVEsTUFBTSwrQ0FBK0MsY0FBYyxLQUFLO0FBQ2hGLFlBQVEsS0FBSyxDQUFDO0FBQUEsRUFDaEI7QUFFQSxRQUFNLE1BQU0sY0FBYztBQUMxQixRQUFNLEVBQUUsWUFBWSxZQUFZLG1CQUFtQixrQkFBa0IsSUFBSSx5QkFBeUIsR0FBRztBQUVyRyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFFVixRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUVBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUEsSUFDbEMsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2Isc0JBQXNCO0FBQUEsTUFDdEIsaUJBQWlCO0FBQUEsUUFDZix5QkFBeUI7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
