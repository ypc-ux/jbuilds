# Deployment Guide & Infrastructure

This guide covers deployment strategies for AgentGraphology across multiple platforms, including alternatives to Vercel.

## Quick Start

### Local Development
```bash
docker-compose up -d
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001/api
# pgAdmin: http://localhost:5050
```

### Production Deployment Options

## Option 1: Railway (Recommended for Full-Stack)

**Best for:** Next.js + Express + PostgreSQL applications

### Setup

1. **Create Railway Account**
   - Sign up at https://railway.app
   - Create new project

2. **Connect GitHub Repository**
   - Link your ypc-ux/jbuilds repo
   - Railway auto-detects Next.js and Express

3. **Configure Services**
   ```yaml
   # Frontend (Next.js)
   - Root directory: ./
   - Build command: npm run build
   - Start command: npm start
   - Port: 3000

   # Backend (Express)
   - Root directory: ./apps/agentgraphology-backend
   - Build command: npm run build
   - Start command: npm start
   - Port: 3001

   # PostgreSQL
   - Railway provides managed PostgreSQL
   - Auto-creates DATABASE_URL env variable
   ```

4. **Environment Variables**
   ```
   Frontend:
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api

   Backend:
   NODE_ENV=production
   PORT=3001
   OLLAMA_BASE_URL=http://ollama-service:11434
   ```

5. **Ollama Service**
   - Option A: Run on separate Railway environment with GPU
   - Option B: Use external Ollama API
   - Option C: Run locally and expose via tunnel

**Cost:** ~$5-15/month (free tier available for testing)

---

## Option 2: Render

**Best for:** Simple full-stack apps with PostgreSQL

### Setup

1. **Create Render Account**
   - Sign up at https://render.com
   - Create Web Service

2. **Connect Repository**
   - Select ypc-ux/jbuilds
   - Choose "Node"

3. **Configure Build & Start**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add PostgreSQL Database**
   - Render > Dashboard > New > PostgreSQL
   - Render auto-creates DATABASE_URL

5. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   OLLAMA_BASE_URL=http://ollama-external-service
   NODE_ENV=production
   ```

**Cost:** ~$10-20/month (includes PostgreSQL)

---

## Option 3: Fly.io

**Best for:** Container-based full-stack deployments

### Setup

1. **Install Fly CLI**
   ```bash
   brew install flyctl
   flyctl auth login
   ```

2. **Initialize App**
   ```bash
   flyctl launch --name agentgraphology
   # Answer prompts for regions, databases, etc.
   ```

3. **Configure fly.toml**
   ```toml
   app = "agentgraphology"
   
   [build]
   builder = "dockerfile"
   
   [env]
   NEXT_PUBLIC_API_URL = "https://agentgraphology.fly.dev/api"
   NODE_ENV = "production"

   [[services]]
   protocol = "tcp"
   internal_port = 3000
   ports = [{handlers = ["http"], port = 80}]
   ```

4. **Deploy**
   ```bash
   flyctl deploy
   ```

**Cost:** ~$5-15/month (includes PostgreSQL)

---

## Option 4: AWS (Enterprise)

**Best for:** Large-scale production with custom infrastructure

### Setup

1. **ECS (Container Orchestration)**
   ```bash
   # Create ECR repositories
   aws ecr create-repository --repository-name agentgraphology-frontend
   aws ecr create-repository --repository-name agentgraphology-backend

   # Build & push images
   docker build -f Dockerfile.frontend -t agentgraphology-frontend:latest .
   docker tag agentgraphology-frontend:latest [ACCOUNT].dkr.ecr.[REGION].amazonaws.com/agentgraphology-frontend:latest
   docker push [ACCOUNT].dkr.ecr.[REGION].amazonaws.com/agentgraphology-frontend:latest
   ```

2. **RDS (PostgreSQL)**
   - Create RDS PostgreSQL 15+
   - Configure security groups to allow ECS access

3. **ALB (Load Balancer)**
   - Create Application Load Balancer
   - Route /api/* to backend service
   - Route /* to frontend service

4. **Cost:** $50-200+/month

---

## Option 5: Google Cloud (Enterprise)

**Best for:** Serverless and container deployments

### Cloud Run Setup

1. **Deploy Frontend**
   ```bash
   gcloud run deploy agentgraphology-frontend \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

2. **Deploy Backend**
   ```bash
   gcloud run deploy agentgraphology-backend \
     --source ./apps/agentgraphology-backend \
     --platform managed \
     --region us-central1
   ```

3. **Cloud SQL (PostgreSQL)**
   - Create Cloud SQL PostgreSQL instance
   - Backend connects via Cloud SQL Proxy

**Cost:** $10-50/month (pay-per-use model)

---

## Option 6: Self-Hosted (Your Infrastructure)

**Best for:** Complete control, existing servers

### Docker Compose on Your Server

```bash
# On your Ubuntu/Debian server
git clone https://github.com/ypc-ux/jbuilds.git
cd jbuilds

# Setup environment
cp .env.local.example .env.local
cp apps/agentgraphology-backend/.env.example apps/agentgraphology-backend/.env

# Start with Nginx reverse proxy
docker-compose up -d

# Access via http://your-server-ip:3000
```

**Cost:** Your server costs only (as low as $5-50/month for basic VPS)

---

## Comparison Table

| Platform | Type | Cost | Setup Time | PostgreSQL | Best For |
|----------|------|------|-----------|-----------|----------|
| Railway | Managed | $5-15 | 5 min | ✓ | Quick full-stack |
| Render | Managed | $10-20 | 5 min | ✓ | Simple apps |
| Fly.io | Container | $5-15 | 10 min | ✓ | Container control |
| AWS | Enterprise | $50+ | 1 hour | ✓ | Large scale |
| Google Cloud | Serverless | $10-50 | 30 min | ✓ | Scalability |
| Self-Hosted | DIY | $5-50 | Varies | ✓ | Full control |

## Recommendation

**For your team:** Start with **Railway** or **Render**
- ✅ Easy GitHub integration
- ✅ Automatic deploys on push
- ✅ Included PostgreSQL & backups
- ✅ $0-20/month
- ✅ Production-ready

---

## Branch Naming Convention

For professional sharing and deployment automation, use this naming convention:

```
main                    - Production-ready code
staging                 - Pre-production testing
develop                 - Active development

feature/[name]          - New features
fix/[name]              - Bug fixes
docs/[name]             - Documentation
infra/[name]            - Infrastructure changes
release/[version]       - Release branches (e.g., release/1.0.0)
```

### Current Branch Status

Your current branch `claude/business-integration-protocol-q9kv6s` should be renamed to follow the convention. Once merged to main:

```bash
# After merge to main
git branch -D claude/business-integration-protocol-q9kv6s
git push origin --delete claude/business-integration-protocol-q9kv6s

# For future work
git checkout -b feature/next-feature
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Monitoring & Logging

### Application Monitoring

- **Frontend**: Vercel Analytics (free tier)
- **Backend**: Pino logging + Application Insights
- **Database**: PostgreSQL slow query logs

### Uptime Monitoring

```bash
# Use free services
- Uptime Robot (uptime.com)
- StatusPage.io (status monitoring)
- Sentry (error tracking)
```

---

## Next Steps

1. **Choose a deployment platform** (Railway recommended)
2. **Set up CI/CD** with GitHub Actions
3. **Configure custom domain** (yourdomain.com)
4. **Enable HTTPS** (automatic on most platforms)
5. **Set up monitoring** and alerts
6. **Document deployment runbook** for your team

---

## Support

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Fly.io Docs: https://fly.io/docs
- AWS ECS: https://docs.aws.amazon.com/ecs/

---

## Troubleshooting

### Application won't start
- Check environment variables are set
- Verify DATABASE_URL is correct
- Check logs: `railway logs` or `render logs`

### Database connection issues
- Verify POSTGRES_PASSWORD in backend
- Check security groups/firewall rules
- Test connection locally first

### High memory usage
- Reduce Ollama model size
- Use CPU-only Ollama instance
- Scale up container resources

