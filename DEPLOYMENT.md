# ResolveHub - Deployment Guide

## Overview
ResolveHub is deployed as a single Node.js application on Heroku that serves both the API and the React frontend from the same server.

## Project Structure
```
ResolveHub/
├── client-api/          # Express backend API
│   ├── src/
│   ├── app.js
│   ├── package.json
│   └── .env.example
├── frontend/            # React frontend
│   ├── src/
│   ├── public/
│   ├── build/          # Production build (created by npm run build)
│   ├── package.json
│   └── .env.example
├── Procfile            # Heroku process file
└── README.md
```

## Prerequisites

### Required Accounts & Services
1. **GitHub Account** - For version control
2. **Heroku Account** - Free tier available (sign up at https://www.heroku.com)
3. **MongoDB Atlas Account** - Free tier M0 cluster available
4. **.me Domain** - From GitHub Student Pack
5. **Heroku CLI** - For local deployment commands

### Software Requirements
- Node.js 16+ (LTS recommended)
- npm or yarn
- Git
- Heroku CLI

## Step 1: Prepare MongoDB Atlas

### If you already have MongoDB Atlas collection:
Skip to Step 2

### If you need to create a new cluster:
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create account
3. Create a free M0 cluster
4. Create a database user with password
5. Whitelist IP address (or use 0.0.0.0/0 for testing)
6. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority&appName=Cluster0
   ```

## Step 2: Prepare Environment Variables

### Backend (.env in client-api folder)
Create file `client-api/.env`:
```env
PORT=5000
NODE_ENV=production
MONGO_URL=mongodb+srv://sweetiDesk123:Sweeti%402004@cluster0.bjkzpzt.mongodb.net/serviceDeskDB?retryWrites=true&w=majority&appName=Cluster0
JWT_ACCESS_SECRET=your_random_secret_key_here_change_this
JWT_REFRESH_SECRET=your_different_random_secret_key_here
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
REDIS_URL=redis://localhost:6379
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_SERVICE=gmail
EMAIL_FROM=noreply@resolvehub.com
FRONTEND_URL=https://resolvehub.you.me
ADMIN_EMAIL=admin@resolvehub.you.me
```

### Frontend (.env in frontend folder)
Create file `frontend/.env`:
```env
REACT_APP_API_URL=https://resolvehub.you.me/v1
REACT_APP_API_TICKET_URL=https://resolvehub.you.me/v1/ticket
REACT_APP_API_USER_URL=https://resolvehub.you.me/v1/user
REACT_APP_ENV=production
REACT_APP_APP_NAME=ResolveHub
```

**Replace `resolvehub.you.me` with your actual domain!**

## Step 3: Install Heroku CLI

### Windows:
```powershell
# Using Chocolatey
choco install heroku-cli

# Or download from https://devcenter.heroku.com/articles/heroku-cli
```

### macOS:
```bash
brew tap heroku/brew && brew install heroku
```

### Linux:
```bash
npm install -g heroku
```

## Step 4: Create Heroku Application

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create resolvehub

# Add MongoDB Atlas connection
heroku config:set MONGO_URL="mongodb+srv://sweetiDesk123:Sweeti%402004@cluster0.bjkzpzt.mongodb.net/serviceDeskDB?retryWrites=true&w=majority&appName=Cluster0"

# Add other environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_ACCESS_SECRET="your_random_secret_key"
heroku config:set JWT_REFRESH_SECRET="your_different_random_secret_key"
heroku config:set FRONTEND_URL="https://resolvehub.you.me"
heroku config:set EMAIL_USER="your_email@gmail.com"
heroku config:set EMAIL_PASS="your_app_password"
```

## Step 5: Deploy to Heroku

### First time setup:
```bash
# Add Heroku remote (if not created by heroku create)
heroku git:remote -a resolvehub

# Deploy
git push heroku main
# OR if on different branch
git push heroku registration:main
```

### Subsequent deployments:
```bash
# Simply push to Heroku remote
git push heroku main

# Check logs
heroku logs --tail
```

## Step 6: Configure Custom Domain

### Add domain to Heroku:
```bash
# Add your .me domain
heroku domains:add resolvehub.you.me

# Heroku will provide a DNS target (e.g., abcd1234.herokudns.com)
```

### Update DNS Records (GitHub Student Pack or Domain Provider):

1. Go to your domain registrar control panel
2. Create a CNAME record:
   ```
   Name: resolvehub
   Type: CNAME
   Value: abcd1234.herokudns.com (replace with Heroku's DNS target)
   ```
3. Wait for DNS to propagate (5-48 hours)
4. Verify with:
   ```bash
   heroku domains:wait resolvehub.you.me
   ```

## Step 7: Build Verification

### Local testing before deployment:
```bash
# Install dependencies
cd frontend && npm install
cd ../client-api && npm install

# Build frontend
cd ../frontend && npm run build

# Start server locally
cd ../client-api && npm start
# Visit http://localhost:5000
```

### After Heroku deployment:
```bash
# View logs
heroku logs --tail

# Check health
heroku open /api/health

# SSH into app (if needed)
heroku ps:exec
```

## Troubleshooting

### Build Issues:
```bash
# Clear build cache
heroku builds:cache:purge -a resolvehub

# Rebuild
git push heroku main --force
```

### Database Connection Issues:
```bash
# Verify MongoDB connection string
heroku config:get MONGO_URL

# Check Heroku logs
heroku logs --tail --dyno web
```

### Domain Not Working:
```bash
# Verify DNS setup
heroku domains

# See propagation
nslookup resolvehub.you.me
```

### Reset Database:
**⚠️ WARNING: This deletes all data**
```bash
# Create new MongoDB cluster, then update:
heroku config:set MONGO_URL="your_new_connection_string"
```

## Scaling

### Upgrade Heroku Dyno Type:
```bash
# Switch from free to paid
heroku dyno:type standard-1x -a resolvehub

# View current dyno
heroku ps -a resolvehub
```

## Monitoring

### View application logs:
```bash
heroku logs --tail
```

### Monitor dyno usage:
```bash
heroku ps -a resolvehub
```

### Database monitoring:
- Go to MongoDB Atlas dashboard
- Check connection metrics
- Monitor storage usage

## Security Checklist

- [ ] Change JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in production
- [ ] Enable HTTPS on custom domain (Heroku does this automatically)
- [ ] Set up CORS for frontend domain only
- [ ] Use strong email credentials (app-specific password for Gmail)
- [ ] Enable IP whitelist in MongoDB Atlas
- [ ] Set up backup strategy for database
- [ ] Regular security updates to dependencies

## Support & Next Steps

### Useful Commands:
```bash
# View all config variables
heroku config

# Set a variable
heroku config:set KEY=value

# Remove a variable
heroku config:unset KEY

# View application list
heroku apps

# Destroy app (⚠️ irreversible)
heroku apps:destroy -a resolvehub
```

### Documentation:
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)

### Common Issues & Solutions:
See README.md for additional troubleshooting

---

**First Deploy Date**: April 9, 2026
**Last Updated**: April 9, 2026
