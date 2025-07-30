import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
  plugins: [
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.lottie'],
})
