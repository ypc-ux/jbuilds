# Intern Access Checklist

**Purpose:** Ensure you have all necessary access to repos, platforms, and services before starting work.

**Timeline:** Complete this BEFORE starting Week 1  
**Owner:** Your team lead  
**Status:** [ ] Complete

---

## GitHub Access

### GitHub Account Setup
- [ ] GitHub account created
- [ ] Account linked to YPC-UX organization (ypc-ux)
- [ ] You can see all 16 repos when logged in

**Verification:**
```bash
# Verify you can access repos
ssh -T git@github.com
# Should show: "Hi [username]! You've successfully authenticated..."

# Verify you can clone private repos
git clone git@github.com:ypc-ux/ascent-placements-marketing.git /tmp/test-clone
rm -rf /tmp/test-clone
# Should complete without permission errors
```

### GitHub Permissions Needed
- [ ] **Read access** to all 16 repos (public + private)
- [ ] **Write access** to all repos (to create branches, commit, push)
- [ ] **PR/Review access** (to create and review pull requests)
- [ ] **Admin access** to repos (NO—unnecessary for intern)

**How to request:**
Contact organization admin at ypc-ux to add you as a contributor to:
- All public repos
- All private repos (ascent-placements-marketing, ascent-ascent, lever-site, brand-vault, etc.)

---

## Vercel (Frontend Deployment)

### Vercel Team Setup
- [ ] Vercel account created
- [ ] Added to YPC-UX Vercel team
- [ ] Can see all projects in team dashboard

**Access at:** https://vercel.com/ypc-ux

**Verification:**
```bash
# Verify Vercel CLI auth
vercel whoami
# Should show your username and team

# Verify you can access projects
vercel projects list
# Should show all team projects
```

### Vercel Permissions Needed
- [ ] View projects
- [ ] View deployments
- [ ] Trigger deployments (on branches)
- [ ] Trigger production deployments (NO—requires approval first)

**How to request:**
Ask team lead to add you to Vercel team with "Member" role.

**Vercel Projects to Watch:**
- jbuilds (frontend + backend)
- ascent-placements-marketing
- agent-ad-spend
- switchboard
- slyderz
- brand-vault
- lever-site

---

## Supabase (Database Hosting)

### Supabase Project Access (If Applicable)
- [ ] Supabase account created
- [ ] Invited to organization projects
- [ ] Can see project in dashboard

**Access at:** https://app.supabase.com

**Note:** Some projects use local PostgreSQL for dev, Supabase for production. Check with team.

### Supabase Permissions Needed
- [ ] View database schema
- [ ] Run queries (read-only for dev exploration)
- [ ] View logs
- [ ] Admin access (NO—requires senior approval)

**How to request:**
Ask team lead for Supabase project invitation.

---

## AWS/Infrastructure (If Applicable)

### AWS Console Access
- [ ] AWS account created (if using AWS services)
- [ ] Added to organization account
- [ ] Can access services dashboard

**Verification:**
```bash
# Verify AWS CLI auth
aws sts get-caller-identity
# Should show your user/role
```

### AWS Permissions Needed
- [ ] View EC2 instances (read-only)
- [ ] View RDS databases (read-only)
- [ ] View S3 buckets (read-only)
- [ ] CloudWatch logs (read-only)
- [ ] Create resources (NO—requires senior approval)

**How to request:**
Ask DevOps team lead for AWS IAM role with read-only permissions.

---

## API Keys & Secrets

### GitHub Token (Optional but Recommended)
- [ ] GitHub personal access token created
- [ ] Token has `repo` and `read:org` scopes
- [ ] Token saved locally in `.env` file

**Create token:**
1. Go to https://github.com/settings/tokens/new
2. Select scopes: `repo`, `read:org`
3. Copy token
4. Add to `.env` in jbuilds: `GITHUB_TOKEN=[your-token]`

**Why:** Allows more API calls when analyzing repos, optional for basic development.

### Ollama (Local)
- [ ] Ollama installed locally (no token needed)
- [ ] Model pulled: `ollama pull mistral:7b-instruct`
- [ ] Can start Ollama: `ollama serve`

**Verification:**
```bash
# Test Ollama connection
curl http://localhost:11434/api/tags
# Should return list of models
```

### Stripe Keys (If Working on Payment Features)
- [ ] Ask team lead for Stripe test keys
- [ ] Keys saved in `.env` file
- [ ] Never commit keys to Git

**How to request:**
Ask team lead for Stripe test mode keys (not production).

---

## Communication Channels

### Slack Channels to Join
- [ ] #general - Team updates
- [ ] #engineering - Dev discussions
- [ ] #ypc-ux - Organization channel
- [ ] #interns - Intern onboarding & support
- [ ] #deployments - Deployment notifications
- [ ] #bugs - Bug reports
- [ ] #feature-requests - Feature discussion

**How to join:**
Ask team lead or Slack admin to invite you to channels.

### Communication Expectations
- [ ] Slack: For quick questions (expect response in 1-2 hours)
- [ ] GitHub Issues: For bugs and features (tracked in sprints)
- [ ] GitHub PR Comments: For code review feedback
- [ ] Daily Standup: Time and frequency TBD with team
- [ ] Weekly Sync: One-on-one with team lead

---

## Local Machine Setup

### Required Tools Installed
- [ ] Node.js 20+ (`node --version`)
- [ ] npm 10+ (`npm --version`)
- [ ] Git 2.30+ (`git --version`)
- [ ] Python 3.8+ (`python --version`)
- [ ] Docker (optional but recommended)

**Verification:**
```bash
node --version      # v20.x or higher
npm --version       # 10.x or higher
git --version       # 2.30+
python3 --version   # 3.8+
docker --version    # (optional)
```

### SSH Key Setup
- [ ] SSH key generated: `ssh-keygen -t ed25519`
- [ ] Public key added to GitHub: https://github.com/settings/keys
- [ ] SSH agent running: `eval "$(ssh-agent -s)"`
- [ ] Key added to agent: `ssh-add ~/.ssh/id_ed25519`

**Verification:**
```bash
ssh -T git@github.com
# Should authenticate without password
```

### Git Configuration
- [ ] Git user name set: `git config --global user.name "Your Name"`
- [ ] Git user email set: `git config --global user.email "your@email.com"`

**Verification:**
```bash
git config --global user.name      # Should show your name
git config --global user.email     # Should show your email
```

---

## Repository Access Summary

| Repository | Public? | Access Needed | Status |
|------------|---------|---------------|--------|
| jbuilds | ✅ | Read + Write | [ ] |
| business-integration-protocol | ✅ | Read + Write | [ ] |
| agent-charisma | ✅ | Read + Write | [ ] |
| agent-ad-spend | ✅ | Read + Write | [ ] |
| switchboard | ✅ | Read + Write | [ ] |
| slyderz | ✅ | Read + Write | [ ] |
| agentic-priming-template | ✅ | Read + Write | [ ] |
| humanizer-influence | ✅ | Read + Write | [ ] |
| ypc-ux | ✅ | Read + Write | [ ] |
| storyscope | ✅ | Read + Write | [ ] |
| smooth-operator | ✅ | Read + Write | [ ] |
| maestro | ✅ | Read + Write | [ ] |
| ascent-placements-marketing | 🔒 | Read + Write | [ ] |
| ascent-ascent | 🔒 | Read + Write | [ ] |
| lever-site | 🔒 | Read + Write | [ ] |
| brand-vault | 🔒 | Read + Write | [ ] |

---

## Verification Checklist

Run through these to confirm all access is working:

### GitHub
```bash
# [ ] Can clone repos
git clone git@github.com:ypc-ux/jbuilds.git test-clone && rm -rf test-clone

# [ ] Can see all repos
gh repo list ypc-ux
```

### Vercel
```bash
# [ ] Vercel CLI is installed
vercel --version

# [ ] Logged into Vercel
vercel whoami

# [ ] Can list projects
vercel projects list
```

### Supabase (if used)
```bash
# [ ] Can access dashboard
# Visit https://app.supabase.com and verify you see projects
```

### Local Machine
```bash
# [ ] All tools installed and correct versions
node --version && npm --version && git --version && python3 --version

# [ ] SSH key configured
ssh -T git@github.com

# [ ] Git configured
git config --global user.name && git config --global user.email
```

### Network
```bash
# [ ] Can reach GitHub
curl -I https://github.com

# [ ] Can reach Vercel
curl -I https://vercel.com

# [ ] Can reach Supabase (if used)
curl -I https://app.supabase.com
```

---

## Access Request Template

If anything is missing, use this template to request access:

```
To: [Team Lead Name]
Subject: Access Request - Intern Onboarding

Hi [Name],

I'm missing the following access for intern onboarding:

- [ ] GitHub private repo access (ascent-placements-marketing, etc.)
- [ ] Vercel team membership
- [ ] Supabase project access
- [ ] AWS IAM role
- [ ] Slack channel: #[channel-name]
- [ ] GitHub token for API access
- [ ] [Other permissions]

Can you help set these up? I'll continue with setup while waiting.

Thanks!
[Your Name]
```

---

## Support

**Can't get access?**
1. Check with your team lead
2. Verify GitHub account is confirmed
3. Check spam folder for invitation emails
4. Ask in #interns Slack channel

**Something broke?**
1. Check the service status pages:
   - GitHub: https://www.githubstatus.com/
   - Vercel: https://vercel.statuspage.io/
   - Supabase: https://supabase.com/status
2. Try logging out and back in
3. Ask team for help

---

## Sign-Off

Once all items are checked, you're ready to start Week 1 of the 30-Day Plan.

**Completed on:** ________  
**By:** ________________  
**Verified by:** ________________

---

**Next:** Start Week 1 of docs/INTERN_30_DAY_PLAN.md 🚀
