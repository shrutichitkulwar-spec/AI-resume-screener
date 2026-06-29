# AI Resume Screener

An AI-powered web app that analyzes a resume against a job description and provides:
- Match Score
- Missing ATS Keywords
- Resume Improvement Suggestions

**Tech Stack:** React • Flask • Python • OpenAI API

## Features
- Compare resume with any job description
- ATS keyword analysis
- AI-generated feedback
- Simple, responsive UI

## Project Structure

```
ai-resume-screener/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
└── README.md
```

## Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables

Backend:
```
OPENAI_API_KEY=your_api_key
```

Frontend:
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

## Deployment
- Backend: Render
- Frontend: Vercel

## Future Improvements
- PDF/DOCX resume upload
- Resume history
- GPT-4 support
- Authentication
