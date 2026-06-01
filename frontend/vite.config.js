import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // forward /api requests to the backend so the browser avoids CORS entirely
    proxy: {
      "/api": "http://localhost:5000",
    },
    port: 5173, // explicitly state default port
  },
})
