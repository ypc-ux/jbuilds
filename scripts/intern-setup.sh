#!/bin/bash

# Intern Setup Script
# Automates: cloning repos, installing dependencies, setting up environment
# Usage: bash scripts/intern-setup.sh

set -e  # Exit on error

echo "🚀 YPC-UX Intern Setup Script"
echo "================================"
echo ""
echo "This script will:"
echo "  1. Create ~/repos/ypc-ux directory structure"
echo "  2. Clone all 16 repos"
echo "  3. Install dependencies"
echo "  4. Set up .env files"
echo "  5. Verify everything works"
echo ""
echo "Estimated time: 30-45 minutes"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Exiting..."
    exit 1
fi

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Step 1: Create directory structure
info "Step 1: Creating directory structure..."
mkdir -p ~/repos/ypc-ux
cd ~/repos/ypc-ux
success "Created ~/repos/ypc-ux"

# Step 2: Clone all public repos
info "Step 2: Cloning public repositories..."

PUBLIC_REPOS=(
    "jbuilds"
    "business-integration-protocol"
    "agent-charisma"
    "agent-ad-spend"
    "switchboard"
    "slyderz"
    "agentic-priming-template"
    "humanizer-influence"
    "ypc-ux"
    "storyscope"
    "smooth-operator"
    "maestro"
)

for repo in "${PUBLIC_REPOS[@]}"; do
    if [ -d "$repo" ]; then
        success "Already cloned: $repo"
    else
        info "Cloning: $repo..."
        git clone "git@github.com:ypc-ux/$repo.git" "$repo" 2>/dev/null || {
            error "Failed to clone $repo. Check your GitHub access and SSH key."
        }
        success "Cloned: $repo"
    fi
done

# Step 3: Clone private repos
info "Step 3: Cloning private repositories..."

PRIVATE_REPOS=(
    "ascent-placements-marketing"
    "ascent-ascent"
    "lever-site"
    "brand-vault"
)

for repo in "${PRIVATE_REPOS[@]}"; do
    if [ -d "$repo" ]; then
        success "Already cloned: $repo"
    else
        info "Cloning: $repo..."
        git clone "git@github.com:ypc-ux/$repo.git" "$repo" 2>/dev/null || {
            error "Failed to clone $repo. Check if you have access to private repos."
        }
        success "Cloned: $repo"
    fi
done

echo ""
success "All 16 repos cloned successfully!"

# Step 4: Set up jbuilds environment
info "Step 4: Setting up jbuilds environment..."

cd ~/repos/ypc-ux/jbuilds

# Frontend environment
if [ ! -f ".env.local" ]; then
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        success "Created .env.local (frontend)"
    else
        info "No .env.local.example found, skipping..."
    fi
fi

# Backend environment
if [ ! -f "apps/agentgraphology-backend/.env" ]; then
    if [ -f "apps/agentgraphology-backend/.env.example" ]; then
        cp "apps/agentgraphology-backend/.env.example" "apps/agentgraphology-backend/.env"
        success "Created .env (backend)"

        # Update DATABASE_URL for local PostgreSQL
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' 's|DATABASE_URL=.*|DATABASE_URL=postgresql://postgres:password@localhost:5432/agentgraphology|' "apps/agentgraphology-backend/.env"
        else
            # Linux
            sed -i 's|DATABASE_URL=.*|DATABASE_URL=postgresql://postgres:password@localhost:5432/agentgraphology|' "apps/agentgraphology-backend/.env"
        fi
    else
        info "No .env.example found in backend, skipping..."
    fi
fi

# Step 5: Install dependencies
info "Step 5: Installing dependencies..."
info "This may take 5-10 minutes..."

# Frontend dependencies
info "Installing frontend dependencies..."
npm install --silent 2>/dev/null || error "Failed to install frontend dependencies"
success "Frontend dependencies installed"

# Backend dependencies
info "Installing backend dependencies..."
cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend
npm install --silent 2>/dev/null || error "Failed to install backend dependencies"
success "Backend dependencies installed"

cd ~/repos/ypc-ux/jbuilds

# Step 6: Check for Docker
info "Step 6: Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker not found. You can still develop, but will need to:"
    echo "  1. Install Docker: https://docker.com"
    echo "  2. Start PostgreSQL: docker-compose up -d postgres"
    echo "  3. Run database init: npm run db:init${NC}"
    read -p "Continue without Docker? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        error "Please install Docker and try again"
    fi
else
    success "Docker found"

    # Start PostgreSQL
    info "Step 7: Starting PostgreSQL..."
    docker-compose up -d postgres 2>/dev/null || error "Failed to start PostgreSQL"

    # Wait for database to be ready
    info "Waiting for database to start..."
    sleep 5

    # Create database
    info "Creating agentgraphology database..."
    docker-compose exec -T postgres psql -U postgres -c "CREATE DATABASE agentgraphology;" 2>/dev/null || {
        info "Database might already exist (that's ok)"
    }
    success "PostgreSQL ready"
fi

# Step 8: Verification
echo ""
info "Step 8: Verification..."
echo ""

# Check Node.js
info "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js $NODE_VERSION"
else
    error "Node.js not found"
fi

# Check npm
info "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    success "npm $NPM_VERSION"
else
    error "npm not found"
fi

# Check git
info "Checking git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    success "git $(echo $GIT_VERSION | cut -d' ' -f3)"
else
    error "git not found"
fi

# Check SSH key
info "Checking SSH key..."
if [ -f ~/.ssh/id_ed25519 ]; then
    success "SSH key found"
else
    echo -e "${YELLOW}⚠ SSH key not found${NC}"
    echo "  Generate with: ssh-keygen -t ed25519"
fi

echo ""
echo "================================"
success "Setup complete! ✨"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Read the onboarding documentation:"
echo "   - docs/INTERN_ONBOARDING.md (overview)"
echo "   - docs/INTERN_SETUP.md (detailed setup)"
echo "   - docs/INTERN_ARCHITECTURE.md (how it works)"
echo ""
echo "2. Start development servers (in separate terminals):"
echo "   Terminal 1 (Backend):"
echo "     cd ~/repos/ypc-ux/jbuilds/apps/agentgraphology-backend"
echo "     npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "     cd ~/repos/ypc-ux/jbuilds"
echo "     npm run dev"
echo ""
echo "3. Verify services are running:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend: http://localhost:3001/api/health"
echo ""
echo "4. Follow the 30-Day Plan:"
echo "   docs/INTERN_30_DAY_PLAN.md"
echo ""
echo "5. Reference quick commands:"
echo "   docs/INTERN_QUICK_REFERENCE.md"
echo ""
echo "Questions? Check:"
echo "   - docs/INTERN_ARCHITECTURE.md"
echo "   - docs/INTERN_QUICK_REFERENCE.md"
echo "   - Or ask your team lead 👋"
echo ""
