# 🌿 ForestBlog (林间随笔)

基于 **Cloudflare Workers + D1 + R2 + Hono** 构建的下一代现代化 Serverless 边缘博客系统。

具备静态博客的**零维护、零成本与毫秒级首屏**，兼具动态博客的**在线后台管理、实时发布与全文检索能力**。

---

## ✨ 核心特性

- ⚡ **边缘直出 (Edge SSR)**：由 Cloudflare 全球边缘节点直接服务端渲染完整 HTML，首屏 TTFB 极低，爬虫 100% 友好（SEO 无死角）。
- 🍃 **森系极简设计 (Forest & Paper)**：专为长篇手记打磨的温润纸感排版，无第三方重型 CSS 框架，原生 CSS 体积仅 ~8KB。
- 🌓 **零闪烁暗黑模式**：内联脚本瞬间读取偏好，彻底告别首屏白闪与布局偏移。
- 🔍 **全量中英文双模检索**：集成 SQLite FTS5 与智能模糊索引，支持标题/正文毫秒级实时搜索（快捷键 `Ctrl+K`）。
- 📑 **长文阅读增强**：顶部平滑阅读进度条、文章目录 (TOC) 自动解析与平滑滚动、代码块语言徽章与一键复制。
- 📊 **移动端友好表格**：自动包裹响应式容器，手机端表格横向自适应滚动，杜绝页面撑爆。
- 📝 **开箱即用后台 (`/admin/`)**：集成极简 Markdown 编辑器、实时预览、文章置顶、分类管理与站点配置。
- 📡 **全生态打通**：原生支持 RSS 2.0 (`/rss.xml`)、SEO Sitemap (`/sitemap.xml`) 与标准 RESTful API。

---

## 🛠️ 技术栈

| 层级 | 选用技术 |
| :--- | :--- |
| **运行时框架** | [Hono.js](https://hono.dev/) (Cloudflare Workers) |
| **数据库** | Cloudflare D1 (Serverless SQLite + FTS5) |
| **对象存储** | Cloudflare R2 (媒体图片与附件) |
| **Markdown 引擎** | Marked.js + 自定义扩展渲染器 |
| **身份认证** | Web Crypto 原生 HMAC-SHA256 Token 鉴权 |

---

## 🚀 快速开始与部署

### 1. 本地开发与测试

```bash
# 1. 安装依赖
npm install

# 2. 初始化本地 D1 数据库
npm run db:init

# 3. 启动本地开发服务器
npm run dev
```
本地访问：
- 前台：`http://127.0.0.1:8787/`
- 后台：`http://127.0.0.1:8787/admin/`（默认账号：`admin` / 密码：`admin123`）

---

### 2. 部署到 Cloudflare

#### 第一步：创建 Cloudflare D1 数据库
```bash
npx wrangler d1 create forest-blog-db
```
执行后将输出的 `database_id` 填入 `wrangler.toml` 的 `[[d1_databases]]` 中。

#### 第二步：初始化远端数据库表结构
```bash
npm run db:init:remote
```

#### 第三步：设置管理员密码（可选但推荐）
```bash
npx wrangler secret put ADMIN_PASSWORD
# 输入你的强密码
```

#### 第四步：一键部署上线
```bash
npm run deploy
```

---

## 📁 目录结构

```
forest-blog/
├── src/
│   ├── auth.ts          # Web Crypto 原生 Token 签名与验证
│   ├── db.ts            # D1 数据库查询、文章 CRUD 与检索
│   ├── index.ts         # Hono 路由入口与 SSR 挂载
│   ├── markdown.ts      # Markdown 解析、TOC 提取与代码高亮
│   ├── types.ts         # TypeScript 类型定义
│   ├── routes/
│   │   ├── admin.ts     # 管理后台 API 与 SPA 页面
│   │   └── api.ts       # 公开 REST API、RSS 与 Sitemap
│   └── theme/
│       ├── styles.ts    # 「森系手记」原生精调 CSS (~8KB)
│       └── views.ts     # Edge SSR 页面模板 (首页/文章/归档/友链/404)
├── schema.sql           # D1 数据库结构与初始化数据
├── wrangler.toml        # Cloudflare Workers 部署配置
├── tsconfig.json
└── package.json
```
