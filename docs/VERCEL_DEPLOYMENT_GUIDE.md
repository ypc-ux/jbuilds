# Vercel Deployment Guide

Quick start for deploying ypc-ux projects to Vercel.

## Prerequisites

1. **GitHub Account** - Already connected to ypc-ux org ✅
2. **Vercel Account** - Sign up at https://vercel.com
3. **Admin access** - Ability to connect repositories

## One-Click Deployment

### For jbuilds (AgentGraphology Frontend)

**Step 1: Go to Vercel**
```
https://vercel.com/new
```

**Step 2: Select Repository**
- Import project from GitHub
- Search for: `ypc-ux/jbuilds`
- Click "Import"

**Step 3: Configure Project**
```
Project Name: jbuilds (or agentgraphology)
Framework: Next.js
Root Directory: ./ (default)
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Step 4: Environment Variables**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
(Note: Change to your backend URL in production)

**Step 5: Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- Get your live URL

---

## Manual CLI Deployment

If you prefer command-line deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from jbuilds directory
cd /home/user/jbuilds
vercel

# Follow prompts:
# - Link to existing project? No (first time)
# - Project name? jbuilds
# - Deploy to production? Yes
```

---

## Deploying All Vercel-Ready Apps

### Priority 1: Frontend-Only Apps (Fastest)
These take 2 minutes each:

1. **jbuilds** - Main frontend
   ```
   https://vercel.com/new/git/external?repository-url=https://github.com/ypc-ux/jbuilds
   ```

2. **slyderz** - Animation portfolio
   ```
   https://vercel.com/new/git/external?repository-url=https://github.com/ypc-ux/slyderz
   ```

3. **agent-ad-spend** - Dashboard
   ```
   https://vercel.com/new/git/external?repository-url=https://github.com/ypc-ux/agent-ad-spend
   ```

### Priority 2: Full-Stack Apps (With Databases)
These need database configuration:

4. **switchboard** - Call center platform
   - Deploy to Vercel
   - Set up Supabase: https://supabase.com/dashboard
   - Add `DATABASE_URL` environment variable
   - Configure Twilio/Vapi webhooks

5. **lever-site** - SaaS platform
   - Deploy to Vercel
   - Set up Supabase
   - Configure Stripe webhooks
   - Add weekly cron job

6. **brand-vault** - Asset management
   - Deploy to Vercel
   - Configure Vercel Postgres
   - Set up Claude API key

---

## Environment Variables Setup

### For jbuilds (No Database)
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

### For Full-Stack Apps
```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname
VERCEL_POSTGRES_URL=...

# External APIs
NEXT_PUBLIC_STRIPE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
ANTHROPIC_API_KEY=sk-ant-...

# OAuth/Auth
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

**To add environment variables in Vercel:**
1. Go to Project Settings
2. Click "Environment Variables"
3. Add key-value pairs
4. Redeploy to apply changes

---

## Post-Deployment Checklist

### For All Apps
- [ ] Verify deployment succeeded (check deployment log)
- [ ] Test homepage loads (click "Visit")
- [ ] Check console for errors (F12 → Console)
- [ ] Verify performance (Vercel Analytics)
- [ ] Set up custom domain (Settings → Domains)
- [ ] Enable HTTPS (automatic)

### For Full-Stack Apps
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Webhooks configured
- [ ] Email notifications working (if applicable)
- [ ] Set up monitoring/alerts

---

## Custom Domain Setup

1. **Go to Project Settings** → Domains
2. **Add Domain**
   - Enter your domain (e.g., agentgraphology.com)
   - Choose DNS provider
3. **Configure DNS**
   - For Vercel nameservers: Point domain to Vercel (easiest)
   - For external DNS: Add CNAME record
4. **Verify** - Wait 5-30 minutes for propagation

---

## Monitoring & Analytics

### Vercel Analytics (Free Tier)
- Go to Analytics tab
- View page load times
- Monitor Core Web Vitals
- Track deployment performance

### Custom Monitoring
- Add Sentry for error tracking
- Add LogRocket for session replay
- Configure uptime monitoring (UptimeRobot)

---

## Troubleshooting

### Build Fails
```bash
# Check build logs
vercel logs [project-name]

# Test locally first
npm run build
npm run dev
```

### Environment Variables Not Working
- Variables starting with `NEXT_PUBLIC_` are exposed to browser
- Secret variables should not have this prefix
- Redeploy after adding/changing variables

### Cold Starts
- Normal for serverless functions
- First request takes 2-5 seconds
- Subsequent requests <100ms
- Use Vercel Pro to keep warm

### Database Connection Issues
- Verify DATABASE_URL format
- Check firewall rules (if self-hosted)
- Test connection locally first
- Use connection pooling for Supabase

---

## Cost

### Vercel Pricing
- **Hobby (Free):** 1 deployment/day, 100GB bandwidth
- **Pro ($20/month):** Unlimited deployments, 1TB bandwidth
- **Enterprise:** Custom pricing

### Database Costs
- **Supabase Free:** Good for testing, limited storage
- **Supabase Pro:** $25/month per project
- **Vercel Postgres:** Pay-per-use ($0.10-2/day typical)

### Total Estimate
- 6 Next.js apps: Free tier for most, Pro for critical ($20/month)
- 2 Supabase databases: $50/month
- **Total: $70-100/month** for full-stack apps

---

## Deployment History

### Tracking Deployments
```bash
# List all deployments
vercel ls

# Rollback to previous version
vercel rollback

# View deployment logs
vercel logs [deployment-url]
```

### Auto-Deployments
Vercel automatically deploys when you:
- Push to main branch
- Create pull requests (preview deployments)
- Merge pull requests

---

## Next Steps

1. ✅ Create Vercel account (if needed)
2. ✅ Connect GitHub organization
3. ✅ Deploy jbuilds (2 minutes)
4. ✅ Test production deployment
5. ✅ Deploy remaining Vercel apps (12 minutes)
6. ✅ Set up databases for full-stack apps
7. ✅ Configure custom domains
8. ✅ Set up monitoring

**Total setup time:** ~30-60 minutes for all 6 Vercel apps

---

## Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Import Git Repository:** https://vercel.com/new
- **Environment Variables:** [Your Project] → Settings → Environment Variables
- **Domains:** [Your Project] → Settings → Domains
- **Analytics:** [Your Project] → Analytics
- **Deployment History:** [Your Project] → Deployments

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Troubleshooting:** https://vercel.com/help
- **Community:** https://github.com/vercel/next.js/discussions

