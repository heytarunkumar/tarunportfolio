# PRODUCTION DEPLOYMENT & CHECKLIST GUIDE

This guide details how to build, test, and deploy Tarun Kumar's portfolio and Admin CMS to production.

---

## 1. Local Testing & Verification

Execute local build commands:
```bash
npm run typecheck  # or node_modules\.bin\tsc.cmd -b
npm run build      # or node_modules\.bin\vite.cmd build
```

---

## 2. Deployment Platforms (Vercel / Netlify / Cloudflare Pages)

### Vercel Deployment
1. Connect repository `https://github.com/heytarunkumar/tarunportfolio`.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Netlify Deployment
1. Build Command: `npm run build`.
2. Publish Directory: `dist`.
3. Single Page Application rewrite rule: `/* /index.html 200`.

---

## 3. Pre-Production Checklist

```text
[x] Admin authentication credentials configured
[x] Environment variables checked
[x] Active ATS Resume uploaded (/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf)
[x] Social links verified (GitHub: @heytarunkumar, LinkedIn, X, Medium)
[x] Project links & GitHub code repositories verified
[x] Research paper methodology (AI-HealthGuard) verified
[x] Global SEO metadata & OpenGraph tags verified
[x] Custom symbolic TK monogram favicon verified (/favicon.svg)
[x] Production build tested (0 tsc errors, vite build exit code 0)
```
