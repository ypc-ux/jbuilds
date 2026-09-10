# Intern Environment Setup Guide

**Complete Setup Time:** ~2 hours  
**Goal:** Get your entire development environment running locally

---

## Prerequisites (Check These First)

### System Requirements
```bash
# Check you have these installed:
node --version           # Should be 20.x or higher
npm --version            # Should be 10.x or higher
git --version            # Should be 2.30+
python --version         # Should be 3.8+
docker --version         # Optional but recommended (for databases)
```

**Install if Missing:**
- **macOS:** `brew install node python docker`
- **Windows:** Download from nodejs.org, python.org, docker.com
- **Linux:** `sudo apt-get install nodejs npm python3 docker.io`

---

## Step-by-Step Setup

### Step 1: Git Configuration (5 min)

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# Set up SSH key (for GitHub)
ssh-keygen -t ed25519 -C "your.email@company.com"
# Press Enter through all prompts (use default location)

# Start SSH agent and add your key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy your public key
cat ~/.ssh/id_ed25519.pub
# → Add this to https://github.com/settings/keys
```

**Test connection:**
```bash
ssh -T git@github.com
# Should print: "Hi [username]! You've successfully authenticated..."
```

---

### Step 2: Create Project Directory (2 min)

```bash
# Create directory structure
mkdir -p ~/repos/ypc-ux
cd ~/repos/ypc-ux

# This is where all 16 repos will live
pwd
# Should show: /Users/[username]/repos/ypc-ux
```

---

### Step 3: Clone Core Repositories (5 min)

**Option A: Clone Just the Main Project**
```bash
cd ~/repos/ypc-ux
git clone git@github.com:ypc-ux/jbuilds.git
cd jbuilds
```

**Option B: Clone All Repos (Recommended)**
```bash
# Using the automated script (see Step 9 below)
# Or manually clone all 16:
cd ~/repos/ypc-ux
git clone git@github.com:ypc-ux/jbuilds.git
git clone git@github.com:ypc-ux/ascent-placements-marketing.git
git clone git@github.com:ypc-ux/business-integration-protocol.git
git clone git@github.com:ypc-ux/agent-charisma.git
git clone git@github.com:ypc-ux/agent-ad-spend.git
git clone git@github.com:ypc-ux/switchboard.git
git clone git@github.com:ypc-ux/slyderz.git
git clone git@github.com:ypc-ux/agentic-priming-template.git
git clone git@github.com:ypc-ux/lever-site.git
git clone git@github.com:ypc-ux/brand-vault.git
# ... and others as needed
```

---

### Step 4: Install Global Tools (5 min)

```bash
# Vercel CLI (for deployment)
npm install -g vercel

# TypeScript (for type checking)
npm install -g typescript

# Prettier (for code formatting)
npm install -g prettier

# Optional: Docker Desktop (for database)
# Download from docker.com
```

---

### Step 5: Database Setup (15 min)

**Option A: Local PostgreSQL (Using Docker)**

```bash
# Start PostgreSQL container
docker run --name ypc-postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps | grep ypc-postgres
```

**Option B: Supabase (Cloud Database)**

1. Go to https://supabase.com
2. Sign up or log in
3. Create new project
4. Copy your connection string
5. Save it (you'll need it below)

**Option C: Using Docker Compose (Easiest)**

```bash
cd ~/repos/ypc-ux/jbuilds
# docker-compose.yml already set up
docker-compose up -d postgres
# Waits for PostgreSQL to start
sleep 5
docker-compose exec postgres psql -U postgres -c "CREATE DATABASE agentgraphology;"
```

---

### Step 6: Environment Variables Setup (10 min)

**For jbuilds project:**

```bash
cd ~/repos/ypc-ux/jbuilds

# Frontend environment
cp .env.local.example .env.local
# Edit if needed:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend environment
cd apps/agentgraphology-backend
cp .env.example .env

# Edit .env with your values:
cat .env
```

**Your .env file should look like:**
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/agentgraphology
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b-instruct
GITHUB_TOKEN=your_token_here_optional
CORS_ORIGIN=http://localhost:3000
```

**For ascent-placements-marketing:**
```bash
cd ~/repos/ypc-ux/ascent-placements-marketing
# No .env needed for static site
# (Vercel secrets configured in dashboard)
```

---

### Step 7: Install Dependencies (20 min)

**For jbuilds (Full-Stack):**
```bash
cd ~/repos/ypc-ux/jbuilds

# Frontend dependencies
npm install

# Backend dependencies
cd apps/agentgraphology-backend
npm install

# Return to root
cd ../..
```

**For ascent-placements-marketing:**
```bash
cd ~/repos/ypc-ux/ascent-placements-marketing
npm install
```

**For Python projects:**
```bash
cd ~/repos/ypc-ux/agentic-priming-template
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

---

### Step 8: Database Initialization (5 min)

**For jbuilds:**
```bash
cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend
npm run db:init
# Creates tables and seeds initial data
```

**Verify database is working:**
```bash
npm run db:test
# Should show "Database connection successful"
```

---

### Step 9: Start Development Servers (Ongoing)

**For jbuilds (Full-Stack):**

**Terminal 1 - Backend:**
```bash
cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend
npm run dev
# Should show: Server running on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd ~/repos/ypc-ux/jbuilds
npm run dev
# Should show: Ready on http://localhost:3000
```

**For ascent-placements-marketing:**
```bash
cd ~/repos/ypc-ux/ascent-placements-marketing
npm run dev
# Or open index.html in your browser
```

---

## Verification Checklist

Run through these to confirm everything is working:

- [ ] **Git SSH configured**
  ```bash
  ssh -T git@github.com
  # Should authenticate successfully
  ```

- [ ] **All repos cloned**
  ```bash
  ls -la ~/repos/ypc-ux/
  # Should show 16 directories
  ```

- [ ] **Dependencies installed**
  ```bash
  cd ~/repos/ypc-ux/jbuilds && npm list | head -20
  # Should show installed packages
  ```

- [ ] **Database running**
  ```bash
  psql -U postgres -h localhost -d agentgraphology -c "SELECT 1;"
  # Should return: (1 row)
  ```

- [ ] **Backend server running**
  ```bash
  curl http://localhost:3001/api/health
  # Should return: {"status":"ok"}
  ```

- [ ] **Frontend server running**
  ```bash
  curl http://localhost:3000
  # Should return: HTML content
  ```

- [ ] **Can access web UI**
  - Open browser to http://localhost:3000
  - Should load without errors

---

## Common Issues & Solutions

### "Permission denied (publickey)" when cloning
**Problem:** SSH key not configured  
**Solution:**
```bash
# Make sure key is added to ssh-agent
ssh-add ~/.ssh/id_ed25519
# Add public key to GitHub settings
cat ~/.ssh/id_ed25519.pub
# → https://github.com/settings/keys
```

### "npm: command not found"
**Problem:** Node.js not installed  
**Solution:**
```bash
# Install Node.js
# macOS: brew install node
# Windows: Download from nodejs.org
node --version  # Verify install
```

### "Database connection refused"
**Problem:** PostgreSQL not running  
**Solution:**
```bash
# Check if Docker container is running
docker ps | grep postgres

# If not running, start it
docker run --name ypc-postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:16
```

### "Port 3000 already in use"
**Problem:** Another service is using port 3000  
**Solution:**
```bash
# Find what's using the port
lsof -i :3000
# Kill the process
kill -9 <PID>
# Or use a different port
npm run dev -- --port 3001
```

### "Ollama connection refused"
**Problem:** Ollama service not running  
**Solution:**
```bash
# Start Ollama (macOS/Linux)
ollama serve

# Or in Docker
docker run -d -p 11434:11434 ollama/ollama

# Pull the model
ollama pull mistral:7b-instruct
```

### "No such file or directory: .env"
**Problem:** Environment file not created  
**Solution:**
```bash
cp .env.example .env
# Edit values as needed
```

---

## What's Running Now?

**After completing setup:**

| Service | URL | Port | Status |
|---------|-----|------|--------|
| Frontend | http://localhost:3000 | 3000 | ✅ |
| Backend API | http://localhost:3001 | 3001 | ✅ |
| PostgreSQL | localhost | 5432 | ✅ |
| Ollama LLM | http://localhost:11434 | 11434 | ✅ |
| pgAdmin | http://localhost:5050 | 5050 | ✅ |

---

## Next Steps

1. ✅ **Setup complete!** Move on to `docs/INTERN_ARCHITECTURE.md`
2. **Understand the system** - Read how services connect
3. **Pick a project** - Start with ascent-placements-marketing
4. **Make your first commit** - Follow the 30-day plan

---

## Quick Commands Reference

```bash
# Start all services
cd ~/repos/ypc-ux/jbuilds && docker-compose up -d && npm run dev

# Stop all services
docker-compose down

# View logs
docker-compose logs -f postgres

# Reset database
docker-compose down -v && docker-compose up -d postgres

# Install new npm package
npm install package-name

# Run tests
npm test

# Format code
npm run format

# Type check
npm run type-check
```

---

**Setup complete? Next:** `docs/INTERN_ARCHITECTURE.md`
