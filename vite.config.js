import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'), // ✅ this works with script src="/src/main.jsx"
      },
    },
    outDir: 'dist', // optional but good to make sure
    emptyOutDir: true,
  },
});
