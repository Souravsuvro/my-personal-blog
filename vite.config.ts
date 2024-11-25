import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false
            }
          ]
        ]
      }
    }),
    tsconfigPaths()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
    ]
  },
  server: {
    port: 3003,
    open: true,
    host: true,
    watch: {
      usePolling: true
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'styled-components',
      'framer-motion',
      'react-markdown',
      'remark-gfm',
      'react-syntax-highlighter'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'styled-components': ['styled-components'],
          'framer-motion': ['framer-motion'],
          'markdown': ['react-markdown', 'remark-gfm', 'react-syntax-highlighter'],
          'blog': ['./src/pages/BlogPost', './src/pages/Blog']
        }
      }
    }
  }
});
