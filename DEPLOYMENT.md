# Deployment Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant-qr
DATABASE_NAME=restaurant-qr

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=https://yourdomain.com

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe (Optional)
STRIPE_API_KEY=pk_live_xxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxx

# AWS S3 (Optional)
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=ap-south-1

# QR Code
QR_CODE_SIZE=300
QR_CODE_ERROR_CORRECTION=H
```

## Deployment Platforms

### Option 1: Heroku (Backend)

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables: `heroku config:set KEY=value`
5. Deploy: `git push heroku main`

### Option 2: Railway

1. Connect GitHub repo
2. Add environment variables in dashboard
3. Auto-deploys on push

### Option 3: Render

1. Connect GitHub repo
2. Create Web Service
3. Set environment variables
4. Deploy

### Option 4: AWS EC2

1. Launch EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Set environment variables
6. Use PM2 for process management
7. Setup Nginx reverse proxy

## Frontend Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### GitHub Pages

```bash
npm run build
git add build/
git commit -m "Deploy"
git push origin main
```

## Database Setup

### MongoDB Atlas

1. Create account at mongodb.com
2. Create cluster
3. Create database user
4. Get connection string
5. Update MONGODB_URI in .env

### Local MongoDB

```bash
mongod --dbpath /path/to/data
```

## SSL/HTTPS Setup

Use Let's Encrypt with Certbot:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

## Domain Setup

1. Buy domain from Namecheap, GoDaddy, etc.
2. Update DNS records to point to your server
3. Setup SSL certificate
4. Configure Nginx/Apache

## Monitoring & Logging

### PM2 (Process Manager)

```bash
npm i -g pm2
pm2 start server/index.js
pm2 logs
pm2 monit
```

### CloudWatch (AWS)

- Monitor application metrics
- Setup alarms
- View logs

## Backup & Recovery

```bash
# Backup MongoDB
mongodump --uri="mongodb+srv://..." --out ./backup

# Restore MongoDB
mongorestore ./backup
```

## Performance Optimization

1. Enable gzip compression
2. Minify CSS/JS
3. Optimize images
4. Use CDN for static files
5. Implement caching
6. Database indexing

## Security Checklist

- [ ] Set strong JWT secret
- [ ] Enable CORS only for your domain
- [ ] Use HTTPS everywhere
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Setup rate limiting
- [ ] Enable database backups
- [ ] Monitor for suspicious activity
- [ ] Use strong passwords
- [ ] Enable 2FA where available
