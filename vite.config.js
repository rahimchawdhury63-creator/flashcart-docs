/**
 * =============================================================================
 * FLASHCART DOCS — Vite Configuration
 * =============================================================================
 * 
 * Purpose: Configure Vite bundler for the FlashCart documentation portal.
 * 
 * Key decisions:
 * - Lightweight build since docs portal has fewer dependencies
 * - No maps or PDF libraries needed
 * - Firebase only for docs content management (admin panel)
 * - Optimized for fast page loads (documentation should be instant)
 * 
 * Developer: Rizwan Rahim Chowdhury
 * Powered by: Bangladesh Software Development Community (BSDC)
 * =============================================================================
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  /* --- Plugins --- */
  plugins: [
    react()
  ],

  /* --- Path Resolution --- */
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  /* --- Development Server --- */
  server: {
    port: 3002, /* Separate port for docs portal */
    open: true,
    host: true
  },

  /* --- Build Configuration --- */
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks: {
          /* Vendor chunk: React core */
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          /* Firebase chunk: For admin content management */
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],

          /* SEO chunk */
          'vendor-seo': ['react-helmet-async']
        }
      }
    },

    minify: 'esbuild',
    cssCodeSplit: true
  },

  /* --- CSS Configuration --- */
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },

  /* --- Preview Server --- */
  preview: {
    port: 4175,
    host: true
  }
});
