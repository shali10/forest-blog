// ==========================================================
// 森系手记 (Forest Notes) — 极简高质感纯原生 CSS (~8KB)
// ==========================================================

export const forestThemeCss = `
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  
  /* 浅色主题 (森系温润纸感) */
  --bg-page: #FBF9F5;
  --bg-card: #FFFFFF;
  --bg-subtle: #F2EDE4;
  --bg-accent-light: #EBF3EE;
  
  --text-main: #242E28;
  --text-body: #3C4A42;
  --text-muted: #6B7D72;
  --text-light: #98A89F;
  
  --primary: #2D634C;
  --primary-hover: #224C3A;
  --primary-glow: rgba(45, 99, 76, 0.15);
  
  --border: #E5DFD5;
  --border-focus: #2D634C;
  
  --code-bg: #F3EFE6;
  --code-header: #EAE4D8;
  --code-text: #2D3732;
  
  --shadow-sm: 0 1px 3px rgba(36, 46, 40, 0.05);
  --shadow-md: 0 4px 14px rgba(36, 46, 40, 0.08);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  
  --max-w: 860px;
}

[data-theme="dark"] {
  /* 深色主题 (深青黛沉浸夜色) */
  --bg-page: #131816;
  --bg-card: #1C2320;
  --bg-subtle: #242D29;
  --bg-accent-light: #1E2D26;
  
  --text-main: #E5EDE8;
  --text-body: #BDCCC3;
  --text-muted: #85988E;
  --text-light: #5A6D63;
  
  --primary: #5BAA86;
  --primary-hover: #75C29F;
  --primary-glow: rgba(91, 170, 134, 0.2);
  
  --border: #2B3730;
  --border-focus: #5BAA86;
  
  --code-bg: #101412;
  --code-header: #19201C;
  --code-text: #E5EDE8;
  
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
}

/* 基础重置 */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html {
  font-family: var(--font-sans);
  background-color: var(--bg-page);
  color: var(--text-body);
  line-height: 1.75;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.25s ease, color 0.25s ease;
}
a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.15s ease, opacity 0.15s ease;
}
a:hover { color: var(--primary-hover); }

/* 页面阅读进度条 */
#read-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  background: linear-gradient(to right, var(--primary), #88D4AF);
  z-index: 100;
  width: 0%;
  transition: width 0.1s ease-out;
}

/* 顶栏导航 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(251, 249, 245, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
[data-theme="dark"] .site-header {
  background: rgba(19, 24, 22, 0.85);
}
.header-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0.9rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.brand-logo {
  font-size: 1.4rem;
  line-height: 1;
}
.brand-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.02em;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.nav-item {
  color: var(--text-muted);
  font-size: 0.92rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.nav-item:hover, .nav-item.active {
  color: var(--primary);
}
.icon-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}
.icon-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
}

/* 核心内容区 */
.main-wrapper {
  max-width: var(--max-w);
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
  flex: 1;
}

/* 首页 Hero 区域 */
.hero-card {
  padding: 2rem 0 2.5rem;
  border-bottom: 1px dashed var(--border);
  margin-bottom: 2rem;
}
.hero-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}
.hero-desc {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 600px;
}

/* 分类/标签过滤器条 */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.8rem;
}
.filter-pill {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.85rem;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.filter-pill:hover, .filter-pill.active {
  background: var(--primary);
  color: #FFF;
  border-color: var(--primary);
}

/* 文章列表项卡片 */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.post-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.4rem 1.6rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}
.post-card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  color: var(--text-light);
  margin-bottom: 0.45rem;
}
.post-cat {
  background: var(--bg-accent-light);
  color: var(--primary);
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-weight: 600;
}
.pinned-badge {
  background: #E87A5D;
  color: #FFF;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.75rem;
}
.post-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.post-card-title a {
  color: var(--text-main);
}
.post-card-title a:hover {
  color: var(--primary);
}
.post-card-excerpt {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 0.8rem;
}
.post-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  color: var(--text-light);
}
.post-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.tag-item {
  color: var(--text-light);
}
.tag-item:hover {
  color: var(--primary);
}

/* 分页组件 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
}
.page-btn {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.88rem;
}
.page-btn.active {
  background: var(--primary);
  color: #FFF;
  border-color: var(--primary);
}
.page-btn:hover:not(.active) {
  border-color: var(--primary);
  color: var(--primary);
}

/* 文章详情页排版 */
.article-header {
  margin-bottom: 2.2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.article-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.35;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  font-size: 0.88rem;
  color: var(--text-light);
}

/* Markdown 正文排版 */
.article-content {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text-body);
}
.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  color: var(--text-main);
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  line-height: 1.4;
  position: relative;
}
.article-content h2 {
  font-size: 1.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}
.article-content h3 { font-size: 1.25rem; }
.article-content h4 { font-size: 1.1rem; }
.heading-anchor {
  position: absolute;
  left: -1.2rem;
  color: var(--text-light);
  opacity: 0;
  font-weight: 400;
  transition: opacity 0.15s ease;
}
.article-heading:hover .heading-anchor {
  opacity: 1;
}
.article-content p { margin-bottom: 1.25rem; }
.article-content ul, .article-content ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}
.article-content li { margin-bottom: 0.35rem; }
.article-content img {
  max-width: 100%;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  margin: 1.5rem 0;
}

/* 引用块 */
.forest-quote {
  background: var(--bg-accent-light);
  border-left: 4px solid var(--primary);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  color: var(--text-body);
  font-style: normal;
}
.forest-quote p:last-child { margin-bottom: 0; }

/* 代码块 */
.code-block {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
  overflow: hidden;
}
.code-header {
  background: var(--code-header);
  padding: 0.45rem 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}
.copy-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.15s ease;
}
.copy-btn:hover {
  background: var(--primary);
  color: #FFF;
  border-color: var(--primary);
}
.code-block pre {
  padding: 1rem 1.1rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--code-text);
}
:not(pre) > code {
  font-family: var(--font-mono);
  background: var(--bg-subtle);
  color: var(--primary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.88rem;
}

/* 表格移动端优化 */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}
.forest-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.92rem;
}
.forest-table th {
  background: var(--bg-subtle);
  color: var(--text-main);
  padding: 0.75rem 1rem;
  font-weight: 600;
  border-bottom: 2px solid var(--border);
}
.forest-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
}
.forest-table tr:nth-child(even) {
  background: var(--bg-accent-light);
}

/* 目录 (TOC) 模块 */
.toc-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
}
.toc-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.8rem;
}
.toc-list { list-style: none; padding-left: 0; }
.toc-item-2 { margin-left: 0; margin-bottom: 0.35rem; }
.toc-item-3 { margin-left: 1rem; margin-bottom: 0.25rem; font-size: 0.88rem; }
.toc-item-4 { margin-left: 2rem; margin-bottom: 0.2rem; font-size: 0.82rem; }

/* 搜索弹窗 */
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.modal-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}
.search-dialog {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 580px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.search-input-box {
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid var(--border);
  gap: 0.6rem;
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.05rem;
  color: var(--text-main);
  outline: none;
}
.search-results {
  max-height: 380px;
  overflow-y: auto;
  padding: 0.8rem;
}
.search-result-item {
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-sm);
  display: block;
  transition: background 0.15s ease;
}
.search-result-item:hover {
  background: var(--bg-subtle);
}
.search-result-title {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
}
.search-result-snippet {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.search-result-snippet mark {
  background: var(--bg-accent-light);
  color: var(--primary);
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
  font-weight: 600;
}

/* 页脚 */
.site-footer {
  border-top: 1px solid var(--border);
  background: var(--bg-card);
  padding: 2.5rem 1.25rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: auto;
}
.footer-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
}
.footer-links {
  display: flex;
  gap: 1rem;
}

@media (max-width: 640px) {
  .hero-title { font-size: 1.45rem; }
  .article-title { font-size: 1.55rem; }
  .header-inner { padding: 0.8rem 1rem; }
  .main-wrapper { padding: 1.5rem 1rem 3rem; }
  .post-card { padding: 1.1rem 1.2rem; }
}
`;
