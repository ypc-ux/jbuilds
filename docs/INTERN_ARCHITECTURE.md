# YPC-UX System Architecture

**Overview:** How all services, databases, and systems work together

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                   (http://localhost:3000)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/JSON
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js 16 + React 19 (TypeScript)                      │   │
│  │  ├─ Pages: src/app/page.tsx, /compare/page.tsx          │   │
│  │  ├─ Components: Evaluation Form, Result Cards, Charts    │   │
│  │  ├─ State: React Context + Hooks                        │   │
│  │  └─ Styling: Tailwind CSS + shadcn/ui                   │   │
│  │  Port: 3000 (localhost)                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API (localhost:3001/api)
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   ┌─────────────┐  ┌──────────────────┐  ┌────────────────┐
   │ POST /eval  │  │  GET /repos      │  │ GET /history   │
   │ POST /compare   │ DELETE /eval/:id │  │ POST /settings │
   └─────────────┘  └──────────────────┘  └────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND LAYER (Express.js)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express.js API Server (Node.js)                         │   │
│  │  ├─ routes/: API endpoints                              │   │
│  │  ├─ services/:                                          │   │
│  │  │  ├─ github.ts (Clone & analyze repos)               │   │
│  │  │  ├─ scoring.ts (5-dimensional evaluation)           │   │
│  │  │  └─ ollama.ts (Local LLM inference)                 │   │
│  │  ├─ db/:                                               │   │
│  │  │  ├─ client.ts (Database connection)                │   │
│  │  │  ├─ schema.ts (PostgreSQL schema)                  │   │
│  │  │  └─ repositories.ts (Data access layer)            │   │
│  │  ├─ Middleware: Auth, CORS, Error handling             │   │
│  │  └─ Logging: Pino logger                               │   │
│  │  Port: 3001 (localhost)                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬──────────────┬──────────────┬──────────────────┘
                 │              │              │
    ┌────────────▼───┐  ┌───────▼────────┐  ┌─▼──────────────────┐
    │                │  │                │  │                    │
    ▼                ▼  ▼                ▼  ▼                    ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │ Ollama LLM  │  │  GitHub API  │  │  External    │
│ (port 5432)  │  │(port 11434) │  │   (public)   │  │   Services   │
│              │  │             │  │              │  │              │
│ Data:        │  │ Local AI    │  │ - Clone repo │  │ - Vercel     │
│ ├─ Users     │  │ - Mistral   │  │ - Analyze    │  │ - Supabase   │
│ ├─ Repos     │  │ - Llama     │  │ - Get stats  │  │ - Railway    │
│ ├─ Evaluations  │ - Inference │  │              │  │ - Stripe     │
│ └─ History   │  │ (zero cost) │  │ [Optional    │  │ - Twilio     │
│              │  │             │  │  GitHub      │  │ - Zapier     │
│ Connection:  │  │ Connection: │  │  token]      │  │              │
│ localhost    │  │ localhost   │  │              │  │ [Configured  │
│ :5432        │  │ :11434      │  │ No auth      │  │  per repo]   │
└──────────────┘  └─────────────┘  └──────────────┘  └──────────────┘
```

---

## Data Flow Examples

### Example 1: Repository Evaluation

```
1. User enters URL in Frontend
   "https://github.com/public-apis/public-apis"
   ↓
2. Frontend sends to Backend API
   POST /api/evaluate
   { repositoryUrl: "..." }
   ↓
3. Backend:
   a) Clones repo using github.ts service
   b) Analyzes structure (package.json, size, etc.)
   c) Sends to Ollama LLM for detailed evaluation
   d) Scores using scoring engine (5 dimensions)
   e) Saves result to PostgreSQL
   ↓
4. Returns evaluation to Frontend
   { score: 78, breakdown: {...}, recommendation: "INTEGRATE SOON" }
   ↓
5. Frontend displays results
   - Score card with gauge
   - Breakdown by dimension
   - Recommendation and effort estimate
   ↓
6. User can save or compare with other repos
```

### Example 2: Comparison View

```
1. User clicks "Compare Repositories"
   ↓
2. Frontend loads saved evaluations from Backend
   GET /api/evaluations
   ↓
3. Backend queries PostgreSQL
   SELECT * FROM evaluations WHERE user_id = ?
   ↓
4. Returns list of past evaluations
   ↓
5. Frontend displays comparison table
   - Each repo with its scores
   - Side-by-side analysis
   - Recommendation ranking
```

---

## Tech Stack Details

### Frontend Layer
**Framework:** Next.js 16 (React 19 + TypeScript)
- **Why:** Server-side rendering, API routes, excellent DX
- **Port:** 3000
- **Build:** `npm run build` → Optimized Next.js app
- **Deploy:** Vercel (automatic on push)

**Key Libraries:**
- `react` - UI components
- `typescript` - Type safety
- `tailwindcss` - Styling
- `shadcn/ui` - Pre-built components
- `axios` or `fetch` - API calls
- `zustand` or `context` - State management

**File Structure:**
```
src/
├─ app/
│  ├─ page.tsx              # Single repo evaluator
│  ├─ compare/page.tsx      # Multi-repo comparison
│  ├─ layout.tsx            # Root layout
│  └─ api/                  # API routes (if any)
├─ components/
│  ├─ evaluation-form.tsx   # Input form
│  ├─ score-card.tsx        # Visual score display
│  ├─ results.tsx           # Results view
│  └─ comparison.tsx        # Comparison view
└─ lib/
   ├─ api-client.ts         # Fetch wrapper
   ├─ types.ts              # TypeScript types
   └─ utils.ts              # Helper functions
```

### Backend Layer
**Framework:** Express.js (Node.js + TypeScript)
- **Why:** Lightweight, flexible, perfect for REST APIs
- **Port:** 3001
- **Build:** `npm run build` → Compiled JavaScript
- **Deploy:** Railway, Render, or Vercel Functions

**Key Libraries:**
- `express` - HTTP server
- `pg` - PostgreSQL client
- `dotenv` - Environment variables
- `helmet` - Security headers
- `cors` - Cross-origin requests
- `pino` - Logging
- `zod` - Type validation
- `axios` - HTTP client (for GitHub API)

**File Structure:**
```
apps/agentgraphology-backend/src/
├─ index.ts                 # Server entry point
├─ routes/                  # API endpoints
│  ├─ evaluation.ts         # /api/evaluate
│  ├─ comparison.ts         # /api/compare
│  └─ history.ts            # /api/history
├─ services/
│  ├─ github.ts             # Clone & analyze repos
│  ├─ scoring.ts            # Scoring algorithm
│  ├─ ollama.ts             # LLM integration
│  └─ database.ts           # DB operations
├─ db/
│  ├─ client.ts             # PostgreSQL connection
│  ├─ schema.ts             # Table definitions
│  └─ repositories.ts       # Data access layer
├─ types/
│  └─ index.ts              # TypeScript types
└─ utils/
   ├─ logger.ts             # Pino logger config
   └─ validators.ts         # Input validation
```

### Database Layer
**Database:** PostgreSQL 16
- **Why:** Reliable, powerful, great for structured data
- **Host:** localhost (local) or Supabase (cloud)
- **Port:** 5432
- **Connection:** Via `pg` driver

**Schema:**
```sql
-- Evaluations table
CREATE TABLE evaluations (
  id UUID PRIMARY KEY,
  repository_url VARCHAR(255) NOT NULL,
  repository_name VARCHAR(255),
  score INTEGER,
  developer_productivity INTEGER,
  technical_debt INTEGER,
  business_fit INTEGER,
  implementation_effort INTEGER,
  cost_benefit INTEGER,
  recommendation VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Evaluation history
CREATE TABLE evaluation_history (
  id UUID PRIMARY KEY,
  evaluation_id UUID REFERENCES evaluations(id),
  action VARCHAR(50),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- User preferences (if needed)
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY,
  scoring_weights JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Access:**
```javascript
// From backend
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

### AI/LLM Layer
**LLM:** Ollama (Local, Zero Cost)
- **Why:** No cloud costs, privacy-first, works offline
- **Port:** 11434
- **Model:** Mistral 7B (or Llama 2)
- **Usage:** Detailed repo analysis and scoring assistance

**How it works:**
```javascript
// From backend scoring service
const response = await ollama.generate({
  model: 'mistral:7b-instruct',
  prompt: `Analyze this repo structure and score...`,
  stream: false
});
// Returns: Detailed analysis with reasoning
```

---

## Service Interactions

### Request Flow (Happy Path)

```
1. User Action
   └─ Clicks "Evaluate Repository"

2. Frontend Request
   └─ POST /api/evaluate
      { repositoryUrl: "https://github.com/.../..." }

3. Backend Receives Request
   └─ Express middleware validates input

4. Repository Analysis
   └─ GitHub service:
      ├─ Clones repo (temp directory)
      ├─ Reads package.json
      ├─ Counts files/lines
      ├─ Checks dependencies
      └─ Analyzes structure

5. LLM Evaluation
   └─ Ollama service:
      ├─ Sends analysis to Mistral 7B
      ├─ Gets detailed reasoning
      └─ Extracts scores

6. Scoring
   └─ Scoring engine:
      ├─ Calculates dimension scores
      ├─ Weighs evidence
      └─ Generates recommendation

7. Data Persistence
   └─ Database service:
      └─ Saves to PostgreSQL evaluations table

8. Response to Frontend
   └─ Returns JSON:
      {
        id: "uuid",
        score: 78,
        breakdown: {...},
        recommendation: "INTEGRATE SOON",
        effort: "20 hours"
      }

9. Frontend Display
   └─ Shows results:
      ├─ Score gauge
      ├─ Breakdown chart
      ├─ Recommendation
      └─ Implementation plan
```

### Error Handling

```
Error at any stage:
├─ Backend catches error
├─ Logs with Pino logger
├─ Returns error response to frontend
└─ Frontend displays user-friendly message

Examples:
- "Repository not found" → GitHub API error
- "Invalid repository URL" → Validation error
- "LLM timeout" → Ollama connection issue
- "Database error" → PostgreSQL issue
```

---

## Deployment Architecture

### Local Development
```
Your Computer:
├─ Frontend: npm run dev (port 3000)
├─ Backend: npm run dev (port 3001)
├─ PostgreSQL: Docker container (port 5432)
└─ Ollama: Local/Docker (port 11434)

All running on localhost
Zero cloud costs
Perfect for development
```

### Production Deployment
```
Vercel (Frontend):
├─ Next.js app
├─ Automatic builds on git push
├─ Edge functions available
└─ Custom domain support

Railway / Render (Backend):
├─ Express.js API
├─ Auto-deploys from git
├─ Environment variables
└─ PostgreSQL connection pooling

Supabase / Vercel Postgres (Database):
├─ Managed PostgreSQL
├─ Automatic backups
├─ Connection pooling
└─ Monitoring included

Ollama (Inference):
├─ Local to backend (Railway/Render)
├─ No additional costs
├─ Zero API calls
└─ Privacy-first
```

---

## Key Design Decisions

### Why This Architecture?

| Component | Choice | Why |
|-----------|--------|-----|
| Frontend | Next.js | SSR, API routes, great DX, Vercel native |
| Backend | Express.js | Simple, flexible, JavaScript/Node.js |
| Database | PostgreSQL | Structured data, reliable, scalable |
| LLM | Ollama | Local, free, private, offline-capable |
| Deployment | Vercel + Railway | Fast, reliable, good free tiers |

### Trade-offs

| Trade-off | Benefit | Cost |
|-----------|---------|------|
| Monorepo (frontend + backend) | Shared types, easy updates | More complex build setup |
| Local Ollama | Zero cloud costs, privacy | Memory intensive (8GB) |
| PostgreSQL | Powerful queries, transactions | More overhead than NoSQL |
| TypeScript | Type safety, better DX | Compilation step needed |

---

## Performance Characteristics

### Evaluation Speed
- **Repo analysis:** 2-5 seconds (cloning + structure analysis)
- **LLM evaluation:** 3-8 seconds (Mistral 7B processing)
- **Database save:** <100ms
- **Total time:** 5-15 seconds per evaluation

### Scalability
- **Concurrent users:** Up to 100+ with Railway/Render scaling
- **Database:** Handles millions of evaluations
- **LLM:** Limited to backend compute capacity
- **Bottleneck:** LLM processing time (not database)

### Memory Usage
- **Frontend:** ~50MB
- **Backend:** ~200-300MB
- **Ollama:** 4-8GB (for model)
- **PostgreSQL:** 256-512MB

---

## Monitoring & Logging

### Logs
- **Frontend:** Browser console (React dev tools)
- **Backend:** Pino logger (JSON format)
  ```bash
  # Tail logs
  docker-compose logs -f api
  ```

### Metrics to Watch
- API response time (should be <2s)
- Database query time (should be <100ms)
- Ollama processing time (varies by model)
- Error rate (should be <1%)

---

## Security

### Data Protection
- ✅ Environment variables for secrets
- ✅ CORS configured (frontend origin only)
- ✅ Helmet.js security headers
- ✅ Input validation (Zod schemas)
- ✅ SQL injection prevention (pg parameterized queries)

### API Security
- ✅ No sensitive data in logs
- ✅ Rate limiting recommended (add later)
- ✅ HTTPS in production
- ✅ Authentication ready (can add Supabase Auth)

---

## Next Steps

1. **Understand this architecture** - Read through carefully
2. **Run the setup** - Get everything running locally
3. **Trace a request** - Follow one evaluation through the entire system
4. **Explore the code** - Look at actual implementation
5. **Start contributing** - Make your first changes

---

**Want to add a new feature?** Trace the data flow to understand where code needs to change.

**Performance issue?** Check this architecture to identify the bottleneck.

**New team member?** Share this doc so they understand how it works.
