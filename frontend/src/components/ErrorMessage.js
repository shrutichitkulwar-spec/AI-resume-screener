// ErrorMessage.js - Displays error messages in a dismissible banner
// Props:
//   message - the error string to display
//   onDismiss - callback to close/hide the error

import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="error-banner" role="alert">
      {/* Warning icon */}
      <span className="error-icon">⚠</span>

      {/* Error message text */}
      <div className="error-content">
        <strong className="error-title">Something went wrong</strong>
        <p className="error-text">{message}</p>
      </div>

      {/* Close button */}
      <button
        className="error-dismiss"
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}

export default ErrorMessage;
