import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: './', // ✅ This is the fix!
  plugins: [react()],
  define: {
    'process.env': {}, // optional if some lib tries to access process
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
})
