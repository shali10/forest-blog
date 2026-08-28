-- ==========================================================
-- ForestBlog Database Schema (Cloudflare D1 / SQLite)
-- ==========================================================

-- 1. 分类表
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 文章表
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT DEFAULT '',
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    category_name TEXT DEFAULT '默认',
    tags TEXT DEFAULT '',
    status TEXT DEFAULT 'published', -- 'published' | 'draft'
    pinned INTEGER DEFAULT 0,        -- 1 = 置顶, 0 = 普通
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. 标签与关联
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 4. 友链与导航表
CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    avatar TEXT DEFAULT '',
    description TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. 站点通用配置（Key-Value）
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- 6. FTS5 全文索引虚拟表（支持标题与正文毫秒级中文分词搜索）
CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(
    title,
    content,
    slug,
    content='posts',
    content_rowid='id',
    tokenize='unicode61'
);

-- 7. FTS5 自动同步触发器
CREATE TRIGGER IF NOT EXISTS posts_ai AFTER INSERT ON posts BEGIN
  INSERT INTO posts_fts(rowid, title, content, slug) VALUES (new.id, new.title, new.content, new.slug);
END;

CREATE TRIGGER IF NOT EXISTS posts_ad AFTER DELETE ON posts BEGIN
  INSERT INTO posts_fts(posts_fts, rowid, title, content, slug) VALUES('delete', old.id, old.title, old.content, old.slug);
END;

CREATE TRIGGER IF NOT EXISTS posts_au AFTER UPDATE ON posts BEGIN
  INSERT INTO posts_fts(posts_fts, rowid, title, content, slug) VALUES('delete', old.id, old.title, old.content, old.slug);
  INSERT INTO posts_fts(rowid, title, content, slug) VALUES (new.id, new.title, new.content, new.slug);
END;

-- ==========================================================
-- 初始化基础数据
-- ==========================================================
INSERT OR IGNORE INTO categories (id, slug, name, description) VALUES
(1, 'tech', '技术札记', '系统架构、运维实战与开发踩坑手记'),
(2, 'thoughts', '随笔思考', '关于技术、生活与数字花园的思考');

INSERT OR IGNORE INTO settings (key, value) VALUES
('site_title', '林间随笔'),
('site_subtitle', 'Forest Notes'),
('site_description', '静谧森林里的技术札记与生活观察'),
('site_author', '你还不睡觉'),
('site_avatar', 'https://img.0000996.xyz/avatar.png'),
('site_favicon', '/assets/favicon.svg'),
('admin_username', 'admin');

-- 初始手记
INSERT OR IGNORE INTO posts (id, slug, title, content, excerpt, category_id, category_name, tags, status, pinned, views, created_at) VALUES
(1, 'cloudflare-edge-blog-deploy', 'Cloudflare 边缘博客部署实录', 
'# Cloudflare 边缘博客部署实录\n\n> 🎯 **目标**：彻底摆脱传统 VPS 博客的端口维护、内存占用与数据库备份负担，利用 Cloudflare 边缘计算全家桶（Workers + D1 + Hono）打造一套全球毫秒级直出、零服务器月租、具备动态后台与多主题换肤能力的现代化边缘手记。\n\n---\n\n## 📌 架构原理与方案选型\n\n在构建个人独立博客时，传统方案往往在「运维繁琐」与「功能受限」之间二选一：\n\n| 方案形态 | 典型代表 | 首屏性能 | 动态后台 / 检索 | 运维成本 | 服务器费用 |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **传统 VPS 动态博客** | WordPress / Halo | 取决于单机网络 | 完整支持 | 高（需维护 Nginx / Docker / DB） | ¥30~100/月 |\n| **静态博客 (SSG)** | Hugo / Hexo | 纯静态秒开 | 缺失（发布需重新编译） | 低 | 免费 |\n| **边缘计算博客 (Edge SSR)** | **ForestBlog (本项目)** | **全球边缘直出 (<50ms)** | **原生支持 (D1 + FTS5)** | **零运维 (Serverless)** | **完全免费** |\n\n📌 **核心原理**：\n1. **边缘直出 (Edge SSR)**：所有页面均由全球 300+ 个 Cloudflare 边缘节点直接运行 Hono 框架完成 HTML 渲染，首屏无需客户端多次拉取 JS 渲染，SEO 与 TTFB 达到极致。\n2. **轻量持久化**：采用 Cloudflare D1 (Serverless SQLite)，搭配原生 FTS5 虚拟表分词引擎，在不需要 Elasticsearch 等重型组件的前提下实现毫秒级全文检索。\n\n---\n\n## 💻 实操部署与配置\n\n### 1. 项目基础配置\n\n📁 `wrangler.toml`\n```toml\nname = "forest-blog"\nmain = "src/index.ts"\ncompatibility_date = "2026-08-28"\ncompatibility_flags = ["nodejs_compat"]\n\n[vars]\nSITE_TITLE = "林间随笔"\nSITE_SUBTITLE = "Forest Notes"\nSITE_DESCRIPTION = "静谧森林里的技术札记与生活观察"\nSITE_AUTHOR = "root"\nADMIN_USERNAME = "admin"\n\n[[d1_databases]]\nbinding = "DB"\ndatabase_name = "forest-blog-db"\ndatabase_id = "your-database-id-here"\n```\n\n### 2. 数据库结构初始化\n\n在本地或 Cloudflare D1 控制台执行初始化建表，包含分类、文章、标签、站点配置与 FTS5 全文索引触发器。\n\n📁 `schema.sql`\n```sql\n-- 启用 SQLite 原生 FTS5 全文索引\nCREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(\n    title,\n    content,\n    slug,\n    content=''posts'',\n    content_rowid=''id'',\n    tokenize=''unicode61''\n);\n\n-- 自动同步增删改触发器\nCREATE TRIGGER IF NOT EXISTS posts_ai AFTER INSERT ON posts BEGIN\n  INSERT INTO posts_fts(rowid, title, content, slug) VALUES (new.id, new.title, new.content, new.slug);\nEND;\n```\n\n### 3. 一键编译与部署\n\n通过 Wrangler CLI 一键推送到全球边缘网络：\n\n```bash\n# 1. 安装依赖并初始化远端 D1 数据库\nnpm install\nnpm run db:init:remote\n\n# 2. 设置强密码密钥\nnpx wrangler secret put ADMIN_PASSWORD\n\n# 3. 部署上线\nnpm run deploy\n```\n\n---\n\n## ⚠️ 避坑与调优要点\n\n💡 **提示**：\n- **主题即时换肤**：内置 6 套精选调色盘（森系温润、落樱和风、宇治抹茶、星野深蓝、Geist 极客、赛博深夜），通过 CSS 变量驱动，并在 `<head>` 顶部注入极简内联脚本，优先从 `localStorage` 读取主题，实现首屏 **0 闪烁**。\n\n⚠️ **避坑指南**：\n1. **D1 批量写入与换行符转义**：导入外部 Markdown 内容时，需注意换行符 `\\n` 的转义层级，避免在 SQL 解析时将多行正文拼接成单行。\n2. **隐藏公开管理入口**：不要在全站公共页脚（Footer）暴露后台登录链接，管理员统一通过私密路径 `/admin/` 进入后台，杜绝自动化脚本扫描。\n3. **密码占位提示清理**：线上登录页严禁出现 `默认密码: admin123` 等提示性占位文本。\n\n---\n\n## 🔍 验证与运行表现\n\n| 验证维度 | 测试指标 / 表现 | 结论 |\n| :--- | :--- | :--- |\n| **首屏 TTFB 响应** | 边缘节点冷启动响应耗时 **< 45ms** | 极致秒开，无白屏感知 |\n| **全文检索响应** | 基于 FTS5 的中英文关键词模糊搜索 **< 15ms** | 毫秒级返回高亮匹配结果 |\n| **全端响应式** | 手机端自适应抽屉导航 + 表格防撑爆自适应滚动 | 移动端阅读体验丝滑 |\n| **资源消耗** | 零 VPS 进程驻留，每日免费额度支撑 10 万+ PV | 真正的零成本与零运维 |\n',
'基于 Cloudflare Workers + D1 构建现代边缘手记，零服务器成本、毫秒级冷启动直出、内置 6 套主题换肤与 FTS5 全文检索，全流程实操与避坑手记。',
1, '技术札记', 'Cloudflare,Workers,D1,Serverless,博客', 'published', 1, 38, CURRENT_TIMESTAMP);
