import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 1. Importe o plugin do React

export default defineConfig({
  plugins: [react()], // 2. Ative o plugin do React aqui
  
  server: {
    allowedHosts: true,
    proxy: {
      // Proxy para requisições HTTP normais (ex: login, histórico)
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Proxy para WebSockets (Socket.io) - essencial para o chat em tempo real
      '/socket.io': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true
      }
    }
  }
})