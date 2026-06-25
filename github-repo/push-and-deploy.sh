#!/bin/bash
# ================================================
# TVS SCORM — GitHub Push + Vercel Deploy Script
# Run this ONE time on your computer
# ================================================

GITHUB_TOKEN="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A"
GITHUB_REPO="https://github.com/sindhu-guna/tvs_scorm.git"
VERCEL_TOKEN="vcp_7jIHshYashg6nT3WclklNiU3Cllkde1c6swKAAF9RhFSiRiIl70vdm2I"

echo "================================================"
echo " TVS SCORM - Starting GitHub Push & Vercel Deploy"
echo "================================================"

# Step 1: Configure git
git config --global user.email "deploy@tvs-scorm.com"
git config --global user.name "TVS SCORM"

# Step 2: Init repo
git init
git remote remove origin 2>/dev/null || true
git remote add origin "https://${GITHUB_TOKEN}@github.com/sindhu-guna/tvs_scorm.git"

# Step 3: Add all files
git add -A
git commit -m "feat: complete TVS RR310 SCORM training module

- Home screen with TVS Apache RR310 bike animation
- Language selection (7 languages) with scroll
- Topic selection (20 service topics) with scroll
- Sample Clips screen with 6 thumbnail cards
- Voice Over screen with audio players
- Knowledge Check quiz with A/B/C/D answers
- Result screen with score and feedback
- Poppins font (all weights)
- Vercel deployment config
- GitHub Actions CI/CD pipeline"

# Step 4: Push to GitHub
echo ""
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main --force
echo "GitHub push done!"

# Step 5: Deploy to Vercel
echo ""
echo "Deploying to Vercel..."
npm install -g vercel 2>/dev/null

# Link and deploy
vercel --token "$VERCEL_TOKEN" --yes --cwd . \
  --build-env REACT_APP_API_URL=/api \
  --name tvs-scorm

echo ""
echo "Deploying to production..."
vercel --prod --token "$VERCEL_TOKEN" --yes --cwd .

echo ""
echo "================================================"
echo " DONE! App is live on Vercel"
echo " Next: Add custom domain tvs.wowmediahub.com"
echo "================================================"
