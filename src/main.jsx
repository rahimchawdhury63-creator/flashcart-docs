// ============================================================
// FlashCart — Documentation Portal Entry Point
// CORRECTED VERSION — replaces Step 2 main.jsx
//
// Docs portal uses the same RouterProvider pattern.
// Additional difference:
// - Imports docs.css for documentation-specific styles
// - Docs router defined in Step 48
// - Includes JetBrains Mono for code blocks
//
// Developer: Rizwan Rahim Chowdhury
// Powered by: Bangladesh Software Development Community (bsdc.info.bd)
// ============================================================

// React 18 core
import React from 'react';

// React 18 concurrent rendering
import { createRoot } from 'react-dom/client';

// RouterProvider — replaces BrowserRouter
import { RouterProvider } from 'react-router-dom';

// HelmetProvider — per-page SEO for every docs article
// Critical: every docs page is a potential Google landing page
import { HelmetProvider } from 'react-helmet-async';

// Docs portal router — WILL BE CREATED IN STEP 48
import router from './router';

// ── GLOBAL STYLES ──────────────────────────────────────────

// Design tokens — same brand system as all portals
import './styles/design-tokens.css';

// CSS reset
import './styles/global.css';

// Typography — includes monospace for code blocks
import './styles/typography.css';

// Utility classes
import './styles/utilities.css';

// Animations
import './styles/animations.css';

// Responsive utilities
import './styles/responsive.css';

// Fabric CSS grid
import './styles/fabric.css';

// Docs-specific styles
// (sidebar navigation, table of contents, code blocks, step guides)
import './styles/docs.css';

// ── ROOT ELEMENT ──────────────────────────────────────────

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    '[FlashCart Docs] Root element #root not found in index.html. ' +
    'Ensure index.html contains <div id="root"></div>.'
  );
}

// ── CREATE REACT 18 ROOT ──────────────────────────────────

const root = createRoot(rootElement);

// ── RENDER ───────────────────────────────────────────────

root.render(
  <React.StrictMode>

    {/* HelmetProvider — each docs page gets unique SEO meta */}
    {/* Every guide article is a potential Google landing page */}
    <HelmetProvider>

      {/* RouterProvider — docs portal routes from Step 48 */}
      <RouterProvider
        router={router}

        fallbackElement={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              background: '#FAFAFA',
              fontFamily: 'Inter, sans-serif',
            }}
            role="status"
            aria-label="Documentation loading"
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '3px solid #E8F5E9',
                borderTopColor: '#1B5E20',
                animation: 'spin 0.8s linear infinite',
              }}
              aria-hidden="true"
            />
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        }
      />

    </HelmetProvider>
  </React.StrictMode>
);
