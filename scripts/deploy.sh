#!/bin/bash
set -e

echo "🚀 Starting Deployment for Human Hand Clearance..."

# 1. GitHub Repo - ALREADY DONE manually by Agent
echo "✓ GitHub Repository configured."

# 2. Vercel Deployment
echo ""
echo "▲ Step 2: Vercel Deployment"

# Find node
NODE_BIN=$(which node)
if [ -z "$NODE_BIN" ]; then
    echo "⚠️  Node not found in PATH. Assuming /usr/local/bin/node or checking standard paths..."
    if [ -f "/usr/local/bin/node" ]; then
        NODE_BIN="/usr/local/bin/node"
    elif [ -f "$HOME/.nvm/versions/node/$(node -v)/bin/node" ]; then
        # Last ditch effort for NVM
        NODE_BIN="node" 
    else
        NODE_BIN="node"
    fi
fi

# Use local Vercel CLI
VERCEL_JS="./node_modules/vercel/dist/index.js"

if [ ! -f "$VERCEL_JS" ]; then
    echo "❌ Vercel package not found. Installing..."
    npm install -D vercel
fi

echo "Using Node at: $NODE_BIN"
echo "Please follow the prompts to login and link the project:"

# Run login via node directly to avoid shebang env issues
"$NODE_BIN" "$VERCEL_JS" login

echo "Deploying to Production..."
"$NODE_BIN" "$VERCEL_JS" deploy --prod

echo ""
echo "✅ Deployment Complete!"
echo "👉 Action Required: Go to your project settings on Vercel -> Domains"
echo "   and add 'hireahuman.click' if not already configured."
