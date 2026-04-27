# 🚀 AI-Powered Full-Stack Blog Platform

A modern, full-stack blogging platform built with **Next.js** that allows users to create, manage, and enhance blog content using **AI-powered generation (Google Gemini API)**.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Google OAuth login (NextAuth)
* Email & password authentication
* Secure session management
* User-specific dashboards (only see your own posts)
* Protected routes and APIs

---

### 📝 Blog Management

* Create, edit, delete blog posts
* Draft & publish functionality
* Rich text editor for content creation
* Slug-based routing for SEO-friendly URLs

---

### 🤖 AI Integration

* Generate full blog content from prompts
* Generate blog titles
* Generate summaries (excerpt)
* Improve existing content using AI
* Powered by **Google Gemini API**

---

### 📊 Dashboard

* View all your posts (draft + published)
* Edit and delete your own posts
* Status indicators (Draft / Published)

---

### 🌐 Blog Feed

* Public homepage with all published blogs
* Clean card-based UI
* Individual blog view pages

---

### 🎨 Modern UI/UX

* Built with Tailwind CSS + shadcn/ui
* Responsive design (mobile-first)
* Clean, minimal, SaaS-style interface

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js API Routes
* MongoDB + Mongoose

### Authentication

* NextAuth.js

### AI

* Google Gemini API

---

## 📂 Project Structure

```bash
/app
  /api
    /posts
    /ai
    /auth
  /editor
  /dashboard
  /post/[slug]

/components
/lib
/models
/utils
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-blog-platform.git
cd ai-blog-platform
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env.local` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection

# NextAuth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

---

### 4️⃣ Run the app

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

## 🧪 Usage

1. Sign up / log in (Google or Email)
2. Go to **Editor**
3. Create a blog manually OR use AI
4. Publish the blog
5. View it on homepage
6. Manage posts in dashboard

---

## 🔐 Security

* API routes protected using NextAuth sessions
* Authorization layer ensures users can only modify their own posts
* Input validation and error handling implemented



⭐ If you like this project, consider giving it a star!
