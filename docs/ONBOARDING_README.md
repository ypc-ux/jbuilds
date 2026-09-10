# 🚀 Welcome to YPC-UX - Intern Onboarding Package

**Welcome to the team!** This is your complete guide to getting started as a backend engineer at Young Private Capital.

---

## 📦 What You're Getting

A comprehensive onboarding package designed to get you from zero to productive in 4 weeks. Everything you need is here—no surprises, no blockers, no guessing.

### The Package Includes:

| File | Purpose | Time |
|------|---------|------|
| **INTERN_ONBOARDING.md** | Overview of all 16 repos you'll work with | 30 min read |
| **INTERN_SETUP.md** | Step-by-step environment setup guide | 30 min setup |
| **INTERN_ARCHITECTURE.md** | How all our systems work together | 45 min read |
| **INTERN_30_DAY_PLAN.md** | Your week-by-week roadmap to productivity | Reference |
| **INTERN_ACCESS_CHECKLIST.md** | GitHub, Vercel, database access setup | Before Week 1 |
| **INTERN_QUICK_REFERENCE.md** | Daily commands cheat sheet | Bookmark it |
| **scripts/intern-setup.sh** | Automated setup script | 45 min execution |

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Run the automated setup (one command, ~45 minutes)
bash scripts/intern-setup.sh

# 2. Read these docs in order
# - INTERN_ONBOARDING.md (understand what you're working on)
# - INTERN_ARCHITECTURE.md (understand how it works)
# - INTERN_30_DAY_PLAN.md (your daily roadmap)

# 3. Start Week 1 of the 30-day plan
# By Week 2, you'll make your first PR and ship code
```

---

## 🗺️ Your Path to Productivity

### Week 1: Foundation (15-20 hours)
**Goal:** Get everything running locally and understand the system

- [ ] Run `bash scripts/intern-setup.sh` → All services running
- [ ] Read INTERN_ONBOARDING.md → Know what each repo does
- [ ] Read INTERN_ARCHITECTURE.md → Understand how systems connect
- [ ] Verify all 16 repos cloned, all services accessible
- [ ] Trace one request through the entire system (frontend → backend → database)

**By end of Week 1:** You can start the dev environment, services are running, you understand the architecture.

### Week 2: First Contribution (20-25 hours)
**Goal:** Make your first PR and ship code to production

- [ ] Deep dive into **ascent-placements-marketing** (your primary project)
- [ ] Understand the codebase (it's simpler than the full-stack apps—perfect start)
- [ ] Make a small fix or feature
- [ ] Create a PR, get feedback, merge it
- [ ] See your code deploy live to production

**By end of Week 2:** You've contributed code, understand the PR process, experienced deployment.

### Week 3: Backend Basics (15-20 hours)
**Goal:** Understand how the backend works

- [ ] Explore jbuilds backend structure (routes, services, database)
- [ ] Read actual backend code and understand the patterns
- [ ] Learn how API endpoints are built
- [ ] Understand database queries and TypeScript types
- [ ] Connect to PostgreSQL and explore the data

**By end of Week 3:** You can read backend code, understand architecture patterns, ready for feature work.

### Week 4: First Backend Feature (20-25 hours)
**Goal:** Implement a backend feature from start to finish

- [ ] Pick a starter task (filtering, sorting, history endpoint, etc.)
- [ ] Implement the endpoint (route, service, database query, validation)
- [ ] Test locally with curl or Postman
- [ ] Write tests if applicable
- [ ] Create PR, get review, merge to production

**By end of Week 4:** You've shipped a backend feature, understand the full request cycle, ready for real work.

---

## 🎯 What Success Looks Like

### After Week 1
- ✅ All services running locally
- ✅ Can access frontend (http://localhost:3000)
- ✅ Can access backend API (http://localhost:3001)
- ✅ Database connection working
- ✅ Understand system architecture
- ✅ Know what each of the 16 repos does

### After Week 2
- ✅ Made your first code change
- ✅ Opened and merged first PR
- ✅ Code deployed to production
- ✅ Understand Git workflow (branch → commit → PR → merge)
- ✅ Know how to test changes locally

### After Week 3
- ✅ Can read and understand backend code
- ✅ Know how API endpoints work
- ✅ Understand database queries
- ✅ Know where to find things in the codebase
- ✅ Comfortable with TypeScript basics

### After Week 4
- ✅ Implemented a complete backend feature
- ✅ Wrote tests for your code
- ✅ Got code reviewed and merged
- ✅ Deployed to production twice
- ✅ Ready to own backend features

### After 30 Days
- ✅ You're productive
- ✅ You understand the system
- ✅ You can work independently
- ✅ You know who to ask when stuck
- ✅ You've shipped multiple features

---

## 📚 Documentation Overview

### INTERN_ONBOARDING.md
**What:** Complete inventory of all 16 YPC-UX repositories  
**Why:** You need to know what repos exist, what they do, and which ones you'll work on  
**Contains:**
- Public repos (8): jbuilds, agent-charisma, switchboard, etc.
- Private repos (5): ascent-placements, lever-site, brand-vault, etc.
- For each: tech stack, deployment platform, quick setup, what you'll do there

**Read time:** 30 minutes  
**When:** Before starting Week 1

---

### INTERN_SETUP.md
**What:** Step-by-step environment setup  
**Why:** Getting your machine configured is the first blocker—this removes all blockers  
**Contains:**
- Prerequisites (Node.js, npm, git, Python, Docker)
- Git SSH setup
- Repository cloning (core repos or all 16)
- Dependency installation
- Database setup (3 options)
- Environment variables
- Verification checklist
- Troubleshooting

**Setup time:** 30 minutes (guided walkthrough)  
**When:** Week 1, Day 1

---

### INTERN_ARCHITECTURE.md
**What:** How all the systems work together  
**Why:** You need to understand the big picture before diving into code  
**Contains:**
- System architecture diagrams
- Frontend layer (Next.js, React, TypeScript)
- Backend layer (Express.js, Node.js)
- Database layer (PostgreSQL)
- LLM layer (Ollama for AI)
- Data flow examples
- Design decisions and trade-offs
- Deployment architecture

**Read time:** 45 minutes  
**When:** Week 1, after setup

---

### INTERN_30_DAY_PLAN.md
**What:** Your daily roadmap for the next 30 days  
**Why:** Structure removes uncertainty—you know exactly what to do each day  
**Contains:**
- Week 1: Environment & foundations
- Week 2: ascent-placements deep dive (first PR)
- Week 3: Backend basics
- Week 4: First backend feature
- Daily tasks with time estimates
- Success criteria for each week
- Starter backend task options
- Tips and troubleshooting

**Reference:** Keep this open during each week  
**When:** Week 1 starts, follow daily

---

### INTERN_ACCESS_CHECKLIST.md
**What:** Permissions and access you need  
**Why:** You need access to GitHub, Vercel, Supabase, etc. before you can work  
**Contains:**
- GitHub access requirements
- Vercel team configuration
- Supabase/database access
- API keys and secrets
- Communication channels
- SSH key setup
- Verification tests

**Checklist time:** 30 minutes  
**When:** Before Week 1 (work with your team lead)

---

### INTERN_QUICK_REFERENCE.md
**What:** Cheat sheet for daily commands  
**Why:** You'll reference this constantly—bookmark it  
**Contains:**
- Setup commands
- Daily dev commands
- Git workflow (branch, commit, PR)
- Project-specific commands
- Database commands
- API testing (curl examples)
- Port management
- Troubleshooting (10+ common issues)
- File locations
- Code review checklist

**Usage:** Bookmark and reference daily  
**When:** All 4 weeks

---

### scripts/intern-setup.sh
**What:** Fully automated setup script  
**Why:** One command to set up everything vs. 20+ manual steps  
**Does:**
- Creates ~/repos/ypc-ux directory
- Clones all 16 repos
- Installs all dependencies
- Sets up .env files
- Starts PostgreSQL
- Verifies everything works

**Execution time:** 30-45 minutes  
**When:** Week 1, Day 1 (before INTERN_SETUP.md)

---

## 🚀 How to Use This Package

### Day 1
```bash
# 1. Complete access checklist with your team lead
# INTERN_ACCESS_CHECKLIST.md
# (GitHub, Vercel, database access)

# 2. Run automated setup
bash scripts/intern-setup.sh

# 3. Start reading docs
# Read: INTERN_ONBOARDING.md
# Read: INTERN_ARCHITECTURE.md
```

### Week 1
- [ ] Follow INTERN_SETUP.md for detailed setup walkthrough
- [ ] Verify all services working
- [ ] Read INTERN_ARCHITECTURE.md completely
- [ ] Trace one request through the system
- [ ] Explore the 16 repos
- [ ] Success: All services running, architecture understood

### Week 2
- [ ] Follow INTERN_30_DAY_PLAN.md Week 2 section
- [ ] Deep dive into ascent-placements-marketing
- [ ] Make your first code change
- [ ] Open first PR
- [ ] Get review feedback
- [ ] Merge to production
- [ ] Success: First PR merged, code in production

### Week 3
- [ ] Follow INTERN_30_DAY_PLAN.md Week 3 section
- [ ] Explore jbuilds backend code
- [ ] Understand API patterns
- [ ] Learn database structure
- [ ] Success: Can read backend code, understand patterns

### Week 4
- [ ] Follow INTERN_30_DAY_PLAN.md Week 4 section
- [ ] Pick a starter backend task
- [ ] Implement the feature
- [ ] Write tests
- [ ] Create PR
- [ ] Merge to production
- [ ] Success: Backend feature shipped

### Daily (All 4 Weeks)
- Reference INTERN_QUICK_REFERENCE.md for:
  - Common commands
  - Troubleshooting
  - File locations
  - Git workflow

---

## ❓ Common Questions

### "Where do I start?"
Start with this file you're reading. Then:
1. Run `bash scripts/intern-setup.sh`
2. Read INTERN_ONBOARDING.md
3. Read INTERN_ARCHITECTURE.md
4. Follow INTERN_30_DAY_PLAN.md for the rest

### "What if something breaks?"
1. Check INTERN_QUICK_REFERENCE.md troubleshooting section
2. Check INTERN_SETUP.md for common issues
3. Ask your team lead (don't stay stuck for > 30 min)

### "What do I work on first?"
ascent-placements-marketing in Week 2. It's simpler than other projects—perfect for your first PR.

### "How long until I'm productive?"
By end of Week 2 you'll ship your first feature. By end of Week 4 you'll be shipping backend features independently.

### "What if the setup doesn't work?"
The setup script handles 95% of cases. For edge cases:
- Check INTERN_SETUP.md troubleshooting
- Check INTERN_QUICK_REFERENCE.md
- Ask your team lead with specific error message

### "Can I skip parts?"
Not recommended. The 30-day plan is designed to build on itself:
- Week 1 foundation → Week 2 first PR
- Week 2 PR experience → Week 3 backend patterns
- Week 3 patterns → Week 4 feature implementation

---

## 📊 What You'll Learn

### Technical Skills
- ✅ Full-stack architecture (frontend + backend + database)
- ✅ Next.js 16 frontend development
- ✅ Express.js backend development
- ✅ PostgreSQL database design
- ✅ TypeScript for type safety
- ✅ REST API design patterns
- ✅ Git workflow (branch, commit, PR, merge)
- ✅ Deployment to production (Vercel)

### Business Knowledge
- ✅ What YPC-UX builds (all 16 repos)
- ✅ How our products work together
- ✅ Business integration protocol (our core framework)
- ✅ Team structure and who does what

### Soft Skills
- ✅ Code review process
- ✅ How to ask for help
- ✅ When to ask for help
- ✅ How to debug issues
- ✅ How to test your work

---

## 🎓 After 30 Days

Once you complete the 30-day plan, you're ready for:
- ✅ Real backend feature work
- ✅ Pair programming with team leads
- ✅ Owning API endpoints and services
- ✅ Database schema design
- ✅ Mentoring future interns

---

## 📞 Support

### Getting Stuck?
1. **Check the docs first** (90% of issues are answered here)
2. **Ask in Slack** (#interns channel)
3. **Schedule time with your team lead** (for blockers)

### Resources
- **Setup issues?** → INTERN_SETUP.md troubleshooting
- **Command reference?** → INTERN_QUICK_REFERENCE.md
- **Architecture questions?** → INTERN_ARCHITECTURE.md
- **Daily tasks?** → INTERN_30_DAY_PLAN.md
- **Repo overview?** → INTERN_ONBOARDING.md

---

## ✨ You've Got This!

This package removes all the guesswork. You have:
- ✅ Automated setup (45 minutes)
- ✅ Complete documentation (6 guides)
- ✅ Day-by-day roadmap (30 days)
- ✅ Command reference (daily use)
- ✅ Architecture explained (understanding)
- ✅ Access checklist (permissions)

**Everything is set up for your success.**

**Let's build something great together.** 🚀

---

**Start here:**
1. Complete INTERN_ACCESS_CHECKLIST.md with your team lead
2. Run `bash scripts/intern-setup.sh`
3. Read INTERN_ONBOARDING.md
4. Follow INTERN_30_DAY_PLAN.md

**Questions?** Ask your team lead or check the relevant guide above.

---

**Welcome to YPC-UX!** 👋
