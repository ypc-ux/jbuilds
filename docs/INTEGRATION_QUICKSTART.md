# Business Integration Protocol - Quick Start Guide

Get up and running with the Business Integration Protocol in 5 minutes.

---

## 30-Second Overview

**Problem:** You encounter a new GitHub repo/tool. Should you integrate it? Where? How much work?

**Solution:** A 3-part system:
1. **Evaluation Framework** (docs) - Standardized scoring rubric
2. **Analysis Tool** (scripts) - Automated repo evaluation
3. **AI Advisor** (Claude) - Creates implementation plans

**Result:** Data-driven integration decisions with measured ROI.

---

## Quick Start: Evaluate a Repository

### Step 1: Run the Analysis Tool

```bash
npx ts-node scripts/integration-analyzer.ts https://github.com/public-apis/public-apis
```

**What it does:**
- Fetches repo metadata from GitHub
- Analyzes dependencies and code structure
- Scores across 5 dimensions (0-100 scale)
- Generates markdown report
- Creates JSON for programmatic use

**Output:** Two files in `reports/` directory:
- `integration-[repo-name]-[date].md` - Human-readable report
- `integration-[repo-name]-[date].json` - Machine-readable data

### Step 2: Review the Report

Open the markdown report and check:
1. **Total Score** - Should be 0-100
2. **Decision** - INTEGRATE IMMEDIATELY / SOON / EVALUATE / NOT RECOMMENDED
3. **Scoring Breakdown** - Details for each dimension
4. **ROI Ratio** - Hours saved / integration effort

### Step 3: Get Detailed Implementation Plan

```bash
npx ts-node scripts/integration-planner.ts reports/integration-[repo-name]-[date].json 4 high
```

**Parameters:**
- `reports/integration-*.json` - Evaluation report
- `4` - Team size (developers)
- `high` - Priority (high/medium/low)

**Output:**
- `integration-prompt-[repo-name].txt` - Prompt for Claude
- `integration-planner-guide-[repo-name].md` - Instructions

### Step 4: Generate Implementation Plan

Copy the prompt file content and give it to Claude:

```bash
cat reports/integration-prompt-[repo-name].txt
```

Paste into [Claude.ai](https://claude.ai) or use the Claude API.

**Claude will generate:**
- Detailed 3-4 phase implementation plan
- Specific tasks with effort estimates
- Risk assessment and mitigations
- Success metrics
- Team requirements

### Step 5: Execute and Track

1. Create tickets from the plan
2. Assign to team members
3. Track effort vs. estimates
4. Measure actual productivity gains
5. Calculate ROI after 3-6 months

---

## Understanding Your Score

### Score Ranges

| Score | Decision | Your Action |
|-------|----------|------------|
| **85-100** | ✅✅ INTEGRATE IMMEDIATELY | Start this sprint; high priority |
| **70-84** | ✅ INTEGRATE SOON | Schedule for next sprint |
| **55-69** | ⚠️ EVALUATE ALTERNATIVES | Research other options |
| **<55** | ❌ NOT RECOMMENDED | Decline integration |

### 5 Dimensions Explained

1. **Developer Productivity (0-25 pts)**
   - How much time will this save your team?
   - Will developers actually use it?

2. **Technical Debt (0-25 pts)**
   - Does it fit your tech stack?
   - Will it cause maintenance burden?

3. **Business Domain Fit (0-20 pts)**
   - Does it solve a real problem?
   - Does it enable new capabilities?

4. **Implementation Effort (0-20 pts)**
   - How many hours to integrate?
   - Technical complexity?

5. **Cost-Benefit Ratio (0-10 pts)**
   - ROI = Hours Saved / Integration Hours
   - Is it worth the effort?

---

## Real-World Examples

### Example: public-apis (API Directory)

**Command:**
```bash
npx ts-node scripts/integration-analyzer.ts https://github.com/public-apis/public-apis
```

**Result:** Score 78/100 → **INTEGRATE SOON** ✅

**Summary:**
- Saves 2-4 hours per developer on API research
- Well-maintained, but requires JSON API layer
- Enables new "API Discovery" platform feature
- 20 hours to implement, 80 hours/year saved
- ROI: 4:1 (breaks even in ~3 months)

**Next Step:** Generate implementation plan and start Phase 1 data layer setup

---

### Example: Niche Animation Library

**Result:** Score 37/100 → **NOT RECOMMENDED** ❌

**Summary:**
- Saves <1 hour per year (cosmetic-only)
- Adds unnecessary dependency
- Not strategic to business
- Minimal integration value
- ROI: 0.33:1 (not worth it)

**Recommendation:** Build custom animations if needed; skip this library

---

## Common Workflows

### "Should we integrate this?"

1. Run analysis tool
2. Check score and decision
3. If ≥70: Read full recommendations
4. If <70: Review why; consider alternatives

### "We want to integrate this. What's the plan?"

1. Run analysis tool
2. Generate planner prompt
3. Get implementation plan from Claude
4. Review with team
5. Create tickets and assign owners
6. Begin implementation

### "We're tracking ROI after integration"

1. Find original evaluation report
2. Track actual effort (vs. estimated)
3. Measure productivity gains (hours saved)
4. Calculate actual ROI ratio
5. Document learnings for future evaluations
6. Adjust scoring weights if needed

---

## File Structure

```
jbuilds/
├── docs/
│   ├── INTEGRATION_PROTOCOL.md        # Master reference (read first)
│   ├── INTEGRATION_EXAMPLES.md        # Real-world examples
│   └── INTEGRATION_QUICKSTART.md      # This file
├── scripts/
│   ├── integration-analyzer.ts        # CLI evaluation tool
│   ├── integration-planner.ts         # AI prompt generator
│   ├── scoring-engine.ts              # Scoring algorithm
│   ├── report-generator.ts            # Report formatting
│   └── types.ts                       # TypeScript definitions
├── .claude/
│   └── integration-advisor.md         # AI agent instructions
└── reports/
    ├── integration-*.md               # Evaluation reports (markdown)
    ├── integration-*.json             # Evaluation reports (JSON)
    ├── integration-prompt-*.txt       # Claude prompts
    └── implementation-plan-*.md       # Generated implementation plans
```

---

## Frequently Asked Questions

### Q: How long does evaluation take?

**A:** 5-15 minutes depending on repo size:
- Tool runs automatically (~2 minutes)
- Manual review of scoring (~3-5 minutes)
- Implementation planning (~10 minutes if needed)

### Q: Can I customize the scoring?

**A:** Yes. Modify `scripts/scoring-engine.ts` or create custom intake data. The rubric in `docs/INTEGRATION_PROTOCOL.md` is the source of truth.

### Q: What if the score seems wrong?

**A:** Check the "Evidence" section in the report. Scoring is transparent - you see exactly why each point was awarded or deducted.

### Q: How do we track if integration was successful?

**A:** Implementation plans include success metrics. Measure:
- Actual effort vs. estimated hours
- Developer hours saved (actual usage)
- Team adoption rate
- Quality metrics (bugs, tests, performance)

After 3-6 months, calculate actual ROI and adjust future scoring if needed.

### Q: Can we integrate something that scored <55?

**A:** Rarely. Only if:
- Strategic/competitive necessity
- No alternatives available
- Accepting the technical debt risk
- Team explicitly agrees

Document the exception and re-evaluate in 6 months.

### Q: Who decides if we integrate?

**A:** Typical flow:
1. Evaluation tool generates objective score
2. Team discusses recommendations
3. Tech lead or PM approves (or requests alternatives)
4. Implementation plan created
5. Execution begins

---

## Integration Checklist

When integrating a new repository, verify:

- [ ] Evaluation report reviewed by team
- [ ] Score and decision understood
- [ ] Business problem clearly defined
- [ ] Implementation plan generated
- [ ] Risk assessment reviewed
- [ ] Success metrics established
- [ ] Effort estimates reasonable for team
- [ ] Risks and mitigations documented
- [ ] Rollback procedure defined
- [ ] Timeline agreed with stakeholders
- [ ] Team trained on usage
- [ ] Monitoring plan in place
- [ ] Post-launch check-in scheduled (3 weeks)
- [ ] 6-month outcome review scheduled

---

## Next Steps

1. **Bookmark this guide** for future reference
2. **Read** `docs/INTEGRATION_PROTOCOL.md` for detailed scoring methodology
3. **Evaluate your first repo** using the tool
4. **Review the examples** in `docs/INTEGRATION_EXAMPLES.md`
5. **Generate an implementation plan** for a high-scoring repo
6. **Track outcomes** to refine your scoring over time

---

## Getting Help

### For Scoring Questions
See `docs/INTEGRATION_PROTOCOL.md` → Scoring Rubric section

### For Examples
See `docs/INTEGRATION_EXAMPLES.md` → Real-world examples with detailed breakdowns

### For Implementation Planning
Use `scripts/integration-planner.ts` to generate Claude prompts, or follow examples in `docs/INTEGRATION_EXAMPLES.md`

### For Agent Guidance
Read `.claude/integration-advisor.md` for the AI agent's role and decision framework

---

## Quick Reference: Commands

```bash
# Evaluate a repository
npx ts-node scripts/integration-analyzer.ts <github-url>

# Generate implementation planning prompt
npx ts-node scripts/integration-planner.ts <evaluation-report.json> [teamSize] [priority]

# Example: Evaluate public-apis
npx ts-node scripts/integration-analyzer.ts https://github.com/public-apis/public-apis

# Example: Plan implementation with 4 developers, high priority
npx ts-node scripts/integration-planner.ts reports/integration-public-apis-*.json 4 high

# View evaluation results
cat reports/integration-public-apis-*.md

# View JSON data
cat reports/integration-public-apis-*.json | jq .
```

---

**Version:** 1.0  
**Last Updated:** 2026-09-09

Start evaluating repositories today! 🚀
