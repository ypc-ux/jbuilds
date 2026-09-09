# Integration Protocol - Real-World Examples

This document provides worked examples of the Business Integration Protocol in action, showing how to evaluate different types of repositories.

**Version:** 1.0  
**Last Updated:** 2026-09-09

---

## Table of Contents

1. [Example 1: public-apis (High-Value Integration)](#example-1-public-apis-high-value-integration)
2. [Example 2: shadcn/ui (Immediate Integration)](#example-2-shadcnui-immediate-integration)
3. [Example 3: Niche Animation Library (Reject)](#example-3-niche-animation-library-reject)
4. [Example 4: Database Monitoring Tool (Moderate Priority)](#example-4-database-monitoring-tool-moderate-priority)
5. [Example 5: Legacy Framework (Avoid)](#example-5-legacy-framework-avoid)
6. [How to Score Your Own Repos](#how-to-score-your-own-repos)

---

## Example 1: public-apis (High-Value Integration)

**Repository:** https://github.com/public-apis/public-apis

### Intake Checklist Results

| Item | Value |
|------|-------|
| **Primary Purpose** | Curated directory of 1,816+ free public APIs |
| **Language** | Markdown + Python scripts |
| **License** | MIT |
| **Maturity** | Stable / Mature |
| **Last Update** | Last 2 weeks |
| **Active Maintenance** | Yes (daily link verification) |
| **Community Size** | 300K+ stars, 50+ active contributors |
| **Dependencies** | Python 3.8+, requests library |
| **Test Coverage** | Automated link validation |
| **Security** | No known vulnerabilities |
| **Business Problem** | Developers need better API discovery (currently scattered search) |
| **Integration Complexity** | Moderate (needs data layer setup) |

### Scoring Breakdown

#### Developer Productivity: 22/25

**Evidence:**
- Saves 2-4 hours per developer on API research
- Developers currently spend time searching multiple sources; consolidated directory eliminates this
- Team of 4: 4 devs × 20 hrs saved/year = 80 hours total
- However: Not a daily tool (used once per project), so not quite 3+ hrs/week
- Provides learning value (see available APIs before building)

**Scoring:**
- +10 Major time savings on API research
- +5 Reduces research friction (consolidated reference)
- +5 Provides learning/discovery value
- +2 Reference for onboarding new developers
- **Subtotal: 22/25** ✅ (Could reach 25 with higher usage frequency)

---

#### Technical Debt Impact: 16/25

**Evidence:**
- **Positive factors:**
  - Well-maintained Python scripts for link verification
  - Community actively curates data
  - No security vulnerabilities
  - Clear contributing guidelines
  
- **Concerns:**
  - Markdown format not ideal for programmatic access (requires parsing)
  - Python-based tools (your stack is Node/TypeScript)
  - Needs JSON API layer to be usable (additional work)
  - Link rot: APIs disappear; requires maintenance

**Scoring:**
- +5 Well-maintained with active community
- +3 Has tests (automated link verification)
- -5 Not TypeScript/Node compatible (Python-based)
- -5 Requires wrapper/API layer before production use
- -3 Maintenance burden (link rot; needs monitoring)
- **Subtotal: 16/25** ⚠️ (Good quality, but integration work needed)

---

#### Business Domain Fit: 16/20

**Evidence:**
- **Perfect fit:**
  - Solves explicit need: better API discovery
  - Enables new feature: API discovery platform/marketplace
  - Clear business value: developers find free alternatives (cost reduction)

- **Partial fit:**
  - Secondary use: internal reference for integration options
  - Tertiary use: educational content for onboarding

**Scoring:**
- +5 Solves explicit business problem (API discovery)
- +5 Enables new feature category (discovery platform)
- +5 Strengthens data layer capability
- +1 Secondary uses (reference, education)
- **Subtotal: 16/20** ✅ (Clear primary use, solid secondary uses)

---

#### Implementation Effort: 14/20

**Evidence:**
- **Moderate complexity:**
  - Clone README.md + parse daily (or integrate public-api JSON project)
  - Create Supabase table for API catalog (20-30 minutes)
  - Implement search/filtering (4-6 hours)
  - Add API health monitoring background job (3-4 hours)
  - Build UI discovery page (4-6 hours)
  - Testing and deployment (2-3 hours)
  
- **Total effort:** ~20 developer hours (1-2 weeks at 50% capacity)

**Scoring:**
- +15 Baseline moderate integration
- -1 Requires new infrastructure setup (Supabase)
- **Subtotal: 14/20** ⚠️ (Moderate effort; manageable)

---

#### Cost-Benefit Ratio: 10/10

**Calculation:**
```
Developer hours saved per year: 80 hours
Integration effort: 20 hours
ROI Ratio: 80 / 20 = 4:1

Score: +10 (ratio of 4:1 = good return)
```

**Analysis:**
- After integration costs are recovered in ~3 months
- Ongoing value for each new project that uses API discovery
- Positive ROI within first year
- Secondary benefit: reduced need to evaluate/compare API services

**Scoring:**
- +10 (4:1 ratio = strong return) ✅

---

### Total Score: 78/100 ✅ **INTEGRATE SOON**

### Recommendation

**Priority:** Medium-High (next 2-4 weeks)

**Integration Plan:**

**Phase 1: Data Foundation (1 week)**
```
Sprint 1 - Data Layer Setup
├─ Create Supabase table schema
│  └─ Fields: id, name, url, description, category, auth, https, cors, lastVerified
├─ Implement README.md parser or use github.com/davemachado/public-api
├─ Seed database with 1,816+ API entries
├─ Set up nightly health check job (ping endpoints)
└─ Create REST API endpoints: GET /api/apis, GET /api/apis/search
```

**Phase 2: Discovery UI (1 week)**
```
Sprint 2 - User Interface
├─ Create discovery page (/apis or /resources)
├─ Implement filtering (category, auth, CORS, HTTPS)
├─ Add full-text search (name + description)
├─ Show API health status (working/broken)
├─ Add favoriting/collection functionality
└─ Deploy and monitor
```

**Phase 3: Monitoring & Optimization (Ongoing)**
```
Post-Launch
├─ Track which APIs are most popular
├─ Monitor broken links; flag deprecated APIs
├─ A/B test filters and search algorithms
├─ Collect user feedback on discovery workflow
└─ Optimize based on usage patterns
```

**Success Metrics:**
- ✅ Database populated with 1,816+ APIs
- ✅ Search latency < 200ms (p95)
- ✅ Health check runs nightly successfully
- ✅ Discovery page ranks for "free public APIs"
- ✅ Team reports 2-4 hours saved per API integration project

**Timeline:** 2 weeks (80% team capacity)

**Risks:**
- Link rot (15-20% of APIs disappear per year) → Mitigate: nightly health checks
- User adoption (will team use it?) → Mitigate: integrate into onboarding process

---

## Example 2: shadcn/ui (Immediate Integration)

**Repository:** https://github.com/shadcn-ui/ui

### Quick Intake

| Item | Value |
|------|-------|
| **Purpose** | Beautifully designed, accessible components (Radix UI + Tailwind) |
| **Language** | TypeScript + React |
| **License** | MIT |
| **Maturity** | Stable |
| **Last Update** | Latest commit (actively maintained) |
| **Community** | 60K+ stars, huge adoption |
| **Tech Stack Match** | Perfect (TypeScript, React, Tailwind, shadcn compatible) |

### Scoring Breakdown

#### Developer Productivity: 23/25
- Saves 5+ hours/week on component building
- Massive code reuse across all pages
- Reduces custom CSS burden
- Well-documented with examples

#### Technical Debt Impact: 24/25
- Excellent code quality
- Fully TypeScript
- Matches your Tailwind + shadcn pattern exactly
- Active maintenance
- Comprehensive tests

#### Business Domain Fit: 18/20
- Core to UI layer
- Used on every page
- Enables faster feature development
- Strong competitive advantage (faster iterations)

#### Implementation Effort: 19/20
- Mostly plug-and-play
- Copy component files
- Customize colors/styling as needed
- Integrate into pages
- Already partially integrated!

#### Cost-Benefit Ratio: 8/8
- 260+ hours saved/year (5+ hrs/week × 50 weeks)
- ~10 hours integration effort
- ROI: 26:1 ratio ✅✅✅

### Total Score: 92/100 ✅✅ **INTEGRATE IMMEDIATELY**

**Action:** Already using! This validates the framework—you made the right choice.

---

## Example 3: Niche Animation Library

**Repository:** https://github.com/example/fancy-scroll-animations

### Quick Intake

| Item | Value |
|------|-------|
| **Purpose** | Fancy scroll and page transition animations |
| **Language** | JavaScript + CSS |
| **License** | MIT |
| **Maturity** | Beta |
| **Last Update** | 2 months ago (sporadic) |
| **Community** | 5K stars (niche) |
| **Usage** | Only needed for 1-2 special landing pages |
| **Business Value** | Cosmetic/marketing only |

### Scoring Breakdown

#### Developer Productivity: 2/25
- Saves <1 hour/year
- Used only for specific design effects
- No reuse across pages
- Niche use case
- Scope: 5 days/year of design work at most

#### Technical Debt Impact: 18/25
- Generally well-written code
- But: adds dependency that's not core
- Minor: cosmetic features aren't critical
- Unused most of the time

#### Business Domain Fit: 5/20
- Pure cosmetic enhancement
- Marketing/UX improvement only
- Not strategic to business
- No feature enablement
- No product gap filled

#### Implementation Effort: 12/20
- Quick to install and integrate
- Minimal configuration
- Low complexity

#### Cost-Benefit Ratio: 0/10
```
Hours saved per year: ~5 hours (estimate)
Integration effort: 3 hours
ROI: 5/3 = 1.67:1 (Poor return)
Score: 0 (< 2:1 ratio)
```

### Total Score: 37/100 ❌ **NOT RECOMMENDED**

**Recommendation:** 
- **Decline** unless explicit design requirement added
- If needed for specific campaign/landing page, build custom solution instead
- Revisit if becomes core to marketing strategy

**Rationale:** The ROI doesn't justify the dependency. Better to build custom animations for specific use cases.

---

## Example 4: Database Monitoring Tool

**Repository:** https://github.com/example/db-monitor-pro

### Quick Intake

| Item | Value |
|------|-------|
| **Purpose** | Monitor database performance, slow queries, alerts |
| **Language** | Node.js/TypeScript |
| **License** | MIT |
| **Maturity** | Production-ready |
| **Last Update** | Last week |
| **Community** | 15K stars (good adoption) |
| **Current Pain** | No visibility into slow queries; unexpected outages |

### Scoring Breakdown

#### Developer Productivity: 18/25
- Saves 2-3 hours/week on debugging slow query issues
- Catches problems before users report them
- Reduces production incident response time
- Prevents firefighting

#### Technical Debt Impact: 22/25
- Well-maintained, good code
- TypeScript compatible
- Minimal dependencies
- Active security patches
- Minor: Requires infrastructure setup

#### Business Domain Fit: 17/20
- Solves identified problem: lack of DB visibility
- Strengthens infrastructure/reliability
- Improves customer experience (fewer outages)
- Enables better capacity planning

#### Implementation Effort: 10/20
- Moderate integration required
- Database connection setup (1 hour)
- Configuration and rule tuning (4 hours)
- Dashboard setup and alerts (3 hours)
- Testing (2 hours)
- Total: ~10 hours

#### Cost-Benefit Ratio: 7/10
```
Hours saved per year: ~120 hours (2-3 hrs/week)
Integration effort: 10 hours
ROI: 120/10 = 12:1 (Good return)
Score: +8 (12:1 ratio = strong)
```

### Total Score: 74/100 ✅ **INTEGRATE SOON**

**Recommendation:**
- **Priority:** Medium (next 4-6 weeks)
- **Phase 1:** Set up monitoring on production database
- **Phase 2:** Configure alerts for slow queries, connection issues
- **Phase 3:** Build internal dashboard for ops team
- **Timeline:** 1-2 weeks
- **ROI:** Pays for itself in ~1 month through reduced incident response time

---

## Example 5: Legacy Framework

**Repository:** https://github.com/example/old-jquery-ui-wrapper

### Quick Intake

| Item | Value |
|------|-------|
| **Purpose** | jQuery UI components wrapper |
| **Language** | jQuery (EOL) |
| **License** | MIT |
| **Maturity** | Deprecated |
| **Last Update** | 3 years ago |
| **Community** | Declining |
| **Current Stack** | React/Next.js (conflicts) |
| **Security** | jQuery has known unpatched CVEs |

### Scoring Breakdown

#### Developer Productivity: 5/25
- Provides components, but jQuery doesn't fit your stack
- Would require jQuery dependency (conflicts with React)
- No benefit to team using React/TypeScript

#### Technical Debt Impact: 5/25
- **Major issues:**
  - jQuery is deprecated/EOL
  - Known security vulnerabilities
  - Conflicts with React (two DOM management systems)
  - Outdated patterns (3-year-old code)
  - Would require jQuery polyfills

#### Business Domain Fit: 0/20
- No business value
- Actively harms stack compatibility
- Wrong technology choice

#### Implementation Effort: 0/20
- Would require significant workarounds
- jQuery + React don't work well together
- Building wrapper layer would be inefficient

#### Cost-Benefit Ratio: 0/10
- No value
- Only costs and risks
- Negative ROI

### Total Score: 10/100 ❌ **REJECT**

**Recommendation:**
- **Decision:** Absolutely not
- **Rationale:** 
  - Conflicts with your React stack
  - Security vulnerabilities
  - Abandoned project
- **Alternative:** Use shadcn/ui or Headless UI for components

**Lesson:** Even if a library is popular, it must match your current stack.

---

## How to Score Your Own Repos

### Step-by-Step Process

**1. Gather Information (15 minutes)**
```
□ Find the repository on GitHub
□ Read the README (understand purpose)
□ Check last commit date (active maintenance?)
□ Scan package.json (dependencies, size)
□ Look for security issues (npm audit equivalent)
□ Check stars and activity (community health)
```

**2. Complete Intake Checklist (10 minutes)**
Use the template from [INTEGRATION_PROTOCOL.md](./INTEGRATION_PROTOCOL.md#intake-checklist):
```
□ Repo metadata (URL, name, purpose, language, license, maturity)
□ Technical details (dependencies, size, docs, tests, security, breaking changes)
□ Business context (problem solved, alternatives, complexity, team familiarity, business domain)
```

**3. Score Each Dimension (20 minutes)**
Using rubrics from [INTEGRATION_PROTOCOL.md](./INTEGRATION_PROTOCOL.md#scoring-rubric-5-dimensions):

| Dimension | Time | Approach |
|-----------|------|----------|
| **Productivity** | 5 min | Estimate hours saved per year for team |
| **Technical Debt** | 5 min | Assess code quality, dependency compatibility |
| **Business Fit** | 3 min | Does it solve a problem? Fill a gap? |
| **Effort** | 4 min | Estimate integration time realistically |
| **Cost-Benefit** | 3 min | Calculate (hours saved) / (hours to integrate) |

**4. Total Score & Decision (5 minutes)**
```
□ Add all scores
□ Check decision matrix
□ Document decision and rationale
```

**Total time: ~45-60 minutes per repo**

---

## Scoring Template (Copy & Use)

```markdown
# Integration Evaluation: [Repo Name]

**Repository:** [URL]
**Evaluator:** [Your name]
**Date:** [Today's date]

## Intake Checklist
- [ ] Purpose: [What does it do?]
- [ ] Language: [e.g., TypeScript]
- [ ] License: [e.g., MIT]
- [ ] Maturity: [Alpha/Beta/Stable/Mature]
- [ ] Last Update: [Date]
- [ ] Active: [Yes/No/Sporadic]
- [ ] Community: [Stars/adoption level]
- [ ] Dependencies: [Key dependencies]
- [ ] Security: [Any known issues?]
- [ ] Business Problem: [What pain does it solve?]

## Scoring

### Developer Productivity: __/25
Evidence:
- [Key points about time savings]
- [Frequency of use]
- [Productivity multiplier]

### Technical Debt: __/25
Evidence:
- [Code quality assessment]
- [Tech stack compatibility]
- [Maintenance burden]
- [Security posture]

### Business Domain Fit: __/20
Evidence:
- [Does it solve a problem you have?]
- [Does it enable new capabilities?]
- [Strategic importance]

### Implementation Effort: __/20
Evidence:
- [Estimated hours to integrate]
- [Complexity assessment]
- [Risks]

### Cost-Benefit: __/10
```
Hours saved/year: ___ hours
Integration effort: ___ hours
ROI Ratio: ___ / ___ = ___:1
```

## Total Score: __/100

## Decision
- [ ] Integrate Immediately (85+)
- [ ] Integrate Soon (70-84)
- [ ] Evaluate Alternatives (55-69)
- [ ] Not Recommended (<55)

## Recommendation
[Summary of decision and next steps]
```

---

## When Scores Disagree

Sometimes different evaluators score the same repo differently. Here's how to resolve:

### Example: Conflict on shadcn/ui Productivity Score

**Evaluator A:** 23/25 (huge value across all pages)
**Evaluator B:** 15/25 (already using, incremental value now)

**Resolution Process:**
1. **Compare notes:** What did each evaluator count?
   - A: Measuring future projects and pages
   - B: Measuring incremental adoption beyond current usage
2. **Clarify scope:** Are we scoring for new teams or existing usage?
3. **Agree on assumptions:** How many projects will use this in next year?
4. **Use average or max:** If both reasonable, average the scores
5. **Document the disagreement:** Note in final report

**Outcome:** 19/25 (acknowledging both perspectives)

---

## Tracking Outcomes

After 6 months, evaluate actual vs. estimated:

```markdown
# Outcome Tracking: [Project Name]

**Original Score:** 78/100
**Estimated Effort:** 20 hours
**Estimated Productivity Gain:** 80 hours/year

## Actual Results
- **Actual Effort:** 22 hours (estimate was close ✅)
- **Actual Adoption:** Team used it in 2 of 3 projects (estimate was 4 projects ❌)
- **Actual Productivity Gain:** 50 hours/year (estimate was 80 hours/year)
- **Actual ROI:** 50 / 22 = 2.3:1 (vs. estimated 4:1)

## Adjustments
- Productivity score was optimistic; adjust future estimates
- Adoption rate lower than expected; affects business fit scoring
- Integration effort was accurate ✅

## Next Step
Re-evaluate in 12 months; track trending
```

This feedback loop helps you improve scoring accuracy over time.

---

## Final Checklist

Before integrating any new repo, verify:

- [ ] Score calculated correctly (0-100)
- [ ] Decision matrix applied (85+ = integrate, etc.)
- [ ] Implementation plan is realistic
- [ ] Team agrees on approach
- [ ] Success metrics are measurable
- [ ] Risks are documented
- [ ] Alternative solutions evaluated
- [ ] Timeline is feasible

---

**Questions?** Refer to [INTEGRATION_PROTOCOL.md](./INTEGRATION_PROTOCOL.md) for detailed guidance on any dimension.
