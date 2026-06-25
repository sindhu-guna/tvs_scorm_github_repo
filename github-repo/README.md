# TVS RR310 — Service Training Module (SCORM)

A complete interactive SCORM-style service training module for TVS Apache RR 310.

## Live Demo
🌐 **[tvs.wowmediahub.com](https://tvs.wowmediahub.com)**

## Features
- 7 language selection screen
- 20 service topics
- Sample clips with 6 slide types
- Voice over audio samples
- Interactive knowledge check quiz (A/B/C/D)
- Animated screen transitions
- Poppins font throughout
- Correct/Wrong answer feedback

## Screen Flow
```
Home → Language Select → Topic Select → Sample Clips → Questions → Results
```

## Tech Stack
- **Frontend**: React 18, CSS3, Poppins font
- **Backend**: Node.js, Express
- **Deployment**: Vercel (auto-deploy via GitHub Actions)
- **CI/CD**: GitHub Actions → Vercel

## Local Development
```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Run frontend
cd frontend && npm start

# Run backend
cd backend && npm start
```

## Deploy
Every push to `main` branch auto-deploys to Vercel via GitHub Actions.
