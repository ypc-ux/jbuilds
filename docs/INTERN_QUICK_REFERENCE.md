# Intern Quick Reference

**Bookmark this page.** It's your cheat sheet for common tasks.

---

## One-Time Setup Commands

```bash
# 1. Create directory structure
mkdir -p ~/repos/ypc-ux
cd ~/repos/ypc-ux

# 2. Clone all repos (5-10 min)
bash <(curl -s https://raw.githubusercontent.com/ypc-ux/jbuilds/main/scripts/intern-setup.sh)

# OR manually clone:
git clone git@github.com:ypc-ux/jbuilds.git
git clone git@github.com:ypc-ux/ascent-placements-marketing.git
git clone git@github.com:ypc-ux/switchboard.git
git clone git@github.com:ypc-ux/lever-site.git
git clone git@github.com:ypc-ux/brand-vault.git
git clone git@github.com:ypc-ux/ascent-ascent.git
# ... and 10 more (see INTERN_ONBOARDING.md for full list)

# 3. Set up environment
cd jbuilds
cp .env.local.example .env.local
cd apps/agentgraphology-backend
cp .env.example .env
# Edit .env with database URL, etc.

# 4. Install dependencies
npm install
cd apps/agentgraphology-backend && npm install

# 5. Start database
docker-compose up -d postgres

# 6. Initialize database
npm run db:init
```

---

## Daily Development Commands

### Start All Services (3 terminals)

**Terminal 1 - Backend API:**
```bash
cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend
npm run dev
# Server running on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd ~/repos/ypc-ux/jbuilds
npm run dev
# Ready on http://localhost:3000
```

**Terminal 3 - Database (if needed):**
```bash
cd ~/repos/ypc-ux/jbuilds
docker-compose ps
# Verify postgres is running (should show container)
```

### Quick Verification (after starting services)

```bash
# Frontend working?
curl http://localhost:3000 | head

# Backend working?
curl http://localhost:3001/api/health

# Database working?
psql -U postgres -h localhost -d agentgraphology -c "SELECT 1;"
```

---

## Git Workflow (Daily)

### Create a Feature Branch
```bash
cd ~/repos/ypc-ux/[project-name]
git checkout main
git pull origin main
git checkout -b claude/[feature-name]
# Example: git checkout -b claude/add-form-validation
```

### Make Changes & Commit
```bash
# See what changed
git status

# Stage changes
git add .

# Commit
git commit -m "Brief description of change

- Specific change 1
- Specific change 2

Closes #123 (if fixing an issue)"
```

### Push & Create PR
```bash
# Push branch
git push -u origin claude/[feature-name]

# Then:
# 1. Go to GitHub repo
# 2. Click "Create Pull Request"
# 3. Fill in title and description
# 4. Submit PR
```

### Update PR After Review
```bash
# Make requested changes locally
git add .
git commit -m "Address review feedback"
git push origin claude/[feature-name]
# PR automatically updates on GitHub
```

### After Approval
```bash
# GitHub: Click "Squash and Merge"
# OR from command line:
git checkout main
git pull origin main
# Verify feature works
```

---

## Project-Specific Commands

### jbuilds (Full-Stack)

```bash
cd ~/repos/ypc-ux/jbuilds

# Run tests
npm test

# Format code
npm run format

# Type check
npm run type-check

# Build frontend
npm run build

# Backend-only
cd apps/agentgraphology-backend
npm test
npm run build
npm run db:init
npm run db:test
```

### ascent-placements-marketing (Static)

```bash
cd ~/repos/ypc-ux/ascent-placements-marketing

# Deploy to staging
vercel --env staging

# Deploy to production
vercel --prod

# Preview without deploying
vercel preview
```

### switchboard (Full-Stack)

```bash
cd ~/repos/ypc-ux/switchboard

npm install
npm run dev

# Deploy
vercel --prod
```

### Python Projects

```bash
cd ~/repos/ypc-ux/agentic-priming-template

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or: venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run
python main.py
```

---

## Database Commands

### PostgreSQL (Local)

```bash
# Connect to database
psql -U postgres -h localhost -d agentgraphology

# Inside psql:
\dt                    # List all tables
\d [table-name]        # Describe table
SELECT COUNT(*) FROM [table];
SELECT * FROM evaluations LIMIT 5;
\q                     # Quit

# From command line:
psql -U postgres -h localhost -d agentgraphology -c "SELECT 1;"
```

### Database Troubleshooting

```bash
# Check if container is running
docker ps | grep postgres

# Start container
docker-compose up -d postgres

# View logs
docker-compose logs postgres

# Stop container
docker-compose stop postgres

# Reset database (warning: deletes all data!)
docker-compose down -v
docker-compose up -d postgres
npm run db:init
```

---

## API Testing (curl examples)

### GET Request
```bash
# Health check
curl http://localhost:3001/api/health

# Get all evaluations
curl http://localhost:3001/api/evaluations

# Get single evaluation
curl http://localhost:3001/api/evaluations/[id]
```

### POST Request
```bash
# Create evaluation
curl -X POST http://localhost:3001/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"repositoryUrl": "https://github.com/user/repo"}'
```

### DELETE Request
```bash
# Delete evaluation
curl -X DELETE http://localhost:3001/api/evaluations/[id]
```

---

## Port Management

### Check What's Using a Port
```bash
# macOS/Linux:
lsof -i :[port]
# Example: lsof -i :3000

# Windows:
netstat -ano | findstr :[port]
# Example: netstat -ano | findstr :3000
```

### Free Up a Port
```bash
# macOS/Linux - Kill process using port
lsof -i :[port] | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or manually:
lsof -i :3000
kill -9 [PID]

# Windows: Use Task Manager or:
taskkill /PID [PID] /F
```

### Use Different Port
```bash
# Frontend on different port
npm run dev -- --port 3002

# Backend on different port
PORT=3002 npm run dev
```

---

## Code Review & PR Tips

### Before Creating PR
```bash
# Run tests
npm test

# Format code
npm run format

# Type check
npm run type-check

# Build (if applicable)
npm run build

# Verify no console.log left
git diff | grep console.log
```

### PR Title Format
```
[Feature/Fix/Docs] Brief description

Examples:
- Feature: Add form validation to ascent-placements
- Fix: Correct database query performance issue
- Docs: Update README with setup instructions
```

### PR Description Template
```markdown
## What changed?
Brief summary of changes

## Why?
Why this change was needed

## How to test?
Steps to verify the change works:
1. Start dev environment
2. Go to http://localhost:3000
3. Click X button
4. Should see Y behavior

## Related Issues
Closes #123 (if fixing an issue)
```

---

## Troubleshooting

### "Port 3000 already in use"
```bash
# Find what's using it
lsof -i :3000

# Kill it
kill -9 [PID]

# Or use different port
npm run dev -- --port 3002
```

### "npm: command not found"
```bash
# Install Node.js
# macOS: brew install node
# Windows: Download from nodejs.org
# Linux: sudo apt-get install nodejs npm

node --version  # Verify
```

### "Permission denied (publickey)"
```bash
# SSH key not configured
ssh-keygen -t ed25519
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Add public key to GitHub:
cat ~/.ssh/id_ed25519.pub
# Copy output and paste at https://github.com/settings/keys

# Test
ssh -T git@github.com
```

### "Database connection refused"
```bash
# Check if running
docker ps | grep postgres

# Start it
docker-compose up -d postgres

# Check logs
docker-compose logs postgres

# Verify DATABASE_URL in .env
```

### "Ollama connection refused"
```bash
# Start Ollama
ollama serve

# Or in Docker:
docker run -d -p 11434:11434 ollama/ollama

# Pull model
ollama pull mistral:7b-instruct

# Test
curl http://localhost:11434/api/tags
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or for backend:
cd apps/agentgraphology-backend
rm -rf node_modules package-lock.json
npm install
```

### "Type errors after editing code"
```bash
# Type check
npm run type-check

# The error message will tell you what's wrong
# Fix the type issue and run again
```

### "Tests failing"
```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- evaluations.test.ts

# Watch mode (re-runs when you change files)
npm test -- --watch
```

---

## File Locations Cheat Sheet

| What | Where |
|------|-------|
| Frontend code | `jbuilds/src/` |
| Backend code | `jbuilds/apps/agentgraphology-backend/src/` |
| Frontend components | `jbuilds/src/components/` |
| Backend routes | `jbuilds/apps/agentgraphology-backend/src/routes/` |
| Backend services | `jbuilds/apps/agentgraphology-backend/src/services/` |
| Database schema | `jbuilds/apps/agentgraphology-backend/src/db/schema.ts` |
| Database queries | `jbuilds/apps/agentgraphology-backend/src/db/repositories.ts` |
| Environment variables | `.env.local` (frontend), `.env` (backend) |
| Styling | `jbuilds/src/styles/` or Tailwind CSS |
| Config files | `jbuilds/tsconfig.json`, `jbuilds/tailwind.config.js` |
| Docs | `jbuilds/docs/` |

---

## Slack Messages to Send When Stuck

### Quick Question
```
@team I'm getting "Module not found" error. I've tried:
- Reinstalling node_modules
- Checking import paths

Can someone take a quick look at [link to code]?
```

### Blocking Issue
```
@[team-lead] I'm blocked on [feature]. The issue is [describe].

I've tried:
- [Attempt 1]
- [Attempt 2]

Can we sync up?
```

### PR Review Request
```
@[reviewer] PR ready for review: [GitHub PR link]

Changes:
- [What changed 1]
- [What changed 2]

Ready when you are!
```

---

## Useful Links

| Resource | Link |
|----------|------|
| GitHub Org | https://github.com/ypc-ux |
| Vercel Dashboard | https://vercel.com/ypc-ux |
| Supabase | https://app.supabase.com |
| Node.js Docs | https://nodejs.org/en/docs/ |
| Next.js Docs | https://nextjs.org/docs |
| Express.js Docs | https://expressjs.com/ |
| PostgreSQL Docs | https://www.postgresql.org/docs/ |
| TypeScript Docs | https://www.typescriptlang.org/docs/ |
| Tailwind CSS | https://tailwindcss.com/docs |

---

## Time-Saving Shortcuts

### Create and Switch Branch (1 command)
```bash
git checkout -b claude/feature-name
```

### Stage and Commit (1 command)
```bash
git commit -am "Your message"
```

### Push New Branch (1 command)
```bash
git push -u origin claude/feature-name
# (alias: git push -u origin HEAD)
```

### View Git History Nicely
```bash
git log --oneline --graph --all
```

### Undo Last Commit (not pushed)
```bash
git reset --soft HEAD~1
```

### Discard Local Changes (warning!)
```bash
git checkout -- .
```

---

## Daily Standup Template

Share this in team Slack/standup:

```
✅ Yesterday:
- [What I completed]
- [What I shipped]

🎯 Today:
- [What I'm working on]
- [Blockers if any]

❓ Help needed:
- [Anything I'm stuck on]
```

---

## Code Style Quick Check

Before committing, make sure:
- [ ] No `console.log()` statements
- [ ] No `TODO` comments (or create issue for it)
- [ ] Variable names are clear and descriptive
- [ ] Functions are reasonably short (< 30 lines usually)
- [ ] Error handling is present
- [ ] Database queries are parameterized (no SQL injection)
- [ ] No hardcoded credentials or secrets

---

**Stuck? Can't find command? Ask in #interns Slack channel or refer to relevant docs (INTERN_SETUP.md, INTERN_ARCHITECTURE.md, INTERN_30_DAY_PLAN.md).**

---

**Last updated:** 2026-09-09  
**Questions?** Ask your team lead 🚀
