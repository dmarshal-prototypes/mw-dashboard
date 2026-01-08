# Deployment Guide - GitHub Pages

This guide explains how to deploy the MathWorks Content Discovery Assistant to GitHub Pages.

## 🚨 Important Security Warning

**This application makes API calls directly from the browser to the Anthropic Claude API.** When deployed to GitHub Pages (or any static hosting), your API key will be:

- ✅ Embedded in the JavaScript bundle
- ✅ Visible to anyone who inspects the network requests or JavaScript code
- ✅ Potentially usable by others if they find it

### Security Considerations

**For personal/demo use:**
- ✅ Acceptable if you're the only user
- ✅ Set up API key usage limits in your Anthropic account
- ✅ Monitor your API usage regularly
- ✅ Rotate your API key periodically

**For production use:**
- ❌ **NOT recommended** to expose your API key in the client
- ✅ Instead, set up a backend server to proxy API requests
- ✅ Authenticate users before allowing API access
- ✅ Implement rate limiting on your backend

## Deployment Options

### Option 1: Automated Deployment with GitHub Actions (Recommended)

This automatically deploys your app whenever you push to the main branch.

#### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the sidebar)
3. Under "Source", select **GitHub Actions**

#### Step 2: Add API Key as a Secret

1. In your repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your actual Anthropic API key
5. Click **Add secret**

#### Step 3: Push to Main Branch

```bash
# Make sure you're on the main/master branch
git checkout main

# Or merge your changes to main
git merge your-feature-branch

# Push to trigger deployment
git push origin main
```

The GitHub Action will:
1. Build your app
2. Inject the API key from secrets
3. Deploy to GitHub Pages
4. Your app will be live at: `https://dmarshal-prototypes.github.io/mw-dashboard/`

#### Step 4: Monitor Deployment

- Go to the **Actions** tab in your repository
- Click on the latest workflow run to see progress
- Once complete, visit your site!

### Option 2: Manual Deployment

If you prefer to deploy manually from your local machine:

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Create Production Environment File

Create `.env.production` in the root directory:

```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.anthropic.com/v1
VITE_MODEL_NAME=claude-sonnet-4-20250514
VITE_MAX_TOKENS=4000
```

**Note:** `.env.production` is gitignored, so it won't be committed.

#### Step 3: Deploy

```bash
npm run deploy
```

This command:
1. Builds the app (`npm run build`)
2. Creates a `dist/` folder with the production build
3. Pushes the `dist/` folder to the `gh-pages` branch
4. Your app goes live at: `https://dmarshal-prototypes.github.io/mw-dashboard/`

#### Step 4: Enable GitHub Pages (if not already)

1. Go to **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**

## Verification

After deployment, verify your app:

1. **Check the URL**: Visit `https://dmarshal-prototypes.github.io/mw-dashboard/`
2. **Test functionality**:
   - Enter a MathWorks documentation URL
   - Click "Discover"
   - Verify results appear
3. **Check browser console**: Look for any errors

## Troubleshooting

### Issue: "API key not configured" Error

**Cause:** The API key wasn't properly injected during build.

**Solution:**
- For GitHub Actions: Check that `ANTHROPIC_API_KEY` secret is set correctly
- For manual deploy: Ensure `.env.production` exists with the correct key
- Clear your browser cache and try again

### Issue: 404 Error - Page Not Found

**Cause:** Base path misconfiguration.

**Solution:**
- Verify `base: '/mw-dashboard/'` in `vite.config.js` matches your repo name
- If your repo is named differently, update the base path

### Issue: Assets Not Loading (CSS/JS)

**Cause:** Incorrect asset paths.

**Solution:**
- Make sure the `base` in `vite.config.js` matches your GitHub Pages path
- Rebuild and redeploy: `npm run build && npm run deploy`

### Issue: CORS Errors

**Cause:** Anthropic API might have CORS restrictions.

**Solution:**
- The current implementation uses direct API calls which should work
- If CORS issues occur, you'll need to implement a backend proxy

## Updating Your Deployment

### For GitHub Actions Deployment

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
```

The deployment happens automatically.

### For Manual Deployment

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push

# Redeploy
npm run deploy
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ANTHROPIC_API_KEY` | Your Anthropic API key (required) | - |
| `VITE_API_BASE_URL` | Anthropic API base URL | `https://api.anthropic.com/v1` |
| `VITE_MODEL_NAME` | Claude model to use | `claude-sonnet-4-20250514` |
| `VITE_MAX_TOKENS` | Max tokens for responses | `4000` |

## Monitoring API Usage

Since your API key is exposed in the client:

1. **Set up usage alerts** in your Anthropic account
2. **Monitor usage** regularly at https://console.anthropic.com
3. **Set spending limits** to prevent unexpected charges
4. **Rotate your key** if you suspect unauthorized use

## Alternative: Backend Proxy (More Secure)

For production use, consider:

1. **Deploy a backend** (Node.js, Python, etc.) on:
   - Vercel
   - Netlify Functions
   - AWS Lambda
   - Your own server

2. **Move API calls** to the backend
3. **Authenticate users** before allowing API access
4. **Keep your API key** on the server only

Example backend structure:
```
backend/
├── api/
│   └── analyze.js    # Proxy endpoint
├── middleware/
│   ├── auth.js       # Authentication
│   └── rateLimit.js  # Rate limiting
└── server.js         # Express/Fastify server
```

## GitHub Pages Limitations

- ✅ Free hosting for public repositories
- ✅ HTTPS by default
- ✅ Custom domain support
- ❌ No server-side code (static files only)
- ❌ No environment variables at runtime (must be at build time)
- ❌ No backend/API protection

## Next Steps

After deploying:

1. ✅ Test your app thoroughly
2. ✅ Share the URL with others
3. ✅ Monitor API usage
4. ⚠️ Consider implementing a backend proxy for production
5. ✅ Set up a custom domain (optional)

## Custom Domain Setup (Optional)

1. Add a `CNAME` file to the `public/` folder:
   ```
   your-domain.com
   ```

2. Configure DNS:
   - Add a CNAME record pointing to `dmarshal-prototypes.github.io`

3. In GitHub Settings → Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Support

For issues with:
- **Deployment**: Check the Actions tab for error logs
- **Application**: Check browser console for errors
- **API**: Verify your API key is valid at https://console.anthropic.com

## Summary

✅ **Quick Start:**
```bash
# Automated (recommended)
1. Set ANTHROPIC_API_KEY secret in GitHub
2. Push to main branch
3. Done!

# Manual
1. Create .env.production with your API key
2. npm run deploy
3. Done!
```

🎉 Your app will be live at: `https://dmarshal-prototypes.github.io/mw-dashboard/`
