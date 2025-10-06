import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@bot': resolve('src/bot'),
      },
      external: ['ollama'],
    },
    plugins: [
      externalizeDepsPlugin(),
      copy({
        targets: [
          {
            src: 'src/bot/assets',
            dest: 'out/bot',
          },
        ],
      }),
    ],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react(), tailwindcss()],
  },
});
