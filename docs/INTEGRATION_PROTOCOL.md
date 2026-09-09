# Business Integration Protocol

A systematic framework for evaluating any GitHub repository, software, or codebase to determine where and how it should be integrated into your business for maximum efficiency and cost-effectiveness.

**Version:** 1.0  
**Last Updated:** 2026-09-09  
**Maintained By:** jbuilds Team

---

## Table of Contents

1. [Overview](#overview)
2. [Core Principles](#core-principles)
3. [Integration Decision Process](#integration-decision-process)
4. [Intake Checklist](#intake-checklist)
5. [Scoring Rubric (5 Dimensions)](#scoring-rubric-5-dimensions)
6. [Decision Matrix](#decision-matrix)
7. [Integration Patterns](#integration-patterns)
8. [Domain Mapping](#domain-mapping)
9. [FAQ & Precedents](#faq--precedents)

---

## Overview

### Problem We Solve

When you encounter new code, a library, a tool, or an open-source project, the question is: **Should we integrate this into our business? Where? At what cost?**

Without a system, this decision is:
- **Ad-hoc** (inconsistent across different evaluations)
- **Subjective** (depends on who's evaluating)
- **Risk-prone** (easy to miss technical debt or hidden costs)
- **Time-consuming** (no framework to expedite evaluation)

### Solution

This protocol provides a **standardized, data-driven framework** to:
1. **Intake** information about any new repo/code systematically
2. **Score** it across 5 dimensions (productivity, technical debt, business fit, effort, ROI)
3. **Decide** whether to integrate using a clear decision matrix
4. **Recommend** specific integration points and implementation approach
5. **Track** outcomes and refine scoring weights over time

### Expected Outcomes

- **Faster decisions** (evaluate any repo in < 1 hour)
- **Consistent reasoning** (same framework applied to all repos)
- **Measurable results** (score, ROI, productivity gains are tracked)
- **Reduced risk** (technical debt and compatibility issues flagged early)
- **Better prioritization** (scores guide which integrations do first)

---

## Core Principles

1. **Data-Driven**: Decisions based on measurable scoring, not gut feeling
2. **Multi-Dimensional**: Consider productivity, technical debt, business fit, effort, and ROI
3. **Transparent**: Scoring visible with evidence/examples (not a black box)
4. **Actionable**: Output includes specific integration recommendations, not just a score
5. **Iterative**: Protocol improves with each evaluation; weights adjust based on real outcomes
6. **Business-Focused**: Primary question: "Does this help us build faster with less technical debt?"

---

## Integration Decision Process

```
┌─────────────────────────┐
│  1. INTAKE              │  Collect metadata about the repo
├─────────────────────────┤
│  2. ANALYZE             │  Run through scoring engine
├─────────────────────────┤
│  3. SCORE               │  Generate 5-dimensional score
├─────────────────────────┤
│  4. DECIDE              │  Use decision matrix (score → action)
├─────────────────────────┤
│  5. PLAN                │  Create implementation roadmap
├─────────────────────────┤
│  6. IMPLEMENT           │  Execute integration
├─────────────────────────┤
│  7. MEASURE             │  Track actual ROI, productivity gains
└─────────────────────────┘
```

---

## Intake Checklist

When evaluating a new repo, collect this information:

### Repo Metadata
- [ ] **Repository URL** - GitHub/GitLab link
- [ ] **Repository Name** - Project name
- [ ] **Primary Purpose** - What does it do in 1 sentence?
- [ ] **Language** - Main programming language
- [ ] **License** - MIT, Apache, GPL, proprietary, etc.
- [ ] **Maturity** - Alpha / Beta / Stable / Mature
- [ ] **Last Update** - When was the last commit?
- [ ] **Active Maintenance** - Yes / No / Uncertain
- [ ] **Community Size** - Stars, forks, contributors

### Technical Details
- [ ] **Dependencies** - What does it require?
- [ ] **Size** - Repository size (MB)
- [ ] **Build/Runtime** - How does it run?
- [ ] **Documentation Quality** - README, docs, examples?
- [ ] **Test Coverage** - Unit tests present?
- [ ] **Security** - Known vulnerabilities?
- [ ] **Breaking Changes** - Any major version changes planned?

### Business Context
- [ ] **Problem It Solves** - What pain point does it address?
- [ ] **Competitive Alternatives** - Other solutions?
- [ ] **Integration Complexity** - Easy / Moderate / Complex to integrate
- [ ] **Your Team's Familiarity** - Never used / Used before / Expert level
- [ ] **Business Domain** - Which part of your business does this fit?

---

## Scoring Rubric (5 Dimensions)

### Dimension 1: Developer Productivity (0-25 points)

**Question:** How much will this save developer time or accelerate workflows?

#### Scoring Breakdown

| Points | Criteria | Example |
|--------|----------|---------|
| +5 | Saves 1-2 dev hours per week for team | Small time saver in frequent task |
| +10 | Saves 3+ dev hours per week | Significant automation or code reuse |
| +5 | Reduces code repetition (DRY principle) | Consolidates duplicate code |
| +5 | Accelerates common workflows | Speeds up typical development tasks |
| +3 | Improves developer experience (DX) | Better tooling, cleaner API |
| +2 | Provides learning value | Teaches best practices or patterns |
| **Max** | **25 points** | Saves significant time + improves DX + reduces duplication |

#### Scoring Guidance

**+5 - Time Savings (1-2 hrs/week)**
- Example: A component library with 2-3 commonly used components
- Impact: Developers use it occasionally; moderate impact

**+10 - Major Time Savings (3+ hrs/week)**
- Example: API discovery tool saving 2-4 hours per developer research time
- Impact: Highly used; significant workflow acceleration

**+5 - Code Reuse**
- Example: Utility package consolidating duplicate functions
- Impact: Reduces maintenance burden; improves code quality

**+5 - Workflow Acceleration**
- Example: Build/deployment tool automating manual steps
- Impact: Faster iteration cycles; better productivity

**+3 - Developer Experience**
- Example: Type-safe client library with better IntelliSense
- Impact: Harder to make mistakes; easier to use

**+2 - Learning Value**
- Example: Well-documented package showing best practices
- Impact: Improves team knowledge; reduces future mistakes

#### Examples

**High Score (20-25):**
- API discovery tool that saves 2-4 hours/dev per project
- Component library you'll use on every page
- Build tool automating 5+ hours of manual work weekly

**Medium Score (12-17):**
- Utility package with commonly needed helpers
- Monitoring tool that catches issues earlier
- CLI tool for recurring manual tasks

**Low Score (0-6):**
- Niche component used in <2 projects
- Tool for occasional use case
- Learning resource with limited practical impact

---

### Dimension 2: Technical Debt Impact (0-25 points)

**Question:** Does this improve or harm code quality, maintainability, and security?

#### Scoring Breakdown

| Points | Criteria | Example |
|--------|----------|---------|
| +5 | Improves code quality/readability | Better structured code, cleaner patterns |
| +5 | Follows your tech stack conventions | TypeScript, Next.js, Tailwind, shadcn/ui compatible |
| +5 | No additional dependencies (or reduces them) | Minimal deps or consolidates existing ones |
| +5 | Well-maintained with active community | Regular updates, responsive maintainers |
| +3 | Has comprehensive tests | Good test coverage (>80%) |
| +2 | Good documentation | Clear README, examples, API docs |
| -5 | Introduces tech debt / outdated deps | Old Node version, deprecated patterns |
| -5 | Conflicts with existing patterns | Doesn't match your conventions |
| -5 | Poor security posture | Known vulnerabilities, unsafe patterns |
| **Max** | **25 points** | Improves quality, follows conventions, minimal deps, well-maintained |

#### Scoring Guidance

**+5 - Code Quality Improvement**
- Example: Package that consolidates scattered logic into cleaner API
- Impact: Easier to understand and maintain; fewer bugs

**+5 - Matches Tech Stack**
- Example: shadcn/ui component (matches your existing pattern)
- Impact: Consistent with codebase; easier to maintain

**+5 - Minimal Dependencies**
- Example: Utility that has zero external dependencies
- Impact: Fewer security updates to track; less supply chain risk

**+5 - Well-Maintained**
- Example: Package updated weekly; quick issue resolution
- Impact: Security fixes applied quickly; APIs stable

**+3 - Test Coverage**
- Example: Package with 90%+ test coverage
- Impact: More reliable; easier to debug when issues occur

**+2 - Good Documentation**
- Example: Clear README with examples and API reference
- Impact: Easier to onboard; fewer support questions

**-5 - Tech Debt / Outdated**
- Example: Package built for Node 14; latest is 22
- Impact: Security updates needed; maintenance burden

**-5 - Pattern Conflicts**
- Example: CSS-in-JS library when you use Tailwind
- Impact: Inconsistent with codebase; harder to maintain

**-5 - Security Issues**
- Example: Package with known CVE; poor input validation
- Impact: Introduces security risk; requires workarounds

#### Examples

**High Score (20-25):**
- Component library fully typed, well-tested, actively maintained
- Utility that consolidates code and follows your patterns
- Tool that reduces dependencies while improving quality

**Medium Score (12-17):**
- Useful package with minor dependency concerns
- Library that works but requires wrapper layer
- Tool with moderate maintenance needs

**Low Score (0-6):**
- Package with outdated dependencies
- Tool that conflicts with existing patterns
- Package with known security issues

---

### Dimension 3: Business Domain Fit (0-20 points)

**Question:** How well does this align with your multi-domain business and strategic priorities?

#### Scoring Breakdown

| Points | Criteria | Example |
|--------|----------|---------|
| +5 | Solves a problem you've explicitly identified | Fills known gap in your roadmap |
| +5 | Fills a gap in your product/service | Enables feature you wanted to build |
| +5 | Enables new feature category | Opens up new capabilities |
| +5 | Strengthens existing domain | Improves current offering |
| +0 | Nice-to-have but not critical | Useful but not urgent |
| **Max** | **20 points** | Multiple business problems solved |

#### Scoring Guidance

**+5 - Solves Identified Problem**
- Example: API discovery tool (you explicitly wanted better API management)
- Impact: Addresses strategic gap; clear ROI

**+5 - Product Gap Filler**
- Example: Search component (you wanted to add search to product)
- Impact: Accelerates feature delivery; reduces time-to-market

**+5 - New Capability**
- Example: Real-time collaboration library (enables new feature category)
- Impact: Competitive advantage; new market opportunity

**+5 - Existing Domain Strengthening**
- Example: Better monitoring tool (improves reliability of current service)
- Impact: Reduces operational burden; improves customer experience

**+0 - Nice-to-Have**
- Example: Animation library for fun UI effects
- Impact: Cosmetic improvement only; not strategic

#### Examples

**High Score (15-20):**
- Tool solves multiple business problems
- Fills multiple gaps in roadmap
- Enables entirely new product category

**Medium Score (10-14):**
- Addresses one clear business need
- Fills one gap in current offering
- Improves existing capability

**Low Score (0-6):**
- Solves edge case or niche problem
- Nice-to-have but not strategic
- Would be useful but not urgent

---

### Dimension 4: Implementation Effort (0-20 points)

**Question:** How much work is required to integrate this into your codebase?

#### Scoring Breakdown

| Points | Criteria | Effort | Timeline |
|--------|----------|--------|----------|
| +20 | Plug-and-play integration | 1-4 hours | < 1 day |
| +15 | Minimal customization needed | 4-8 hours | 1 day |
| +10 | Moderate integration required | 1-2 days | 1-2 days |
| +5 | Significant refactoring needed | 3-5 days | 1 week |
| +0 | Requires rebuilding / major rework | 1+ weeks | 2+ weeks |
| **Max** | **20 points** | Immediate value | Can start today |

#### Scoring Guidance

**+20 - Plug-and-Play (1-4 hours)**
- Example: Drop-in component that works immediately
- Effort: Install → Import → Use
- Minimal configuration or customization

**+15 - Minimal Customization (4-8 hours)**
- Example: Library requiring slight styling tweaks
- Effort: Install → Configure → Customize → Test
- One developer can complete in a day

**+10 - Moderate Integration (1-2 days)**
- Example: API integration requiring wrapper layer
- Effort: Install → Design integration → Implement → Test
- Moderate complexity; requires planning

**+5 - Significant Refactoring (3-5 days)**
- Example: Major restructuring to adopt new pattern
- Effort: Design → Refactor → Implement → Test → Migration
- Multiple files affected; careful planning needed

**+0 - Major Rebuild (1+ weeks)**
- Example: Replacing core system with new architecture
- Effort: Design → Complete rewrite → Testing → Deployment
- High risk; significant effort; long timeline

#### Examples

**High Score (15-20):**
- Component you can drop in immediately
- Library that integrates in under a day
- Tool with minimal setup and configuration

**Medium Score (10-14):**
- Requires some customization or wrapper
- Needs 1-2 days to integrate properly
- Moderate complexity; manageable risk

**Low Score (0-6):**
- Requires significant code changes
- Needs multiple files modified
- Weeks of work or major architecture change

---

### Dimension 5: Cost-Benefit Ratio (0-10 points)

**Question:** Does the value justify the effort?

#### Scoring Formula

```
ROI Ratio = (Developer Hours Saved per Year) / (Integration Effort Hours)
```

#### Scoring Breakdown

| Points | ROI Ratio | Interpretation |
|--------|-----------|-----------------|
| +10 | > 50:1 | Saves 50+ hours per hour spent; exceptional value |
| +8 | 20-50:1 | Strong return; high priority |
| +6 | 10-20:1 | Good return; medium priority |
| +4 | 5-10:1 | Moderate return; consider if time available |
| +2 | 2-5:1 | Marginal return; integrate if low effort |
| +0 | < 2:1 | Poor return; only if strategic importance |

#### Scoring Guidance

**Calculation Example: public-apis**

```
Developers on team: 4
Hours saved per developer per year: 20 hours (research time)
Total hours saved per year: 4 × 20 = 80 hours
Integration effort: 20 hours
ROI Ratio: 80 / 20 = 4:1

Score: +4 (good return on moderate effort)
```

**Calculation Example: Component Library**

```
Developers using it: 3
Hours saved per developer per year: 5 hours
Total hours saved per year: 3 × 5 = 15 hours
Integration effort: 2 hours (install + one page styling)
ROI Ratio: 15 / 2 = 7.5:1

Score: +4 (moderate return on minimal effort)
```

**Calculation Example: Major Framework**

```
Developers using it: 5
Hours saved per developer per year: 100 hours
Total hours saved per year: 5 × 100 = 500 hours
Integration effort: 200 hours (major refactoring)
ROI Ratio: 500 / 200 = 2.5:1

Score: +2 (marginal immediate ROI, but strategic value)
```

#### Examples

**High Score (8-10):**
- Saves 50+ hours for 5+ hours of work
- Quick integration with massive time savings
- Example: API discovery tool (80 hrs saved ÷ 20 hrs work = 4:1)

**Medium Score (4-6):**
- Saves 20-50 hours for 5-20 hours of work
- Reasonable return on investment
- Example: Component library (15 hrs saved ÷ 2 hrs work = 7.5:1)

**Low Score (0-2):**
- Saves < 20 hours or requires > 50 hours work
- Marginal return unless strategic value
- Example: Minor utility (10 hrs saved ÷ 30 hrs work = 0.33:1)

---

## Total Scoring & Decision Matrix

### Score Calculation

```
Total Score = 
  (Developer Productivity: 0-25) +
  (Technical Debt Impact: 0-25) +
  (Business Domain Fit: 0-20) +
  (Implementation Effort: 0-20) +
  (Cost-Benefit Ratio: 0-10)

Maximum Possible Score: 100
```

### Decision Matrix

| Total Score | Decision | Action |
|-------------|----------|--------|
| **85-100** | ✅ **INTEGRATE IMMEDIATELY** | Start implementation this sprint |
| **70-84** | ✅ **INTEGRATE SOON** | Schedule for upcoming sprint |
| **55-69** | ⚠️ **EVALUATE ALTERNATIVES** | Research competing solutions |
| **<55** | ❌ **NOT RECOMMENDED** | Decline or table until constraints change |

### Interpretation Guide

**85-100: Integrate Immediately**
- High productivity gains
- Low/no technical debt
- Strong business fit
- Manageable effort
- Clear ROI
- **Action:** Prioritize in next sprint; fast-track implementation

**70-84: Integrate Soon**
- Good productivity gains
- Moderate technical debt risk
- Clear business value
- Reasonable effort
- Positive ROI
- **Action:** Schedule for upcoming sprint; create implementation plan

**55-69: Evaluate Alternatives**
- Moderate productivity gains
- Significant technical debt risk OR high effort
- Unclear business value
- Negative/marginal ROI
- **Action:** Research competitors; revisit in 3 months; may need refinement

**<55: Not Recommended**
- Low productivity impact
- High technical debt risk
- Poor business fit
- High effort requirement
- Negative ROI
- **Action:** Decline unless strategic priority changes

---

## Integration Patterns

When integrating a new repo, it typically fits one of these patterns:

### 1. **Data Source Pattern**
- **What it is:** External API, database, or data provider
- **Example:** public-apis (API catalog)
- **Integration:** Fetch/sync data → Store locally → Query through your API
- **Files involved:** Data layer, sync jobs, API endpoints
- **Example implementation:**
  ```
  scripts/sync-data.ts → types/data.ts → lib/queries.ts → pages/api/data.ts
  ```

### 2. **Component Library Pattern**
- **What it is:** UI components, design system
- **Example:** shadcn/ui (component system)
- **Integration:** Copy/import components → Adapt styling → Use in pages
- **Files involved:** Component layer, pages
- **Example implementation:**
  ```
  components/ui/[component].tsx → pages/*/[page].tsx
  ```

### 3. **Utility Library Pattern**
- **What it is:** Helper functions, utilities
- **Example:** lodash, date-fns
- **Integration:** Install → Import → Use throughout codebase
- **Files involved:** Any file using the utility
- **Example implementation:**
  ```
  npm install -> import in any file -> use throughout
  ```

### 4. **Service Integration Pattern**
- **What it is:** Third-party service, API wrapper
- **Example:** Stripe, Supabase, Firebase
- **Integration:** Configure keys → Create service layer → Integrate into app
- **Files involved:** Env config, service layer, business logic
- **Example implementation:**
  ```
  .env.local → lib/services/payment.ts → app/checkout/page.tsx
  ```

### 5. **Infrastructure Pattern**
- **What it is:** DevOps, build, deployment tools
- **Example:** Docker, GitHub Actions, monitoring
- **Integration:** Configure → Add to build pipeline → Monitor
- **Files involved:** Docker, GitHub workflows, config files
- **Example implementation:**
  ```
  Dockerfile → .github/workflows/*.yml → monitoring config
  ```

### 6. **API Integration Pattern**
- **What it is:** Consuming external REST/GraphQL APIs
- **Example:** public-apis (as data source for discovery platform)
- **Integration:** Create API client → Add error handling → Integrate into business logic
- **Files involved:** API client, types, service layer
- **Example implementation:**
  ```
  lib/api/client.ts → lib/api/types.ts → lib/services/*.ts → pages/api/*.ts
  ```

---

## Domain Mapping

Map each integration to where it fits in your architecture:

### 1. **UI Layer** (Frontend)
- Component libraries
- Design systems
- Form validators
- Animation libraries
- Location: `components/`, `pages/`, `app/`

### 2. **API Layer** (Backend endpoints)
- API wrappers
- Service integrations
- Business logic
- Location: `pages/api/`, `app/api/`, `lib/services/`

### 3. **Data Layer** (Database, queries, caching)
- Data providers
- Databases
- Cache libraries
- Location: `lib/db/`, `lib/queries/`, `scripts/`

### 4. **Utility Layer** (Shared functions)
- Helper libraries
- Type definitions
- Constants
- Location: `lib/`, `types/`, `utils/`

### 5. **Infrastructure Layer** (DevOps, build, monitoring)
- Build tools
- Deployment
- Monitoring
- Location: Root config files, `.github/`, `docker/`

### 6. **Developer Tools** (CLI, testing, linting)
- CLI tools
- Test frameworks
- Linters
- Location: `scripts/`, `package.json`, config files

**Mapping Exercise:** For any integration, ask:
- "Which layer does this primarily affect?"
- "Are there secondary layers?"
- "What files will change?"

---

## FAQ & Precedents

### Q: What if a repo is orphaned (no recent updates)?

**A:** Check the "Active Maintenance" intake item:
- If stable/mature and no security issues: Score normally
- If actively broken or has known CVEs: Deduct 5 points from Technical Debt
- If critical library everyone uses: Acceptable even if not actively maintained

**Example:** Node.js itself had long periods with minimal commits; still reliable.

---

### Q: How do we handle beta/alpha software?

**A:** Apply a maturity discount:
- Alpha software: Deduct 10 points (risky, may change drastically)
- Beta software: Deduct 5 points (still maturing)
- Stable/Mature: No deduction

**Reasoning:** Beta software is riskier but may be worth it if other scores are high.

---

### Q: What if there are conflicting scores (high productivity but high technical debt)?

**A:** Discuss as a team:
- Can you mitigate the technical debt? (wrapper layer, abstraction)
- Is the productivity gain worth the long-term cost?
- Can you delay integration until debt is resolved?

**Resolution:** If team decides to integrate, document the tradeoff and plan debt mitigation.

---

### Q: How often should we re-evaluate repos?

**A:** Re-evaluate when:
- Version significantly changes
- Team composition changes
- Business priorities shift
- Technical environment changes (e.g., Node version bump)
- Integration reveals unexpected issues

**Cadence:** Major evaluation every 12 months; as-needed for major updates.

---

### Q: Can we integrate something that scored <55?

**A:** Rarely, but possible if:
- Strategic/competitive necessity
- No alternatives available
- Can be revisited when constraints change
- Team explicitly accepts the tradeoff

**Requirement:** Document the exception; track outcomes; re-evaluate in 6 months.

---

### Q: Who decides if we integrate?

**A:** Standard decision flow:
1. Scoring tool generates report (objective)
2. Team reviews report (discussion)
3. Tech lead or PM makes final call (authority)
4. Document decision and rationale in commit message

---

### Q: How do we track outcomes?

**A:** For each integration, track:
- Actual hours spent (vs. estimated)
- Developer hours saved (measure over 3-6 months)
- Bugs/issues introduced
- Team satisfaction (survey)
- Calculate actual ROI

Use this data to refine scoring weights.

---

## Appendix: Example Scores

### Example 1: public-apis (API Directory)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Developer Productivity | 22/25 | Saves 2-4 hrs/dev on API research; not 3+ hrs weekly |
| Technical Debt | 16/25 | Well-maintained, but Python-based (not TypeScript); requires JSON API layer |
| Business Domain Fit | 16/20 | Clear fit for discovery platform; slightly unclear secondary uses |
| Implementation Effort | 14/20 | Moderate effort (Supabase + search + health monitor) |
| Cost-Benefit | 10/10 | 80 hrs saved/year ÷ 20 hrs work = 4:1 |
| **Total** | **78/100** | ✅ **INTEGRATE SOON** |

**Recommendation:** Schedule for next sprint; prioritize data layer setup.

---

### Example 2: Niche Animation Library

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Developer Productivity | 2/25 | Saves <1 hr/year; very niche use case |
| Technical Debt | 18/25 | Well-maintained; but adds dependency for cosmetic feature |
| Business Domain Fit | 5/20 | Nice-to-have; not strategic |
| Implementation Effort | 12/20 | Quick to integrate; minimal effort |
| Cost-Benefit | 0/10 | 1 hr saved ÷ 3 hrs work = 0.33:1 |
| **Total** | **37/100** | ❌ **NOT RECOMMENDED** |

**Recommendation:** Decline; consider if explicit design requirement added.

---

### Example 3: shadcn/ui Component Library

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Developer Productivity | 20/25 | Saves 5+ hrs/week on component building; massive DRY benefit |
| Technical Debt | 24/25 | Excellent quality; TypeScript; matches Tailwind + existing patterns |
| Business Domain Fit | 18/20 | Core to UI layer; enables faster feature development |
| Implementation Effort | 19/20 | Mostly plug-and-play; minimal customization |
| Cost-Benefit | 8/8 | 260 hrs saved/year ÷ 10 hrs work = 26:1 |
| **Total** | **89/100** | ✅ **INTEGRATE IMMEDIATELY** |

**Recommendation:** Already integrated; validate with this framework.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-09-09 | Initial protocol document |

---

## How to Use This Document

1. **First time evaluating?** Read the entire document once
2. **Evaluating a new repo?** Follow the [Integration Decision Process](#integration-decision-process) section
3. **Scoring guidance?** Jump to the specific [Scoring Rubric section](#scoring-rubric-5-dimensions)
4. **Unsure about something?** Check [FAQ & Precedents](#faq--precedents)
5. **Want examples?** See [Example Scores](#appendix-example-scores)

---

**Questions?** See [INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md) for worked examples, or refer to the FAQ section above.
