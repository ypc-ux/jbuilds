# Business Integration Protocol - Scoring Rubric

**Complete guide for scoring repositories using the 5-dimensional framework.**

This document provides detailed scoring criteria, examples, and edge cases for evaluating any repository against the Business Integration Protocol.

---

## Overview

The Integration Protocol scores any GitHub repository across five dimensions on a scale of 0-100:

| Dimension | Points | What It Measures |
|-----------|--------|------------------|
| Developer Productivity | 0-25 | How much time this saves your team |
| Technical Debt Impact | 0-25 | Code quality and maintainability cost |
| Business Domain Fit | 0-20 | Strategic alignment with your goals |
| Implementation Effort | 0-20 | Integration complexity and time cost |
| Cost-Benefit Ratio | 0-10 | Return on investment (hours saved vs. hours spent) |
| **TOTAL** | **0-100** | **Overall recommendation** |

---

## Dimension 1: Developer Productivity (0-25 pts)

**What it measures:** How much time this repository saves your team per week/month.

### Scoring Guidelines

**+25 pts: Saves 3+ developer-hours per week**
- Eliminates repetitive work
- Reduces time on common tasks by 50%+
- Example: UI component library that replaces manual component creation

**+20 pts: Saves 2-3 developer-hours per week**
- Automates a regular workflow
- Provides significant DRY (Don't Repeat Yourself) benefit
- Example: API client generator that eliminates hand-written API code

**+15 pts: Saves 1-2 developer-hours per week**
- Helpful but not essential
- Provides moderate efficiency improvement
- Example: Testing utility library that speeds up test writing

**+10 pts: Saves < 1 developer-hour per week**
- Useful but niche
- Helps in specific scenarios
- Example: Utility for a particular file format processing

**+5 pts: Nice-to-have, minimal time savings**
- Low productivity impact
- Mostly quality of life
- Example: Linting plugin for consistent code style

**+0 pts: No productivity impact**
- Doesn't save time
- Purely educational or aspirational

### Additional Modifiers

- **+5 pts: Reduces code repetition** - Enables code reuse across projects (DRY principle)
- **+5 pts: Accelerates common workflows** - Makes frequent operations faster
- **+3 pts: Improves developer experience** - Better error messages, faster feedback loops
- **+2 pts: Provides learning value** - Team learns new techniques/patterns

### Examples

**Example 1: shadcn/ui (React components)**
- Saves 2-3 hours/week by eliminating component design/build → +20 pts
- High code reuse potential → +5 pts
- Improves DX with copy-paste components → +3 pts
- **Subtotal: 28 pts (capped at 25)**

**Example 2: public-apis repository**
- Saves 2-4 hours/week on API research/discovery → +20 pts
- Provides reference for API design patterns → +2 pts
- **Subtotal: 22 pts**

**Example 3: Lodash utility library**
- Saves 0.5-1 hours/week by replacing manual utility functions → +10 pts
- High code reuse across all projects → +5 pts
- **Subtotal: 15 pts**

---

## Dimension 2: Technical Debt Impact (0-25 pts)

**What it measures:** Will this integration make your codebase healthier or sicker?

### Scoring Guidelines

**+25 pts: Improves code quality significantly**
- Better architecture patterns
- Cleaner separation of concerns
- Modern, well-maintained codebase
- Example: Moving from jQuery to React improves code quality

**+20 pts: Improves code quality**
- Good code organization
- Clear abstractions
- Well-documented
- Example: Adding TypeScript to untyped JavaScript project

**+15 pts: Neutral to slightly positive**
- No degradation
- Minor improvements
- Adds dependencies but well-managed

**+10 pts: Slightly increases technical debt**
- Adds some complexity
- More dependencies to maintain
- Acceptable trade-off for productivity gains

**+5 pts: Noticeably increases technical debt**
- More dependencies
- Adds maintenance burden
- Should only do if productivity gains are high

**+0 or negative: Decreases code quality**
- Outdated or unmaintained
- Poor documentation
- Architectural anti-patterns

### Additional Factors

**+5 pts: Follows your tech stack conventions**
- TypeScript (if your codebase is TS)
- Next.js (if you use Next.js)
- Tailwind CSS (if you use Tailwind)
- shadcn/ui components (if you use shadcn)

**+5 pts: No additional dependencies**
- Standalone utility
- Or reduces dependencies overall
- Example: Pure utility function

**+5 pts: Well-maintained with active community**
- Regular updates
- Active issue resolution
- Strong community support
- Example: Established libraries (React, Next.js, TypeScript)

**+3 pts: Has comprehensive tests**
- High code coverage
- Well-tested edge cases

**+2 pts: Good documentation**
- Clear README
- API documentation
- Usage examples

**-5 pts: Introduces tech debt / outdated deps**
- Uses deprecated libraries
- Last update > 2 years ago
- Known security vulnerabilities

**-5 pts: Conflicts with existing patterns**
- Different conventions than your codebase
- Incompatible with current stack
- Example: Vue.js library in a React-only codebase

**-5 pts: Poor security posture**
- Known vulnerabilities not patched
- Unsafe practices in code
- Sensitive data exposure risk

### Examples

**Example 1: Adding TypeScript to JavaScript project**
- Improves code quality significantly → +25 pts
- Aligns with modern TypeScript conventions → +5 pts
- Well-maintained with active community → +5 pts
- **Subtotal: 35 pts (capped at 25)**

**Example 2: Adding shadcn/ui components**
- Follows Tailwind/React conventions → +5 pts
- Well-maintained → +5 pts
- Good documentation → +2 pts
- Adds dependencies (minor) → slight negative
- **Subtotal: 12 pts**

**Example 3: Outdated authentication library**
- Hasn't been updated in 3 years → -5 pts
- Has known security vulnerabilities → -5 pts
- Would conflict with modern approaches → -5 pts
- **Subtotal: -15 pts (capped at 0)**

---

## Dimension 3: Business Domain Fit (0-20 pts)

**What it measures:** How well does this align with your business strategy?

### Scoring Guidelines

**+20 pts: Solves a critical, explicitly-identified problem**
- In your current roadmap
- Blocks current work
- Direct revenue impact
- Example: Payment processing library when billing is a blocker

**+15 pts: Solves a significant business problem**
- Important to roadmap
- Improves product offering
- Enables new feature category
- Example: Analytics library for product insights

**+10 pts: Fills a gap in your product**
- Nice-to-have but valuable
- Completes a feature set
- Improves user experience
- Example: File upload library for document management

**+5 pts: Strengthens existing domain**
- Helps but not critical
- Incremental improvement
- Example: A/B testing library for optimization

**+0 pts: Nice-to-have, not strategic**
- Tangential to business goals
- No immediate ROI
- Example: Animation library when core product needs work

### Additional Modifiers

- **+5 pts: Enables new product line/feature** - Opens up entirely new capabilities
- **+3 pts: Improves user experience** - Makes product more delightful
- **+2 pts: Competitive advantage** - Competitors don't have equivalent
- **-5 pts: Wrong domain** - For a different business type (e.g., mobile library for web-only company)

### Examples

**Example 1: Stripe payment library**
- Solves critical billing problem → +20 pts
- Enables new revenue model → +5 pts
- **Subtotal: 25 pts (capped at 20)**

**Example 2: Analytics library**
- Improves product insights → +15 pts
- Competitive advantage in data visibility → +2 pts
- **Subtotal: 17 pts**

**Example 3: Animation library (for SaaS dashboard)**
- Tangential to core business → +0 pts
- Would add visual polish → +3 pts
- **Subtotal: 3 pts**

---

## Dimension 4: Implementation Effort (0-20 pts)

**What it measures:** How much work is required to integrate this?

### Scoring Guidelines

**+20 pts: Plug-and-play integration (1-4 hours)**
- Drop-in component
- Minimal customization
- Works out of the box
- Example: React component you can import and use immediately

**+15 pts: Minimal customization (half day, 4-8 hours)**
- Some configuration needed
- Minor customization
- Example: Library that needs env variables set up

**+10 pts: Moderate integration (1-2 days, 8-16 hours)**
- Integration with existing systems needed
- Custom middleware or adapter
- Example: Payment gateway that needs webhook integration

**+5 pts: Significant refactoring (3-5 days, 24-40 hours)**
- Major changes to existing code
- Breaking changes to API
- Example: Migrating from one authentication system to another

**+0 pts: Requires rebuilding (week+, 40+ hours)**
- Fundamental architectural changes
- Not worth integration cost
- Example: Replacing core framework

### Factors to Consider

- **Setup complexity** - How many steps to get it running?
- **Learning curve** - How much does the team need to learn?
- **Customization** - How much code needs to be written?
- **Testing** - How much new testing is needed?
- **Migration** - If replacing something, what's the migration path?

### Examples

**Example 1: Adding shadcn component**
- Copy component file → import → use → +20 pts
- No refactoring needed
- **Subtotal: 20 pts**

**Example 2: Integrating Stripe**
- Install library → get API keys → add webhook → custom code → +10 pts
- Need to write checkout flow
- Need to handle webhook responses
- **Subtotal: 10 pts**

**Example 3: Migrating from Express to Fastify**
- Rewrite routes → test everything → deploy carefully → +0 pts
- Multiple weeks of work
- Not worth unless critical need
- **Subtotal: 0 pts**

---

## Dimension 5: Cost-Benefit Ratio (0-10 pts)

**What it measures:** Return on Investment (time saved vs. time spent integrating)

### Calculation

```
Ratio = (Annual Hours Saved) / (Integration Hours)

+10 pts: Ratio > 50:1 (exceptional ROI)
+8 pts:  Ratio 20-50:1 (excellent ROI)
+6 pts:  Ratio 10-20:1 (good ROI)
+4 pts:  Ratio 5-10:1 (acceptable ROI)
+2 pts:  Ratio 2-5:1 (marginal ROI)
+0 pts:  Ratio < 2:1 (poor ROI)
```

### Examples

**Example 1: React component library**
- Saves 2-3 hours/week = 100-150 hours/year
- Integration: 4 hours
- Ratio: 130 ÷ 4 = 32.5:1 → **+8 pts**

**Example 2: Analytics library**
- Saves 1 hour/week = 50 hours/year
- Integration: 16 hours
- Ratio: 50 ÷ 16 = 3.1:1 → **+4 pts**

**Example 3: Animation library (low productivity)**
- Saves 0.5 hours/week = 26 hours/year
- Integration: 20 hours
- Ratio: 26 ÷ 20 = 1.3:1 → **+0 pts**

---

## Total Score Interpretation

### Score Scale

| Score | Recommendation | Action |
|-------|-----------------|--------|
| **85-100** | **Integrate immediately** | High productivity, low technical debt, clear ROI |
| **70-84** | **Integrate soon** | Good value, manageable complexity, positive ROI |
| **55-69** | **Evaluate alternatives** | Moderate value, higher effort, unclear ROI |
| **40-54** | **Consider with caution** | Low value, high effort, minimal ROI |
| **<40** | **Not recommended** | Poor ROI, high risk, low strategic value |

---

## Scoring Checklist

Use this when evaluating a repository:

- [ ] Developer Productivity: How many hours saved per week? (0-25)
- [ ] Technical Debt: Code quality better or worse? (0-25)
- [ ] Business Fit: Strategic alignment? (0-20)
- [ ] Implementation Effort: Hours to integrate? (0-20)
- [ ] Cost-Benefit: Annual hours saved ÷ integration hours? (0-10)
- [ ] **Total Score** (0-100)
- [ ] **Recommendation** (Integrate Now / Soon / Consider / Not Recommended)

---

## Common Edge Cases

### "It's useful but we don't need it now"
- **Recommendation:** Score it, but factor in opportunity cost
- If score is 85+, integrate anyway (future-proof)
- If score is 40-70, defer and revisit in quarterly planning
- If score is <40, don't integrate

### "It replaces something we already have"
- Score the **diff**, not the library in isolation
- Compare migration cost vs. benefit of moving
- Example: Migrating from jQuery (outdated) to React (modern) is net positive despite effort

### "It's a component we could build ourselves"
- Score based on **build vs. buy** analysis
- Build time (engineering cost) vs. library time (learning cost) vs. maintain time
- Example: Custom form library (build: 40 hours, learn Formik: 8 hours) → Formik wins

### "The team needs to learn it"
- Add to Implementation Effort
- Add to Productivity Benefit (faster development once learned)
- Learning time typically 4-16 hours for new libraries

### "It has dependencies we'd need to add"
- Evaluate each dependency
- If already in codebase, free
- If new, factor into Technical Debt Impact
- Prefer libraries with zero or few dependencies

---

## Worked Example: Evaluating public-apis

**Repo:** https://github.com/public-apis/public-apis  
**Goal:** Use as a data source for an API discovery feature

### Scoring

**Developer Productivity: +22/25**
- Saves 2-4 hours/week on API research → +20
- Provides reference for API design patterns → +2

**Technical Debt Impact: +16/25**
- Well-maintained repository → +5
- Good documentation → +2
- Requires building API layer (not included) → -1 (net)
- Not in our tech stack (Python) but data is valuable → +10

**Business Domain Fit: +16/20**
- Enables new API discovery feature → +10
- Fits data layer of product → +6

**Implementation Effort: +14/20**
- Must parse and ingest data → 12-16 hours
- Moderate customization needed → +14

**Cost-Benefit Ratio: +10/10**
- 78 hours saved/year ÷ 16 hours integration = 4.9:1 → +4
- But strategic value is high → +6 (override)

### Total: 78/100 ✅ **INTEGRATE SOON**

---

## FAQ

**Q: Can a repo score high in productivity but low in fit?**  
A: Yes. Example: Machine learning library saves dev time but doesn't fit a simple CRUD app business. Still useful in the right context.

**Q: Should we always integrate 85+ repos?**  
A: Almost always. 85+ means clear ROI and strategic fit. Only skip if you have explicit business reasons not to.

**Q: What if we disagree on the score?**  
A: Discuss the dimensions separately. Often disagreement is about assumptions (e.g., how much time it saves), not the scoring rubric itself.

**Q: Can a library score 0 points?**  
A: Yes. If it doesn't save time, isn't well-maintained, doesn't fit strategy, requires major work, and has poor ROI, score 0.

---

**Last Updated:** 2026-09-10  
**Protocol Version:** 1.0  
**Maintained By:** Julius Young
