# 🌿 ForestBlog

> 🍃 **Calm, Elegant, Blazing Fast** — A modern Serverless Edge Blog system built with **Cloudflare Workers + D1 + R2 + Hono**.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/shali10/forest-blog)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Framework-Hono%20v4-E36002.svg)](https://hono.dev/)
[![Database](https://img.shields.io/badge/Database-Cloudflare%20D1%20(FTS5)-blue.svg)](https://developers.cloudflare.com/d1/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)

**English** · [简体中文](README.md)

ForestBlog combines the **zero maintenance, zero monthly server cost, and global edge instant loading (<45ms TTFB)** of static site generators with the **dynamic web admin, real-time publishing, 6 curated theme palettes, FTS5 full-text search, and Giscus community discussions** of dynamic CMS platforms.

🔗 **Live Demo**: [https://note.0000996.xyz](https://note.0000996.xyz)

---

## 🏗️ Architecture & Data Flow

```
                        ┌────────────────────────────────────────────────────────┐
                        │              Cloudflare Global Edge Network            │
                        │                 (300+ Cities Worldwide)                │
                        └───────────────────────────┬────────────────────────────┘
                                                    │
                                           [ HTTPS Request ]
                                                    │
                                                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        Cloudflare Worker Runtime (Hono Framework)                      │
│                                                                                        │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────┐  │
│  │   Edge SSR HTML  │    │  FTS5 Search API │    │  Admin SPA Auth  │    │  RSS/XML │  │
│  │   (Zero-Flicker) │    │  (Title+Content) │    │  (JWT HMAC-256)  │    │  Sitemap │  │
│  └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘    └────┬─────┘  │
└───────────┼───────────────────────┼───────────────────────┼───────────────────┼────────┘
            │                       │                       │                   │
            ▼                       ▼                       ▼                   ▼
┌─────────────────────────────────────────────────────────┐   ┌──────────────────────────┐
│              Cloudflare D1 (Serverless SQLite)          │   │  Cloudflare R2 (Storage) │
│  - posts / categories / tags / links / settings         │   │  - Uploaded Images       │
│  - posts_fts (FTS5 Full-Text Search Virtual Table)      │   │  - Zero Egress Fees      │
└─────────────────────────────────────────────────────────┘   └──────────────────────────┘
```

---

## 💰 100% Free & Transparent Cost Model

ForestBlog runs entirely within **Cloudflare's generous Free Tier**. You can set strict billing limits in your Cloudflare dashboard to ensure **zero surprise bills**:

| Cloudflare Service | Free Tier Limits | Estimated Monthly Blog Usage | Cost Status |
| :--- | :--- | :--- | :--- |
| **Workers Requests** | **100,000 / day** (3M / month) | ~30k - 100k / month | 🟢 **100% Free (<3% of quota)** |
| **D1 SQL Reads** | **5,000,000 rows / day** (150M / mo) | ~1M - 3M rows / month | 🟢 **100% Free (<2% of quota)** |
| **D1 SQL Writes** | **100,000 rows / day** (3M / mo) | Mainly view count increments | 🟢 **100% Free (<2% of quota)** |
| **D1 Storage** | **5 GB** | ~15 MB for 1,000 long posts | 🟢 **100% Free (<0.3% of quota)** |
| **R2 Object Storage** | **10 GB storage + 10M reads/mo** | ~500 MB - 2 GB for post images | 🟢 **100% Free + Zero Egress Fees** |
| **SSL & Anycast CDN** | Automated Wildcard SSL | Automated renewal | 🟢 **100% Free** |

---

## 📸 Showcase

### 1. Home · Warm Paper Aesthetic & Full-Featured Sidebar
![Home Preview](docs/images/preview-home.png)

### 2. 🎨 6 Curated Theme Palettes · Real-time Switcher
> Switch themes anytime via the top right `🎨 Theme` button: **Forest Warm, Sakura Sweet, Matcha Zen, Starry Ocean, Geist Monochrome, Cyber Dark**. Persistent local memory with zero flicker on first load.
![Theme Switcher Preview](docs/images/preview-theme-switcher.png)

### 3. 📖 Immersive Article Reading · TOC, Code Highlights & Giscus
> Top smooth reading progress bar, syntax-highlighted code blocks with 1-click copy, image lightbox zoom, and Giscus comment integration.
![Article Preview](docs/images/preview-article.png)

### 4. 📱 Mobile Responsive · Drawer Navigation
![Mobile Preview](docs/images/preview-mobile.png)

---

## ✨ Key Features

- **⚡ Edge SSR (Server-Side Rendering)**: Rendered directly on 300+ Cloudflare edge nodes globally with TTFB < 45ms.
- **🎨 6 Theme Palettes**: Built-in Forest, Sakura, Matcha, Ocean, Geist, and Cyber themes with system dark mode auto-detection.
- **🔍 Instant Full-Text Search**: SQLite FTS5 index + LIKE hybrid search triggered instantly via `Ctrl + K`.
- **📝 Out-of-the-Box Admin**: Manage posts, categories, links, and settings at `/admin/` with Markdown toolbar and 1-click JSON backup export.
- **💬 Giscus Comments**: Powered by GitHub Discussions, zero spam, and zero server maintenance.
- **🖼️ Image Lightbox & Code Highlighting**: Click to zoom article images, Prism syntax coloring with 1-click copy.
- **📱 Fully Responsive**: Custom mobile drawer navigation and floating back-to-top button.
- **📡 Standard Feeds**: Native RSS 2.0 (`/rss.xml`), Sitemap (`/sitemap.xml`), and OpenGraph social preview tags.

---

## 🚀 Quick Deployment (Choose One)

### Option A: Fork & Deploy (Recommended · 1-Click Web Setup)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/shali10/forest-blog)

1. Click the **Deploy with Workers** button above.
2. Sign in to your Cloudflare account, authorize GitHub, and fork this repo.
3. In your Cloudflare Dashboard, bind a **D1 Database** (name: `forest-blog-db`).
4. In the D1 **Console**, paste and execute `schema.sql` from this repo to initialize tables.

---

### Option B: Cloudflare Console Git Connect (CI/CD)

1. **Fork this repository** to your GitHub account.
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Storage & Databases** → **D1 SQL Database** → Create database `forest-blog-db`, then execute `schema.sql` in **Console**.
4. Go to **Compute (Workers & Pages)** → **Create Application** → **Pages** → **Connect to Git**.
5. Bind your D1 database (`DB` -> `forest-blog-db`) in **Settings** → **Bindings**, then deploy!

---

### Option C: CLI Terminal Deployment (3 Steps)

```bash
# 1. Clone repo and install dependencies
git clone https://github.com/shali10/forest-blog.git
cd forest-blog
npm install

# 2. Create D1 database and initialize schema
npx wrangler d1 create forest-blog-db
# Copy the database_id into wrangler.toml
npm run db:init:remote

# 3. Deploy to Cloudflare Workers
npm run deploy
```

---

## 📄 License

Distributed under the [MIT License](LICENSE).
