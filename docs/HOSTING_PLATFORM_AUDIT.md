# YPC-UX Repository Hosting Platform Audit

**Date:** 2026-09-09  
**Scope:** All 16 ypc-ux repositories analyzed for optimal hosting platforms  
**Platforms Evaluated:** Vercel, Netlify, Cloudflare, Railway, Render, Supabase, GitHub Pages, Hugging Face

---

## Executive Summary

| Platform | Repos | Best For |
|----------|-------|----------|
| **Vercel** | 6 repos | Next.js apps, serverless functions, real-time features |
| **Supabase** | 2 repos | PostgreSQL backend, real-time subscriptions, auth |
| **Vercel Postgres** | 1 repo | Managed PostgreSQL, Vercel ecosystem |
| **GitHub Pages** | 5 repos | Static content, documentation, no deployment |
| **Railway/Render** | 1 repo | Python background workers, local AI inference |
| **Hugging Face** | 1 repo | ML research artifacts, interactive demos |
| **Empty/TBD** | 1 repo | No code yet |

---

## Detailed Repository Analysis

### 1. **jbuilds** ⭐
- **Current Status:** Incomplete
- **Type:** Frontend SPA
- **Stack:** Next.js 16, React 19, Tailwind CSS, TypeScript
- **Database:** None
- **Recommendation:** **VERCEL**
- **Why Vercel:**
  - ✅ Next.js native deployment (one-click)
  - ✅ Zero configuration needed
  - ✅ Automatic scaling
  - ✅ Free tier generous
- **Cost:** Free tier or $20/month
- **Setup Time:** 2 minutes
- **Action:** Deploy to Vercel immediately

---

### 2. **business-integration-protocol** 📚
- **Type:** Documentation Framework
- **Stack:** Decision framework with templates
- **Database:** None
- **Recommendation:** **GITHUB PAGES**
- **Why GitHub Pages:**
  - ✅ No deployment needed
  - ✅ Lives in git repo
  - ✅ Could render as static docs site
- **Cost:** Free
- **Alternative:** Netlify (for custom domain styling)

---

### 3. **ascent-ascent** 🔍
- **Type:** Monorepo/Workspace
- **Status:** Needs investigation
- **Recommendation:** **Individual evaluation for subdirectories**
- **Action:** Treat each sub-project separately based on its stack

---

### 4. **switchboard** ☎️
- **Type:** Full-Stack Application
- **Stack:** Next.js 15, React 19, TypeScript, Supabase, Twilio, Vapi AI
- **Database:** Supabase (PostgreSQL)
- **Special Features:** 
  - Twilio webhook integration
  - Vapi AI voice agents
  - Real-time event handling
- **Recommendation:** **VERCEL + SUPABASE**
- **Why:**
  - ✅ Vercel for Next.js + serverless functions
  - ✅ Vercel handles Twilio/Vapi webhooks perfectly
  - ✅ Supabase for real-time database
  - ✅ Native Next.js API routes for callbacks
- **Cost:** $20/mo (Vercel) + $25/mo (Supabase starter)
- **Setup Time:** 15 minutes

---

### 5. **agent-charisma** 🤖
- **Type:** Asset/Configuration Repository
- **Stack:** Brand/config files only
- **Database:** None
- **Recommendation:** **GITHUB** (as-is)
- **Why:**
  - ✅ No deployment needed
  - ✅ Serves as library/configuration
  - ✅ Can be imported into other projects
- **Cost:** Free

---

### 6. **maestro** 🎼
- **Type:** Static Brand Assets
- **Stack:** Clothing brand assets
- **Database:** None
- **Recommendation:** **GITHUB** or **CLOUDFLARE R2**
- **Why:**
  - If small: GitHub (free, works fine)
  - If large binary files: Cloudflare R2 for CDN ($0.015/GB)
- **Cost:** Free (GitHub) or $5-50/mo (R2 if large)

---

### 7. **slyderz** ✨
- **Type:** Frontend SPA
- **Stack:** Next.js 16, React 19, Tailwind, Framer Motion
- **Database:** None
- **Special:** Animation-heavy UI
- **Recommendation:** **VERCEL**
- **Why:**
  - ✅ Next.js native
  - ✅ Vercel's global edge network optimizes animations
  - ✅ Best possible performance for Framer Motion
- **Cost:** Free tier or $20/mo
- **Setup Time:** 2 minutes

---

### 8. **agent-ad-spend** 📊
- **Type:** Frontend SPA
- **Stack:** Next.js 16, React 19, Tailwind CSS
- **Database:** None
- **Recommendation:** **VERCEL**
- **Why:**
  - ✅ Ideal Vercel candidate
  - ✅ Simple, no backend complexity
  - ✅ Perfect for free tier
- **Cost:** Free
- **Setup Time:** 2 minutes

---

### 9. **smooth-operator** 🚫
- **Type:** Empty Repository
- **Status:** No code yet
- **Recommendation:** **Delete or populate when ready**
- **Action:** No hosting needed currently

---

### 10. **agentic-priming-template** 🔧
- **Type:** Python CLI/Automation Tool
- **Stack:** Python 3.8+, BeautifulSoup4, Playwright, Ollama, SQLite, Deerflow
- **Database:** SQLite (embedded)
- **Special:**
  - Local Ollama inference (2GB+ RAM)
  - Web scraping capabilities
  - NOT a web application
  - CLI/batch processing tool
- **Recommendation:** **RAILWAY or RENDER** (for background workers)
- **Why NOT Vercel:**
  - ❌ Python (not Node.js)
  - ❌ Needs persistent Ollama instance
  - ❌ Long-running tasks (not serverless-friendly)
- **Best Approach:**
  - **Railway:** Pay-per-compute, easy cron scheduling ($5-20/mo)
  - **Render:** Background worker with scheduled jobs ($7-50/mo)
  - **Self-Hosted:** VPS for persistent Ollama (better performance)
- **Cost:** $5-50/mo or self-hosted
- **Setup Time:** 30 minutes

---

### 11. **humanizer-influence** 📚
- **Type:** Skill/Template Library
- **Stack:** Claude skill templates (Git LFS)
- **Database:** None
- **Recommendation:** **GITHUB** (as-is)
- **Why:**
  - ✅ Works as git package
  - ✅ Documentation lives in repo
  - ✅ No deployment needed
- **Cost:** Free

---

### 12. **lever-site** 💼
- **Type:** Full-Stack SaaS Application
- **Stack:** 
  - Next.js 16, React 19, TypeScript
  - Supabase (PostgreSQL)
  - Claude SDK
  - Stripe payments
  - Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Special Features:**
  - Stripe payment processing
  - Claude API calls
  - Weekly cron job (Monday 9 AM)
  - Real-time Supabase subscriptions
- **Recommendation:** **VERCEL + SUPABASE + STRIPE**
- **Why:**
  - ✅ Already has vercel.json configured
  - ✅ Cron jobs run on Vercel Functions
  - ✅ Perfect for SaaS stack
  - ✅ Stripe native integration
- **Cost:** $20/mo (Vercel) + $25/mo (Supabase) + Stripe fees
- **Setup Time:** 10 minutes

---

### 13. **ascent-placements-marketing** 🎯
- **Type:** Static Marketing Website
- **Stack:** Vanilla HTML/CSS/JavaScript (no framework)
- **Database:** None
- **Special:**
  - Vercel serverless function for forms
  - Zapier webhook integration
  - GA4 + Plausible analytics
  - SEO optimized
- **Recommendation:** **VERCEL** (already configured!)
- **Why:**
  - ✅ **Already has vercel.json** - optimal setup
  - ✅ Static files + one serverless function
  - ✅ Ultra-fast (no build tooling overhead)
  - ✅ Perfect for marketing sites
- **Cost:** Free tier
- **Setup Time:** Already done!

---

### 14. **brand-vault** 🏛️
- **Type:** Full-Stack Application
- **Stack:**
  - Next.js 15, React 19, TypeScript
  - Vercel Postgres (PostgreSQL)
  - Drizzle ORM
  - Claude SDK
- **Database:** Vercel Postgres
- **Special:**
  - Type-safe database with Drizzle
  - Claude integration
  - Database migration scripts
- **Recommendation:** **VERCEL + VERCEL POSTGRES**
- **Why:**
  - ✅ Ideal Vercel ecosystem usage
  - ✅ Vercel Postgres fully managed
  - ✅ Drizzle provides type safety
  - ✅ Zero configuration needed
  - ✅ Best for tight integration
- **Cost:** $20/mo (Vercel) + Postgres usage ($0.10-2/day)
- **Setup Time:** 10 minutes

---

### 15. **ypc-ux** 👤
- **Type:** Personal Profile/Portfolio Site
- **Stack:**
  - GitHub profile site
  - Auto-generated SVG stats
  - GitHub GraphQL API
- **Database:** None (reads from GitHub)
- **Special:**
  - Daily stat generation via GitHub Actions
  - SVG animation (SMIL)
  - No third-party dependencies
- **Recommendation:** **GITHUB PAGES** ⭐
- **Why:**
  - ✅ Perfect for GitHub Pages
  - ✅ Already in GitHub
  - ✅ Stats auto-update via Actions
  - ✅ No external dependencies
- **Alternative:** Vercel (for custom domain)
- **Cost:** Free
- **Setup Time:** Already done!

---

### 16. **storyscope** 🔬
- **Type:** Research Data Pipeline / ML Analysis
- **Stack:**
  - Python 3.8+
  - Hugging Face/NLP libraries
  - PyArrow/Parquet data
  - XGBoost classifiers
  - 60K+ story dataset
- **Database:** Parquet files, CSV
- **Special:**
  - Heavy computation (ML training)
  - Large dataset (7.5MB+ files)
  - Research reproducibility
  - NOT a web application
- **Recommendation:** **HUGGING FACE SPACES** or **SELF-HOSTED**
- **Why NOT Traditional Web Hosting:**
  - ❌ Not suitable for serverless (compute-intensive)
  - ❌ Long-running jobs (hours/days)
  - ❌ Large dataset transfer
- **Best Approaches:**
  - **Hugging Face Spaces** ($0-50/mo) - Interactive demos, notebooks
  - **Self-Hosted** (EC2, GCP, Azure) - Full control, batch processing
  - **GitHub Releases** - Distribute pre-trained models
- **Cost:** Free (Spaces) or $20-100/mo (self-hosted)

---

## Platform Comparison Table

| Repo # | Name | Platform | Monthly Cost | Setup Time | Status |
|--------|------|----------|---------------|-----------|--------|
| 1 | jbuilds | Vercel | Free/$20 | 2 min | ⚠️ Ready |
| 2 | business-integration-protocol | GitHub Pages | Free | 0 min | ✅ Done |
| 3 | ascent-ascent | Individual | Varies | - | 🔍 Review |
| 4 | switchboard | Vercel + Supabase | $45-50 | 15 min | ⚠️ Ready |
| 5 | agent-charisma | GitHub | Free | 0 min | ✅ Done |
| 6 | maestro | GitHub/R2 | Free/$5-50 | 5 min | ✅ Done |
| 7 | slyderz | Vercel | Free/$20 | 2 min | ⚠️ Ready |
| 8 | agent-ad-spend | Vercel | Free | 2 min | ⚠️ Ready |
| 9 | smooth-operator | N/A | N/A | - | 🚫 Empty |
| 10 | agentic-priming-template | Railway/Render | $5-50 | 30 min | ⚠️ Ready |
| 11 | humanizer-influence | GitHub | Free | 0 min | ✅ Done |
| 12 | lever-site | Vercel + Supabase | $45-50 | 10 min | ⚠️ Ready |
| 13 | ascent-placements-marketing | Vercel | Free | 0 min | ✅ Done |
| 14 | brand-vault | Vercel + Postgres | $20-50 | 10 min | ⚠️ Ready |
| 15 | ypc-ux | GitHub Pages | Free | 0 min | ✅ Done |
| 16 | storyscope | Hugging Face/Self | Free/$50+ | - | ⚠️ Ready |

---

## Implementation Priority (Phase-by-Phase)

### Phase 1: Quick Wins (This Week)
**6 repos that are ready to deploy immediately:**

1. **jbuilds** → Vercel (2 min)
2. **slyderz** → Vercel (2 min)
3. **agent-ad-spend** → Vercel (2 min)
4. **switchboard** → Vercel + Supabase (15 min)
5. **lever-site** → Vercel + Supabase (10 min)
6. **brand-vault** → Vercel + Postgres (10 min)

**Total cost:** ~$100-150/month  
**Total setup time:** 45 minutes

### Phase 2: Backend Services (Next Sprint)
- **agentic-priming-template** → Railway/Render (30 min)
- **storyscope** → Hugging Face Spaces (20 min)

**Cost:** $5-50/month  
**Setup time:** 50 minutes

### Phase 3: Audit & Cleanup
- Review **ascent-ascent** (monorepo structure)
- Evaluate **smooth-operator** (populate or delete)

---

## Cost Analysis

### Current State (Estimated)
If all apps were running on separate platforms:
- Vercel (6 repos): $120/month
- Supabase (2 repos): $50/month
- Vercel Postgres (1 repo): $20/month
- Railway/Render (1 repo): $20/month
- Hugging Face (1 repo): Free
- GitHub/Static (5 repos): Free
- **Total: ~$210/month**

### Optimization Opportunities
- Use Vercel free tier for low-traffic sites
- Consolidate databases to single Supabase project (~$50/month shared)
- Use Railway/Render free tier for non-critical workers
- **Potential savings: 30-50% (~$70-100/month)**

---

## Netlify & Cloudflare Analysis

### Netlify
**When to use:** JAM stack apps that aren't Next.js
- ❌ Not ideal for Next.js (Vercel is better)
- ✅ Good for static sites + serverless functions
- ✅ Good for Vue/Svelte apps
- Verdict: **No repos need Netlify** (Vercel covers all Next.js needs)

### Cloudflare
**When to use:** Edge computing, global distribution, API routing
- ✅ Cloudflare Pages for static sites (alternative to Vercel for marketing)
- ✅ Cloudflare Workers for lightweight serverless functions
- ✅ Cloudflare R2 for large binary asset storage
- **Potential use:** maestro (if asset files are large) → Cloudflare R2
- Verdict: **Optional for CDN/asset distribution** (not required)

---

## Recommended Action Plan

### Immediate (Week 1)
1. ✅ Deploy 6 Next.js apps to Vercel
2. ✅ Set up Supabase for 2 database-backed apps
3. ✅ Set up Vercel Postgres for 1 app

### Short-term (Week 2-3)
1. ✅ Deploy Python template to Railway
2. ✅ Set up Hugging Face Spaces for research project
3. ✅ Verify GitHub Pages/static sites working

### Medium-term (Week 4+)
1. ✅ Review monorepo structure
2. ✅ Optimize costs
3. ✅ Set up monitoring & alerts
4. ✅ Document deployment runbooks

---

## Deployment Checklist

### For Each Vercel App
- [ ] Connect GitHub repo
- [ ] Set environment variables
- [ ] Configure custom domain (if needed)
- [ ] Enable automatic deployments
- [ ] Set up preview deployments
- [ ] Configure analytics

### For Database Apps
- [ ] Create Supabase/Postgres project
- [ ] Run migrations
- [ ] Set DATABASE_URL in Vercel
- [ ] Verify connection in staging
- [ ] Set up backups
- [ ] Configure connection pooling

### For Full-Stack Apps
- [ ] Deploy backend API
- [ ] Deploy frontend
- [ ] Configure CORS
- [ ] Set up webhooks (if needed)
- [ ] Test end-to-end
- [ ] Document API endpoints

---

## Next Steps

1. **Review this document** - Ensure recommendations match your business goals
2. **Prioritize deployments** - Start with Phase 1 (quick wins)
3. **Set up Vercel account** - If not already done
4. **Connect repositories** - To Vercel, Supabase, etc.
5. **Configure environments** - API keys, database URLs, etc.
6. **Test deployments** - Verify everything works
7. **Document runbooks** - For team reference

---

## Questions & Clarifications

- **Ascent-ascent:** Can you clarify if this is a monorepo? If so, I can provide recommendations for each sub-project.
- **smooth-operator:** Should this be deleted or populated with code?
- **Custom domains:** Do you want custom domains for any apps? This affects platform choices.
- **Budget constraint:** Is there a monthly budget target? Can help optimize further.

---

Generated: 2026-09-09  
Repository: ypc-ux organization  
Auditor: Claude Code
