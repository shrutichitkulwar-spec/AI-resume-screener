// ResumeForm.js - The input form where users paste their resume and job description
// Props received from App.js:
//   onSubmit(resumeText, jobDescription) - called when form is submitted
//   onReset() - called when "Start Over" is clicked
//   isLoading - true while waiting for API response
//   hasResults - true if results are currently displayed

import React, { useState } from 'react';
import './ResumeForm.css';

function ResumeForm({ onSubmit, onReset, isLoading, hasResults }) {
  // ── Local State ────────────────────────────────────────────────────────────
  const [resume, setResume] = useState('');           // Resume textarea content
  const [jobDescription, setJobDescription] = useState('');  // JD textarea content
  const [resumeError, setResumeError] = useState('');
  const [jdError, setJdError] = useState('');

  // ── Validate and Submit ────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent browser page refresh on form submit

    // Clear previous validation errors
    setResumeError('');
    setJdError('');

    // Validate: both fields must be filled in
    let valid = true;

    if (resume.trim().length < 50) {
      setResumeError('Please paste your resume (at least 50 characters).');
      valid = false;
    }
    if (jobDescription.trim().length < 50) {
      setJdError('Please paste the job description (at least 50 characters).');
      valid = false;
    }

    if (!valid) return;  // Stop if validation failed

    // Call the parent (App.js) handler with our two inputs
    onSubmit(resume.trim(), jobDescription.trim());
  };

  // ── Handle "Start Over" ────────────────────────────────────────────────────
  const handleReset = () => {
    setResume('');
    setJobDescription('');
    setResumeError('');
    setJdError('');
    onReset();  // Tell App.js to clear results
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="form-section">
      {/* Hero heading */}
      <div className="form-hero">
        <h1 className="form-title">
          Is your resume <span className="accent-text">the right fit?</span>
        </h1>
        <p className="form-subtitle">
          Paste your resume and a job description below. Our AI will score your
          match, identify gaps, and give you specific tips to get noticed.
        </p>
      </div>

      {/* The form */}
      <form onSubmit={handleSubmit} className="form" noValidate>
        {/* Two-column layout for the textareas */}
        <div className="form-columns">

          {/* ── Resume Input ─────────────────────────────────── */}
          <div className="form-group">
            <label className="form-label" htmlFor="resume">
              <span className="label-icon">📄</span>
              Your Resume
            </label>
            <textarea
              id="resume"
              className={`form-textarea ${resumeError ? 'textarea-error' : ''}`}
              placeholder="Paste your full resume text here...

Example:
Jane Doe | jane@email.com | linkedin.com/in/jane

EXPERIENCE
Software Engineer at Acme Corp (2021–Present)
- Built REST APIs using Python and Django
- Managed AWS deployments...

SKILLS
Python, JavaScript, React, SQL, Docker..."
              value={resume}
              onChange={(e) => {
                setResume(e.target.value);
                if (resumeError) setResumeError('');  // Clear error as user types
              }}
              disabled={isLoading}
              rows={16}
            />
            {/* Character count */}
            <div className="textarea-footer">
              {resumeError && <span className="field-error">{resumeError}</span>}
              <span className="char-count">{resume.length} chars</span>
            </div>
          </div>

          {/* ── Job Description Input ────────────────────────── */}
          <div className="form-group">
            <label className="form-label" htmlFor="jobDescription">
              <span className="label-icon">💼</span>
              Job Description
            </label>
            <textarea
              id="jobDescription"
              className={`form-textarea ${jdError ? 'textarea-error' : ''}`}
              placeholder="Paste the full job description here...

Example:
Senior Frontend Engineer at TechCorp

We are looking for a React developer with:
- 3+ years of experience with React
- Proficiency in TypeScript
- Experience with REST APIs
- Knowledge of CI/CD pipelines..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                if (jdError) setJdError('');
              }}
              disabled={isLoading}
              rows={16}
            />
            <div className="textarea-footer">
              {jdError && <span className="field-error">{jdError}</span>}
              <span className="char-count">{jobDescription.length} chars</span>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ──────────────────────────────────── */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}  // Disable while loading
          >
            {isLoading ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Analyzing...
              </>
            ) : (
              <>
                <span>◈</span>
                Screen My Resume
              </>
            )}
          </button>

          {/* Only show "Start Over" if there are results */}
          {hasResults && !isLoading && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
            >
              ↺ Start Over
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ResumeForm;
