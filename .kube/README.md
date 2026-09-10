# Kubernetes Deployment Manifests

This directory contains Kubernetes manifests for deploying AgentGraphology on a production cluster.

## Files Overview

| File | Purpose | Component |
|------|---------|-----------|
| `namespace.yaml` | Create isolated namespace for AgentGraphology | Cluster setup |
| `secrets.yaml` | Store sensitive credentials (database, tokens) | Configuration |
| `postgres-statefulset.yaml` | PostgreSQL database with persistent storage | Data layer |
| `ollama-deployment.yaml` | Ollama LLM service for AI inference | ML layer |
| `backend-deployment.yaml` | Express.js backend API (2 replicas) | API layer |
| `ingress.yaml` | Network ingress and security policies | Networking |

## Prerequisites

- Kubernetes 1.24+
- `kubectl` configured to access your cluster
- Persistent volume provisioner (for PostgreSQL)
- Ingress controller (nginx-ingress recommended)
- (Optional) cert-manager for TLS/Let's Encrypt

## Deployment Steps

### 1. Create Namespace
```bash
kubectl apply -f .kube/namespace.yaml
```

### 2. Configure Secrets
Edit `.kube/secrets.yaml` and replace placeholder values:
- `postgres-password`: Your PostgreSQL password
- `github-token`: Your GitHub personal access token (optional)

```bash
kubectl apply -f .kube/secrets.yaml
```

### 3. Deploy Database
```bash
kubectl apply -f .kube/postgres-statefulset.yaml
```

Verify PostgreSQL is running:
```bash
kubectl get statefulset -n agentgraphology
kubectl logs -n agentgraphology postgres-0
```

### 4. Initialize Database Schema
Once PostgreSQL is ready, initialize the schema:
```bash
kubectl run -it --rm db-init \
  --image=agentgraphology-api:latest \
  --env="DATABASE_URL=postgresql://postgres:PASSWORD@postgres:5432/agentgraphology" \
  -n agentgraphology \
  -- npm run db:init
```

### 5. Deploy LLM Service
```bash
kubectl apply -f .kube/ollama-deployment.yaml
```

Wait for Ollama to be ready (model download takes 5-10 minutes):
```bash
kubectl get deployment -n agentgraphology
kubectl logs -n agentgraphology -l app=agentgraphology,component=llm --tail=50
```

### 6. Deploy Backend API
```bash
kubectl apply -f .kube/backend-deployment.yaml
```

Verify API is running:
```bash
kubectl get pods -n agentgraphology
kubectl logs -n agentgraphology -l app=agentgraphology,component=api
```

### 7. Configure Ingress
Edit `ingress.yaml` and update:
- Hostname: Replace `api.agentgraphology.com` with your domain
- Issuer: Replace `letsencrypt-prod` with your cert-manager issuer

```bash
kubectl apply -f .kube/ingress.yaml
```

## Verification

### Check all components are running
```bash
kubectl get all -n agentgraphology
```

### Test API health
```bash
kubectl port-forward -n agentgraphology svc/agentgraphology-api 3001:3001 &
curl http://localhost:3001/api/health
```

### Check logs
```bash
# API logs
kubectl logs -n agentgraphology -l component=api --tail=100

# Database logs
kubectl logs -n agentgraphology postgres-0 --tail=100

# LLM logs
kubectl logs -n agentgraphology -l component=llm --tail=100
```

## Scaling

### Scale API replicas
```bash
kubectl scale deployment/agentgraphology-api --replicas=5 -n agentgraphology
```

### View autoscaling status
```bash
kubectl get hpa -n agentgraphology
```

## Database Operations

### Connect to database
```bash
kubectl run -it --rm psql \
  --image=postgres:16-alpine \
  --env="PGPASSWORD=your-password" \
  -n agentgraphology \
  -- psql -h postgres -U postgres -d agentgraphology
```

### Backup database
```bash
kubectl exec -n agentgraphology postgres-0 -- \
  pg_dump -U postgres agentgraphology | gzip > backup.sql.gz
```

### Restore database
```bash
gunzip < backup.sql.gz | \
  kubectl exec -i -n agentgraphology postgres-0 -- \
  psql -U postgres agentgraphology
```

## Troubleshooting

### Pod won't start
```bash
kubectl describe pod -n agentgraphology <pod-name>
kubectl logs -n agentgraphology <pod-name>
```

### Database connection errors
```bash
# Test database connectivity
kubectl run -it --rm test \
  --image=postgres:16-alpine \
  -n agentgraphology \
  -- psql -h postgres -U postgres -c "SELECT 1"
```

### Ollama model failed to download
```bash
# Re-run the model pull
kubectl delete deployment ollama -n agentgraphology
kubectl apply -f .kube/ollama-deployment.yaml

# Check logs
kubectl logs -n agentgraphology -l component=llm --tail=50
```

### API can't reach Ollama
```bash
# Test connectivity
kubectl exec -n agentgraphology <api-pod> -- \
  curl http://ollama-service:11434/api/tags
```

## Monitoring & Observability

### View resource usage
```bash
kubectl top pods -n agentgraphology
kubectl top nodes
```

### Set up alerts (example with Prometheus)
- Database connections exceed 20
- API error rate > 5%
- Ollama response time > 10s
- Disk space < 10%

## Cleanup

### Remove all resources
```bash
kubectl delete namespace agentgraphology
```

### Remove specific component
```bash
kubectl delete deployment agentgraphology-api -n agentgraphology
kubectl delete statefulset postgres -n agentgraphology
```

## Security Checklist

- [ ] Update `postgres-password` in `secrets.yaml`
- [ ] Update hostname in `ingress.yaml`
- [ ] Configure ingress authentication (if needed)
- [ ] Set up network policies (included in `ingress.yaml`)
- [ ] Enable RBAC for service accounts
- [ ] Use private container registry for images
- [ ] Enable audit logging
- [ ] Set resource quotas per namespace
- [ ] Rotate secrets regularly
- [ ] Use cert-manager for automatic TLS renewal

## Production Considerations

1. **High Availability**
   - Run 3+ replicas of backend API
   - Use PostgreSQL replication for HA
   - Consider Ollama caching layer

2. **Disaster Recovery**
   - Automate database backups
   - Test restore procedures
   - Document recovery runbook

3. **Performance**
   - Configure HPA for auto-scaling
   - Set resource requests/limits
   - Monitor query performance

4. **Cost Optimization**
   - Use spot instances for non-critical workloads
   - Right-size resource requests
   - Implement pod disruption budgets

## Support

For issues, see:
- Main docs: `/docs/`
- Architecture: `/docs/ARCHITECTURE.md`
- Setup guide: `/docs/SETUP.md`
- Deployment guide: `/docs/DEPLOYMENT_GUIDE.md`
