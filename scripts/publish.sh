#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_NAME="${1:-profesionistas-bilingues}"
VISIBILITY="${2:-private}"

cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first: gh auth login"
  exit 1
fi

echo "Building production bundle..."
npm run build

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Creating GitHub repo: $REPO_NAME ($VISIBILITY)"
  gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --description "Profesionistas Bilingües marketing site"
else
  echo "Remote origin already set."
fi

echo "Pushing to GitHub..."
git push -u origin main

if command -v vercel >/dev/null 2>&1; then
  echo "Deploying to Vercel..."
  vercel deploy --prod --yes
else
  echo "Vercel CLI not found. Install: npm i -g vercel"
  echo "Then run: vercel --prod"
fi

echo "Done."
