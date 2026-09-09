# AgentGraphology - Complete Setup Guide

End-to-end setup for running the Business Integration Protocol evaluation tool locally or in production.

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│ Frontend (Next.js)                                  │
│ - Evaluator page                                    │
│ - Comparison page                                   │
│ - TypeScript + Tailwind CSS                         │
│ Port: 3000                                          │
└─────────────────┬───────────────────────────────────┘
                  │ HTTP/JSON
┌─────────────────▼───────────────────────────────────┐
│ Backend API (Express.js + TypeScript)               │
│ - Scoring engine                                    │
│ - GitHub API integration                           │
│ - Ollama LLM inference                              │
│ Port: 3001                                          │
└─────────────────┬───────────────────────────────────┘
                  │
      ┌───────────┴───────────┬─────────────┐
      │                       │             │
┌─────▼────┐         ┌───────▼──┐    ┌────▼────┐
│PostgreSQL│         │ Ollama   │    │ GitHub  │
│Database  │         │ (Local   │    │ API     │
│Port:5432 │         │  LLM)    │    │         │
└──────────┘         │Port:11434│    └─────────┘
                     └──────────┘
```

## Prerequisites

### Required
- Docker & Docker Compose 2.0+
- Git
- Node.js 20+ (if running without Docker)

### Hardware Requirements
- **Minimum**: 8GB RAM, 2 CPU cores (Ollama models need 4-8GB)
- **Recommended**: 16GB+ RAM, 4+ CPU cores
- **Storage**: 20GB free disk space (for Ollama models)

## Quick Start (Docker Compose)

### 1. Clone and Setup

```bash
git clone https://github.com/ypc-ux/jbuilds.git
cd jbuilds

# Create environment files
cp .env.local.example .env.local
cp apps/agentgraphology-backend/.env.example apps/agentgraphology-backend/.env
```

### 2. Configure Environment

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Edit `apps/agentgraphology-backend/.env`:
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@postgres:5432/agentgraphology
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=mistral:7b-instruct
```

### 3. Start All Services

```bash
# From jbuilds root directory
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 4. Initialize Database

```bash
# Run database migrations
docker-compose exec api npm run db:init
```

### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **pgAdmin**: http://localhost:5050
  - Email: admin@agentgraphology.local
  - Password: admin

## Manual Setup (Without Docker)

### Backend Setup

```bash
cd apps/agentgraphology-backend

# Install dependencies
npm install

# Set up PostgreSQL
createdb agentgraphology
export DATABASE_URL="postgresql://postgres:password@localhost:5432/agentgraphology"

# Start Ollama (in separate terminal)
ollama serve
ollama pull mistral:7b-instruct

# Run migrations
npm run db:init

# Start development server
npm run dev
```

### Frontend Setup

```bash
# From jbuilds root
npm install

# Copy environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Then access http://localhost:3000

## Configuration

### Backend Environment Variables

```env
# Server
PORT=3001                                    # API port
NODE_ENV=development                         # development or production
LOG_LEVEL=debug                              # debug, info, warn, error

# GitHub API (optional - for rate limit increases)
GITHUB_TOKEN=ghp_xxxxx                       # GitHub personal access token

# Ollama (Local LLM)
OLLAMA_BASE_URL=http://localhost:11434       # Ollama service URL
OLLAMA_MODEL=mistral:7b-instruct             # Model to use

# Database
DATABASE_URL=postgresql://...                # Full connection string
DB_HOST=localhost                            # Database host
DB_PORT=5432                                 # Database port
DB_NAME=agentgraphology                      # Database name
DB_USER=postgres                             # Database user
DB_PASSWORD=password                         # Database password

# CORS
CORS_ORIGIN=http://localhost:3000            # Frontend origin
ALLOWED_ORIGINS=http://localhost:3000,...    # Comma-separated allowed origins
```

### Frontend Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Deployment

### Docker Compose (Production)

Edit `docker-compose.yml`:

1. Change PostgreSQL password in `postgres` service
2. Update `api` service environment variables
3. Add production domain to `CORS_ORIGIN`
4. Remove `pgAdmin` service or secure it

```bash
docker-compose -f docker-compose.yml up -d
```

### Kubernetes

1. Use Dockerfile from backend: `apps/agentgraphology-backend/Dockerfile`
2. Create ConfigMaps for environment variables
3. Create Secrets for sensitive data
4. Deploy PostgreSQL StatefulSet
5. Deploy Ollama as DaemonSet or StatefulSet
6. Deploy frontend and backend as Deployments

See `.kube/` directory for example manifests (coming soon).

### Cloud Platforms

**AWS**:
- RDS for PostgreSQL
- ECS/Fargate for containers
- S3 for evaluation storage
- Route 53 for DNS

**Google Cloud**:
- Cloud SQL for PostgreSQL
- Cloud Run for containers
- Cloud Storage for evaluations
- Cloud DNS for DNS

**Azure**:
- Azure Database for PostgreSQL
- Container Instances or App Service
- Blob Storage for evaluations
- Azure DNS

## Troubleshooting

### Ollama Won't Connect

```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# Check model is downloaded
ollama list

# Pull model if missing
ollama pull mistral:7b-instruct

# Check logs
docker-compose logs ollama
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check database exists
docker-compose exec postgres psql -U postgres -c "\l"

# Reset and reinitialize
docker-compose down -v
docker-compose up -d postgres
docker-compose exec api npm run db:init
```

### Frontend Can't Reach Backend

```bash
# Check backend is running
curl http://localhost:3001/api/health

# Update .env.local with correct API_URL
# For Docker network: http://api:3001/api
# For localhost: http://localhost:3001/api

# Check CORS settings in backend .env
CORS_ORIGIN=http://localhost:3000
```

### High Memory Usage

Ollama models consume significant RAM:
- mistral:7b-instruct: 4-8GB
- PostgreSQL: 256-512MB
- Node.js: 100-300MB
- Total: ~5-9GB

To reduce:
1. Use smaller Ollama model (neural-chat, phi)
2. Adjust Docker resource limits
3. Increase swap space
4. Add more RAM to host

### Slow Evaluation Responses

Ollama inference speed depends on:
- **CPU**: 1-2 tokens/sec on CPU, 50+ on GPU
- **Model size**: Smaller models are faster
- **System load**: Other processes impact speed

To improve:
1. Use GPU-accelerated Ollama (if available)
2. Switch to faster model (neural-chat instead of mistral)
3. Increase system resources
4. Close other applications

## Monitoring

### View Logs

```bash
# Backend
docker-compose logs -f api

# Frontend
docker-compose logs -f frontend

# Database
docker-compose logs -f postgres

# All services
docker-compose logs -f
```

### Database Analytics

```bash
# Connect to pgAdmin
# http://localhost:5050
# Create connection to postgres container

# Or use psql directly
docker-compose exec postgres psql -U postgres -d agentgraphology

# Check evaluation statistics
SELECT COUNT(*) as total_evaluations,
       ROUND(AVG(score_total), 2) as avg_score,
       MAX(score_total) as highest_score,
       MIN(score_total) as lowest_score
FROM evaluations;
```

### API Health

```bash
# Check all services
curl http://localhost:3001/api/health

# Should return:
{
  "status": "healthy",
  "ollama": { "connected": true },
  "database": { "connected": true }
}
```

## Development

### Local Changes

**Backend**:
```bash
cd apps/agentgraphology-backend
npm run dev       # Auto-reloads on file changes
```

**Frontend**:
```bash
npm run dev       # Auto-reloads on file changes
```

### Type Checking

```bash
# Backend
cd apps/agentgraphology-backend
npm run type-check

# Frontend
npm run type-check
```

### Running Tests

```bash
# Backend
cd apps/agentgraphology-backend
npm test

# Frontend
npm test
```

## Performance Tuning

### PostgreSQL

```sql
-- Optimize for SSD
ALTER SYSTEM SET random_page_cost = 1.1;

-- Increase shared buffers
ALTER SYSTEM SET shared_buffers = '2GB';

-- Increase effective cache size
ALTER SYSTEM SET effective_cache_size = '6GB';

-- Apply changes
SELECT pg_reload_conf();
```

### Ollama

```bash
# Use GPU if available (set in docker-compose.yml)
# Deploy:
#   resources:
#     reservations:
#       devices:
#         - driver: nvidia
#           count: 1
#           capabilities: [gpu]

# Increase token generation speed
# Run smaller models or use quantized versions
```

## Security Checklist

- [ ] Change default PostgreSQL password
- [ ] Set strong `SESSION_SECRET`
- [ ] Enable HTTPS in production
- [ ] Configure firewall rules
- [ ] Set `NODE_ENV=production`
- [ ] Remove debug logs in production
- [ ] Use environment variables for secrets (never commit .env files)
- [ ] Implement rate limiting (coming soon)
- [ ] Add API key authentication (coming soon)
- [ ] Enable database backups
- [ ] Configure log rotation
- [ ] Use CORS whitelist (not `*`)

## Backup & Recovery

### Backup Database

```bash
# Backup to file
docker-compose exec postgres pg_dump -U postgres agentgraphology > backup.sql

# Backup with Docker volume
docker cp agentgraphology-postgres:/var/lib/postgresql/data ./postgres_backup
```

### Restore Database

```bash
# From SQL file
docker-compose exec -T postgres psql -U postgres agentgraphology < backup.sql

# From Docker volume
docker cp ./postgres_backup agentgraphology-postgres:/var/lib/postgresql/data
```

## Next Steps

1. **Deploy to Production**: Use cloud platform guides above
2. **Add Authentication**: Implement API keys and user accounts
3. **Enhance Analytics**: Build dashboard for evaluation trends
4. **Add Webhooks**: Enable integrations with CI/CD systems
5. **Implement Caching**: Add Redis for performance
6. **Create CLI**: Build command-line interface
7. **Mobile App**: Build iOS/Android companion app

## Support

- GitHub Issues: [ypc-ux/jbuilds/issues](https://github.com/ypc-ux/jbuilds/issues)
- Documentation: [docs/INTEGRATION_PROTOCOL.md](./docs/INTEGRATION_PROTOCOL.md)
- Email: support@agentgraphology.com

## License

MIT - See LICENSE file
