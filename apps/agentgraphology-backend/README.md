# AgentGraphology Backend

Interactive API for the Business Integration Protocol - evaluate GitHub repositories with AI-powered analysis.

## Features

- **5-Dimensional Scoring**: Productivity, Technical Debt, Business Fit, Implementation Effort, Cost-Benefit
- **Zero Cloud Costs**: Uses Ollama for local LLM inference (free, open-source)
- **Repository Analysis**: Fetches GitHub metadata via API
- **Comparison Engine**: Compare multiple repositories side-by-side
- **Persistent Storage**: PostgreSQL database for evaluation history
- **Production-Ready**: Type-safe TypeScript, comprehensive error handling, request logging

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: PostgreSQL 16
- **LLM**: Ollama (Mistral 7B Instruct)
- **Language**: TypeScript (strict mode)
- **Logging**: Pino
- **Security**: Helmet, CORS

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (recommended for local dev)
- PostgreSQL 16 (or use Docker)
- Ollama (or use Docker)

### Local Development (with Docker)

1. Clone the repository:
```bash
git clone https://github.com/ypc-ux/jbuilds.git
cd apps/agentgraphology-backend
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Start services with Docker Compose:
```bash
docker-compose up -d
```

4. Verify services are running:
```bash
# Check API health
curl http://localhost:3001/api/health

# Check Ollama model
curl http://localhost:11434/api/tags
```

### Manual Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL:
```bash
# Create database
createdb agentgraphology

# Run migrations (schema auto-created on first connection)
npm run migrate
```

3. Start Ollama (separate terminal):
```bash
ollama serve
ollama pull mistral:7b-instruct
```

4. Configure environment:
```bash
cp .env.example .env
# Edit .env with your local settings
```

5. Start development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
```bash
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-09-09T12:00:00.000Z",
  "ollama": {
    "connected": true,
    "model": "mistral:7b-instruct"
  },
  "database": {
    "connected": true
  },
  "version": "1.0.0"
}
```

### Evaluate Repository
```bash
POST /api/evaluate
Content-Type: application/json

{
  "repoUrl": "https://github.com/owner/repo",
  "teamSize": 5,
  "priority": "high"
}
```

Response:
```json
{
  "success": true,
  "evaluation": {
    "id": "uuid",
    "repositoryUrl": "https://github.com/owner/repo",
    "repositoryName": "repo",
    "scores": {
      "productivity": { "score": 22, "maxScore": 25, "reasoning": "..." },
      "technicalDebt": { "score": 18, "maxScore": 25, "reasoning": "..." },
      "businessFit": { "score": 16, "maxScore": 20, "reasoning": "..." },
      "implementationEffort": { "score": 14, "maxScore": 20, "reasoning": "..." },
      "costBenefit": { "score": 8, "maxScore": 10, "reasoning": "..." },
      "totalScore": 78,
      "decision": "INTEGRATE_SOON",
      "roiRatio": 3.9
    },
    "implementationPhases": [
      {
        "phase": 1,
        "name": "Setup & Configuration",
        "duration": "1-2 weeks",
        "effortHours": 4,
        "tasks": [...]
      }
    ],
    "risks": [...],
    "successMetrics": [...],
    "recommendations": [...]
  }
}
```

### Compare Repositories
```bash
POST /api/compare
Content-Type: application/json

{
  "repoUrls": [
    "https://github.com/owner/repo1",
    "https://github.com/owner/repo2",
    "https://github.com/owner/repo3"
  ]
}
```

Response includes evaluations for all repos plus comparison metrics.

### Retrieve Evaluation
```bash
GET /api/evaluations/:id
```

## Database Schema

### Tables

- **evaluations**: Stores evaluation results with scores and metadata
- **comparisons**: Stores comparison results
- **usage_metrics**: API usage tracking and analytics
- **api_keys**: API key management for rate limiting

## Environment Configuration

See `.env.example` for all available options:

```env
# Server
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug

# GitHub API (optional)
GITHUB_TOKEN=your_token

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral:7b-instruct

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/agentgraphology
```

## Development

### Build
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Lint
```bash
npm run lint
```

### Run Tests
```bash
npm test
```

### Development Server
```bash
npm run dev
```

## Scoring Dimensions

1. **Developer Productivity (0-25 pts)**
   - Time savings potential
   - Maintenance status
   - Community adoption
   - Documentation quality

2. **Technical Debt Impact (0-25 pts)**
   - Project maturity
   - Active maintenance
   - Licensing clarity
   - Issue health

3. **Business Domain Fit (0-20 pts)**
   - Adoption rate
   - Fork/watcher count
   - Business relevance

4. **Implementation Effort (0-20 pts)**
   - Codebase size
   - Language ecosystem
   - Documentation
   - API stability

5. **Cost-Benefit Ratio (0-10 pts)**
   - ROI heuristic (productivity vs. effort)

## Cost Analysis

- **Cloud LLMs (Claude/GPT-4)**: $5,000-6,000/month
- **AgentGraphology with Ollama**: $0-50/month
- **Savings**: 95-98% cost reduction

All AI inference runs locally on your machine or server.

## Deployment

### Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Kubernetes
Dockerfile included. Use standard k8s deployment patterns.

### Bare Metal
Requires PostgreSQL 16+ and Ollama service running.

## Performance

- **Evaluation time**: 5-15 seconds (depends on Ollama inference)
- **GitHub API calls**: 1 per evaluation
- **Database queries**: ~5-10 per evaluation
- **Memory usage**: ~512MB (Ollama adds 4-8GB depending on model)

## Monitoring

### Logs
```bash
# View logs
docker-compose logs -f api

# Development logs
npm run dev
```

### Metrics
Access usage metrics at `/api/metrics` (when implemented).

### Database
pgAdmin available at `http://localhost:5050` (Docker Compose).

## Troubleshooting

### Ollama Connection Failed
```bash
# Verify Ollama is running
curl http://localhost:11434/api/tags

# Check model is downloaded
ollama list

# Pull mistral if missing
ollama pull mistral:7b-instruct
```

### Database Connection Failed
```bash
# Check PostgreSQL
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up postgres
```

### High Memory Usage
- Ollama model uses 4-8GB RAM
- PostgreSQL uses 256-512MB
- Node.js uses 100-300MB
- Total: ~5-9GB for full stack

Adjust Docker resource limits in `docker-compose.yml` if needed.

## Security

- API keys for rate limiting (coming soon)
- GitHub token optional (increases rate limits)
- CORS configured for frontend origin
- HTTPS recommended for production
- Database password in .env (change in production!)

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open Pull Request

## License

MIT - See LICENSE file

## Support

- GitHub Issues: [ypc-ux/jbuilds/issues](https://github.com/ypc-ux/jbuilds/issues)
- Documentation: [docs/](../../docs/)
- Email: support@agentgraphology.com

## Next Steps

- [ ] Implement API key authentication
- [ ] Add GraphQL endpoint
- [ ] Build React dashboard (frontend)
- [ ] Implement caching layer (Redis)
- [ ] Add webhook support
- [ ] Create CLI tool
- [ ] Deploy to AWS/GCP
