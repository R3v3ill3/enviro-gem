
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  if (mode === 'development') {
    try {
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    } catch (error) {
      console.warn('lovable-tagger not available:', (error as Error).message);
    }
  }

  return {
    plugins,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 8080,
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
