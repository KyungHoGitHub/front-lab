import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  define:{
    global: {},
  },
  resolve:{
    alias:{
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@images': '/src/assets/images',
          "@": path.resolve(__dirname, "./src"),
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
