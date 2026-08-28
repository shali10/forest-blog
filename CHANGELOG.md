# 📝 更新日志 (Changelog)

本项目遵循 [Semantic Versioning (语义化版本)](https://semver.org/lang/zh-CN/) 规范。

---

## [v1.1.0] - 2026-08-28

### ✨ 新增特性 (Features)
- **🎨 灵动名言金句主展示区**：
  - 顶栏精选文学/哲思/极客名言池（涵盖科恩、屈原、乔布斯、Linus 等），首屏加载随机展现。
  - 支持点击名言触发呼吸微动效并即时轮播切换下一句。
- **📱 一体化毛玻璃 Topbar**：
  - 移动端与桌面端导航结构重构，圆角抽屉菜单与站点品牌胶囊一体化，视觉协调统一。
- **🔗 文章一键分享**：
  - 文章详情页新增「分享文章」按钮，支持一键复制当前文章 URL 并触发毛玻璃 Toast 浮层提示。
- **🖼️ 图片灯箱 (Lightbox)**：
  - 文章内部所有图片支持点击放大查看与背景模糊遮罩。
- **💻 Prism 语法高亮**：
  - 代码块集成轻量级 PrismJS 语法着色（One Dark 调色），支持代码一键复制。
- **📈 平滑阅读进度条 & 回到顶部**：
  - 页面顶部增加细窄阅读进度指示条，页面滚动超 280px 时淡入右下角「↑ 回到顶部」悬浮按钮。
- **⚙️ 后台 Markdown 工具栏 & 一键数据备份**：
  - 管理后台新增粗体、斜体、标题、表格、代码块等快捷插入工具栏。
  - 支持一键导出全站数据为标准 JSON 备份文件 (`/api/admin/export`)。
  - 文章编辑支持实时切换「📌 置顶」与「草稿/发布」状态。
- **🤖 GitHub Actions CI/CD**：
  - 新增 `.github/workflows/deploy.yml` 自动化持续集成与 Cloudflare Workers 部署流水线。
- **🌐 国际化文档**：
  - 编写并上线了完整的英文说明文档 `README.en.md`。

### 💄 视觉与调优 (UI & Polish)
- 优化 6 套主题配色变量（森系温润、落樱和风、宇治抹茶、星野深蓝、Geist 极客、赛博深夜）。
- 首屏未选主题时智能检测并跟随系统深色偏好（`prefers-color-scheme: dark`）。
- 补全 OpenGraph (`og:image`/`og:title`) 与 Twitter Card 社交分享大图卡片。

---

## [v1.0.0] - 2026-08-28

### 🚀 初始里程碑发布 (Initial Release)
- **⚡ Serverless 边缘架构**：
  - 基于 Cloudflare Workers + Hono v4 构建，全球 300+ 边缘节点直出 HTML (Edge SSR)，TTFB < 45ms。
- **🗄️ D1 数据库与 FTS5 全文搜索**：
  - 基于 Cloudflare D1 (Serverless SQLite)，内置 FTS5 虚拟表 + LIKE 混合中英文分词检索引擎。
  - 支持 `Ctrl + K` 快捷键全局即时搜索。
- **🎨 6 套精美主题调色盘**：
  - 内置经典纸感手帐风格与 6 款主题，支持无刷新实时切换与 localStorage 记忆持久化。
- **📝 开箱即用管理后台**：
  - 访问 `/admin/` 即可通过 JWT HMAC-SHA256 签名鉴权登录管理文章、分类与全站配置。
- **📡 标准内容生态**：
  - 原生支持 RSS 2.0 订阅源 (`/rss.xml`) 与搜索引擎 Sitemap (`/sitemap.xml`)。
- **📦 一键部署支持**：
  - 提供 Cloudflare "Deploy with Workers" 纯网页一键 Fork 部署与 CLI 终端部署双方案。
