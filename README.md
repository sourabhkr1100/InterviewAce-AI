# InterviewAce AI 🚀

InterviewAce AI is a modern, production-ready full-stack web application designed to help job seekers practice interviews using Artificial Intelligence. The platform dynamically generates role-specific interview questions, analyzes the candidate's answers, and provides brutally honest, actionable feedback to improve confidence and technical skills.

---

## 🏗️ Technology Stack

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theming:** `next-themes` (Full Light/Dark mode support)
- **Charts:** Recharts (For Analytics Dashboard)

### Backend & AI
- **API Routes:** Next.js Serverless API routes
- **Database:** MongoDB (via Mongoose ODM)
- **AI Integration:** Google Gemini API (`@google/genai`)
- **PDF Parsing:** `pdf-parse` (For Resume ATS analysis)
- **Voice Technology:** Web Speech API (`SpeechRecognition` & `SpeechSynthesisUtterance`) for real-time dictation and AI text-to-speech.

---

## 🎯 Core Features Implemented

### 1. 🎨 Premium UI & Design System
- **Glassmorphism:** Custom CSS utilities for frosted-glass panels (`.glass-panel`).
- **Dynamic Theming:** Seamless transition between light and dark modes with a carefully curated premium color palette (Indigo, Purple, and Deep Blue hues).
- **Smooth Animations:** Framer Motion is heavily utilized for page transitions, hover states, and engaging micro-interactions.

### 2. 🧠 True AI Intelligence
- **Dynamic Question Generation:** The AI contextually generates questions based on the selected `Role`, `Experience Level`, and `Target Company`. It also remembers previous questions in the session to avoid repetition.
- **Smart Evaluation:** Answers are graded strictly by the LLM across multiple metrics (Communication, Technical Depth, Clarity, Confidence).
- **Constructive Feedback:** The AI provides the "Ideal Answer", specific missing points, and tips for improvement.

### 3. 🎙️ Voice-Activated Interview Room
- **Speech-to-Text:** Candidates can ditch the keyboard and speak naturally. The app transcribes their voice in real-time.
- **Text-to-Speech (TTS):** The AI interviewer verbally asks the generated questions out loud, simulating a real human interaction.

### 4. 📄 Resume ATS Analyzer
- Users can upload their PDF/DOCX resumes before starting an interview.
- The AI scans the document to extract keywords, calculate an ATS match score, and use the user's background context to ask hyper-personalized questions.

### 5. 📊 Analytics & Gamification Dashboard
- Tracks Total Interviews, Average Scores, and "Hours Practiced".
- Visualizes Score Trends over time using beautiful area charts.
- Highlights Strengths & Weaknesses (e.g., Technical vs. Communication).
- Awards users with Gamified Badges (Streaks, Top 10% percentiles).

### 6. 🔥 "Roast My Answer" Mode (Viral Feature)
- Users can click a "Roast My Answer" button on the feedback page. 
- The AI takes on a hilariously brutal, Simon Cowell-esque persona to mock the candidate's answer for entertainment and virality.

---

## 🗄️ Database Architecture (MongoDB)

The database is structured using Mongoose with the following core schemas:

1. **`User`**: Stores standard user details (Name, Email, Default Role, password hash for future NextAuth integration).
2. **`InterviewSession`**: Represents a single interview attempt. Links to a User, tracks the target role, experience level, target company, status (`in-progress`/`completed`), and final overall score.
3. **`Question`**: Links to a Session. Stores the AI-generated question text and order.
4. **`Answer`**: Links to a Question and User. Stores the transcribed text, time taken, and optional audio references.
5. **`Feedback`**: Links to an Answer. Stores the AI's granular evaluation (scores, missing points, ideal answer, improvement suggestions).
6. **`Resume`**: Stores parsed resume data (skills, experience, ATS keywords) linked to a User.

---

## 📂 Project Structure

```text
interview-ace/
├── src/
│   ├── app/
│   │   ├── api/                   # Backend API Routes
│   │   │   ├── interview/
│   │   │   │   ├── answer/route.ts   # Evaluates answers & generates next question
│   │   │   │   ├── results/[id]/route.ts # Fetches final session results
│   │   │   │   ├── roast/route.ts    # Generates viral roast
│   │   │   │   └── start/route.ts    # Initializes session & first question
│   │   │   └── resume/upload/route.ts# Parses PDF and extracts ATS data
│   │   ├── dashboard/             # Core Logged-in Experience
│   │   │   ├── analytics/         # Progress tracking & charts
│   │   │   ├── interview/         # Setup & Live Room pages
│   │   │   ├── profile/           # User settings & default resume
│   │   │   └── results/[id]/      # Deep-dive feedback page
│   │   ├── admin/                 # Admin Panel views
│   │   ├── login/                 # Authentication
│   │   ├── signup/                # Authentication
│   │   ├── layout.tsx             # Root layout & ThemeProvider wrapper
│   │   └── page.tsx               # Animated Landing Page
│   ├── components/                # Reusable React components
│   ├── lib/                       # Utility functions & Database logic
│   │   ├── models/                # Mongoose Schemas (User, Session, QA, Resume)
│   │   ├── ai.ts                  # Centralized Gemini API integration logic
│   │   ├── db.ts                  # MongoDB connection caching
│   │   └── utils.ts               # Tailwind/clsx helpers
│   └── ...
```

---

## 🚀 Roadmap / Pending Enhancements

While the core AI product is fully built and functioning, the following items from the original grand vision are primed for future implementation:

1. **NextAuth / Clerk Integration:** Transition from the current "Mock Auth" to secure, production-ready OAuth (Google, GitHub) authentication.
2. **Payments Integration (Stripe/Razorpay):** Gate certain features (like Company-Specific mock interviews or unlimited sessions) behind a subscription model.
3. **PDF Export:** Allow users to download a beautifully formatted PDF of their interview scorecard.
4. **Cloud Storage (AWS S3):** Save uploaded resumes and recorded audio files to a secure cloud bucket instead of local memory.
