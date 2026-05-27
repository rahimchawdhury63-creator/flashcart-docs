/**
 * =============================================================================
 * FLASHCART DOCS — Application Entry Point
 * =============================================================================
 * 
 * Lightweight entry point for the documentation portal.
 * No OneSignal, no complex service worker features.
 * 
 * Developer: Rizwan Rahim Chowdhury
 * =============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

/* Global Styles */
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/animations.css';
import './styles/docs.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

/* Service Worker Registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[FlashCart Docs] Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.warn('[FlashCart Docs] SW registration failed:', error);
      });
  });
}
