import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'smit-test-org',
      project: 'javascript-react',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: ['**.js.map'],
      },
    }),
  ],

  // additional configuration for absolute path
  resolve: {
    alias: {
      src: '/src',
    },
  },

  build: {
    sourcemap: true,
  },
});
