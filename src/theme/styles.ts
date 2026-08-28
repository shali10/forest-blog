// ==========================================================
// 经典温暖手帐风 (Warm Pastel Cream & 3D Cards Theme)
// 100% 还原并增强之前版本的治愈系排版、左右侧边栏与卡片设计
// ==========================================================

export const forestThemeCss = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=LXGW+WenKai+Screen:wght@400;700&display=swap');

:root {
  --header-bg: linear-gradient(135deg, #7DC395, #5BAF7A);
  --card-bg: #F7F3DF;
  --card-border: #E8E0CC;
  --body-bg: #F8F8F0;
  --text-primary: #794F27;
  --text-body: #725D42;
  --text-secondary: #9F927D;
  --btn-bg: #19C8B9;
  --btn-shadow: #11A89B;
  
  --font-main: 'LXGW WenKai Screen', 'LXGW WenKai', Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

[data-theme="dark"] {
  --header-bg: linear-gradient(135deg, #2D523C, #1E3B2A);
  --card-bg: #222924;
  --card-border: #323E37;
  --body-bg: #181D1A;
  --text-primary: #EAE2D5;
  --text-body: #CCC4B6;
  --text-secondary: #8E9C93;
  --btn-bg: #22A094;
  --btn-shadow: #156E66;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-main);
  background: var(--body-bg);
  color: var(--text-body);
  line-height: 1.7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background 0.2s ease, color 0.2s ease;
}
button, input, select, textarea { font-family: inherit; }
a { color: var(--btn-bg); text-decoration: none; transition: all 0.2s; }
a:hover { filter: brightness(0.9); }

/* 顶栏 Header Banner */
header {
  background: var(--header-bg);
  color: #fff;
  padding: 45px 20px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
header::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 35px;
  background: linear-gradient(transparent, rgba(0,0,0,0.06));
}
header h1 {
  font-size: 2.5em;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.12);
}
header a { color: #fff; text-decoration: none; }
header p {
  opacity: 0.95;
  font-size: 1.1em;
  font-weight: 500;
}

/* 顶栏快捷操作区 */
.header-actions {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
}
.theme-btn, .search-trigger-btn {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  padding: 6px 14px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.88em;
  font-weight: 700;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.theme-btn:hover, .search-trigger-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

/* 主内容三栏布局 */
main {
  max-width: 1360px;
  width: 100%;
  margin: 30px auto;
  padding: 0 20px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
}

/* 左侧栏 & 右侧栏 */
.sidebar { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 20px; }
.sidebar-right { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 20px; }
.post-list-col { width: 740px; flex-shrink: 0; display: flex; flex-direction: column; gap: 24px; }

/* 治愈系个人资料卡片 (Profile Card) */
.profile-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(107, 92, 67, 0.12);
  border: 2px solid var(--card-border);
}
.profile-card .avatar-box {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 0 auto 14px;
  border: 3px solid var(--card-border);
  background: var(--body-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.profile-card .name {
  font-size: 1.25em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 6px;
  color: var(--text-primary);
}
.profile-card .bio {
  color: var(--text-body);
  font-size: 0.88em;
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.5;
}
.profile-card .stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 2px dashed var(--card-border);
}
.profile-card .stat-item { text-align: center; }
.profile-card .stat-num {
  font-size: 1.25em;
  font-weight: 800;
  color: var(--btn-bg);
  display: block;
}
.profile-card .stat-label {
  font-size: 0.78em;
  color: var(--text-secondary);
  font-weight: 600;
}
.card-section-title {
  font-size: 0.88em;
  color: var(--text-secondary);
  margin: 16px 0 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 分类与链接列表 */
.category-list a, .link-list a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  margin-bottom: 8px;
  color: var(--text-body);
  background: var(--body-bg);
  border-radius: 12px;
  font-size: 0.88em;
  font-weight: 700;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
.category-list a:hover, .link-list a:hover {
  background: #E6F9F6;
  border-color: var(--btn-bg);
  color: var(--btn-shadow);
  transform: translateX(3px);
}
[data-theme="dark"] .category-list a:hover, [data-theme="dark"] .link-list a:hover {
  background: #1B2E28;
}

/* 标签云气泡 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.8em;
  font-weight: 700;
  color: #fff !important;
  text-decoration: none;
  transition: all 0.25s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}
.tag-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  filter: brightness(0.95);
}

/* 文章列表项卡片 (Post Card) */
.post-card {
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(107, 92, 67, 0.12);
  border: 2px solid var(--card-border);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(114, 93, 66, 0.18);
  border-color: var(--btn-bg);
}
.post-card .post-cover {
  width: 210px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #E6F9F6, #D2F2EC);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border-right: 2px solid var(--card-border);
}
[data-theme="dark"] .post-card .post-cover {
  background: linear-gradient(135deg, #1C2E27, #16241E);
}
.post-card .post-content {
  flex: 1;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}
.post-card h2 {
  font-size: 1.35em;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-weight: 800;
  line-height: 1.4;
}
.post-card h2 a {
  color: var(--text-primary);
  text-decoration: none;
}
.post-card h2 a:hover {
  color: var(--btn-bg);
}
.post-card .excerpt {
  font-size: 0.9em;
  color: var(--text-body);
  line-height: 1.65;
  margin-bottom: 16px;
}
.post-card .meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.82em;
  font-weight: 700;
  color: var(--text-secondary);
}
.meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 3D 实体圆角按钮 */
a.read-more-btn {
  display: inline-block;
  padding: 7px 18px;
  background: var(--btn-bg);
  color: #fff !important;
  text-decoration: none;
  border-radius: 50px;
  font-size: 0.82em;
  font-weight: 700;
  box-shadow: 0 3px 0 0 var(--btn-shadow);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
a.read-more-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 0 0 var(--btn-shadow);
}
a.read-more-btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 0 var(--btn-shadow);
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0 30px;
}
.pagination a, .pagination span {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.88em;
  text-decoration: none;
  transition: all 0.2s;
}
.pagination a {
  background: var(--card-bg);
  color: var(--text-body);
  border: 2px solid var(--card-border);
}
.pagination a:hover {
  background: var(--btn-bg);
  color: #fff;
  border-color: var(--btn-bg);
}
.pagination .current {
  background: var(--btn-bg);
  color: #fff;
  border: 2px solid var(--btn-bg);
  box-shadow: 0 3px 0 var(--btn-shadow);
}

/* 文章详情页 */
.article-container {
  width: 100%;
  background: var(--card-bg);
  border-radius: 20px;
  padding: 35px 40px;
  box-shadow: 0 4px 12px rgba(107, 92, 67, 0.12);
  border: 2px solid var(--card-border);
}
.article-header {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px dashed var(--card-border);
}
.article-title {
  font-size: 2.1em;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.35;
  margin-bottom: 14px;
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.88em;
  font-weight: 700;
  color: var(--text-secondary);
}

/* Markdown 排版 */
.article-body {
  font-size: 1.05em;
  line-height: 1.9;
  color: var(--text-body);
}
.article-body h1, .article-body h2, .article-body h3, .article-body h4 {
  color: var(--text-primary);
  font-weight: 800;
  margin-top: 1.8em;
  margin-bottom: 0.6em;
}
.article-body h2 {
  font-size: 1.5em;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--card-border);
}
.article-body h3 { font-size: 1.25em; }
.article-body p { margin-bottom: 1.25em; }
.article-body ul, .article-body ol { margin-bottom: 1.25em; padding-left: 1.6em; }
.article-body li { margin-bottom: 0.4em; }

/* 治愈系引用卡片 */
.forest-quote {
  background: var(--body-bg);
  border-left: 5px solid var(--btn-bg);
  border-radius: 0 16px 16px 0;
  padding: 14px 20px;
  margin: 1.5em 0;
  font-style: normal;
  border-top: 1px solid var(--card-border);
  border-right: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);
}

/* 代码块 */
.code-block {
  background: #282C34;
  border-radius: 14px;
  margin: 1.6em 0;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
}
.code-header {
  background: #21252B;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.8em;
  color: #ABB2BF;
}
.copy-btn {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  color: #FFF;
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 0.75em;
  cursor: pointer;
  transition: all 0.2s;
}
.copy-btn:hover { background: var(--btn-bg); border-color: var(--btn-bg); }
.code-block pre {
  padding: 16px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: #ABB2BF;
  line-height: 1.6;
}
:not(pre) > code {
  font-family: var(--font-mono);
  background: var(--body-bg);
  color: #D35400;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid var(--card-border);
  font-size: 0.9em;
}

/* 表格 */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 1.5em 0;
  border-radius: 12px;
  border: 2px solid var(--card-border);
}
.forest-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.forest-table th {
  background: var(--body-bg);
  color: var(--text-primary);
  padding: 10px 14px;
  font-weight: 800;
  border-bottom: 2px solid var(--card-border);
}
.forest-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--card-border);
}

/* 目录 (TOC) */
.toc-card {
  background: var(--body-bg);
  border: 2px solid var(--card-border);
  border-radius: 16px;
  padding: 18px 20px;
  margin-bottom: 25px;
}
.toc-card-title {
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 1.05em;
}
.toc-card ul { list-style: none; padding-left: 0; }
.toc-card li { margin-bottom: 6px; font-weight: 600; font-size: 0.92em; }
.toc-card .toc-item-3 { padding-left: 16px; font-size: 0.86em; }

/* 搜索弹窗 */
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.modal-backdrop.open { opacity: 1; pointer-events: auto; }
.search-dialog {
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 20px;
  width: 90%;
  max-width: 580px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
}
.search-input-box {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 2px solid var(--card-border);
  gap: 10px;
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1em;
  color: var(--text-primary);
  outline: none;
  font-weight: 700;
}
.search-results { max-height: 400px; overflow-y: auto; padding: 12px; }
.search-result-item {
  padding: 10px 14px;
  border-radius: 12px;
  display: block;
  transition: background 0.15s ease;
}
.search-result-item:hover { background: var(--body-bg); }
.search-result-title { font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
.search-result-snippet { font-size: 0.85em; color: var(--text-secondary); line-height: 1.5; }

/* 页脚 */
footer {
  text-align: center;
  padding: 35px 20px;
  color: var(--text-secondary);
  font-size: 0.9em;
  font-weight: 600;
}
footer a { color: var(--text-primary); font-weight: 700; }

@media (max-width: 1100px) {
  .sidebar-right { display: none; }
  .post-list-col { width: 100%; flex: 1; }
}
@media (max-width: 768px) {
  header h1 { font-size: 1.8em; }
  main { flex-direction: column; padding: 0 12px; margin-top: 16px; }
  .sidebar { width: 100%; }
  .post-card { flex-direction: column; }
  .post-card .post-cover { width: 100%; height: 120px; border-right: none; border-bottom: 2px solid var(--card-border); }
  .article-container { padding: 22px 18px; }
}
`;
