# AI-Based Employee Performance Analytics & Recommendation System

## Full-Stack MERN Application

This project is an AI-driven Employee Performance Analytics & Recommendation System, developed using the MERN stack (MongoDB, Express, React, Node.js). It integrates OpenRouter AI API to analyze employee performance and provide automated recommendations for promotions, training, and feedback.

## Features
- **Authentication**: JWT-based secure authentication for Admin/HR.
- **Employee Management**: Add, view, search, and manage employee records.
- **AI Integration**: AI-driven performance feedback, promotion recommendations, and training suggestions based on employee skills and score.
- **Premium UI**: Modern glassmorphism UI with vibrant gradients and responsive design without using external CSS frameworks.

## Project Structure
- `backend/`: Node.js, Express, MongoDB (Mongoose), AI Integration.
- `frontend/`: React, Vite, Axios, Lucide React, Premium Vanilla CSS.

## Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)
- OpenRouter API Key

## Local Setup

### 1. Backend Setup
1. Open terminal and go to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai-employee-db
   JWT_SECRET=supersecretjwtkey123
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and go to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser (usually `http://localhost:5173`).

## API Endpoints Overview

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Employees
- `POST /api/employees` (Protected)
- `GET /api/employees` (Protected)
- `GET /api/employees/search?department=name` (Protected)

### AI Recommendation
- `POST /api/ai/recommend` (Protected)

---

## Deployment on Render Instructions

### Backend Deployment
1. Go to [Render](https://render.com) and sign in.
2. Click on **New +** and select **Web Service**.
3. Connect your GitHub repository containing this project.
4. Set the **Root Directory** to `backend`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `node server.js`.
7. Add **Environment Variables** (MONGO_URI, JWT_SECRET, OPENROUTER_API_KEY).
8. Click **Create Web Service**.

### Frontend Deployment
1. Go to [Render](https://render.com) and select **New +** -> **Static Site**.
2. Connect the same GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Set **Build Command** to `npm run build`.
5. Set **Publish Directory** to `dist`.
6. Click **Create Static Site**.
7. *Note*: Ensure your backend URL is updated in `frontend/src/api.js` for the live version.

## Submission
For your final examination PDF:
- Take screenshots of the running code UI.
- Use Postman/Thunder Client to hit the backend endpoints and take screenshots.
- Check MongoDB Compass/Atlas to show the saved data.
- Once deployed on Render, add the live URLs here.
