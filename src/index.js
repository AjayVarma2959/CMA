import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom'

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root')); // Create a root for rendering

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
