import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResultsPanel from './components/ResultsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  // ── State ───────────────────────────────────────────────
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Backend URL (works for both local + production)
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5050";

  // ── Handle Form Submission ──────────────────────────────
  const handleScreenResume = async (resumeText, jobDescription) => {
    setResults(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/screen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resumeText,
          job_description: jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResults(data);

      // Scroll to results
      setTimeout(() => {
        document
          .getElementById('results')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError(
        err.message || 'Failed to connect to the server. Backend might be down.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ── Reset ───────────────────────────────────────────────
  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  // ── UI ──────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">ResumeAI</span>
          </div>
          <p className="tagline">
            Match your resume to any job — instantly
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <ResumeForm
          onSubmit={handleScreenResume}
          onReset={handleReset}
          isLoading={isLoading}
          hasResults={!!results}
        />

        {isLoading && <LoadingSpinner />}

        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        {results && !isLoading && (
          <div id="results">
            <ResultsPanel results={results} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Powered by OpenAI/Groq · Built with Flask & React</p>
      </footer>
    </div>
  );
}

export default App;