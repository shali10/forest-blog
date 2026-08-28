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
('site_author', 'root'),
('site_avatar', '/assets/avatar.png'),
('site_favicon', '/assets/favicon.svg'),
('admin_username', 'admin');

-- 初始示例手记
INSERT OR IGNORE INTO posts (id, slug, title, content, excerpt, category_id, category_name, tags, status, pinned, views, created_at) VALUES
(1, 'hello-forest-blog', '你好，林间随笔：基于 Cloudflare Workers 的下一代边缘手记', 
'# 你好，林间随笔 🌿\n\n欢迎来到基于 **Cloudflare Workers + D1 + R2** 构建的现代化边缘手记系统。\n\n## 💡 为什么要做这套系统？\n\n传统博客系统要么过于庞大臃肿（依赖昂贵的 VPS 与复杂的反向代理），要么缺乏后台动态管理能力（纯静态编译部署繁琐）。\n\n本手记系统融合了两者的极致优势：\n\n- **⚡ 边缘直出 (Edge SSR)**：由 Cloudflare 边缘节点直接渲染 HTML 并注入 Cache API，全球首屏 TTFB 毫秒级打开。\n- **🍃 森系极简美学**：精心调校的色温、无闪烁深色模式、优雅的代码高亮与平滑响应式布局。\n- **🔍 原生 FTS5 全文搜索**：利用 SQLite 原生分词索引，毫秒检索全站长文。\n- **🛡️ 零运维与零成本**：无需购买服务器，享受 Cloudflare Serverless 全家桶的全球加速与高可用。',
'欢迎来到基于 Cloudflare Workers + D1 + R2 构建的现代化边缘手记系统。零运维成本，极致边缘秒开。',
1, '技术札记', 'Cloudflare,Serverless,边缘计算,博客', 'published', 1, 1, CURRENT_TIMESTAMP);
