# 📖 Bibeli - AI-Powered Bible Study Companion

[![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)](https://expo.dev/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-green)](https://supabase.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI%20GPT--4-orange)](https://openai.com/)
[![Deepgram](https://img.shields.io/badge/Voice-Deepgram-purple)](https://deepgram.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Transform your Bible reading into deep, meaningful conversations with AI-powered study assistance and habit tracking.

---

## 🌟 What is Bibeli?

Bibeli is a mobile Bible study companion that helps Christians understand Scripture more deeply through AI-powered conversations. Rather than competing with Bible reading apps, Bibeli complements them by focusing on comprehension and consistent habit formation.

**The Problem We Solve:**
- Many Christians read the Bible but struggle to understand historical context, cultural background, and theological implications
- Traditional study Bibles are dense and intimidating
- Googling questions yields fragmented, unreliable answers
- Maintaining consistent Bible reading habits is challenging

**Our Solution:**
- Voice-enabled AI conversations that explain passages in natural, accessible language
- Streak tracking that gamifies consistency without adding burden
- Works alongside any Bible app or physical Bible - users aren't locked into our platform
- Privacy-first approach for vulnerable questions and personal spiritual growth

---

## 🎯 Core Value Proposition

### For The Earnest Seeker (Primary User)
- **Age:** 25-45
- **Current Behavior:** Reads Bible 2-4x/week using existing Bible app or physical Bible
- **Pain Points:** Confused by difficult passages, lacks accountability, wants deeper understanding
- **What We Provide:** Non-judgmental AI study partner + streak motivation system

### Key Differentiators
- **Not Another Bible App:** We complement your favorite Bible instead of replacing it
- **Conversational AI:** Natural dialogue, not keyword search
- **Theological Accuracy:** Trained on orthodox Christian doctrine with pastoral tone
- **Habit Formation:** Streak tracking designed around grace, not guilt

---

## ✨ Key Features

### 🗣️ AI Voice Conversation
- Natural voice or text input for Bible study questions
- Real-time speech-to-text transcription via Deepgram
- GPT-4 powered responses with theological accuracy
- Text-to-speech audio responses for hands-free study
- Multi-turn conversations that remember context within sessions

### 📚 Biblical Knowledge Engine
- Historical and cultural context for any passage
- Cross-references to related Scripture across Old and New Testament
- Original Greek/Hebrew word explanations when relevant
- Multiple orthodox perspectives on debated theological topics
- Practical application suggestions for modern life

### 🔥 Streak Tracking & Motivation
- Daily streak counter with visual progress indicators
- Milestone badges (7, 30, 100, 365 days)
- Grace-filled notifications that encourage without guilt
- Statistics dashboard: total study days, passages explored, questions asked
- Calendar heat map showing study consistency

### 🎓 Personalized Learning
- AI adapts explanation depth to user's biblical knowledge level
- Asks clarifying questions to understand learning goals
- Suggests related passages for deeper topical study
- Tracks which books and themes user has explored

### 🔒 Privacy & Security
- End-to-end encrypted conversations
- No conversation sharing or data selling
- Private space for vulnerable spiritual questions
- Supabase Row-Level Security protecting user data

---

## 🛠️ Technology Stack

### Frontend
- **React Native (Expo):** Cross-platform mobile development for iOS and Android
- **TypeScript:** Type-safe development for critical components and AI integration
- **React Navigation:** Screen navigation and routing system
- **Zustand:** Lightweight state management for user sessions and app state
- **React Query (TanStack Query):** Data fetching, caching, and synchronization
- **React Native Paper/NativeBase:** UI component library for consistent design

### Backend
- **Supabase:** Complete Backend-as-a-Service platform
- **PostgreSQL:** Relational database for user profiles, conversations, and streaks
- **Supabase Auth:** Email/password and OAuth authentication (Google, Apple)
- **Supabase Edge Functions:** Server-side logic and API orchestration
- **Expo Notifications:** Cross-platform push notification system

### AI & Voice
- **OpenAI GPT-4 Turbo:** Conversational AI for theological discussions and guidance
- **Deepgram API:** Real-time speech-to-text transcription
- **OpenAI TTS:** High-quality text-to-speech for voice responses
- **Custom System Prompts:** Theologically-trained AI behavior for orthodox teaching
- **Expo AV:** Audio recording and playback management

### Supporting Services
- **date-fns:** Date manipulation for streak calculations and timezone handling
- **Axios:** HTTP client for API communication
- **Sentry:** Error tracking and crash reporting
- **Expo Analytics:** User behavior tracking and engagement metrics

---

## 🏗️ System Architecture

### Architecture Overview

┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                           │
│                  (React Native + Expo)                      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Study Session│  │  Conversation│  │    Streak    │    │
│  │  Interface   │  │   History    │  │   Tracking   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│         Zustand State    │    React Query Cache            │
└─────────────────────────┼─────────────────────────────────┘
│
Supabase Client SDK
│
┌─────────────────────────┼─────────────────────────────────┐
│                  BACKEND LAYER (Supabase)                   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Supabase   │  │  PostgreSQL  │  │     Edge     │    │
│  │     Auth     │  │   Database   │  │  Functions   │    │
│  │              │  │              │  │              │    │
│  │ • Email/Pass │  │ • Users      │  │ • AI Proxy   │    │
│  │ • OAuth      │  │ • Sessions   │  │ • STT/TTS    │    │
│  │ • JWT Tokens │  │ • Streaks    │  │ • Security   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────┼─────────────────────────────────┘
│
Edge Functions Call External APIs
│
┌─────────────────────────┼─────────────────────────────────┐
│              AI & EXTERNAL SERVICES                         │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Deepgram   │  │   OpenAI     │  │  OpenAI TTS  │    │
│  │     API      │  │   GPT-4      │  │              │    │
│  │              │  │              │  │              │    │
│  │ Speech-to-   │  │ Theological  │  │ Natural Voice│    │
│  │    Text      │  │  Responses   │  │   Output     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘

### Data Flow: Complete Study Session

**Step 1:** User opens app → Supabase Client checks auth → Loads user data
**Step 2:** User taps microphone → Expo AV records audio
**Step 3:** Audio sent to Edge Function → Forwarded to Deepgram → Returns transcript
**Step 4:** Frontend displays user's question in chat
**Step 5:** Frontend calls Edge Function with transcript + context
**Step 6:** Edge Function retrieves conversation history from PostgreSQL
**Step 7:** Edge Function calls OpenAI GPT-4 with system prompt + context
**Step 8:** AI response saved to database + study session updated
**Step 9:** Text sent to OpenAI TTS → Returns audio file
**Step 10:** Frontend displays text + plays audio via Expo AV
**Step 11:** If 2+ minutes elapsed → Streak updated in database
**Step 12:** User ends session → Frontend finalizes + schedules notification

### Database Schema

**Users Table**
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `created_at` (Timestamp)
- `knowledge_level` (Enum: beginner, intermediate, advanced)
- `preferred_study_time` (Time)
- `notification_enabled` (Boolean)

**Study Sessions Table**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → Users)
- `started_at` (Timestamp)
- `ended_at` (Timestamp)
- `duration_seconds` (Integer)
- `passage_reference` (String, e.g., "John 3:16")
- `completed` (Boolean)

**Conversations Table**
- `id` (UUID, Primary Key)
- `session_id` (UUID, Foreign Key → Study Sessions)
- `user_id` (UUID, Foreign Key → Users)
- `role` (Enum: user, assistant)
- `content` (Text)
- `timestamp` (Timestamp)

**Streaks Table**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → Users)
- `current_streak` (Integer)
- `longest_streak` (Integer)
- `last_study_date` (Date)
- `total_study_days` (Integer)

---

## 🤖 AI Implementation

### AI Features & Capabilities

**Conversational Bible Study Partner**
- Natural, multi-turn conversations about any Bible passage or theological topic
- Contextual awareness that remembers earlier discussion in the session
- Asks clarifying questions to understand user's learning goals
- Adapts explanation depth based on user's biblical knowledge level

**Biblical Knowledge & Accuracy**
- Provides historical and cultural context for passages
- Explains original Greek/Hebrew word meanings when relevant
- Cites specific Bible verses to support theological claims
- Cross-references related passages across testaments
- Identifies literary genres and explains interpretation principles

**Theological Guardrails**
- Maintains orthodox Christian theology aligned with historical creeds
- Acknowledges theological debates on secondary issues without being dogmatic
- Presents multiple orthodox perspectives when denominations differ
- Refuses to provide heretical interpretations or harmful advice
- Redirects users expressing concerning thoughts to appropriate resources

**Practical Application**
- Helps users connect ancient Scripture to modern life situations
- Asks reflective questions to deepen personal engagement
- Suggests practical ways to apply biblical principles
- Provides contemporary examples and analogies

### Technical Implementation

**AI Model Configuration**
- Model: OpenAI GPT-4 Turbo
- Temperature: 0.7 (balanced creativity and consistency)
- Max Tokens: 500-800 per response
- Context Window: Last 5-8 conversation turns for continuity

**Voice Processing Pipeline**
- **STT (Deepgram Nova-2):** Real-time transcription with punctuation
- **TTS (OpenAI):** "Alloy" voice for warm, natural tone at 1.0x speed
- **Format:** MP3 for compatibility and reasonable file size

**Edge Function Architecture**
- `transcribe-audio`: Frontend → Deepgram API → Return transcript
- `chat-with-ai`: Retrieve context → OpenAI API → Save to DB → Return response
- `generate-speech`: AI text → OpenAI TTS → Return audio URL

**Content Safety**
- Input validation for inappropriate requests
- OpenAI Moderation API for harmful content detection
- Self-harm detection triggers crisis resource recommendations
- Theological review process for flagged responses

**Performance Optimization**
- Parallel processing: TTS generation while saving to database
- Error handling with 3 retry attempts and exponential backoff
- 15-second timeout for AI responses, 10 seconds for TTS
- Rate limiting: Per-user API call limits to prevent abuse

---

## 📋 Project Requirements

### Functional Requirements (MVP)

**User Authentication**
- Allow immediate app usage without account (anonymous mode)
- Prompt account creation after 3rd session for data persistence
- Email/password and OAuth (Google, Apple) sign-in
- Secure JWT-based session management

**AI Conversation Engine**
- Voice input via device microphone (Deepgram STT)
- Text input via keyboard as alternative
- Voice output with text-to-speech (OpenAI TTS)
- Conversation history saved with timestamps
- 2+ minute engagement threshold for streak completion

**Streak Tracking**
- Daily streak counter with current and longest streak display
- Milestone badges at 7, 14, 30, 60, 100, 365 days
- Calendar heat map visualization
- Statistics: total study days, passages studied, questions asked
- Timezone-aware daily resets at midnight local time

**Notifications**
- One daily reminder at user-specified time
- Skip notification if user already studied that day
- Encouraging, grace-filled messaging (10+ varied messages)
- Snooze functionality (30min, 1hr, 2hr options)
- In-app notification settings management

**Conversation Management**
- View past study sessions chronologically
- Search history by passage, keyword, or date
- Delete individual conversations or entire history
- Export conversations (PDF/text) for personal records

### Non-Functional Requirements

**Performance**
- App launch: <2 seconds on modern devices
- Voice recognition: <500ms processing start time
- AI response: <3 seconds for 90% of queries
- Support iOS 14+ and Android 10+

**Security**
- End-to-end encrypted data transmission (HTTPS/TLS)
- Supabase Row-Level Security for database access
- API keys never exposed to client code
- GDPR and CCPA compliance for data privacy

**Scalability**
- Support 10,000+ concurrent users
- Database optimized for conversation history growth
- Edge Functions auto-scale with demand

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- Supabase account (free tier available)
- OpenAI API key
- Deepgram API key

- Clone the Repository
- Run npm install
- Configure Supabase database and environmental variables
- Run npx expo start
