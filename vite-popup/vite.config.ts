// vite-popup/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../extension',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'popup.html'),
      },
    },
  },
})
