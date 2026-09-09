# YPC-UX Repository Organization & Naming Guide

This document provides naming conventions, organization structure, and deployment strategies for all ypc-ux repositories to ensure professional sharing and team collaboration.

## Repository Naming Convention

### Naming Rules
- **Lowercase with hyphens** (not underscores or camelCase)
- **Descriptive names** that clearly indicate purpose
- **Consistency** across organization
- **Avoid ambiguous names** like "project1", "temp", "test"

### Examples
✅ Good:
- `business-integration-protocol`
- `agent-charisma`
- `ascent-placements-marketing`

❌ Avoid:
- `project-x`
- `claude_temp_branch`
- `AgentGraphology` (use `jbuilds` for actual repo name)

---

## Repository Inventory & Classification

### 📊 Data & Analytics Layer

#### `business-integration-protocol` (Public)
- **Purpose:** Core protocol documentation and framework for evaluating integrations
- **Type:** Documentation + Framework
- **Deployment:** GitHub Pages (static docs)
- **Current State:** Maintained
- **Recommendation:** Keep as-is, link from other projects

#### `agent-charisma` (Public)
- **Purpose:** Agent for marketing/prospecting automation
- **Type:** SaaS Tool / Backend Service
- **Tech:** Node.js backend + AI agents
- **Deployment:** Railway or Render
- **Branch Naming:** feature/*, fix/*, release/*

#### `agent-ad-spend` (Public)
- **Purpose:** AI agent for managing ad campaign budgets
- **Type:** SaaS Tool / Backend Service
- **Deployment:** Railway or Render
- **Status:** Active

#### `smooth-operator` (Public)
- **Purpose:** [Inspect repo to determine]
- **Type:** Needs assessment
- **Action:** Review and document purpose

---

### 🏢 Business Products

#### `jbuilds` (Public)
- **Purpose:** AgentGraphology - Repository evaluation using Business Integration Protocol
- **Type:** Full-Stack SaaS Application
- **Tech Stack:** Next.js 16 + Express.js + PostgreSQL + Ollama
- **Deployment:** Railway (recommended) or Render
- **Current State:** MVP complete, ready for deployment
- **Branch Convention:**
  - `main` - Production ready
  - `staging` - Pre-production testing
  - `develop` - Active development
  - `feature/*` - New features
  - `fix/*` - Bug fixes

#### `switchboard` (Public)
- **Purpose:** [Inspect repo to determine]
- **Type:** Needs assessment
- **Action:** Review and document

#### `maestro` (Public)
- **Purpose:** [Inspect repo to determine]
- **Type:** Needs assessment
- **Action:** Review and document

#### `slyderz` (Public)
- **Purpose:** [Inspect repo to determine]
- **Type:** Needs assessment
- **Action:** Review and document

---

### 🎨 Marketing & Brand

#### `ascent-placements-marketing` (Private)
- **Purpose:** Marketing site for Ascent Placements
- **Type:** Marketing Website
- **Deployment:** Netlify or GitHub Pages
- **Branch Convention:** main, staging, feature/*

#### `ascent-ascent` (Private)
- **Purpose:** Main Ascent product/platform
- **Type:** Product Application
- **Deployment:** Railway or Render
- **Status:** Active

#### `humanizer-influence` (Private)
- **Purpose:** Influence/reach analytics tool
- **Type:** SaaS Dashboard
- **Deployment:** Railway or Render

#### `lever-site` (Private)
- **Purpose:** Recruitment/hiring platform integration
- **Type:** Website/Integration
- **Deployment:** Netlify or Vercel

#### `brand-vault` (Private)
- **Purpose:** Brand asset management
- **Type:** Asset repository
- **Deployment:** GitHub or S3

---

### 🛠️ Templates & Tools

#### `agentic-priming-template` (Public)
- **Purpose:** Reusable template for AI agents
- **Type:** Template/Starter Kit
- **Usage:** Fork this for new agent projects
- **Deployment:** GitHub + NPM (as package)

#### `ypc-ux` (Public)
- **Purpose:** Organization profile and central documentation
- **Type:** Organization README
- **Deployment:** GitHub Profile
- **Content:** Links to all projects, team info, contributing guidelines

#### `storyscope` (Public)
- **Purpose:** [Fork from external - determine functionality]
- **Type:** Needs assessment
- **Action:** Document original purpose

---

## Branch Naming Convention

### Standard Branches (All Repositories)

```
main (or master)      - Production-ready, deployed to production
staging               - Pre-production, tested thoroughly
develop               - Active development, may be unstable
```

### Feature Branches (Short-lived)

```
feature/[name]        - New feature: feature/user-authentication
feature/[code]-[name] - Jira/linear ticket: feature/BIP-123-auth

fix/[name]            - Bug fix: fix/login-redirect
fix/[code]-[name]     - With ticket: fix/BIP-456-null-error

docs/[name]           - Documentation: docs/deployment-guide
infra/[name]          - Infrastructure: infra/github-actions

release/[version]     - Release branch: release/1.0.0
hotfix/[name]         - Production hotfix: hotfix/critical-bug
```

### Outdated Naming (To Be Cleaned Up)

❌ Current:
- `claude/business-integration-protocol-q9kv6s`
- `claude/add-blinking-dots-component-zymtvr`

✅ Should be:
- `feature/business-integration-protocol` (after merge to main)
- `feature/add-blinking-dots` (after merge to main)

---

## Repository Setup Checklist

When creating or updating a repository, ensure:

### Documentation
- [ ] Clear README.md with purpose and quick start
- [ ] Contributing guidelines in CONTRIBUTING.md
- [ ] Setup instructions for developers
- [ ] Deployment guide (link to this file)
- [ ] API documentation (if applicable)
- [ ] Architecture diagram

### Configuration
- [ ] `.env.example` with all required variables
- [ ] `docker-compose.yml` for local development
- [ ] GitHub Actions for CI/CD
- [ ] Branch protection rules for main
- [ ] Code review requirements (2 approvals)

### Code Quality
- [ ] TypeScript for type safety
- [ ] ESLint + Prettier configuration
- [ ] Pre-commit hooks
- [ ] Unit and integration tests
- [ ] GitHub Actions for automated testing

### Security
- [ ] No secrets in repository
- [ ] `.gitignore` properly configured
- [ ] Dependabot enabled for security updates
- [ ] Regular dependency audits
- [ ] Code scanning (GitHub Advanced Security)

### Deployment
- [ ] Deployment guide in docs/
- [ ] Environment variables documented
- [ ] Staging environment for testing
- [ ] Production readiness checklist
- [ ] Monitoring and logging configured

---

## Deployment Matrix

| Repository | Type | Recommended Platform | Env Setup | Auto-Deploy |
|------------|------|---------------------|-----------|------------|
| jbuilds | Full-Stack | Railway | Railway | GitHub Actions |
| agent-charisma | Backend | Railway | Railway | GitHub Actions |
| agent-ad-spend | Backend | Railway | Railway | GitHub Actions |
| ascent-placements-marketing | Frontend | Netlify | Netlify | GitHub Actions |
| ascent-ascent | Full-Stack | Railway | Railway | GitHub Actions |
| lever-site | Frontend | Netlify | Netlify | GitHub Actions |
| agentic-priming-template | Template | NPM | GitHub | GitHub Actions |
| [Others] | TBD | TBD | TBD | TBD |

---

## Recommended GitHub Actions Workflows

### Frontend Deployment (Netlify)

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Full-Stack Deployment (Railway)

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ts-node/setup@v1
      - run: npm install -g @railway/cli
      - run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Testing Pipeline

```yaml
name: Tests & Quality

on: [pull_request, push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm test
```

---

## Team Communication Guidelines

### Sharing Project with Team

When referencing repositories in documentation or communication:

```markdown
## Example Format
**Project:** jbuilds - AgentGraphology Repository Evaluation Tool
**Repo:** https://github.com/ypc-ux/jbuilds
**Purpose:** Evaluate GitHub repositories using the Business Integration Protocol
**Tech Stack:** Next.js 16, Express.js, PostgreSQL, Ollama
**Deployment:** Railway (https://railway.app)
**Docs:** See /docs directory for setup and deployment guides
```

### Onboarding New Team Members

1. Provide this organization guide
2. Link to repository README
3. Share deployment instructions
4. Clarify branch naming conventions
5. Explain CI/CD pipeline

---

## Cleanup Plan

### Phase 1: Documentation (This Week)
- ✅ Create this organization guide
- ✅ Add deployment guide
- ✅ Document all repositories

### Phase 2: Branch Cleanup (Next Sprint)
- [ ] Merge current feature branches to main
- [ ] Delete old branches (claude/*)
- [ ] Establish main, staging, develop
- [ ] Update branch protection rules

### Phase 3: Deployment Setup (Following Sprint)
- [ ] Configure Railway for jbuilds
- [ ] Set up GitHub Actions for CI/CD
- [ ] Test production deployment
- [ ] Document production runbook

### Phase 4: Repository Audit (Ongoing)
- [ ] Inspect unmapped repositories
- [ ] Document purpose and tech stack
- [ ] Add deployment instructions
- [ ] Assign owners/maintainers

---

## References

- [Git Workflow Guide](./GIT_WORKFLOW.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Business Integration Protocol](./INTEGRATION_PROTOCOL.md)
- [Setup Instructions](./SETUP.md)

---

## Questions?

For repository organization questions, refer to:
1. This guide (first reference)
2. Individual repository READMEs
3. Deployment guide for platform-specific questions
4. GitHub organization settings for access control

Last Updated: 2026-09-09
