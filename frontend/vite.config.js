import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Using a simpler object-based approach for manual chunking
        // This is safer than the function-based approach when dealing with React
        manualChunks: {
          // Bundle ALL React-related packages together
          'react-vendor': [
            'react', 
            'react-dom',
            'react/jsx-runtime',
            'scheduler',
            'prop-types',
            'react-is',
            'object-assign'
          ],
          // Router-related packages
          'router-vendor': ['react-router', 'react-router-dom'],
          
          // If you're using any UI framework, list those packages here
          'ui-vendor': ['@mui/material', '@mui/icons-material'],
          
          // Other utility libraries
          'utils-vendor': ['axios', 'redux'],
        },
        // Configure chunk naming format and directory structure
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    // Set chunk size warning limit (in kB)
    chunkSizeWarningLimit: 500,
  },
  // Ensure React is properly deduped
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom']
  }
});