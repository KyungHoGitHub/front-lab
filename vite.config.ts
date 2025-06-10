import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  define:{
    global: {},
  },
  resolve:{
    alias:{
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@images': '/src/assets/images',
    }
  },
  server: {
    proxy: {
      '/ws': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
      }
    }
  }
})
