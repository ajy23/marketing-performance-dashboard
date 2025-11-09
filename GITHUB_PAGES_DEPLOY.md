# Deploy to GitHub Pages - Step by Step Guide

## Prerequisites
- Your code is already in a GitHub repository
- You have push access to the repository

## Steps to Deploy

### Step 1: Commit and Push Your Changes

1. **Add the necessary files:**
   ```bash
   git add .gitignore
   git add vite.config.ts
   git add .github/workflows/deploy.yml
   git add package.json
   git add package-lock.json
   git add index.html
   git add index.tsx
   git add tsconfig.json
   git add README.md
   ```

2. **Commit the changes:**
   ```bash
   git commit -m "Add GitHub Pages deployment configuration"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository on GitHub.com
2. Click on **Settings** (top menu bar)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"** (NOT "Deploy from a branch")
5. The page will save automatically

### Step 3: Trigger the Deployment

The GitHub Actions workflow will automatically run when you push to the `main` branch. If you've already pushed:

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the build progress
4. Wait for it to complete (usually takes 1-2 minutes)

### Step 4: Access Your Dashboard

Once the deployment completes:

1. Go back to **Settings** → **Pages**
2. You'll see a message: "Your site is live at: https://[username].github.io/ad-revenue-analysis/"
3. Click the link or visit: `https://[your-username].github.io/ad-revenue-analysis/`

**Note:** Replace `[your-username]` with your actual GitHub username.

### Troubleshooting

- **Workflow not running?** Make sure you've enabled GitHub Actions in repository settings
- **Build failing?** Check the Actions tab for error messages
- **Page not loading?** Wait a few minutes for DNS propagation, or check the Actions tab for deployment status
- **404 errors?** Make sure the base path in `vite.config.ts` matches your repository name

### Manual Deployment (Alternative)

If you prefer to deploy manually:

1. Build locally:
   ```bash
   GITHUB_PAGES=true npm run build
   ```

2. Push the `dist` folder to `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

3. In Settings → Pages, select `gh-pages` branch as source

