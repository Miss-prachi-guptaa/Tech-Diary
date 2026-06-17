#Tech-Dairy — AI-Powered Blog Platform

A full-stack blog platform with semantic search and AI recommendations.
Built with React, Node.js, Express, MongoDB Atlas, and HNSW vector search.

🔗 Live: [techdiary-one.vercel.app](https://techdiary-one.vercel.app)

---

## Features

**Authentication**
- JWT-based login and registration with refresh tokens
- Role-based access control
- Protected routes on frontend and backend

**Blog Management**
- Create, edit, delete blogs with image upload (Cloudinary)
- Draft and publish workflow
- Responsive UI across all devices

**AI-Powered Semantic Search**
- Search by meaning, not just keywords
- "docker containers" finds blogs about Kubernetes and microservices
- Live suggestions dropdown while typing (debounced)
- Full results on Enter — no page reload

**Blog Recommendations**
- "You might also like" powered by vector similarity
- Uses MMR (Maximal Marginal Relevance) for diverse results
- Freshness decay — newer blogs ranked higher
- Runs entirely in the background — zero impact on API response time

---

## How the AI System Works

1. When a blog is published, a job is pushed to a Redis queue (BullMQ)
2. A background worker picks the job, generates a 384-dimension vector
   using HuggingFace all-MiniLM-L6-v2 (runs locally, free)
3. Vector is saved to MongoDB Atlas
4. Atlas Vector Search (HNSW algorithm) indexes it automatically
5. Search and recommendations query this index in milliseconds

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Vector Search | Atlas Vector Search (HNSW) |
| Embeddings | HuggingFace all-MiniLM-L6-v2 |
| Job Queue | BullMQ + Redis |
| Image Upload | Cloudinary |
| Auth | JWT + Refresh Tokens |
| Deployment | Vercel (frontend) |

---

## API Endpoints
Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
Blogs
GET    /api/blogs
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
Search
GET    /api/search?q=docker
GET    /api/search/suggestions?q=doc
Recommendations
GET    /api/recommendations/:blogId

---

## Local Setup

```bash
# Clone
git clone https://github.com/Miss-prachi-guptaa/Tech-Diary.git

# Backend
cd backend
npm install
cp .env.example .env   # add your keys
npm run dev

# Worker (separate terminal)
npm run worker

# Frontend
cd client
npm install
npm run dev
```

**Required environment variables:**
MONGODB_URI=

JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_HOST=localhost
REDIS_PORT=6379
