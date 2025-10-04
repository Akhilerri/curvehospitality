# Deployment Guide - Vercel Static Site

This guide explains how to deploy the CurveRedo website to Vercel as a static site.

## 🚀 Quick Deploy

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd CurveRedo
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **curve-redo** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override settings? **N**

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"

## 📋 Pre-Deployment Checklist

- ✅ TypeScript errors fixed
- ✅ Build script updated for static deployment
- ✅ Output directory set to `dist`
- ✅ vercel.json configuration created
- ✅ SPA routing configured
- ✅ Static assets optimized

## 🔧 Configuration Files

### vercel.json
- Configures SPA routing (all routes → index.html)
- Sets cache headers for assets
- Adds security headers

### .vercelignore
- Excludes server code and database files
- Keeps deployment lean and fast

## 🌐 Environment Variables

This static deployment uses mock data and doesn't require environment variables.

If you later add external APIs, configure them in Vercel:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

## 📦 What's Included

This deployment includes:
- ✅ All frontend pages (Home, About, Services, Products, Portfolio, etc.)
- ✅ Mock data for demonstrations
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Performance optimizations
- ✅ Service worker for offline support

## 🚫 What's NOT Included

Since this is a static deployment:
- ❌ Backend API endpoints
- ❌ Database connectivity
- ❌ File uploads
- ❌ Server-side authentication
- ❌ Dynamic data fetching

All data is served from mock files in `client/src/data/`.

## 🔄 Updates and Redeployment

### Automatic Deployments
If you connected a Git repository, Vercel automatically deploys on:
- Push to main branch (production)
- Pull requests (preview deployments)

### Manual Redeployment
```bash
vercel --prod
```

## 🐛 Troubleshooting

### Build Fails
1. Run locally first: `npm run build`
2. Check for TypeScript errors: `npm run check`
3. Verify all dependencies are in package.json

### 404 Errors on Routes
- Ensure vercel.json has the rewrite rule for SPA routing
- Check that all routes are defined in your React Router

### Assets Not Loading
- Verify asset paths are relative (not absolute)
- Check that assets are in the `client/public` or `client/src/assets` directories

## 📊 Performance

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🔐 Security Headers

The deployment includes:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📱 Testing

After deployment:
1. Test all routes
2. Check mobile responsiveness
3. Verify forms work (they'll show mock responses)
4. Test navigation and links
5. Check console for errors

## 🎯 Next Steps

To add backend functionality:
1. Set up Vercel Serverless Functions
2. Migrate to PostgreSQL (Vercel Postgres or Neon)
3. Update API calls to use serverless endpoints
4. Configure environment variables

## 📞 Support

For issues:
- Check Vercel deployment logs
- Review build output
- Test locally with `npm run build && npm run preview`

---

**Note**: This is a static deployment. All data is mock data for demonstration purposes.
