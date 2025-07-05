import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    viteStaticCopy({
      targets: [
        {
          src: 'public/popup.html',
          dest: '.', // output root
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
      },
    },
  },
});
