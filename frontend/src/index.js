// index.js - The entry point of the React app
// React reads this file first and mounts our App component into the HTML page

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles
import App from './App';  // Our main App component

// Find the <div id="root"> in public/index.html and render our App inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* StrictMode helps catch bugs during development */}
    <App />
  </React.StrictMode>
);
