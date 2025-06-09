import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    checker({ typescript: { ignoreDiagnostics: [] }, enableOverlay: false })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    abortOnError: false
  }
})