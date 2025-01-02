import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { extensionIdentifier } from './utils.js';


let root = document.getElementById(extensionIdentifier);
if (!root) {
  root = document.createElement('div');
  root.id = extensionIdentifier;
  document.body.appendChild(root);
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
