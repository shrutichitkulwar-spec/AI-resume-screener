// LoadingSpinner.js - Shown while waiting for the OpenAI API to respond
// This gives users feedback that something is happening (usually 3-10 seconds)

import React, { useState, useEffect } from 'react';
import './LoadingSpinner.css';

// Rotating messages to show while loading (makes the wait feel less long)
const LOADING_MESSAGES = [
  "Reading your resume...",
  "Analyzing job requirements...",
  "Identifying keyword gaps...",
  "Crafting improvement tips...",
  "Almost done...",
];

function LoadingSpinner() {
  // Cycle through different messages every 2 seconds
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Set up a timer that changes the message every 2000ms
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    // Clean up the timer when the component is removed from the page
    return () => clearInterval(timer);
  }, []);  // Empty [] means this runs once when component mounts

  return (
    <div className="loading-container" role="status" aria-live="polite">
      {/* Animated ring spinner */}
      <div className="loading-ring">
        <div className="ring-inner" />
        {/* Orbiting dot that goes around the ring */}
        <div className="ring-orbit">
          <div className="ring-dot" />
        </div>
      </div>

      {/* Rotating status messages */}
      <p className="loading-message" key={messageIndex}>
        {LOADING_MESSAGES[messageIndex]}
      </p>
      <p className="loading-hint">This usually takes 5–15 seconds</p>
    </div>
  );
}

export default LoadingSpinner;
