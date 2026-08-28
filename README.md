# 🌿 ForestBlog (林间随笔)

> 🍃 **静谧温润、毫秒直出** —— 基于 **Cloudflare Workers + D1 + Hono** 构建的现代化 Serverless 边缘博客系统。

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/shali10/forest-blog)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange.svg)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Framework-Hono%20v4-E36002.svg)](https://hono.dev/)
[![Database](https://img.shields.io/badge/Database-Cloudflare%20D1%20(FTS5)-blue.svg)](https://developers.cloudflare.com/d1/)

兼具静态博客的 **零维护、零月租、全球 CDN 边缘毫秒级直出**，与动态博客的 **在线后台管理、实时发布、6套精选主题即时换肤与全文检索** 能力。

🔗 **在线演示 DEMO**：[https://forest.0000996.xyz](https://forest.0000996.xyz)

---

## 📸 视觉效果展示 (Showcase)

### 1. 首页 · 典雅森系纸感卡片与全功能侧边栏
> 温润纸质质感，清晰的统计卡片、分类导航、精选标签与友情链接。
![首页预览](docs/images/preview-home.png)

### 2. 🎨 6 套精选主题调色盘 · 实时一键换肤
> 点击右上角 `🎨 配色` 随时切换：**静谧林间、温润米纸、午夜曜黑、冷翠山岚、落日暖杏、薄暮苍蓝**。偏好本地持久化记忆，首屏零闪烁。
![主题切换预览](docs/images/preview-theme-switcher.png)

### 3. 📖 沉浸式长文阅读 · 目录 TOC 与精调排版
> 顶部平滑阅读进度条、代码高亮一键复制、文章目录智能跳转与响应式图文渲染。
![文章阅读预览](docs/images/preview-article.png)

### 4. 📱 移动端极致适配 · 丝滑抽屉导航
> 针对手机端深度调优，抽屉式导航栏、自适应表格横向滚动，小屏幕阅读体验绝佳。
![移动端预览](docs/images/preview-mobile.png)

---

## 🚀 极速部署指南 (3 种方式任意选)

无论你是完全没有编程经验的小白，还是习惯命令行的开发者，都可以轻松在 1~3 分钟内拥有属于自己的边缘博客。

---

### 方案 A：Fork 一键部署 (最推荐 · 纯网页点击)

只需点击下方按钮，Cloudflare 会引导你自动 Fork 本仓库并完成边缘 Worker 部署：

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/shali10/forest-blog)

1. 点击上方 **Deploy with Workers** 按钮。
2. 登录你的 Cloudflare 账号，按照网页指引授权 GitHub 并 Fork 本项目。
3. 在 Cloudflare 控制台为其绑定一个 **D1 数据库**（名称：`forest-blog-db`）。
4. 在 D1 控制台的 **Console** 中粘贴执行本项目根目录的 `schema.sql` 即可完成初始化！

---

### 方案 B：Cloudflare 控制台 Git 导入 (零终端 · 鼠标操作)

如果你想跟随 GitHub 仓库提交自动持续集成部署：

1. **Fork 仓库**：点击本项目右上角 **Fork**，克隆一份到你自己的 GitHub 账号下。
2. **登录 Cloudflare**：进入 [Cloudflare 控制台](https://dash.cloudflare.com/)。
3. **创建 D1 数据库**：
   - 导航到 **Storage & Databases** → **D1 SQL Database** → **Create database**。
   - 数据库名称输入 `forest-blog-db`，创建完成后进入 **Console**。
   - 将本项目 `schema.sql` 的内容复制粘贴进去并点击 **Execute** 执行初始化。
4. **连接 Git 部署**：
   - 导航到 **Compute (Workers & Pages)** → **Create Application** → **Pages** → **Connect to Git**。
   - 选择刚才 Fork 的 `forest-blog` 仓库，点击 **Begin setup**。
   - 构建预设选择 **None**（或 Framework: None），构建命令留空或 `npm run build`。
   - 在 **Settings** → **Functions** / **Bindings** 中添加 D1 数据库绑定（Variable name: `DB`，绑定刚才创建的 `forest-blog-db`）。
5. **点击 Save and Deploy**：等待 10 秒即刻上线！

---

### 方案 C：CLI 终端快速部署 (极客开发者 · 3步搞定)

如果你本地安装了 Node.js，通过终端只需 3 条命令：

```bash
# 1. 克隆代码并安装依赖
git clone https://github.com/shali10/forest-blog.git
cd forest-blog
npm install

# 2. 创建 Cloudflare D1 数据库并初始化表结构
npx wrangler d1 create forest-blog-db
# 将输出的 database_id 填入 wrangler.toml
npm run db:init:remote

# 3. 一键发布上线
npm run deploy
```

> 💡 **设置管理员密码**：
> ```bash
> npx wrangler secret put ADMIN_PASSWORD
> # 输入自定义管理员密码（默认未设置时密码为 admin123）
> ```

---

## ✨ 核心特性一览

| 模块 | 特性亮点 |
| :--- | :--- |
| **⚡ 边缘渲染 (Edge SSR)** | Cloudflare Workers 全球 300+ 边缘节点直出 HTML，首屏 TTFB < 50ms，SEO 极佳。 |
| **🎨 6套精调主题** | 内置森系绿、米纸暖白、暗黑、山岚冷翠、暖杏、暮蓝，支持一键实时无刷切换。 |
| **🔍 全文即时检索** | 基于 SQLite FTS5 全文索引，支持 `Ctrl + K` 快捷键瞬间调出搜索弹窗。 |
| **📝 开箱即用后台** | 访问 `/admin/` 即可管理文章、分类、友链与全站配置，支持 Markdown 实时双栏预览。 |
| **📱 全端响应式** | 手机端专属汉堡菜单抽屉导航，表格自动包裹防撑爆容器。 |
| **📡 标准生态** | 原生输出 RSS 2.0 订阅源 (`/rss.xml`) 与搜索引擎 Sitemap (`/sitemap.xml`)。 |
| **💰 真正的零成本** | 充分利用 Cloudflare 免费额度（每日 10 万次 Workers 请求 + D1 免费读写），完全无需服务器。 |

---

## 📁 目录结构

```
forest-blog/
├── docs/
│   └── images/              # 高清效果图与主题展示
├── src/
│   ├── index.ts             # Hono 路由入口与 SSR 挂载
│   ├── auth.ts              # HMAC-SHA256 Token 签名鉴权
│   ├── db.ts                # D1 数据库交互与 FTS5 检索逻辑
│   ├── markdown.ts          # Markdown 解析、目录 TOC 提取与代码高亮
│   ├── routes/
│   │   ├── admin.ts         # 管理后台 API 与 SPA 页面
│   │   └── api.ts           # 公开 REST API、RSS 与 Sitemap
│   └── theme/
│       ├── styles.ts        # 6 套调色盘 CSS 变量与极简样式
│       └── views.ts         # Edge SSR 页面模板 (首页/文章/归档/友链)
├── schema.sql               # D1 数据库结构与初始化数据
├── wrangler.toml            # Cloudflare Workers 部署配置
└── package.json
```

---

## 📄 开源协议

本项目基于 [MIT 协议](LICENSE) 开源，欢迎自由 Fork、修改与分享！
