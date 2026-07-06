// Safeguard to prevent "TypeError: Cannot set property fetch of #<Window> which has only a getter"
// which can occur in sandboxed iframe environments when external scripts try to polyfill fetch.
try {
  let currentFetch = window.fetch;
  if (!currentFetch && typeof window !== 'undefined') {
    currentFetch = () => Promise.reject('fetch is not defined');
  }

  const forcePatch = (obj: any) => {
    try {
      try {
        delete obj.fetch;
      } catch (e) {}

      Object.defineProperty(obj, 'fetch', {
        configurable: true,
        enumerable: true,
        get() {
          return currentFetch;
        },
        set(value) {
          currentFetch = value;
        }
      });
    } catch (e) {}
  };

  forcePatch(window);
  if (typeof Window !== 'undefined' && Window.prototype) {
    forcePatch(Window.prototype);
  }
} catch (e) {
  console.warn('Unable to patch window.fetch property descriptor:', e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
