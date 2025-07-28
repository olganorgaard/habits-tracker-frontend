# 🧠 Habit Tracker App

YourHabit is a simple and intuitive habit tracker app that helps you build better routines, stay consistent, and reach your goals. Track daily habits, visualize progress, and stay motivated—all in one clean, easy-to-use dashboard.
<p>Live Demo 👉 [https://habits-tracker-app.netlify.app](https://habits-tracker-app.netlify.app)</p>

---

## 📌 Features

- ✅ User authentication (Auth0)
- 📊 Dashboard to manage daily habits
- ✏️ Create, edit, delete habits
- 🟢 Mark habits as complete
- 🔐 Private data per authenticated user
- 🌐 Deployed Frontend (Netlify) + Backend (Render)
- ☁️ MongoDB database for persistence

---

## 🛠 Tech Stack

| Frontend                     | Backend                    |
|-----------------------------|----------------------------|
| React + React Router        | Node.js + Express          |
| Auth0 (Authentication)      | MongoDB (via Mongoose)     |
| Netlify (Hosting)           | Render (API Hosting)       |
| Responsive CSS / Flexbox    | Auth0 JWT Middleware       |

---

## 🚀 Getting Started 
**1. Clone the Repo**
- Backend
   ```bash
   https://github.com/olganorgaard/habits-tracker-backend
  ```
- Frontend
   ```bash
   https://github.com/olganorgaard/habits-tracker-frontend
   cd habit-tracker
  ```
  
**2. Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```
Create .env in frontend/:
  ```bash
  REACT_APP_AUTH0_DOMAIN=your-auth0-domain
  REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
  REACT_APP_API_URL=https://your-render-backend-url/habits
  REACT_APP_AUTH0_AUDIENCE=https://your-auth0-api-audience
  REACT_APP_AUTH0_REDIRECT_URI=https://your-netlify-url/callback
  ```
Then run:
  ```bash
  npm start
  ```

**3. Setup Backend**
   ```bash
   cd ../backend
   npm install
   ```
Create .env in backend/:
 ```bash
MONGODB_LINK = your-mongodb-connection-string
AUTH0_SECRET= your-auth0-secret-value
AUTH0_CLIENT_ID=your0auth0-client-id
AUTH0_DOMAIN=https://your-auth0-domain
AUTH0_AUDIENCE=https://your-auth0-api-audience
 ```
Then run:
```bash
node server.js
```
---

## 🔐 Auth0 Setup Guide
1. Go to <a href="https://manage.auth0.com/">Auth0 Dashboard</a>
2. Create a Single Page App
3. Add the following:
  
- Allowed Callback URLs:
https://habits-tracker-app.netlify.app/callback

- Allowed Web Origins:
https://habits-tracker-app.netlify.app

- Allowed Logout URLs:
https://habits-tracker-app.netlify.app

---

## 📂 Project Structure
```bash
habit-tracker/
│
├── backend/               # Node.js + Express API
│   ├── controllers/
│   ├── middwave/
│   ├── model/
│   ├── routes/
│   └── server.js
│
├── frontend/              # React App
│   ├── public/
│   └── src/
│   └── .env
│   └── src/
├── README.md
└── .gitignore
```

---

## 🌍 Deployment
**Frontend on Netlify**
<ol>
<li>Push the React project to GitHub.</li>
<li>In Netlify: </li>
   <ul>
  <li>Connect GitHub repo</li>
  <li>Set build command: npm run build</li>
  <li>Set publish directory: build</li>
  <li>Add the frontend .env variables in Netlify UI</li>
   </ul>
<li>Add _redirects file in public/ folder:</li>
  </ol>
  
```bash
/*  /index.html  200
```
<br>

**Backend on Render**
<ol>
<li>Push the backend folder to GitHub.</li>
<li>Create a new web service on Render.</li>
<li>Set start command: node server.js </li>
<li>Add environment variable MONGODB_LINK</li>
<li>Allow CORS from Netlify’s deployed frontend URL</li>
</ol>
<br>
Make sure your frontend .env references the Render URL in REACT_APP_API_URL.

---

## 🙌 Acknowledgments
- Auth0
- MongoDB
- Render
- Netlify

---

<br><h2> 📬 Contact </h2>
<p>Feel free to reach out if you want to collaborate, have questions, or just want to connect! </p><br>
<ul>
  <li>LinkedIn: <a href="https://www.linkedin.com/in/olga-kozlova-25464892/">https://www.linkedin.com/in/olga-kozlova-25464892/</a></li>
  <li>Email: <a href="mailto:norgaardov@gmail.com">norgaardov@gmail.com</a></li>
  <li>Instagram: <a href="https://www.instagram.com/kozlova_olgav/">Olga</a> </li>
</ul>
