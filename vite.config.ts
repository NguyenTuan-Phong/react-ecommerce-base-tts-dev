import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://113.161.103.134:8050',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api'), // giữ nguyên /api
    //   },
    // },
  },
  plugins: [react(), tailwindcss()],
  // base: '/react-ecommerce-base-tts/',
  assetsInclude: ['**/*.lottie'],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
