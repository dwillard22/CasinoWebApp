import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: ['*'],
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
