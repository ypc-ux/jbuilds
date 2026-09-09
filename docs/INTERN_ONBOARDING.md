# YPC-UX Intern Onboarding Guide

**Welcome to Young Private Capital!** 🚀

This guide will get you from zero to fully productive in your first week. You'll have access to all 16 repositories, understand our tech stack, and be ready to contribute immediately.

**Time Investment:** ~8 hours for complete setup  
**Expected Outcome:** Full development environment, all repos cloned, ready to build

---

## Quick Start (TL;DR)

```bash
# 1. Run the automated setup
bash scripts/intern-setup.sh

# 2. Read these docs in order
- INTERN_ARCHITECTURE.md (understand the system)
- docs/REPOSITORY_ORGANIZATION.md (know which repos do what)
- ascent-placements setup section below (your primary project)

# 3. Complete the access checklist
docs/INTERN_ACCESS_CHECKLIST.md

# 4. Start your 30-day plan
docs/INTERN_30_DAY_PLAN.md
```

---

## Complete Repository Inventory (All 16 Repos)

### Public Repositories

#### 1. **jbuilds** ⭐ AgentGraphology
**URL:** https://github.com/ypc-ux/jbuilds  
**Type:** Full-Stack SaaS Application  
**Tech Stack:** Next.js 16, React 19, Express.js, PostgreSQL, Ollama, TypeScript  
**Deployment:** Vercel (frontend) + custom backend  
**Status:** MVP Complete, Ready for Production

**What This Does:**
Evaluates any GitHub repository using the Business Integration Protocol—a systematic 5-dimensional framework for deciding whether to integrate tools into your business.

**Quick Setup:**
```bash
cd jbuilds
npm install
cp .env.local.example .env.local
cd apps/agentgraphology-backend
npm install
docker-compose up -d
npm run dev  # Terminal 1: Backend on :3001
# Terminal 2:
npm run dev  # Frontend on :3000
```

**What You'll Do Here:**
- Understand the evaluation framework
- See how the full-stack architecture works
- Learn deployment and CI/CD processes

**Key Files:**
- Frontend: `src/app/` (Next.js pages)
- Backend: `apps/agentgraphology-backend/src/`
- Database: PostgreSQL schema
- LLM: Ollama integration for local AI inference

**Environment Variables:**
- `NEXT_PUBLIC_API_URL=http://localhost:3001/api`
- `DATABASE_URL=postgresql://postgres:password@localhost:5432/agentgraphology`
- `OLLAMA_BASE_URL=http://localhost:11434`

---

#### 2. **business-integration-protocol**
**URL:** https://github.com/ypc-ux/business-integration-protocol  
**Type:** Documentation + Framework  
**Tech Stack:** Markdown + Mermaid diagrams  
**Deployment:** GitHub Pages  
**Status:** Maintained

**What This Does:**
The core protocol documentation—reference material for evaluating integrations.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/business-integration-protocol.git
cd business-integration-protocol
# No setup needed—read the docs
```

**What You'll Do Here:**
- Reference material (not active development)
- Understanding our decision-making framework

---

#### 3. **agent-charisma**
**URL:** https://github.com/ypc-ux/agent-charisma  
**Type:** Backend Service / AI Agent  
**Tech Stack:** Node.js, Claude SDK, Database  
**Deployment:** Railway  
**Status:** Active

**What This Does:**
AI agent for marketing automation and prospecting workflows.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/agent-charisma.git
cd agent-charisma
npm install
```

**What You'll Do Here:**
- Backend feature development
- AI integration patterns
- Database design

---

#### 4. **agent-ad-spend**
**URL:** https://github.com/ypc-ux/agent-ad-spend  
**Type:** Frontend SPA  
**Tech Stack:** Next.js 16, React 19, Tailwind CSS  
**Deployment:** Vercel  
**Status:** Ready to Deploy

**What This Does:**
Dashboard for managing ad campaign budgets with AI recommendations.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/agent-ad-spend.git
cd agent-ad-spend
npm install
npm run dev  # :3000
```

**What You'll Do Here:**
- Frontend development
- API integration
- Dashboard features

---

#### 5. **switchboard** ☎️
**URL:** https://github.com/ypc-ux/switchboard  
**Type:** Full-Stack SaaS  
**Tech Stack:** Next.js 15, React 19, Supabase, Twilio, Vapi AI  
**Deployment:** Vercel + Supabase  
**Status:** Ready to Deploy

**What This Does:**
Call center platform with Twilio/Vapi AI voice agent integration and real-time event handling.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/switchboard.git
cd switchboard
npm install
# Set up Supabase project (see SUPABASE_SETUP.md)
npm run dev
```

**What You'll Do Here:**
- Full-stack backend features
- Real-time database subscriptions
- Webhook integrations
- Voice AI integration

**Key Services:**
- Twilio for telephony
- Vapi AI for voice agents
- Supabase for real-time data

---

#### 6. **slyderz** ✨
**URL:** https://github.com/ypc-ux/slyderz  
**Type:** Frontend SPA (Animation-Heavy)  
**Tech Stack:** Next.js 16, React 19, Framer Motion, Tailwind CSS  
**Deployment:** Vercel  
**Status:** Ready to Deploy

**What This Does:**
Animation portfolio with advanced UI interactions and smooth transitions.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/slyderz.git
cd slyderz
npm install
npm run dev
```

**What You'll Do Here:**
- Frontend animation work
- UI/UX improvements
- Performance optimization

---

#### 7. **agentic-priming-template** 🔧
**URL:** https://github.com/ypc-ux/agentic-priming-template  
**Type:** Python CLI/Automation Tool  
**Tech Stack:** Python 3.8+, BeautifulSoup4, Playwright, Ollama, SQLite  
**Deployment:** Railway (background workers)  
**Status:** Template

**What This Does:**
Reusable template for building AI agents with local LLM inference and web scraping capabilities.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/agentic-priming-template.git
cd agentic-priming-template
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

**What You'll Do Here:**
- Python backend development
- AI agent implementation
- Local LLM integration
- Web automation

---

#### 8. **humanizer-influence** 📚
**URL:** https://github.com/ypc-ux/humanizer-influence  
**Type:** Claude Skill Templates  
**Tech Stack:** Git LFS for templates  
**Deployment:** GitHub (as package)  
**Status:** Maintained

**What This Does:**
Reusable Claude skill templates for various AI agent workflows.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/humanizer-influence.git
cd humanizer-influence
# Study templates as reference material
```

---

#### 9. **ypc-ux** 👤
**URL:** https://github.com/ypc-ux/ypc-ux  
**Type:** Organization Profile  
**Tech Stack:** GitHub Profile README  
**Deployment:** GitHub Pages  
**Status:** Active

**What This Does:**
Organization profile and central documentation hub.

---

#### 10. **storyscope** 🔬
**URL:** https://github.com/ypc-ux/storyscope  
**Type:** ML/NLP Research Pipeline  
**Tech Stack:** Python, XGBoost, Hugging Face, PyArrow  
**Deployment:** Hugging Face Spaces  
**Status:** Research

**What This Does:**
NLP analysis and story classification with machine learning.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/storyscope.git
cd storyscope
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

#### 11. **smooth-operator**
**URL:** https://github.com/ypc-ux/smooth-operator  
**Type:** [TBD - Inspect repo]  
**Status:** Needs Documentation

---

#### 12. **maestro**
**URL:** https://github.com/ypc-ux/maestro  
**Type:** [TBD - Inspect repo]  
**Status:** Needs Documentation

---

### Private Repositories (Team & Business)

#### ⭐ **ascent-placements-marketing** — YOUR PRIMARY PROJECT
**URL:** https://github.com/ypc-ux/ascent-placements-marketing  
**Type:** Static Marketing Website  
**Tech Stack:** Vanilla HTML/CSS/JavaScript + Vercel Serverless Functions  
**Deployment:** Vercel (Already Configured!)  
**Status:** ✅ Ready to Deploy

**What This Does:**
Marketing website for Ascent Placements with integrated forms, Zapier webhooks, and analytics.

**Why This is Your Starting Point:**
- Simpler codebase (not a complex frontend framework)
- Immediate deployment (Vercel config already set up)
- Quick first PR opportunity
- Stable and maintainable

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/ascent-placements-marketing.git
cd ascent-placements-marketing
# No npm install needed for static site
# Open index.html in browser to preview

# Deploy to Vercel:
npm install -g vercel
vercel --prod
```

**What You'll Do Here (First 2 Weeks):**
1. Understand the HTML/CSS structure
2. Fix any reported bugs
3. Add small features (form improvements, analytics, etc.)
4. Deploy changes to production
5. Make first PR and get code reviewed

**Key Files:**
- `index.html` - Main landing page
- `styles/` - CSS styling
- `js/` - JavaScript interactions
- `api/` - Vercel serverless functions (forms, webhooks)

**Special Features:**
- Vercel serverless function for form handling
- Zapier webhook integration
- GA4 + Plausible analytics
- SEO optimized
- Mobile responsive

**Environment Variables (Minimal):**
- `VERCEL_API_ENDPOINT` (for form submission)
- `ZAPIER_WEBHOOK_URL` (for lead capture)

**Deployment:**
```bash
# Deploy to staging
vercel --env staging

# Deploy to production
vercel --prod
```

---

#### **ascent-ascent**
**URL:** https://github.com/ypc-ux/ascent-ascent  
**Type:** Full-Stack Product/Platform  
**Tech Stack:** [TBD - Inspect repo]  
**Deployment:** Railway/Render  
**Status:** Active

**What This Does:**
[Main product description - needs inspection]

---

#### **lever-site** 💼
**URL:** https://github.com/ypc-ux/lever-site  
**Type:** Full-Stack SaaS  
**Tech Stack:** Next.js 16, React 19, Supabase, Stripe, Claude SDK  
**Deployment:** Vercel + Supabase  
**Status:** Ready to Deploy

**What This Does:**
Recruitment/hiring platform with Stripe payment processing and Claude API integration.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/lever-site.git
cd lever-site
npm install
# Set up Supabase and Stripe (see docs)
npm run dev
```

**What You'll Do Here:**
- Full-stack payment features
- Recruitment workflow
- Database optimization

---

#### **brand-vault** 🏛️
**URL:** https://github.com/ypc-ux/brand-vault  
**Type:** Full-Stack Asset Management  
**Tech Stack:** Next.js 15, React 19, Vercel Postgres, Drizzle ORM, Claude SDK  
**Deployment:** Vercel + Vercel Postgres  
**Status:** Ready to Deploy

**What This Does:**
Brand asset management system with type-safe database and Claude integration.

**Quick Setup:**
```bash
git clone https://github.com/ypc-ux/brand-vault.git
cd brand-vault
npm install
# Set up Vercel Postgres (built-in to Vercel)
npm run dev
```

**What You'll Do Here:**
- Database schema design
- Asset management features
- Type-safe SQL with Drizzle

---

## Technology Stack Overview

### Frontend
- **Framework:** Next.js 16 (React 19, TypeScript)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State Management:** React Context / Hooks
- **Animation:** Framer Motion (where needed)

### Backend
- **API:** Express.js (Node.js)
- **Database:** PostgreSQL (local or Supabase)
- **ORM:** Drizzle (type-safe)
- **AI/LLM:** Claude SDK, local Ollama
- **Authentication:** Supabase Auth (where needed)

### Infrastructure
- **Frontend Deployment:** Vercel
- **Backend Deployment:** Railway, Render, or Vercel Functions
- **Database:** Supabase PostgreSQL or Vercel Postgres
- **LLM:** Ollama (local, zero cost)

### Development Tools
- **Language:** TypeScript (strict mode)
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git + GitHub
- **Containerization:** Docker (optional for local)

---

## Next Steps

1. **Complete Environment Setup** → `docs/INTERN_SETUP.md`
2. **Understand Architecture** → `docs/INTERN_ARCHITECTURE.md`
3. **Check Permissions** → `docs/INTERN_ACCESS_CHECKLIST.md`
4. **Follow 30-Day Plan** → `docs/INTERN_30_DAY_PLAN.md`
5. **Keep Handy** → `docs/INTERN_QUICK_REFERENCE.md`

---

## Support & Questions

**Can't get something working?**
1. Check `docs/INTERN_QUICK_REFERENCE.md` for common issues
2. Read the repo's own README.md
3. Check `SETUP.md` for detailed configuration
4. Ask your team lead

**Need to know more about a specific repo?**
- See `docs/REPOSITORY_ORGANIZATION.md` for complete inventory
- Check `docs/HOSTING_PLATFORM_AUDIT.md` for deployment info

**Ready to code?**
- Start with ascent-placements-marketing (your primary project)
- Make your first PR within Week 2
- Follow the 30-day plan for guidance

---

**Let's build something amazing.** 🚀
