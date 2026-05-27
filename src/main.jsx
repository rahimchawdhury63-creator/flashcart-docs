// ============================================================
// FlashCart — Documentation Portal Entry Point
// Developer: Rizwan Rahim Chowdhury
// Powered by: Bangladesh Software Development Community (bsdc.info.bd)
// ============================================================

// React 18 core
import React from 'react';

// React 18 createRoot for concurrent features
import { createRoot } from 'react-dom/client';

// Browser router for clean URL navigation in docs
import { BrowserRouter } from 'react-router-dom';

// Helmet Async for per-page SEO meta (critical for docs — each guide is a landing page)
import { HelmetProvider } from 'react-helmet-async';

// Docs portal root component
import App from './App';

// ── GLOBAL STYLES ─────────────────────────────────────────────

// Design tokens (same brand system)
import './styles/design-tokens.css';

// Global reset and base styles
import './styles/global.css';

// Typography including monospace for code blocks
import './styles/typography.css';

// Utility classes
import './styles/utilities.css';

// Animations
import './styles/animations.css';

// Responsive utilities
import './styles/responsive.css';

// Fabric CSS grid
import './styles/fabric.css';

// Docs-specific styles (sidebar, TOC, code blocks, step guides)
import './styles/docs.css';

// ── MOUNT ─────────────────────────────────────────────────────

// Get root element
const rootElement = document.getElementById('root');

// Safety check
if (!rootElement) {
  throw new Error(
    'FlashCart Docs: Root element #root not found. ' +
    'Check index.html for <div id="root"></div>'
  );
}

// Create React 18 root
const root = createRoot(rootElement);

// Render docs portal
root.render(
  <React.StrictMode>
    {/* HelmetProvider — each docs page gets unique SEO meta */}
    <HelmetProvider>
      {/* BrowserRouter for clean docs URLs like /docs/customer/ordering */}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {/* Docs App component */}
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
