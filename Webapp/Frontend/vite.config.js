import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Set the output folder for the build
  },
  define: {
    'process.env': {}, // Ensure process.env is defined (optional for Vite)
  },
});
