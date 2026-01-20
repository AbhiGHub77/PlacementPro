# 🎯 PlacementPro – AI-Powered Career Guidance Platform

**PlacementPro** is a web-based AI-powered career planning platform designed to help students and early professionals prepare efficiently for placements.  
It provides **personalized, deterministic career roadmaps**, company suitability analysis, and skill gap identification — avoiding generic AI advice.

🔗 **Live Deployment:**  
https://placement-pro-beta.vercel.app/

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started (Local)](#getting-started-local)
  - [Prerequisites](#prerequisites)
  - [Clone and Install](#clone-and-install)
  - [Environment Variables](#environment-variables)
  - [Run](#run)
- [Deployment](#deployment)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## 🧠 Overview

This repository contains **PlacementPro**, an AI-driven career decision and preparation system.  
Unlike generic chatbot-based career tools, PlacementPro focuses on **structured evaluation and deterministic outputs**.

The platform helps users:
- Understand their current placement readiness
- Identify skill gaps
- Get company-specific preparation roadmaps
- Save time by focusing only on high-impact preparation

---

## ✨ Features

- 🧑‍🎓 Profile-based career evaluation
- 📊 Skill readiness scoring (DSA, CS fundamentals, projects, etc.)
- 🏢 Company suitability & matching analysis
- 🗺️ Personalized, step-by-step preparation roadmap
- 🚫 No generic AI chat responses
- 🔁 Deterministic & reproducible results
- ⚡ Fast, responsive UI
- 🌐 Deployed on Vercel

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React
- **Backend / Logic:** Server-side logic (Next.js APIs / Firebase)
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **State Management:** React Context / TanStack Query
- **Styling:** Tailwind CSS
- **Hosting & CI/CD:** Vercel

---

## 🏗️ Architecture

High-level architecture:

- **Client (Next.js Web App)**
  - User profile input
  - Roadmap & company recommendations
- **Backend Logic**
  - Skill normalization & scoring
  - Company matching logic
- **Firebase**
  - Authentication
  - User profile storage
- **Vercel**
  - Continuous deployment
  - Environment variable management

---

## ▶️ Getting Started (Local)

### Prerequisites

- Node.js >= 18
- npm or yarn
- Firebase project (Auth + Firestore enabled)

---

### Clone and Install

- git clone https://github.com/AbhiGHub77/placement-pro.git
- cd placement-pro
- npm install

---

## 🔐 Environment Variables

Create a .env.local file in the project root:

- NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
- NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

⚠️ Do not commit .env.local to GitHub.

---

## ▶️ Run
- npm run dev

- Open the app in your browser at:
  👉 http://localhost:3000

---

🌍 Deployment

- The project is deployed using Vercel
- Each push to the main branch triggers an automatic deployment
- Environment variables are securely managed in Vercel dashboard
- Live URL remains constant while features update internally

---

🔐 Configuration & Environment Variables

Important environment variables used by the app:
- NEXT_PUBLIC_FIREBASE_API_KEY – Firebase API key
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN – Firebase auth domain
- NEXT_PUBLIC_FIREBASE_PROJECT_ID – Firebase project ID
- NEXT_PUBLIC_FIREBASE_APP_ID – Firebase app ID
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID – Messaging sender ID
- Configure these in:
  Vercel → Project Settings → Environment Variables

---

🤝 Contributing

Contributions are welcome!
1.Fork the repository
2.Create a new branch
  git checkout -b feature/your-feature-name
3.Make your changes
4.Commit and push
5.Open a Pull Request

---

🗺️ Roadmap

Planned enhancements:
📈 Advanced readiness analytics dashboard
🧠 Improved AI-based scoring logic
🎯 Role-based & domain-specific roadmaps
🏢 Expanded company dataset
🔔 Notification & reminder system
📱 Mobile UI optimization

---

📄 License

This project is currently unlicensed.
You may add an open-source license (MIT, Apache-2.0, etc.) if desired.

---

📬 Contact

Maintainer: Abhijeet Kamble
GitHub: https://github.com/AbhiGHub77

---

⭐ If you find this project useful, consider giving it a star!

---


