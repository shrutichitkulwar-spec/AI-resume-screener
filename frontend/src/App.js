// App.js - The root component of our React application
// This component ties everything together: the form and the results

import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResultsPanel from './components/ResultsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  // ── State Variables ────────────────────────────────────────────────────────
  // useState() creates a variable that, when changed, automatically re-renders the UI

  const [results, setResults] = useState(null);       // Stores the API response
  const [isLoading, setIsLoading] = useState(false);  // True while waiting for API
  const [error, setError] = useState(null);           // Stores any error message

  // ── Handle Form Submission ─────────────────────────────────────────────────
  // This function is called when the user clicks "Screen My Resume"
  // It receives the resume and job description from the ResumeForm component
  const handleScreenResume = async (resumeText, jobDescription) => {
    // Reset previous results and errors
    setResults(null);
    setError(null);
    setIsLoading(true);  // Show the loading spinner

    try {
      // Determine the backend URL
      // In development: uses localhost (set in package.json proxy or .env)
      // In production: uses the Render URL from the environment variable
      const backendUrl = 'http://127.0.0.1:5000';
      // Make a POST request to our Flask backend
      const response = await fetch(`${backendUrl}/api/screen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Tell the server we're sending JSON
        },
        body: JSON.stringify({
          resume: resumeText,
          job_description: jobDescription,
        }),
      });

      // Parse the JSON response from the server
      const data = await response.json();

      // If the server returned an error (e.g. 400, 500), throw it
      if (!response.ok) {
        throw new Error(data.error || 'An unexpected error occurred.');
      }

      // If successful, store the results and display them
      setResults(data);

      // Smoothly scroll down to show the results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      // If anything went wrong, show the error message
      setError(err.message || 'Failed to connect to the server. Is the backend running?');
    } finally {
      // Always hide the loading spinner when done (success or failure)
      setIsLoading(false);
    }
  };

  // ── Reset Everything ───────────────────────────────────────────────────────
  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  // ── Render the UI ──────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">ResumeAI</span>
          </div>
          <p className="tagline">Match your resume to any job — instantly</p>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────── */}
      <main className="main">
        {/* The form where users paste their resume and job description */}
        <ResumeForm
          onSubmit={handleScreenResume}
          onReset={handleReset}
          isLoading={isLoading}
          hasResults={!!results}
        />

        {/* Show a loading spinner while waiting for the API */}
        {isLoading && <LoadingSpinner />}

        {/* Show an error message if something went wrong */}
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {/* Show the results once we have them */}
        {results && !isLoading && (
          <div id="results">
            <ResultsPanel results={results} />
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="footer">
        <p>Powered by OpenAI GPT · Built with Flask & React</p>
      </footer>
    </div>
  );
}

export default App;
