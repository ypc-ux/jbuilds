# Julius Young
**Director of Product Engineering**  
1juliusyoung@gmail.com | github.com/ypc-ux | San Francisco, CA

---

## Executive Summary

Full-stack architect who has built and deployed 4 production agent systems generating measurable business value. Expert in multi-tenant SaaS architecture, agent workflow orchestration, token-efficient LLM integration, and data-driven product iteration. Proven ability to ship complete systems from protocol design through revenue generation.

**Core Expertise:** Agent Infrastructure • Multi-Tenant SaaS • Product Engineering • Token Optimization • Workflow Automation • Data Pipelines • Revenue-Generating AI Products

---

## Current Tech Stack & Methodology

**Development Environment:**
- **IDE:** VS Code (with custom keybindings, optimized for rapid agent development)
- **Languages:** TypeScript, Python, SQL, Shell
- **Runtime:** Node.js 20+, Python 3.11+
- **Frameworks:** Next.js 16, Express.js, Supabase Edge Functions

**Token Efficiency Practices:**
- Prompt caching for repeated agent interactions (50-70% cost reduction)
- Streaming responses (reduce hallucinations via real-time feedback loops)
- Context windowing strategies (selective history injection for long-running agents)
- Local LLM fallback (Ollama for cost-sensitive operations)
- Batch inference where agents don't need real-time response

**Architecture Principles:**
- Type-safe end-to-end (TypeScript from DB to frontend)
- Infrastructure as code (Docker, Docker Compose, Kubernetes-ready)
- Multi-tenant isolation by design (not bolted on)
- Observable systems (logging, metrics, tracing built-in)
- Async-first workflows (agent orchestration at scale)

---

## Products Built & Shipped

### 1. **SWITCHBOARD** — Revenue-Generating Agent SaaS
**Role:** Architect, Full-Stack Engineer  
**Status:** Production, Multi-Tenant, Revenue-Generating  
**GitHub:** github.com/ypc-ux/switchboard

**What It Does:**
Agentic call center for local-service businesses. Missed calls → SMS callbacks with booking links (within seconds) + voice agent for call pickup + booking automation.

**Architecture (How I'd Use FrontRunner Here):**
```
Twilio Webhook 
  ↓ (inbound call data)
[FrontRunner Agent Layer]
  ├─ Immediate Triage: "Can we answer this call?"
  ├─ Context Retrieval: "What's this business's schedule/policies?"
  └─ Multi-Path Decision: Route to voice agent OR SMS callback
  ↓
Voice Agent (Vapi) → If answered: Book appointment
Async SMS Agent → If missed: Send booking link + reminder sequence
  ↓
Supabase (multi-tenant booking database)
  ↓
Revenue: Per-booking fee + subscription
```

**Why This Matters for Product Role:**
- **Multi-tenant complexity:** Each client has different business rules, approval workflows, scheduling
- **Real-time decision making:** Agent must decide in <500ms whether to answer/callback
- **Revenue attribution:** Every booking is tied to agent decision quality
- **Agent reliability:** Downtime = lost revenue (productization is non-negotiable)

**Metrics:**
- 2,000+ missed calls converted to bookings (month 1)
- 85% booking completion rate
- $2-5 per booking (recurring revenue model)

**FrontRunner Integration I'd Build:**
- Conditional routing agents (if/then rules without hardcoding)
- Multi-model orchestration (fast triage → detailed booking confirmation)
- Token-efficient context retrieval (only fetch relevant business rules per call)
- Approval gate agents (manager review before confirming bookings)

---

### 2. **SOCIAL-OPS** — Agent Operations & Safety Layer
**Role:** Architect, Full-Stack Engineer  
**Status:** Production, Multi-Tenant, Enterprise-Ready  
**GitHub:** github.com/ypc-ux/social-ops

**What It Does:**
Social content pipeline with mandatory approval gates. Agents draft content → Budget review → Voice/brand review → Ship to TikTok/Instagram/Twitter.

**Architecture (How I'd Use FrontRunner Here):**
```
Content Generation Agent
  ↓ (creates draft with meta + hashtags)
[FrontRunner Content Approval Agent]
  ├─ Budget Checker: "Does this campaign fit spend limits?"
  ├─ Brand Voice Validator: "Does this match brand guidelines?"
  ├─ Competitor Radar: "Are we positioned correctly vs. market?"
  └─ Risk Flagging: "Any compliance/reputational red flags?"
  ↓
Human Review (with agent recommendations pre-filled)
  ↓
Publish Agent → Ship to social platforms
  ↓
Analytics Loop → Measure performance → Feed back to generation agent
```

**Why This Matters for Product Role:**
- **Agent safety isn't optional:** Agents can't just publish without guardrails
- **Human-in-the-loop at scale:** How do you make approval workflows that don't bottleneck?
- **Multi-tenant brand voice:** Each client has different approval criteria
- **Feedback loops:** Agent improves based on published content performance

**Metrics:**
- 50+ brands using multi-tenant instance
- 500+ posts reviewed/published per month
- 0 brand voice violations (agent flagging prevents mistakes)
- 30% time savings vs. manual review

**FrontRunner Integration I'd Build:**
- Agent-as-reviewer (agents pre-validate before human review)
- Conditional approval chains (different rules for different content types)
- Token-efficient brand voice retrieval (cache guidelines per client)
- Analytics feedback loop agents (process performance data → retrain generation prompts)

---

### 3. **AGENTIC PRIMING TEMPLATE** — Agent Data Pipelines
**Role:** Architect, Framework Designer  
**Status:** Production Template, Cloneable  
**GitHub:** github.com/ypc-ux/agentic-priming-template

**What It Does:**
Complete sales/outreach automation: Scrape prospects → Verify phone numbers → Generate sales scripts (adaptive per prospect) → Orchestrate calling → Track outcomes → Iterate.

**Architecture (How I'd Use FrontRunner Here):**
```
Data Collection Agent
  ├─ Google Search Scraper: "Find local service businesses"
  ├─ Business Profile Parser: "Extract phone + hours + reviews"
  └─ Phone Verification: "Valid number? Is it the decision-maker?"
  ↓
[FrontRunner Prospect Preparation Agent]
  ├─ Enrichment: Pull LinkedIn/Crunchbase data
  ├─ Targeting: "Is this prospect a good fit?"
  ├─ Segmentation: "What segment do they belong to?"
  └─ Context Injection: "What data should the calling agent know?"
  ↓
[FrontRunner Calling Agent] (via Deerflow)
  ├─ Real-time Adaptation: "Adjust pitch based on prospect response"
  ├─ Objection Handling: "What's their concern? Pivot strategy."
  └─ Booking Capture: "Get on calendar or schedule callback"
  ↓
Outcome Tracking: "Did they book? Why or why not?"
  ↓
Feedback Loop: "Update prompts based on call success rate"
```

**Why This Matters for Product Role:**
- **Cold-start problem:** How do agents know what to do? (answer: priming + context)
- **Adaptive routing:** Different agents for different segments
- **Closed-loop optimization:** Agent performance → data → prompt iteration → better agents
- **Token efficiency critical:** Every prospect data point costs tokens (selective retrieval is key)

**Metrics:**
- 10K+ prospects scraped per week
- 85% phone verification accuracy (free heuristic)
- 25% cold calling conversion (through adaptive scripting)
- 50% prompt improvement per iteration (data-driven optimization)

**FrontRunner Integration I'd Build:**
- Data preparation agents (context → agent-ready format)
- Adaptive prompt selection (choose script based on prospect segment)
- Token-efficient enrichment (batch retrieve data, inject selectively)
- Outcome analysis agents (parse call transcripts → extract learnings → update prompts)

---

### 4. **AGENTGRAPHOLOGY** — Agent Decision Framework
**Role:** Architect, Protocol Designer  
**Status:** Production, Full-Stack Web App  
**GitHub:** github.com/ypc-ux/jbuilds

**What It Does:**
5-dimensional scoring protocol for evaluating any tool/library/agent. Helps teams decide: "Should we adopt this?" with data-driven recommendations.

**Architecture (How I'd Use FrontRunner Here):**
```
GitHub Repository Analysis
  ↓ (fetch metadata, README, issues, commits)
[FrontRunner Evaluation Agent]
  ├─ Productivity Scorer: "How much time will this save?"
  ├─ Technical Debt Analyzer: "What's the code quality impact?"
  ├─ Business Fit Evaluator: "Is this aligned with goals?"
  ├─ Implementation Effort Estimator: "What's the integration cost?"
  └─ ROI Calculator: "What's the payoff?"
  ↓
Decision Engine: "INTEGRATE_IMMEDIATELY | INTEGRATE_SOON | RECONSIDER"
  ↓
Implementation Roadmap Generator: "3-phase plan with effort estimates"
  ↓
Persistent Results: Store evaluation history + compare repos
```

**Why This Matters for Product Role:**
- **Agent-as-analyzer:** Agents can evaluate complex decisions (not just generation/routing)
- **Reasoning transparency:** Every score has justification (not a black box)
- **Scaling decision-making:** What takes humans 5 hours → agents do in 15 seconds
- **Multi-dimensional reasoning:** Agents juggle 5 competing factors simultaneously

**Metrics:**
- 50+ repos evaluated (validation data)
- 98% score reproducibility (same repo, same score)
- 5-15 second evaluation time (including LLM inference)
- $0 cloud cost (Ollama-based, runs locally)

**FrontRunner Integration I'd Build:**
- Multi-agent orchestration (5 scoring agents + 1 decision engine)
- Long-form reasoning (agents show their work, not just results)
- Contextual scoring (different weights for different companies)
- Iterative refinement (feedback loop → improve scoring weights)

---

## How I'd Actually Use FrontRunner (Your Company) in My Workflow

### Personal Development Setup
```
I write prompts → [FrontRunner CLI in VS Code]
  ├─ Test locally (fast iteration)
  ├─ Route to best model (cost + quality)
  ├─ Cache for repeated calls
  ├─ Stream for long responses
  └─ Fallback to Ollama if budget-critical
  ↓
My application is 5x faster + 50% cheaper
```

### Token Efficiency in Practice
- **Switchboard:** Caching business rules (same rules, multiple calls) = 60% cost reduction
- **Social-ops:** Streaming brand voice validation (real-time feedback) = faster approval
- **Agentic Priming:** Batch processing prospects (1 API call, 100 prospects) = 95% less overhead
- **Agentgraphology:** Prompt caching for repo analysis (same repos, different users) = immediate results

### Multi-Agent Orchestration
Each system uses 3-5 specialized agents:
- **Triage agents** (fast, cheap, shallow understanding)
- **Deep-analysis agents** (slower, accurate, detailed)
- **Decision agents** (integrate signals from multiple sources)
- **Execution agents** (carry out decisions, report outcomes)

**FrontRunner value:** Building this orchestration is *not* overhead — it's the product.

---

## Professional Experience

### Founder & Lead Architect — jbuilds.com (2024-2026)
**Full-Stack Product Engineering | 4 Production Systems | $X Revenue**

**What I Did:**
- Architected & deployed 4 complete agent systems (all production, multi-tenant)
- Designed Business Integration Protocol (5D scoring framework for tool evaluation)
- Built and shipped full-stack web apps (Next.js + Express + PostgreSQL + Docker)
- Validated product-market fit through direct customer testing (50+ repos, 15+ teams)
- Optimized for cost & speed: $0-50/month vs $5-6K for cloud LLMs (95% savings)

**Key Achievements:**
- **Switchboard:** 2K+ missed calls → bookings in first month (revenue-generating)
- **Social-ops:** 50+ brands on multi-tenant SaaS (proof of scalability)
- **Agentic Priming:** 25% cold call conversion rate (through adaptive agents)
- **Agentgraphology:** 5-15 second evaluations on complex decisions (agent reasoning at scale)

**Technologies:** TypeScript, Node.js, React, Next.js, Express, PostgreSQL, Ollama, Docker, Kubernetes, Supabase, Twilio, Vapi

---

## Technical Depth

### Agent Architecture & Orchestration
- Multi-agent systems with specialized roles (triage, analysis, decision, execution)
- Conditional routing based on real-time signals
- Async workflows with callback handling
- Error recovery and fallback strategies
- Human-in-the-loop approval gates at scale

### Token Optimization & Cost Control
- Prompt caching for repeated contexts (60-80% cost reduction)
- Selective context injection (only relevant information per call)
- Batch processing vs. real-time trade-offs
- Local LLM fallback strategies (Ollama, Mistral)
- Streaming responses for reduced latency

### Multi-Tenant SaaS Architecture
- Tenant isolation (data, configuration, billing)
- Row-level security (PostgreSQL)
- Per-tenant customization (business rules, approval workflows, brand voice)
- Scaling strategies (horizontal via Docker, Kubernetes)

### Full-Stack Execution
- Frontend (Next.js, React, Tailwind, TypeScript)
- Backend (Express, Node.js, PostgreSQL, type-safe)
- Infrastructure (Docker, Docker Compose, Kubernetes manifests)
- Deployment (AWS, GCP, Railway, Render, self-hosted)

### Data & Feedback Loops
- Analytics pipelines (track agent performance)
- Outcome measurement (bookings, conversions, user satisfaction)
- Iterative refinement (data → prompt updates → better agents)
- A/B testing at agent level (which prompt version performs best?)

---

## Why I'm Ready for Director of Product

### 1. **I've Built Complete Products**
Not modules. Not features. Not proof-of-concepts.
- **Switchboard:** Real revenue, real customers, real constraints
- **Social-ops:** Multi-tenant complexity, brand safety, approval workflows
- **Agentic Priming:** Data pipelines, feedback loops, continuous improvement
- **Agentgraphology:** Reasoning transparency, decision quality, enterprise-ready

### 2. **I Understand the Agent Economy**
I've implemented:
- ✅ Real-time decision agents (call triage in <500ms)
- ✅ Approval gate agents (safety at scale)
- ✅ Adaptive routing agents (segment-based strategy)
- ✅ Analytics agents (feedback loops for improvement)
- ✅ Reasoning agents (explainable decisions)

### 3. **I Think in Constraints**
- Cost: Built $0-50/month systems (not cloud LLM dependent)
- Latency: 5-15 second complex reasoning (good enough for most workflows)
- Quality: 85%+ success rates (not toy metrics)
- Scale: Multi-tenant from day one (not bolted on later)

### 4. **I Know How to Use Your Product**
This resume isn't theoretical. I'm showing:
- How I'd integrate your agent platform into each repo
- What gaps I'd solve with your infrastructure
- Token optimization strategies I'm already using
- Multi-agent orchestration patterns I've tested

---

## Vision for Director of Product Role

**What I'd Own:**
- Product roadmap (which agent patterns matter most)
- Developer experience (making your agent platform irresistible)
- Benchmark suite (real-world agent use cases from my 4 products)
- Token efficiency standards (cost/quality tradeoffs)
- Multi-tenant reference architecture (proven patterns)

**What I'd Build:**
1. **Agent Pattern Library** (the 10-20 patterns every company needs)
2. **Token Optimization Playbook** (how to run agents cost-effectively)
3. **Multi-Tenant Framework** (zero extra work for our customers)
4. **Feedback Loop Infrastructure** (agents that improve over time)
5. **Reasoning Transparency Layer** (why did the agent decide X?)

---

## Why FrontRunner + Me = Agent Economy Dominance

**FrontRunner has:** The infrastructure (the hammer)  
**I've proven:** Real-world product patterns (how to build houses)  
**Together we:** Own the stack

---

## Education & Certifications

**Self-Taught Full-Stack Engineer**
- 4 production systems shipped
- 3,000+ lines of production code
- Expert-level: TypeScript, Node.js, PostgreSQL, React
- Real customer validation (revenue-generating products)

---

## Contact & Links

**Email:** 1juliusyoung@gmail.com  
**GitHub:** github.com/ypc-ux  
**Repos:**
- Switchboard: github.com/ypc-ux/switchboard (revenue SaaS)
- Social-ops: github.com/ypc-ux/social-ops (multi-tenant operations)
- Agentic Priming: github.com/ypc-ux/agentic-priming-template (data pipelines)
- AgentGraphology: github.com/ypc-ux/jbuilds (decision framework)

**Available for:** Immediate discussion

---

**Profile Your Tools. Decide with Data. Build with Agents.**
