// ============================================================
// FlashCart — Documentation Portal
// Vite Configuration File
// Developer: Rizwan Rahim Chowdhury
// Powered by: Bangladesh Software Development Community (bsdc.info.bd)
// ============================================================

// Import Vite core config helper
import { defineConfig } from 'vite';

// Import React plugin for JSX and HMR
import react from '@vitejs/plugin-react';

// Import Node path for aliases
import { resolve } from 'path';

export default defineConfig({

  // ── PLUGINS ─────────────────────────────────────────────
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],

  // ── PATH ALIASES ────────────────────────────────────────
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@context': resolve(__dirname, './src/context'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@styles': resolve(__dirname, './src/styles'),
      '@i18n': resolve(__dirname, './src/i18n'),
      '@data': resolve(__dirname, './src/data'),
      '@assets': resolve(__dirname, './src/assets'),
      // Docs-specific alias for content files
      '@content': resolve(__dirname, './src/content'),
    },
  },

  // ── BUILD CONFIGURATION ─────────────────────────────────
  build: {
    // Cloudflare Pages output directory
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        manualChunks: {
          // Docs portal has lighter dependencies — fewer chunks needed
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-helmet': ['react-helmet-async'],

          // Firebase only for minimal use in docs (analytics)
          'vendor-firebase': ['firebase/app', 'firebase/analytics'],
        },

        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  // ── DEVELOPMENT SERVER ───────────────────────────────────
  server: {
    // Docs portal on port 3002 during development
    port: 3002,
    open: false,
    host: true,
    historyApiFallback: true,
  },

  // ── PREVIEW SERVER ───────────────────────────────────────
  preview: {
    port: 4175,
    historyApiFallback: true,
  },

  // ── CSS CONFIGURATION ────────────────────────────────────
  css: {
    modules: {
      pattern: /\.module\.css$/,
    },
    postcss: {},
  },

  // ── ENVIRONMENT PREFIX ───────────────────────────────────
  envPrefix: 'VITE_',

  // ── DEPENDENCY OPTIMIZATION ─────────────────────────────
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-helmet-async',
      'firebase/app',
    ],
  },
});
