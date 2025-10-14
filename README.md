# 📖 Bibeli - AI-Powered Bible Study Companion

[Logo/Banner Image Placeholder]

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