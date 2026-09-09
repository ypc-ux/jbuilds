# 30-Day Intern Onboarding Plan

**Welcome to YPC-UX!** This is your structured roadmap for the first month. Follow this weekly plan to go from zero to productive backend contributor.

---

## Overview

| Week | Focus | Deliverable | Hours |
|------|-------|-------------|-------|
| 1 | Environment & Foundations | All services running locally, all repos cloned | 15-20 |
| 2 | ascent-placements Deep Dive | First PR merged (small feature/fix) | 20-25 |
| 3 | Backend Basics | Understand jbuilds architecture, run backend locally | 15-20 |
| 4 | First Backend Feature | One backend feature implemented & tested | 20-25 |

**Total Expected Time:** ~70-90 hours (roughly 2-3 weeks full-time, or 5-6 weeks part-time at 15 hrs/week)

---

## Week 1: Environment & Foundations

**Goal:** Get your entire development environment running. By end of week, every service should be accessible locally.

### Day 1-2: Setup & Configuration (5-6 hours)

- [ ] **Complete INTERN_SETUP.md** (skip to Docker Compose option)
  - [ ] Git SSH configured and tested
  - [ ] All 16 repos cloned to ~/repos/ypc-ux/
  - [ ] All global tools installed (Vercel CLI, TypeScript, Prettier)
  - [ ] Estimated time: 2-3 hours

- [ ] **Database Setup** (Docker Compose option)
  ```bash
  cd ~/repos/ypc-ux/jbuilds
  docker-compose up -d postgres
  sleep 5
  docker-compose exec postgres psql -U postgres -c "CREATE DATABASE agentgraphology;"
  ```
  - [ ] Verify database running: `docker ps | grep postgres`
  - [ ] Estimated time: 0.5 hours

- [ ] **Environment Variables**
  - [ ] Copy `.env.local.example` → `.env.local`
  - [ ] Copy `apps/agentgraphology-backend/.env.example` → `.env`
  - [ ] Edit backend .env with database URL
  - [ ] Estimated time: 0.5 hours

- [ ] **Dependency Installation**
  - [ ] `npm install` (frontend root)
  - [ ] `cd apps/agentgraphology-backend && npm install`
  - [ ] Estimated time: 3 hours

### Day 3-4: Service Verification (4-6 hours)

- [ ] **Start Backend**
  ```bash
  cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend
  npm run dev
  # Should show: Server running on http://localhost:3001
  ```
  - [ ] Test: `curl http://localhost:3001/api/health`
  - [ ] Estimated time: 0.5 hours

- [ ] **Start Frontend**
  ```bash
  cd ~/repos/ypc-ux/jbuilds
  npm run dev
  # Should show: Ready on http://localhost:3000
  ```
  - [ ] Test: Open http://localhost:3000 in browser
  - [ ] Estimated time: 0.5 hours

- [ ] **Database Verification**
  - [ ] Run: `npm run db:test` from backend directory
  - [ ] Should show: "Database connection successful"
  - [ ] Estimated time: 0.5 hours

- [ ] **Complete Verification Checklist** from INTERN_SETUP.md
  - [ ] All 6 items checked ✓
  - [ ] No errors on any check
  - [ ] Estimated time: 1-2 hours

### Day 5: Repository Understanding (3-4 hours)

- [ ] **Read INTERN_ARCHITECTURE.md** (30-45 min)
  - Focus on: System diagram, frontend/backend layers, data flow examples

- [ ] **Trace One Evaluation** through the system
  - [ ] Start at frontend (http://localhost:3000)
  - [ ] Enter a test repository URL
  - [ ] Watch backend logs to see services being called
  - [ ] See result stored in database
  - [ ] Document the flow in your notes
  - [ ] Estimated time: 1-2 hours

- [ ] **Explore Codebase Structure**
  ```bash
  # Frontend structure
  ls -la ~/repos/ypc-ux/jbuilds/src/app/
  ls -la ~/repos/ypc-ux/jbuilds/src/components/
  
  # Backend structure
  ls -la ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend/src/
  ls -la ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend/src/routes/
  ls -la ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend/src/services/
  ```
  - [ ] Understand layout (don't dive deep yet)
  - [ ] Estimated time: 1 hour

### Week 1 Success Criteria ✅

- [ ] All services running locally without errors
- [ ] Can access http://localhost:3000 (frontend)
- [ ] Can access http://localhost:3001/api/health (backend)
- [ ] Database connection working
- [ ] All 16 repos cloned
- [ ] Understand system architecture at high level
- [ ] Traced one request through entire system

---

## Week 2: ascent-placements-marketing Deep Dive

**Goal:** Make your first PR. This project is simpler than the full-stack apps—perfect for getting comfortable with Git workflow.

### Day 1-2: Project Understanding (4-5 hours)

- [ ] **Clone & Examine ascent-placements-marketing**
  ```bash
  cd ~/repos/ypc-ux
  git clone https://github.com/ypc-ux/ascent-placements-marketing.git
  cd ascent-placements-marketing
  ```

- [ ] **Read project files** (no npm install needed—it's static)
  - [ ] `index.html` - Main landing page (skim entire file)
  - [ ] `styles/` folder - CSS files (understand structure)
  - [ ] `js/` folder - JavaScript interactions (read main.js)
  - [ ] `api/` folder - Vercel serverless functions (read form handler)
  - [ ] `README.md` - Project documentation
  - [ ] Estimated time: 2-3 hours

- [ ] **Preview locally**
  - [ ] Open `index.html` in browser
  - [ ] Test form submission
  - [ ] Check browser console for errors
  - [ ] Estimated time: 1 hour

- [ ] **Understand deployment**
  - [ ] Read about Vercel in INTERN_SETUP.md
  - [ ] Know that this project auto-deploys on git push
  - [ ] Estimated time: 0.5 hours

### Day 3-4: Identify & Implement First Task (6-8 hours)

- [ ] **Find a task to work on** (pick one)
  - **Option 1: Bug fix** - Look for any reported issues or bugs in the site
  - **Option 2: Small feature** - Add form validation, improve styling, add analytics tracking
  - **Option 3: Copy update** - Update marketing copy, improve SEO metadata
  - Estimated time: 0.5-1 hour (ask team if unsure)

- [ ] **Create a feature branch**
  ```bash
  git checkout -b claude/[feature-name]
  # Example: git checkout -b claude/form-validation
  ```

- [ ] **Make your changes**
  - [ ] Edit the relevant files (HTML, CSS, or JS)
  - [ ] Test locally in browser
  - [ ] No breaking changes
  - [ ] Estimated time: 3-5 hours (depending on task)

- [ ] **Commit your work**
  ```bash
  git add .
  git commit -m "Add feature description

  - Specific change 1
  - Specific change 2

  Closes #123 (if fixing an issue)"
  ```

### Day 5: Submit & Get Review (2-3 hours)

- [ ] **Push to GitHub**
  ```bash
  git push -u origin claude/[feature-name]
  ```

- [ ] **Create Pull Request**
  - [ ] Go to https://github.com/ypc-ux/ascent-placements-marketing
  - [ ] Click "New Pull Request"
  - [ ] Select your branch
  - [ ] Write PR title & description:
    ```
    ## What changed?
    [Brief summary of changes]
    
    ## Why?
    [Why this change was needed]
    
    ## Testing
    [How to test the change]
    
    ## Screenshots/Links (if applicable)
    [Before/after]
    ```

- [ ] **Respond to feedback**
  - [ ] If reviewer suggests changes, make them
  - [ ] Push new commits to same branch
  - [ ] Re-request review
  - [ ] Estimated time: 1-2 hours

- [ ] **Merge to main**
  - [ ] Once approved, click "Squash and Merge"
  - [ ] Celebrate! 🎉 You just shipped code!

### Week 2 Success Criteria ✅

- [ ] Cloned ascent-placements-marketing
- [ ] Understand project structure
- [ ] Made at least one code change
- [ ] First PR submitted and merged
- [ ] Understand Git workflow (branch → commit → PR → merge)
- [ ] Code deployed to production automatically

---

## Week 3: Backend Basics & Architecture Deep Dive

**Goal:** Understand how the backend works. Start learning the patterns you'll use for backend features.

### Day 1-2: jbuilds Backend Exploration (5-6 hours)

- [ ] **Backend Structure Review** (re-read from INTERN_ARCHITECTURE.md)
  - Focus on "Backend Layer" section
  - Understand: routes, services, db, middleware

- [ ] **Explore Backend Code**
  ```bash
  cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend/src
  
  # Look at these files:
  ls routes/        # API endpoints
  ls services/      # Business logic
  ls db/            # Database access
  ls types/         # TypeScript definitions
  ```

- [ ] **Read key files** (don't memorize, just understand):
  - [ ] `index.ts` - Server entry point (skim)
  - [ ] `routes/evaluation.ts` - A sample API endpoint
  - [ ] `services/github.ts` - How we interact with GitHub
  - [ ] `services/scoring.ts` - Scoring logic
  - [ ] `db/schema.ts` - Database schema
  - [ ] Estimated time: 3-4 hours

- [ ] **Understand API Pattern**
  ```typescript
  // Typical Express route pattern:
  router.post('/evaluate', async (req, res) => {
    // 1. Validate input
    // 2. Call service
    // 3. Return response
  });
  ```
  - Why this pattern?
  - Where validation happens?
  - Where database saves happen?
  - Estimated time: 1-2 hours

### Day 3-4: Database & Queries (4-6 hours)

- [ ] **Database Schema Review**
  - [ ] Open: `apps/agentgraphology-backend/src/db/schema.ts`
  - [ ] Understand: What tables exist? What do they store?
  - [ ] Estimated time: 1 hour

- [ ] **Query Examples**
  - [ ] Open: `apps/agentgraphology-backend/src/db/repositories.ts`
  - [ ] Read sample queries
  - [ ] Understand: SELECT, INSERT, UPDATE patterns
  - [ ] Estimated time: 1-2 hours

- [ ] **Run a Query**
  ```bash
  # Connect to running database
  psql -U postgres -h localhost -d agentgraphology
  
  # Try:
  \dt                 # List tables
  SELECT COUNT(*) FROM evaluations;
  SELECT * FROM evaluations LIMIT 5;
  \q                  # Quit
  ```
  - [ ] Understand what data is stored
  - [ ] See structure in practice
  - [ ] Estimated time: 1-2 hours

- [ ] **TypeScript & Types**
  - [ ] Open: `src/types/index.ts`
  - [ ] See type definitions for: Evaluation, User, Query responses
  - [ ] Understand why we use types
  - [ ] Estimated time: 1 hour

### Day 5: Integration Points (2-3 hours)

- [ ] **How frontend → backend works**
  - [ ] Frontend makes API call: `POST /api/evaluate`
  - [ ] Backend receives, validates, processes
  - [ ] Returns JSON response
  - [ ] Frontend displays result
  - [ ] Estimated time: 1 hour

- [ ] **Trace real evaluation** (hands-on)
  - [ ] Open browser DevTools (F12)
  - [ ] Go to http://localhost:3000
  - [ ] Enter a repo URL
  - [ ] Watch Network tab to see API call
  - [ ] Check backend logs to see what happened
  - [ ] Estimated time: 1-2 hours

### Week 3 Success Criteria ✅

- [ ] Understand backend folder structure (routes, services, db, types)
- [ ] Can read an API endpoint and explain what it does
- [ ] Know where database queries are written
- [ ] Can trace a request from frontend → backend → database
- [ ] Understand TypeScript type system basics
- [ ] Can connect to PostgreSQL directly
- [ ] Know what data is stored in database

---

## Week 4: First Backend Feature Implementation

**Goal:** Implement a small backend feature from start to finish. This proves you understand the patterns and can contribute.

### Day 1: Pick Your Feature (1-2 hours)

- [ ] **Choose one of these starter tasks:**

  **Option 1: Add a History Endpoint** (Easier)
  - Create `GET /api/evaluations/:id` endpoint
  - Returns single evaluation with all details
  - Tests your knowledge of: routes, database queries, error handling
  - Estimated: 3-4 hours total

  **Option 2: Add Filtering** (Medium)
  - Create `GET /api/evaluations?score_min=70&score_max=90` endpoint
  - Returns filtered evaluations
  - Tests: query parameters, SQL WHERE clauses, pagination
  - Estimated: 5-6 hours total

  **Option 3: Add Sorting** (Medium)
  - Create `GET /api/evaluations?sort_by=score&order=desc` endpoint
  - Returns sorted evaluations
  - Tests: SQL ORDER BY, parameter parsing
  - Estimated: 4-5 hours total

  **Option 4: Add Deletion** (Medium)
  - Create `DELETE /api/evaluations/:id` endpoint
  - Soft-delete evaluation (mark as deleted, don't remove)
  - Tests: POST/DELETE patterns, database updates
  - Estimated: 4-5 hours total

  - [ ] Discuss with team to pick task
  - [ ] Get requirements clarified
  - [ ] Estimated time: 1-2 hours

### Day 2-3: Implementation (6-8 hours)

- [ ] **Create feature branch**
  ```bash
  cd ~/repos/ypc-ux/jbuilds
  git checkout -b claude/[feature-name]
  ```

- [ ] **Write the endpoint**
  - [ ] Create new route in `src/routes/` or add to existing
  - [ ] Write validation (Zod schema)
  - [ ] Write database query in `db/repositories.ts`
  - [ ] Write service function if needed
  - [ ] Connect route → service → database
  - [ ] Add error handling
  - [ ] Estimated time: 3-4 hours

- [ ] **Test locally**
  - [ ] Use curl or Postman to test endpoint
  - [ ] Try success case
  - [ ] Try error cases (invalid input, not found, etc.)
  - [ ] Check database to verify changes
  - [ ] Estimated time: 1-2 hours

- [ ] **Code review yourself**
  - [ ] Read your code
  - [ ] Does it match project patterns?
  - [ ] Is error handling complete?
  - [ ] Are types correct?
  - [ ] Could it be simpler?
  - [ ] Estimated time: 1-2 hours

### Day 4-5: Testing & Code Review (3-4 hours)

- [ ] **Write tests** (if project has test framework)
  - [ ] Create test file for new endpoint
  - [ ] Test happy path
  - [ ] Test error cases
  - [ ] Run: `npm test`
  - [ ] All tests pass
  - [ ] Estimated time: 2-3 hours (optional if no test framework)

- [ ] **Commit & Push**
  ```bash
  git add .
  git commit -m "Add [feature] endpoint

  - Create GET /api/[endpoint]
  - Add validation with Zod
  - Add database query
  - Add error handling
  
  Tests:
  - [x] Happy path
  - [x] Invalid input
  - [x] Error cases"
  
  git push -u origin claude/[feature-name]
  ```

- [ ] **Create PR & Get Review**
  - [ ] Describe what you built
  - [ ] Link any relevant issues
  - [ ] Request code review from team
  - [ ] Address feedback if any
  - [ ] Estimated time: 1-2 hours

- [ ] **Merge & Deploy**
  - [ ] Once approved, merge to main
  - [ ] Code automatically deploys to staging
  - [ ] Verify it works in staging
  - [ ] Celebrate! You shipped a backend feature! 🚀

### Week 4 Success Criteria ✅

- [ ] Picked a starter backend task
- [ ] Implemented endpoint from scratch
- [ ] Tested locally (curl or Postman)
- [ ] Code follows project patterns
- [ ] Error handling is complete
- [ ] Tests written (if applicable)
- [ ] PR submitted and merged
- [ ] Code deployed successfully
- [ ] You understand the full request → response cycle

---

## 30-Day Completion Checklist

### By End of Day 30, You Should Have:

**Environment & Infrastructure:**
- [ ] All 16 repos cloned locally
- [ ] All services running (frontend, backend, database, etc.)
- [ ] Git & SSH configured properly
- [ ] Environment variables set correctly
- [ ] Can start dev environment with 3 commands

**Knowledge & Understanding:**
- [ ] Understand system architecture (frontend → backend → database)
- [ ] Know purpose of each major folder/file
- [ ] Understand how requests flow through system
- [ ] Know how to read and write database queries
- [ ] Understand TypeScript basics and why we use it
- [ ] Know how Git/GitHub workflow works

**Practical Experience:**
- [ ] Made 2+ commits
- [ ] Opened 2+ pull requests
- [ ] Got code reviewed
- [ ] Merged code to production (both repos)
- [ ] Fixed at least one thing
- [ ] Implemented at least one new feature
- [ ] Understand deployment process

**Ready for Backend Work:**
- [ ] Can create new API endpoints
- [ ] Can write database queries
- [ ] Can add validation
- [ ] Can handle errors properly
- [ ] Can test changes locally
- [ ] Can write clean, readable code

---

## Tips for Success

### Daily Habits
1. **Start each day** reviewing what you learned yesterday
2. **End each day** documenting what you'll do tomorrow
3. **Ask questions** when stuck (don't spend > 30 min on one issue)
4. **Read code** before writing code
5. **Test early and often**

### How to Debug
1. Read the error message carefully (it usually tells you what's wrong)
2. Check the logs (backend console, browser console)
3. Use the debugger (set breakpoints, step through code)
4. Search for similar code in the codebase
5. Ask a teammate

### Code Quality Standards
- [ ] No `console.log()` left in final commits
- [ ] All functions are named clearly
- [ ] Code matches project style (ask if unsure)
- [ ] Error messages are helpful
- [ ] Database queries are efficient

### Communication
- [ ] Tell team when you're blocked
- [ ] Share PRs for early feedback
- [ ] Explain your thinking in comments
- [ ] Ask "dumb questions" (they usually aren't)
- [ ] Celebrate wins with the team

---

## Common Blockers & Solutions

| Blocker | Solution |
|---------|----------|
| "Services won't start" | Check logs: `docker ps`, `npm run dev` output |
| "Port already in use" | `lsof -i :3000` then `kill -9 [PID]` |
| "Database connection error" | Check DATABASE_URL in .env |
| "Can't understand the code" | Trace one request through the entire codebase |
| "Don't know what to work on" | Ask team for next task |
| "My PR is being rejected" | Address feedback and push new commits |
| "Something is broken" | Ask for help immediately (don't get stuck) |

---

## After Day 30

Once you complete the 30-day plan:

1. **You're ready for real work** - Pick actual backend features from team's backlog
2. **Pair programming sessions** - Work with team on bigger features
3. **Code ownership** - Own specific services or API endpoints
4. **Backend architecture** - Deep dive into optimization and scaling
5. **Mentoring** - Help onboard next team member

---

**You've got this! Questions? Ask the team. Stuck? Don't stay stuck—reach out in 30 mins max. Let's build something great together.** 🚀
