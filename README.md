# Lexora

Lexora is a modern AI-powered text intelligence and writing analysis platform built to help users analyze, compare, improve, and understand written content through advanced NLP-based tools and interactive analytics.

The platform combines multiple text analysis systems into a single premium SaaS-style dashboard experience, offering features such as sentiment analysis, emotion detection, named entity recognition, readability scoring, grammar analysis, AI content detection, summarization, keyword extraction, and text comparison.

Lexora is designed with a modern production-grade architecture using Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.

---

## Live Demo

https://lexora-ss.vercel.app/

---

# Features

## AI & NLP Modules

### Sentiment Analysis

Analyze text sentiment and classify it as:

* Positive
* Negative
* Neutral

Includes:

* confidence scoring
* emotional intensity
* weighted scoring system
* contextual sentiment analysis

---

### Emotion Detection

Detect emotional signals within text.

Supported emotions:

* Joy
* Sadness
* Anger
* Fear
* Optimism
* Surprise

Features:

* weighted emotional scoring
* contextual phrase analysis
* narrative emotion detection
* mixed emotion handling

---

### Named Entity Recognition (NER)

Extract important entities from text such as:

* People
* Organizations
* Locations
* Dates
* Proper nouns

Powered using NLP-based entity parsing.

---

### Text Summarization

Generate concise summaries from large blocks of text.

Features:

* extractive summarization
* keyword-weighted sentence ranking
* intelligent sentence scoring
* dynamic summary sizing

---

### Readability Analysis

Evaluate how easy or difficult a text is to read.

Metrics:

* Reading Ease Score
* Grade Level
* Sentence Count
* Word Count
* Difficult Word Count

---

### Grammar Analysis

Analyze grammar and writing quality.

Features:

* grammar suggestions
* punctuation corrections
* writing improvements
* syntax issue detection

---

### Keyword Extraction

Extract the most relevant keywords from text.

Features:

* weighted keyword scoring
* stopword filtering
* ranked keyword extraction

---

### Language Detection

Automatically detect the language of input text.

Features:

* language name
* language code
* confidence score

---

### Topic Detection

Identify the general topic or category of text.

Examples:

* Technology
* Finance
* Education
* Healthcare
* Business
* Science

---

### AI Content Detection

Analyze text patterns to estimate the probability of AI-generated content.

Features:

* AI probability scoring
* heuristic AI pattern analysis

---

# Text Comparison System

Lexora includes a dedicated comparison engine for comparing two blocks of text.

Features:

* similarity scoring
* semantic keyword overlap
* plagiarism risk estimation
* tone comparison
* sentiment comparison
* matching sentence detection
* overlap analytics

---

# Dashboard & Reports

## Dashboard

Modern SaaS-style dashboard with:

* premium dark UI
* glassmorphism effects
* interactive cards
* analytics visualizations
* module-based workflow

---

## Reports & History

Persistent storage system for previous analyses and comparisons.

Features:

* saved analysis history
* saved comparison history with report restoration
* reopen previous reports
* persistent results
* reusable analytics

---

# Authentication

Lexora includes secure authentication using NextAuth.

Features:

* user signup
* user login
* protected dashboard routes
* session handling
* middleware-based route protection

---

# Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion
* shadcn/ui
* Recharts
* Zustand

---

## Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon)
* NextAuth
* REST-style API architecture

---

## NLP & AI Libraries

* compromise
* franc
* custom NLP heuristics
* LanguageTool API

---

# UI & Design

Lexora follows a premium modern SaaS design system inspired by:

* Linear
* Vercel
* Notion AI
* Perplexity

Design characteristics:

* dark-mode-first
* indigo/violet branding
* glassmorphism
* smooth animations
* modern analytics dashboard layout

---

# Project Structure

src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── auth/
│   └── ...
│
├── components/
│
├── lib/
│
├── hooks/
│
├── store/
│
└── styles/

---

# Database

Prisma schema includes:

* User model
* Analysis model
* Comparison model

Persistent storage allows users to:

* save reports
* revisit analyses
* access historical data

---

# Installation

1. Clone the repository

git clone <repository-url>

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file:

DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

4. Run Prisma migrations

npx prisma generate
npx prisma migrate dev

5. Start development server

npm run dev

---

# Advanced Features

## Intelligent Text Comparison

Lexora includes a multi-layer comparison engine capable of:

* semantic overlap analysis
* plagiarism risk estimation
* sentiment comparison
* keyword similarity detection
* matching sentence extraction
* tone difference evaluation

The comparison system uses weighted NLP heuristics and contextual scoring to provide production-style text similarity analytics.

---

## Persistent Report System

Users can reopen and revisit previously generated analyses and comparisons through a persistent report/history system backed by PostgreSQL and Prisma ORM.

---

## Modular NLP Architecture

Lexora uses a modular API-based architecture where each NLP system operates independently through dedicated analysis routes, making the platform scalable and maintainable.

---

# Deployment

Recommended deployment stack:

* Vercel
* Neon PostgreSQL

Production-ready architecture includes:

* serverless API routes
* Prisma ORM
* scalable frontend architecture
* modular NLP services


---

# Current Status

Lexora currently operates as a production-style SaaS MVP featuring:

* multi-module NLP analysis
* persistent report history
* comparison engine
* premium dashboard experience
* scalable architecture

Lexora currently functions as a scalable SaaS MVP focused on AI-powered writing intelligence, NLP analytics, and text comparison workflows.

---

# License

MIT License

---

# Contributors

**Shivaansh Sharma** — Lead Developer, Frontend Architecture, System Integration, Deployment & Secondary Backend/NLP Developer  
- Frontend architecture & dashboard development
- UI/UX system design
- System integration (Prisma, Vercel, API workflows)
- Deployment & production configuration
- Backend development support
- NLP & AI systems support
- Database integration support

GitHub: https://github.com/Shivaansh-Sharma

---

**Harman Singh** — Backend & API Development Lead  
- Backend architecture
- API route development
- Server-side workflows
- Request/response handling
- Comparison engine backend support

GitHub: https://github.com/bhangu1335

---

**Karan Brar** — NLP & AI Systems Lead  
- NLP research & implementation
- Emotion & sentiment systems
- Text analysis algorithms
- AI heuristics & evaluation
- Language processing systems

GitHub: https://github.com/Karanbrar12

---

**Mehul Kala** — Authentication, Security & QA Support  
- Authentication system support
- Session/security workflows
- QA testing
- Validation & bug testing
- Route protection assistance

GitHub: https://github.com/mehulkala

---

**Feroz Ahmad** — Database & Documentation  
- Database support
- Schema/documentation assistance
- Technical documentation
- Project structure research

GitHub: https://github.com/phroze846
