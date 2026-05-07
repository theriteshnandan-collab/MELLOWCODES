# Cloudflare Pages Deployment Guide

Your website is now configured for **static export** and ready to deploy to Cloudflare Pages (free tier).

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Locally (Optional)
Test the static build locally before deploying:
```bash
npm run build
```
This generates static files in the `out/` directory.

### 3. Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI (Recommended for Free Plan)
```bash
npm run deploy
```
This will:
- Build your Next.js app to static HTML/CSS/JS
- Deploy the `out/` folder to Cloudflare Pages using Wrangler

First time setup:
```bash
wrangler login
```

#### Option B: Via Cloudflare Dashboard (Git-connected)
1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Create a new project from your Git repository
3. Set build command: `npm run build`
4. Set output directory: `out`
5. Deploy

### 4. Connect Custom Domain
After deployment:
1. Go to your Cloudflare Pages project settings
2. Navigate to "Custom domains"
3. Add your custom domain from Cloudflare
4. Update your domain's nameservers to Cloudflare (if needed)

## Project Configuration

✅ **Next.js Export Enabled** - `output: "export"` in next.config.ts
✅ **Image Optimization Disabled** - Required for static export
✅ **Wrangler Configured** - pages_build_output_dir set to `out/`
✅ **All Dependencies Frontend-Only** - No backend/server-side code

## What Changed

- `next.config.ts` - Enabled static export mode
- `wrangler.toml` - Added Cloudflare Pages configuration
- `package.json` - Added deploy script and wrangler dependency
- `.gitignore` - Updated for Cloudflare Pages workflow

## Local Development

```bash
npm run dev
```
Runs on `http://localhost:3000`

## Build Output

The `next build` command now generates:
- Static HTML files for each page
- Optimized CSS/JS bundles in `out/_next/`
- All assets in `out/public/`

All files in the `out/` directory are what gets deployed to Cloudflare Pages.

## Troubleshooting

**Issue: Images not loading**
- All images must be in `public/` folder
- Image optimization is disabled (required for static export)
- Ensure paths are relative: `src="/images/..."` not `src="images/..."`

**Issue: Dynamic routes failing**
- Avoid using dynamic routes with `getServerSideProps` or `getStaticProps`
- Use client-side data fetching if needed

**Issue: Environment variables**
- Frontend env vars must be prefixed with `NEXT_PUBLIC_`
- Set them in `.env.local` for local dev
- Set them in Cloudflare Pages environment variables for production

## Free Plan Limits

✅ Unlimited static assets
✅ Unlimited deployments
✅ Global CDN included
✅ Automatic HTTPS
⚠️ No serverless functions (API routes disabled)

Your site is fully compatible with these limits!
