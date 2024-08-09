import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

// Import the buffer package
const require = createRequire(import.meta.url);
const Buffer = require('buffer/').Buffer;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/'
    }
  },
  server: {
    port: 3005,
  },

  define: {
    'global.Buffer': Buffer
  }
});
