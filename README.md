# AgentGraphology

**Profile Your Tools. Decide with Data.**

An interactive web application for evaluating GitHub repositories using the Business Integration Protocol - a systematic 5-dimensional scoring framework for assessing whether new tools, libraries, or services should be integrated into your business.

## 🎯 What It Does

AgentGraphology evaluates any GitHub repository across five dimensions:

1. **⚡ Developer Productivity** (0-25 pts) - How much time will this save?
2. **🏗️ Technical Debt** (0-25 pts) - What's the code quality impact?
3. **📊 Business Fit** (0-20 pts) - How aligned is it with your goals?
4. **🛠️ Implementation Effort** (0-20 pts) - What's the integration cost?
5. **💰 ROI Analysis** (0-10 pts) - What's the payoff ratio?

**Output**: A comprehensive evaluation with implementation plan, risk assessment, and recommendations.

## 🚀 Quick Start

### With Docker Compose (Recommended)

```bash
# Clone and setup
git clone https://github.com/ypc-ux/jbuilds.git
cd jbuilds

# Configure environment
cp .env.local.example .env.local
cp apps/agentgraphology-backend/.env.example apps/agentgraphology-backend/.env

# Start all services
docker-compose up -d

# Wait for services to initialize (~2 minutes)
# Then visit: http://localhost:3000
```

### Manual Setup

**Requirements**: Node.js 20+, PostgreSQL 16+, Ollama

```bash
# Backend
cd apps/agentgraphology-backend
npm install
npm run db:init
npm run dev

# Frontend (new terminal)
npm install
npm run dev

# Visit: http://localhost:3000
```

See [SETUP.md](./SETUP.md) for detailed configuration and deployment guides.

## 🎓 Intern Onboarding

**Just joined the team?** Start here:

1. **[docs/INTERN_ONBOARDING.md](./docs/INTERN_ONBOARDING.md)** - Complete overview of all 16 repos and getting started
2. **[docs/INTERN_SETUP.md](./docs/INTERN_SETUP.md)** - Step-by-step environment setup (30 min)
3. **[docs/INTERN_ARCHITECTURE.md](./docs/INTERN_ARCHITECTURE.md)** - How all the systems work together
4. **[docs/INTERN_30_DAY_PLAN.md](./docs/INTERN_30_DAY_PLAN.md)** - Your 30-day roadmap to productivity
5. **[docs/INTERN_ACCESS_CHECKLIST.md](./docs/INTERN_ACCESS_CHECKLIST.md)** - GitHub, Vercel, database access setup
6. **[docs/INTERN_QUICK_REFERENCE.md](./docs/INTERN_QUICK_REFERENCE.md)** - Bookmark this for common commands

**Quick setup:**
```bash
bash scripts/intern-setup.sh
# Automates cloning all repos, installing deps, and verifying services
```

Your primary project is [ascent-placements-marketing](https://github.com/ypc-ux/ascent-placements-marketing) for your first week. After that, you'll dive into backend features in this repo (jbuilds) and other YPC-UX projects.

---

## 📁 Project Structure

```
jbuilds/
├── src/                                    # Next.js frontend
│   ├── app/
│   │   ├── page.tsx                       # Evaluator page
│   │   ├── compare/page.tsx               # Comparison tool
│   │   └── layout.tsx
│   ├── components/
│   │   ├── evaluation-form.tsx            # URL input form
│   │   ├── evaluation-results.tsx         # Full results display
│   │   ├── score-card.tsx                 # Individual score viz
│   │   └── recommendation-badge.tsx       # Decision summary
│   └── lib/
│       ├── api-client.ts                  # API utilities
│       └── types.ts                       # TypeScript types
│
├── apps/agentgraphology-backend/          # Express.js backend
│   ├── src/
│   │   ├── index.ts                       # Express server
│   │   ├── scoring/engine.ts              # Scoring algorithm
│   │   ├── services/
│   │   │   ├── github.ts                  # GitHub API client
│   │   │   └── ollama.ts                  # LLM inference
│   │   ├── db/
│   │   │   ├── client.ts                  # Database connection
│   │   │   ├── schema.ts                  # PostgreSQL schema
│   │   │   └── repositories.ts            # Data access layer
│   │   ├── types/index.ts                 # TypeScript types
│   │   └── utils/logger.ts                # Logging utility
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── docs/
│   ├── INTEGRATION_PROTOCOL.md            # Complete protocol docs
│   ├── INTEGRATION_EXAMPLES.md            # Real-world examples
│   └── INTEGRATION_QUICKSTART.md          # 5-minute guide
│
├── docker-compose.yml                     # Full stack orchestration
├── Dockerfile.frontend                    # Frontend containerization
└── SETUP.md                               # Deployment guide
```

## 🏗️ Architecture

```
┌─────────────────────────┐
│  Next.js Frontend       │ (http://localhost:3000)
│  - Evaluator page       │
│  - Comparison view      │
│  - Type-safe client     │
└────────────┬────────────┘
             │ HTTP/JSON
┌────────────▼────────────┐
│  Express.js Backend     │ (http://localhost:3001)
│  - Scoring engine       │
│  - GitHub integration   │
│  - Ollama LLM service   │
└────┬───────┬──────┬─────┘
     │       │      │
┌────▼──┐ ┌──▼─┐ ┌─▼────────┐
│ PG    │ │Oll.│ │ GitHub   │
│ DB    │ │LLM │ │ API      │
│5432   │ │11434 │(free)   │
└───────┘ └────┘ └─────────┘
```

## 📊 Features

- **Interactive Web UI**: User-friendly evaluation form and result display
- **Repository Comparison**: Side-by-side analysis of multiple tools
- **Persistent Storage**: PostgreSQL database for evaluation history
- **Local LLM**: Ollama-powered AI reasoning (zero cloud costs)
- **Type-Safe**: Full TypeScript implementation
- **Production-Ready**: Docker, error handling, logging, monitoring
- **Open Source**: MIT license, full source code available

## 💰 Cost Analysis

| Solution | Monthly Cost |
|----------|-------------|
| Cloud LLMs (Claude/GPT) | $5,000-6,000 |
| **AgentGraphology** | **$0-50** |
| **Savings** | **95-98%** |

All AI inference runs locally on your hardware. No cloud API calls. No data sharing.

## 🔧 Configuration

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/agentgraphology
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b-instruct
GITHUB_TOKEN=optional_for_higher_limits
```

## 📖 Documentation

### Getting Started
- **[SETUP.md](./SETUP.md)** - Complete setup and deployment guide
- **[docs/INTEGRATION_PROTOCOL.md](./docs/INTEGRATION_PROTOCOL.md)** - Full protocol specification
- **[docs/INTEGRATION_QUICKSTART.md](./docs/INTEGRATION_QUICKSTART.md)** - 5-minute intro

### Deployment & Infrastructure
- **[docs/DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md)** - Railway, Render, Fly.io, AWS, Google Cloud alternatives
- **[docs/REPOSITORY_ORGANIZATION.md](./docs/REPOSITORY_ORGANIZATION.md)** - Team naming conventions and structure

### Examples & References
- **[docs/INTEGRATION_EXAMPLES.md](./docs/INTEGRATION_EXAMPLES.md)** - Real-world evaluations
- **[apps/agentgraphology-backend/README.md](./apps/agentgraphology-backend/README.md)** - Backend API docs

## 🚀 Deployment

### Docker Compose (Recommended for Local/Small Deployments)
```bash
docker-compose up -d
# Visit http://localhost:3000
```

### Kubernetes (Enterprise)
See [SETUP.md](./SETUP.md) for k8s deployment manifests.

### Cloud Platforms
- **AWS**: ECS, RDS, Route 53
- **Google Cloud**: Cloud Run, Cloud SQL, Cloud DNS
- **Azure**: App Service, Azure SQL, Azure DNS

See [SETUP.md](./SETUP.md#deployment) for detailed cloud setup guides.

## 🧪 Development

```bash
# Backend development
cd apps/agentgraphology-backend
npm run dev          # Auto-reload
npm run type-check   # Type checking
npm test             # Run tests

# Frontend development
npm run dev          # Auto-reload with Next.js
npm run type-check   # Type checking
npm test             # Run tests
```

## 🐛 Troubleshooting

**Can't connect to backend?**
```bash
curl http://localhost:3001/api/health
```

**Ollama not working?**
```bash
ollama list
ollama pull mistral:7b-instruct
```

**Database issues?**
```bash
docker-compose down -v
docker-compose up -d postgres
docker-compose exec api npm run db:init
```

See [SETUP.md](./SETUP.md#troubleshooting) for more solutions.

## 📈 Performance

- **Evaluation time**: 5-15 seconds (depends on Ollama)
- **Database queries**: ~5-10 per evaluation
- **Memory usage**: ~5-9GB (Ollama 4-8GB, PostgreSQL 256-512MB, Node 100-300MB)
- **Storage**: ~20GB for Ollama models

## 🔐 Security

- Local-first architecture (no data sent to cloud)
- Optional GitHub token for API rate limits
- CORS configuration for frontend origin
- PostgreSQL password protection
- Production security checklist in [SETUP.md](./SETUP.md#security-checklist)

## 📝 License

MIT - See [LICENSE](./LICENSE) file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ypc-ux/jbuilds/issues)
- **Documentation**: [docs/](./docs/)
- **Email**: support@agentgraphology.com
- **Protocol Details**: [Business Integration Protocol](./docs/INTEGRATION_PROTOCOL.md)

## 🎓 Learn More

- [Business Integration Protocol Specification](./docs/INTEGRATION_PROTOCOL.md)
- [5-Minute Quickstart Guide](./docs/INTEGRATION_QUICKSTART.md)
- [Real-World Examples](./docs/INTEGRATION_EXAMPLES.md)

---

Built with ❤️ for making better technology decisions.

**Profile Your Tools. Decide with Data.**
