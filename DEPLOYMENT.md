# 🚀 Deployment Guide

This guide explains how to deploy SIMON TECH BOT to various platforms.

## 📦 Prerequisites

Before deploying, ensure you have:

1. **Telegram Bot Token**
   - Create via @BotFather on Telegram
   - Keep it secret and secure

2. **Node.js Installed** (for local testing)
   ```bash
   node -v  # Should be 14+
   npm -v
   ```

3. **Git Repository**
   - Code must be pushed to GitHub
   - Public or private repository

## 🚄 Railway (RECOMMENDED) ⭐

Railway is the fastest and easiest way to deploy.

### Step-by-Step:

1. **Go to [railway.app](https://railway.app)**

2. **Sign In with GitHub**
   - Click "Sign in with GitHub"
   - Authorize Railway

3. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"

4. **Connect Repository**
   - Search for `SIMON-TECH-EMPIRE`
   - Click to connect
   - Authorize GitHub access

5. **Configure Variables**
   ```
   BOT_TOKEN = Your Telegram Token
   TELEGRAM_CHAT_ID = Your Chat ID
   NODE_ENV = production
   ```

6. **Deploy**
   - Railway auto-deploys
   - Check deployments tab for status
   - Live in 30-60 seconds ✅

### Railway Free Tier:
- **$5/month** free credits
- Sufficient for light/medium usage
- No credit card required for first month

---

## 🟣 Heroku

Traditional deployment platform.

### Prerequisites:
- Heroku account (free with limitations)
- Heroku CLI installed

### Steps:

```bash
# 1. Login to Heroku
heroku login

# 2. Create app
heroku create simon-tech-bot

# 3. Set environment variables
heroku config:set BOT_TOKEN=YOUR_TOKEN
heroku config:set TELEGRAM_CHAT_ID=YOUR_CHAT_ID
heroku config:set NODE_ENV=production

# 4. Deploy
git push heroku main

# 5. Check logs
heroku logs --tail

# 6. View app
heroku open
```

### Note:
- Free tier has limited uptime (550 hours/month)
- App sleeps after 30 mins of inactivity
- Consider paid plans for production

---

## ☁️ Other Platforms

### Replit

1. Create new Replit project
2. Select Node.js
3. Copy `index.js` content
4. Create `.env` file with your secrets
5. Click "Run"
6. Keep replit tab open or use UptimeRobot

### Render

1. Go to [render.com](https://render.com)
2. Connect GitHub account
3. New → Web Service
4. Select repository
5. Build: `npm install`
6. Start: `npm start`
7. Add environment variables
8. Deploy

### AWS EC2

```bash
# 1. Create EC2 instance (Ubuntu)
# 2. SSH into instance
ssh -i key.pem ubuntu@your-ip

# 3. Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node

# 4. Clone repository
git clone https://github.com/creatorj-st/SIMON-TECH-EMPIRE.git
cd SIMON-TECH-EMPIRE

# 5. Install dependencies
npm install

# 6. Create .env file
nano .env
# Add your variables

# 7. Install PM2 for process management
npm install -g pm2

# 8. Start bot
pm2 start index.js --name "simon-tech-bot"
pm2 save
pm2 startup
```

### Google Cloud Run

```bash
# 1. Create gcloud account
# 2. Install Google Cloud SDK
# 3. Build container
gcloud builds submit --tag gcr.io/PROJECT-ID/simon-tech-bot

# 4. Deploy
gcloud run deploy simon-tech-bot \
  --image gcr.io/PROJECT-ID/simon-tech-bot \
  --platform managed \
  --region us-central1
```

### Oracle Cloud (Always Free)

1. Create Oracle Cloud account
2. Create Compute instance (always free)
3. SSH and setup like AWS
4. Configure static IP
5. Set security rules

---

## 🔄 Keep Bot Running 24/7

### Option 1: PM2 (Self-hosted)

```bash
npm install -g pm2
pm2 start index.js --name "simon-tech-bot"
pm2 startup  # Auto-restart on server restart
pm2 save
```

### Option 2: Systemd (Linux)

Create `/etc/systemd/system/simon-tech-bot.service`:

```ini
[Unit]
Description=SIMON TECH BOT
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/SIMON-TECH-EMPIRE
ExecStart=/usr/bin/node index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable simon-tech-bot
sudo systemctl start simon-tech-bot
sudo systemctl status simon-tech-bot
```

### Option 3: UptimeRobot (For Replit/Free Hosts)

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create account (free)
3. Add monitor
4. Set URL to your bot's health endpoint
5. Interval: 5 minutes
6. Prevents app sleep/shutdown

---

## 📊 Deployment Comparison

| Platform | Cost | Setup Time | Uptime | Recommended |
|----------|------|-----------|--------|-------------|
| **Railway** | Free ($5) | 2 min | 99.9% | ⭐ YES |
| **Heroku** | Free/Paid | 5 min | 95% | Limited |
| **Replit** | Free | 3 min | 70% | Dev only |
| **Render** | Free/Paid | 5 min | 99% | Good |
| **AWS** | Paid | 15 min | 99.9% | Best |
| **Google Cloud** | Free tier | 15 min | 99.9% | Good |
| **Oracle Cloud** | Free | 20 min | 99.9% | Good |

---

## ✅ Post-Deployment Checklist

- [ ] Bot responds to `/start` command
- [ ] Bot responds to `.menu` command
- [ ] `.ping` command returns response
- [ ] Bot logs appear in console/dashboard
- [ ] Health endpoint `/health` returns 200
- [ ] No error messages in logs
- [ ] Bot uptime > 1 hour
- [ ] Memory usage stable

---

## 🔧 Troubleshooting

### Bot Not Responding

```bash
# Check if bot is running
heroku ps
railway status

# Check logs for errors
heroku logs --tail
railway logs

# Restart bot
heroku restart
railway redeploy
```

### High Memory Usage

- Upgrade to premium tier
- Reduce polling frequency
- Add memory limits

### Bot Token Error

- Verify token in environment variables
- Check for typos
- Regenerate token from @BotFather

### Connection Issues

- Check internet connectivity
- Verify firewall rules
- Test with simple script

---

## 📈 Monitoring & Logs

### Railway Logs
- Dashboard → Deployments
- Real-time log streaming
- Error tracking

### Heroku Logs
```bash
heroku logs --tail
heroku logs --num 100
```

### Self-Hosted Logs
```bash
pm2 logs
tail -f /var/log/simon-tech-bot.log
```

---

## 💾 Backup & Recovery

### GitHub Backup
- Repository automatically backed up
- Can restore any previous version
- Keep commits organized

### Environment Variables Backup
```bash
# Railway
railway config:get > backup.env

# Heroku
heroku config:get > backup.env
```

---

## 🎉 You're Ready!

Your bot is now deployed and running 24/7. 

**Next steps:**
1. Test all commands
2. Monitor logs
3. Invite bot to your group
4. Add more features

---

**Need help?** Contact: [09166265317](https://wa.me/09166265317)
