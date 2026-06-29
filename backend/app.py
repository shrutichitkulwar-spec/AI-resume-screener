from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "AI Resume Screener API is running!"})

@app.route("/api/screen", methods=["POST"])
def screen_resume():
    try:
        data = request.get_json()
        resume_text = data.get("resume", "").strip()
        job_description = data.get("job_description", "").strip()

        if not resume_text:
            return jsonify({"error": "Resume text is required."}), 400
        if not job_description:
            return jsonify({"error": "Job description is required."}), 400

        prompt = f"""
You are an expert technical recruiter and resume coach. Analyze the following resume against the job description.

Return your analysis as a valid JSON object with EXACTLY this structure:
{{
  "match_score": <integer from 0 to 100>,
  "missing_keywords": [<list of important keywords/skills from the job description missing in the resume>],
  "suggestions": [<list of 3-5 specific, actionable improvement suggestions for the resume>],
  "summary": "<one sentence summary of the overall fit>"
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

Return ONLY the JSON object, no extra text before or after.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are an expert recruiter. Always respond with valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )

        raw_output = response.choices[0].message.content.strip()

        if raw_output.startswith("```"):
            raw_output = raw_output.split("```")[1]
            if raw_output.startswith("json"):
                raw_output = raw_output[4:]

        result = json.loads(raw_output)
        return jsonify(result), 200

    except json.JSONDecodeError:
        return jsonify({"error": "AI returned an unexpected format. Please try again."}), 500

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='127.0.0.1')