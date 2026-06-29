// ResultsPanel.js - Displays the analysis results from the AI
// Props received from App.js:
//   results - an object containing: match_score, missing_keywords, suggestions, summary

import React from 'react';
import './ResultsPanel.css';

function ResultsPanel({ results }) {
  const { match_score, missing_keywords, suggestions, summary } = results;

  // ── Determine Score Color ──────────────────────────────────────────────────
  // We color the score differently based on how good it is
  const getScoreInfo = (score) => {
    if (score >= 70) return { color: 'score-good', label: 'Strong Match', emoji: '🟢' };
    if (score >= 40) return { color: 'score-medium', label: 'Partial Match', emoji: '🟡' };
    return { color: 'score-low', label: 'Weak Match', emoji: '🔴' };
  };

  const scoreInfo = getScoreInfo(match_score);

  // ── Calculate the circular progress ring ──────────────────────────────────
  // The ring is an SVG circle. We animate it from 0 to the score percentage.
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;  // Full circle length
  const strokeDash = CIRCUMFERENCE - (match_score / 100) * CIRCUMFERENCE;  // How much to hide

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="results-section">
      {/* Section header */}
      <div className="results-header">
        <h2 className="results-title">Analysis Complete</h2>
        <p className="results-subtitle">{summary}</p>
      </div>

      {/* ── Score Card ──────────────────────────────────────────── */}
      <div className={`score-card ${scoreInfo.color}`}>
        {/* Circular SVG score ring */}
        <div className="score-ring-container">
          <svg className="score-ring" viewBox="0 0 120 120" aria-hidden="true">
            {/* Background circle (track) */}
            <circle
              cx="60" cy="60" r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            {/* Foreground circle (progress) */}
            <circle
              cx="60" cy="60" r={RADIUS}
              fill="none"
              className="score-ring-progress"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDash}
              transform="rotate(-90 60 60)"  /* Start from top */
            />
          </svg>

          {/* Score number in the center */}
          <div className="score-center">
            <span className="score-number">{match_score}</span>
            <span className="score-percent">%</span>
          </div>
        </div>

        {/* Score label */}
        <div className="score-info">
          <span className="score-emoji">{scoreInfo.emoji}</span>
          <span className="score-label">{scoreInfo.label}</span>
        </div>
      </div>

      {/* ── Two-column grid: Keywords + Suggestions ──────────────── */}
      <div className="results-grid">

        {/* ── Missing Keywords Card ─────────────────────────────── */}
        <div className="result-card">
          <div className="card-header">
            <span className="card-icon">⚠️</span>
            <h3 className="card-title">Missing Keywords</h3>
            <span className="card-badge">{missing_keywords.length}</span>
          </div>
          <p className="card-description">
            These important terms from the job description are not found in your resume.
            Adding them (where true) can help you pass Applicant Tracking Systems (ATS).
          </p>

          {missing_keywords.length === 0 ? (
            <div className="empty-state">
              <span>✅</span>
              <p>Great! No major keywords missing.</p>
            </div>
          ) : (
            <div className="keyword-list">
              {/* Each missing keyword shown as a tag/badge */}
              {missing_keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Suggestions Card ──────────────────────────────────── */}
        <div className="result-card">
          <div className="card-header">
            <span className="card-icon">💡</span>
            <h3 className="card-title">Improvement Tips</h3>
            <span className="card-badge">{suggestions.length}</span>
          </div>
          <p className="card-description">
            Specific actions you can take to strengthen your resume for this role.
          </p>

          {suggestions.length === 0 ? (
            <div className="empty-state">
              <span>🏆</span>
              <p>Your resume looks great for this role!</p>
            </div>
          ) : (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  {/* Step number */}
                  <span className="suggestion-num">{String(index + 1).padStart(2, '0')}</span>
                  <p className="suggestion-text">{suggestion}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── Pro Tip Footer ───────────────────────────────────────── */}
      <div className="pro-tip">
        <span className="pro-tip-icon">⚡</span>
        <p>
          <strong>Pro tip:</strong> Aim for 70%+ match before applying.
          Tailor each resume for each job description for best results.
        </p>
      </div>
    </section>
  );
}

export default ResultsPanel;
