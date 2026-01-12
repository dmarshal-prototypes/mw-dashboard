# Deployment Guide - GitHub Pages

This guide explains how to deploy the MathWorks Content Discovery Assistant to GitHub Pages.

**⚠️ Proof of Concept:** This application uses mock data to demonstrate functionality. No API keys or secrets are required.

## Deployment Options

### Option 1: Via GitHub Web Interface (Easiest)

This is the simplest method - GitHub handles everything automatically:

#### Step 1: Push Your Code

Make sure all your changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (in the repository menu)
3. Click **Pages** (in the left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` (or your default branch)
   - **Folder**: Select `/ (root)`
5. Click **Save**

#### Step 3: Wait for Deployment

GitHub Pages will automatically:
1. Detect the `.nojekyll` file (disables Jekyll processing)
2. Build your Vite app
3. Deploy to GitHub Pages

This usually takes 2-5 minutes. You can monitor progress in the **Actions** tab.

#### Step 4: Visit Your Site

Your app will be live at: `https://dmarshal-prototypes.github.io/mw-dashboard/`

### Option 2: Manual Deployment with npm

If you prefer more control, you can deploy manually from your local machine:

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Build and Deploy

```bash
npm run deploy
```

This command:
1. Builds your app (`npm run build`)
2. Creates a `dist/` folder
3. Pushes the contents to the `gh-pages` branch
4. Your app goes live automatically

#### Step 3: Configure GitHub Pages (First Time Only)

If this is your first deployment:

1. Go to **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**

### Option 3: Build Locally and Push

For full control over the build process:

```bash
# Build the app
npm run build

# The dist/ folder contains your built app
# You can inspect it before deploying

# Deploy to gh-pages branch
npm run deploy
```

## Verification

After deployment, verify your app works:

1. **Visit the URL**: `https://dmarshal-prototypes.github.io/mw-dashboard/`
2. **Test functionality**:
   - Enter any text in the URL field (e.g., "plot" or "https://mathworks.com/help/matlab/ref/plot.html")
   - Click "Discover"
   - Verify mock results appear
3. **Check browser console**: Look for the message "Using MOCK data for proof of concept"

## Troubleshooting

### Issue: 404 Error - Page Not Found

**Cause:** Base path misconfiguration or GitHub Pages not enabled.

**Solution:**
1. Verify `base: '/mw-dashboard/'` in `vite.config.js` matches your repo name
2. Check that GitHub Pages is enabled in Settings → Pages
3. Wait 2-5 minutes after enabling (it takes time to deploy)

### Issue: Assets Not Loading (CSS/JS missing)

**Cause:** Incorrect base path in Vite config.

**Solution:**
1. Open `vite.config.js`
2. Verify the `base` setting matches your repository name:
   ```javascript
   base: '/mw-dashboard/', // Must match your repo name
   ```
3. If your repo is named differently, update this path
4. Rebuild and redeploy: `npm run deploy`

### Issue: Jekyll Processing Errors

**Cause:** GitHub Pages tried to use Jekyll instead of serving the Vite build.

**Solution:**
- Verify `.nojekyll` file exists in the `public/` folder
- This file tells GitHub Pages to skip Jekyll processing
- It's already included in the project, but if missing, create an empty file: `touch public/.nojekyll`

### Issue: Changes Not Appearing

**Cause:** Browser cache or deployment delay.

**Solution:**
1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check the Actions tab to ensure deployment completed
3. Clear browser cache if issue persists

## Updating Your Deployment

### Using GitHub Web Interface

Just push your changes:

```bash
git add .
git commit -m "Update application"
git push origin main
```

GitHub Pages automatically rebuilds and deploys.

### Using Manual Deployment

```bash
git add .
git commit -m "Update application"
git push

npm run deploy
```

## Custom Domain Setup (Optional)

If you want to use a custom domain like `your-domain.com`:

1. Add a `CNAME` file to `public/` folder:
   ```
   your-domain.com
   ```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `dmarshal-prototypes.github.io`

3. In GitHub **Settings** → **Pages**:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## GitHub Pages Limitations

- ✅ Free hosting for public repositories
- ✅ HTTPS by default
- ✅ Automatic builds from source
- ✅ Custom domain support
- ❌ No server-side code (static files only)
- ❌ No environment variables at runtime (build time only)
- ❌ No backend API support (unless you use external services)

## Performance Tips

The current build is optimized with:
- Code splitting (React/ReactDOM in separate chunks)
- Tree shaking (unused code removed)
- Minification
- Asset optimization

For further optimization:
- Enable gzip compression (GitHub Pages does this automatically)
- Use lazy loading for components (add React.lazy where appropriate)
- Optimize images (compress before adding to project)

## Monitoring

Since this is a static site with mock data:
- No API usage to monitor
- No backend costs
- Free hosting via GitHub Pages

You can view site traffic in:
- GitHub repository → Insights → Traffic

## Next Steps

After deploying:

1. ✅ Share your URL: `https://dmarshal-prototypes.github.io/mw-dashboard/`
2. ✅ Test on different devices and browsers
3. ✅ Gather feedback on the UI/UX
4. ⚠️ When ready for production: Replace mock data with real API integration
5. ⚠️ For real API: Implement a backend proxy to secure API keys

## Summary

**Quick Deploy:**
```bash
# Push to GitHub
git push origin main

# Enable GitHub Pages via Settings → Pages
# Done! Site live in 2-5 minutes
```

**Manual Deploy:**
```bash
npm run deploy
# Done! Site updates immediately
```

🎉 Your app is now live at: `https://dmarshal-prototypes.github.io/mw-dashboard/`
