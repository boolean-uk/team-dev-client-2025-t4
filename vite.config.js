import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000 // Set to your preferred port
  },
  esbuild: {
    jsx: 'automatic'
  },
  test: {
    globals: true, // Enables global functions like `describe`, `it`, etc.
    environment: 'jsdom' // Simulates a browser-like environment
  }
});
