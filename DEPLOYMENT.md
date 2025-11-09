# Deployment Guide

This project can be deployed as a static website to various platforms. The build process creates a `dist` folder with all static files.

## Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized static files ready for deployment.

## Deployment Options

### 1. GitHub Pages

**Option A: Using GitHub Actions (Recommended)**

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES: true
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

2. In your GitHub repository:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Push to main branch to trigger deployment

**Option B: Manual Deployment**

1. Build the project:
```bash
GITHUB_PAGES=true npm run build
```

2. Push the `dist` folder to the `gh-pages` branch:
```bash
git subtree push --prefix dist origin gh-pages
```

3. In GitHub Settings → Pages, set source to `gh-pages` branch.

### 2. Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

Or connect your GitHub repo to Netlify:
- Go to [netlify.com](https://netlify.com)
- Connect your repository
- Build command: `npm run build`
- Publish directory: `dist`

### 3. Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel --prod`

Or connect your GitHub repo to Vercel:
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

### 4. Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to Pages → Create a project
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Framework preset: Vite

### 5. AWS S3 + CloudFront

1. Build: `npm run build`
2. Upload `dist` folder contents to an S3 bucket
3. Enable static website hosting on the bucket
4. Optionally set up CloudFront for CDN

## Testing Locally

After building, test the production build locally:

```bash
npm run preview
```

This serves the `dist` folder at `http://localhost:4173` (or similar).

## Environment Variables

If you need environment variables for the build:
- Create a `.env` file (already in `.gitignore`)
- For GitHub Pages, use GitHub Secrets and pass them in the workflow
- For other platforms, configure them in their respective dashboards

