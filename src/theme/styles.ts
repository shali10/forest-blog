// ==========================================================
// 经典温暖手帐风 + 多主题配色系统 (6 套精调高级主题)
// 包含：森系温润、落樱和风、极简极客、宇治抹茶、星野深蓝、赛博极夜
// ==========================================================

export const forestThemeCss = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=LXGW+WenKai+Screen:wght@400;700&display=swap');

:root {
  --font-main: 'LXGW WenKai Screen', 'LXGW WenKai', Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 1. 默认：森系手帐 (Forest Warm) */
:root, [data-theme="forest"] {
  --header-bg: linear-gradient(135deg, #6FB987, #4E9F6E);
  --card-bg: #F7F3DF;
  --card-border: #E8E0CC;
  --body-bg: #F8F8F0;
  --text-primary: #794F27;
  --text-body: #725D42;
  --text-secondary: #9F927D;
  --btn-bg: #19C8B9;
  --btn-shadow: #11A89B;
  --cover-bg: linear-gradient(135deg, #E6F9F6, #D2F2EC);
  --code-bg: #282C34;
}

/* 2. 落樱和风 (Sakura Sweet) */
[data-theme="sakura"] {
  --header-bg: linear-gradient(135deg, #F8A6B2, #E87A90);
  --card-bg: #FFF5F7;
  --card-border: #FAD1D8;
  --body-bg: #FFF0F3;
  --text-primary: #6B3340;
  --text-body: #7D4E5B;
  --text-secondary: #B5838E;
  --btn-bg: #E87A90;
  --btn-shadow: #C4576D;
  --cover-bg: linear-gradient(135deg, #FFE5EC, #FFD1DC);
  --code-bg: #2E2528;
}

/* 3. 宇治抹茶 (Matcha Zen) */
[data-theme="matcha"] {
  --header-bg: linear-gradient(135deg, #7A9D54, #557A46);
  --card-bg: #F4F7EE;
  --card-border: #DDE5D0;
  --body-bg: #EAF0E2;
  --text-primary: #344C2B;
  --text-body: #49633F;
  --text-secondary: #7F9975;
  --btn-bg: #557A46;
  --btn-shadow: #3D5832;
  --cover-bg: linear-gradient(135deg, #E0EBD4, #CDE0BC);
  --code-bg: #232B20;
}

/* 4. 星野深蓝 (Starry Ocean) */
[data-theme="ocean"] {
  --header-bg: linear-gradient(135deg, #4A709C, #2E4B72);
  --card-bg: #F0F4F8;
  --card-border: #D0DCE7;
  --body-bg: #E3EBF3;
  --text-primary: #1C334E;
  --text-body: #324B68;
  --text-secondary: #6B85A3;
  --btn-bg: #3E78B2;
  --btn-shadow: #285582;
  --cover-bg: linear-gradient(135deg, #DCE7F3, #C7D9EC);
  --code-bg: #1E2734;
}

/* 5. Geist 极简极客 (Geist Monochrome) */
[data-theme="geek"] {
  --header-bg: linear-gradient(135deg, #24292E, #141618);
  --card-bg: #FFFFFF;
  --card-border: #E1E4E8;
  --body-bg: #F6F8FA;
  --text-primary: #24292E;
  --text-body: #444D56;
  --text-secondary: #6A737D;
  --btn-bg: #0366D6;
  --btn-shadow: #024EA4;
  --cover-bg: linear-gradient(135deg, #EAEFF5, #DCE3EB);
  --code-bg: #1B1F23;
}

/* 6. 赛博深邃暗夜 (Cyber Dark) */
[data-theme="cyber"] {
  --header-bg: linear-gradient(135deg, #1F2430, #13161F);
  --card-bg: #1B1E28;
  --card-border: #2B3142;
  --body-bg: #12141C;
  --text-primary: #E2E8F0;
  --text-body: #CBD5E1;
  --text-secondary: #8090A8;
  --btn-bg: #38BDF8;
  --btn-shadow: #0284C7;
  --cover-bg: linear-gradient(135deg, #242938, #181C26);
  --code-bg: #0F131A;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-main);
  background: var(--body-bg);
  color: var(--text-body);
  line-height: 1.75;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background 0.25s ease, color 0.25s ease;
}
button, input, select, textarea { font-family: inherit; }
a { color: var(--btn-bg); text-decoration: none; transition: all 0.2s; }
a:hover { filter: brightness(0.9); }

/* 顶部平滑阅读进度条 */
#reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5px;
  background: var(--btn-bg);
  z-index: 2000;
  width: 0%;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px var(--btn-bg);
}

/* 悬浮回到顶部按钮 */
.back-to-top-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  color: var(--text-primary);
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 800;
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 998;
}
.back-to-top-btn.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.back-to-top-btn:hover {
  background: var(--btn-bg);
  color: #fff;
  border-color: var(--btn-bg);
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
}

/* 移动端遮罩层 */
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 1010;
}
.mobile-overlay.show {
  display: block;
}

/* 顶栏 Header Banner */
header {
  background: var(--header-bg);
  color: #fff;
  padding: 20px 24px 42px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
}
header::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 35px;
  background: linear-gradient(transparent, rgba(0,0,0,0.08));
}

/* 顶部一体化导航条 (Topbar) */
.header-topbar {
  max-width: 1360px;
  margin: 0 auto 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
}
.header-topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.site-brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  padding: 6px 14px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.9em;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
}
.site-brand-pill:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
}
.mobile-nav-btn {
  display: none;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  font-size: 1.15rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
}
.mobile-nav-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.header-topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.theme-btn, .search-trigger-btn {
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.35);
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

/* 名言金句主展示区 */
.quote-hero-box {
  max-width: 820px;
  margin: 0 auto;
  padding: 10px 16px;
  position: relative;
  z-index: 5;
  cursor: pointer;
  user-select: none;
}
.quote-text {
  font-size: 2.1em;
  font-weight: 800;
  line-height: 1.45;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 6px rgba(0,0,0,0.15);
  margin-bottom: 12px;
  display: inline-block;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.quote-author {
  opacity: 0.92;
  font-size: 1.05em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.quote-refresh-hint {
  font-size: 0.8em;
  opacity: 0.75;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 6px;
}
.quote-hero-box:hover .quote-text {
  transform: scale(1.015);
}

/* 多主题切换弹窗 */
.theme-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 1020;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.theme-modal.open { opacity: 1; pointer-events: auto; }
.theme-modal-card {
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 20px;
  padding: 24px;
  width: 90%;
  max-width: 440px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}
.theme-option-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--body-bg);
  border: 2px solid var(--card-border);
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.9em;
  transition: all 0.2s ease;
}
.theme-option-btn:hover, .theme-option-btn.active {
  border-color: var(--btn-bg);
  background: #FFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
.theme-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid rgba(0,0,0,0.1);
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
.sidebar { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }
.sidebar-right { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }
.post-list-col { width: 740px; flex-shrink: 0; display: flex; flex-direction: column; gap: 24px; }

/* 治愈系个人资料卡片 (Profile Card) */
.profile-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 4px 12px rgba(107, 92, 67, 0.12);
  border: 2px solid var(--card-border);
}
.profile-card .avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 12px;
  display: block;
  border: 3px solid var(--card-border);
  background: #FFF;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.profile-card .name {
  font-size: 1.15em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.profile-card .bio {
  color: var(--text-body);
  font-size: 0.85em;
  text-align: center;
  margin-bottom: 14px;
  line-height: 1.5;
}
.profile-card .stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 14px;
}
.profile-card .stat-item { text-align: center; }
.profile-card .stat-num {
  font-size: 1.2em;
  font-weight: 800;
  color: var(--btn-bg);
  display: block;
}
.profile-card .stat-label {
  font-size: 0.75em;
  color: var(--text-secondary);
  font-weight: 600;
}
.profile-card h4 {
  font-size: 0.85em;
  color: var(--text-secondary);
  margin: 14px 0 8px;
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
  padding: 8px 12px;
  margin-bottom: 6px;
  color: var(--text-body);
  background: var(--body-bg);
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 700;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}
.category-list a:hover, .link-list a:hover {
  background: #FFF;
  border-color: var(--btn-bg);
  color: var(--btn-shadow);
  transform: translateX(3px);
}

/* 标签云气泡 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 0;
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

/* 置顶文章标签 */
.pinned-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: linear-gradient(135deg, #FF6B6B, #EE5253);
  color: #fff !important;
  font-size: 0.72em;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  margin-right: 8px;
  vertical-align: middle;
  box-shadow: 0 2px 6px rgba(238, 82, 83, 0.3);
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
  background: var(--cover-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border-right: 2px solid var(--card-border);
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
a.read-more-btn, button.share-action-btn {
  display: inline-block;
  padding: 7px 18px;
  background: var(--btn-bg);
  color: #fff !important;
  text-decoration: none;
  border-radius: 50px;
  font-size: 0.82em;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 0 0 var(--btn-shadow);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
a.read-more-btn:hover, button.share-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 0 0 var(--btn-shadow);
}
a.read-more-btn:active, button.share-action-btn:active {
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
  align-items: center;
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
  overflow-wrap: break-word;
  word-break: break-word;
}
.article-body h1, .article-body h2, .article-body h3, .article-body h4 {
  color: var(--text-primary);
  font-weight: 800;
  margin-top: 1.8em;
  margin-bottom: 0.6em;
  position: relative;
}
.article-heading .heading-anchor {
  position: absolute;
  left: -1em;
  color: var(--btn-bg);
  opacity: 0;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.article-heading:hover .heading-anchor {
  opacity: 0.8;
  transform: translateX(-2px);
}
@media (max-width: 768px) {
  .article-heading .heading-anchor {
    display: none !important;
  }
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

/* 文章内图片与 Lightbox 悬停效果 */
.article-body img {
  max-width: 100%;
  border-radius: 14px;
  border: 2px solid var(--card-border);
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  margin: 1.4em auto;
  display: block;
  cursor: zoom-in;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.article-body img:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}

/* 图片放大灯箱 Modal */
.img-lightbox-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  cursor: zoom-out;
}
.img-lightbox-modal.open {
  opacity: 1;
  pointer-events: auto;
}
.img-lightbox-modal img {
  max-width: 92vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

/* Toast 提示框 */
.forest-toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(30px);
  background: var(--card-bg);
  border: 2px solid var(--btn-bg);
  color: var(--text-primary);
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.9em;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2050;
}
.forest-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

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
.forest-quote p {
  margin-bottom: 0.5em;
}
.forest-quote p:last-child {
  margin-bottom: 0;
}

/* 代码块 */
.code-block {
  background: var(--code-bg);
  border-radius: 14px;
  margin: 1.6em 0;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.06);
}
.code-header {
  background: rgba(0,0,0,0.25);
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
  color: #E2E8F0;
  line-height: 1.65;
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

/* Prism 语法着色增强 (One Dark 配色) */
.token.comment, .token.prolog, .token.doctype, .token.cdata { color: #7F848E; font-style: italic; }
.token.punctuation { color: #ABB2BF; }
.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol { color: #D19A66; }
.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #98C379; }
.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #56B6C2; }
.token.atrule, .token.attr-value, .token.keyword { color: #C678DD; }
.token.function, .token.class-name { color: #61AFEF; }
.token.regex, .token.important, .token.variable { color: #E06C75; }

/* 表格容器与精致表格 */
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 1.8em 0;
  border-radius: 14px;
  border: 2px solid var(--card-border);
  background: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  -webkit-overflow-scrolling: touch;
}
.forest-table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.92em;
}
.forest-table th {
  background: var(--body-bg);
  color: var(--text-primary);
  padding: 12px 16px;
  font-weight: 800;
  border-bottom: 2px solid var(--card-border);
  white-space: nowrap;
  letter-spacing: 0.3px;
}
.forest-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--card-border);
  color: var(--text-body);
  line-height: 1.6;
  vertical-align: middle;
}
.forest-table tbody tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.015);
}
.forest-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.035);
}
.forest-table tbody tr:last-child td {
  border-bottom: none;
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
  z-index: 1020;
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
  header { padding: 16px 14px 28px; }
  .mobile-nav-btn {
    display: inline-flex;
  }
  .quote-text {
    font-size: 1.45em;
    margin-bottom: 8px;
  }
  .quote-author {
    font-size: 0.9em;
  }
  main {
    flex-direction: column;
    padding: 0 14px;
    margin-top: 14px;
  }
  .sidebar {
    width: 275px;
    position: fixed;
    top: 0;
    left: -285px;
    height: 100vh;
    z-index: 1015;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    background: var(--body-bg);
    padding: 16px;
    box-shadow: 2px 0 16px rgba(0,0,0,0.15);
  }
  .sidebar.open {
    left: 0;
  }
  .post-card { flex-direction: column; }
  .post-card .post-cover { width: 100%; height: 120px; border-right: none; border-bottom: 2px solid var(--card-border); }
  .article-container { padding: 22px 18px; }
}
`;
