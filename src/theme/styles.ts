// ==========================================================
// 经典温暖手帐风 + 多主题配色系统 (9 套精调高级主题)
// 包含：晚灯手记(Akari)、复古报刊、暖木中古、森系温润、落樱和风、宇治抹茶、星野深蓝、极简极客、赛博深夜
// ==========================================================

export const forestThemeCss = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=LXGW+WenKai+Screen:wght@400;700&display=swap');

:root {
  --font-main: 'LXGW WenKai Screen', 'LXGW WenKai', Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 1. 默认：晚灯手记 (Akari Vintage - 契合 blog.0000996.xyz 温暖手帐风) */
:root, [data-theme="akari"] {
  --header-bg: linear-gradient(135deg, #7C4D38, #5A3525);
  --card-bg: #FFFFFF;
  --card-border: #EAE0D0;
  --body-bg: #FAF6EE;
  --text-primary: #382314;
  --text-body: #544030;
  --text-secondary: #968270;
  --btn-bg: #C86235;
  --btn-shadow: #9E461E;
  --cover-bg: linear-gradient(135deg, #FBF4EA, #EFE2D0);
  --code-bg: #2B221E;
  --dot-color: rgba(124, 77, 56, 0.08);
  --tape-color: rgba(224, 160, 118, 0.55);
}

/* 2. 复古报刊 (Parchment Retro - 经典复古羊皮纸与墨绿印版) */
[data-theme="vintage"] {
  --header-bg: linear-gradient(135deg, #324336, #1E2E22);
  --card-bg: #FAF6ED;
  --card-border: #DFD4BE;
  --body-bg: #F3EDE0;
  --text-primary: #261C14;
  --text-body: #48392C;
  --text-secondary: #8A7866;
  --btn-bg: #8A4E2A;
  --btn-shadow: #6E391A;
  --cover-bg: linear-gradient(135deg, #EBE1CE, #DFD1B8);
  --code-bg: #22201D;
  --dot-color: rgba(50, 67, 54, 0.08);
  --tape-color: rgba(198, 172, 134, 0.55);
}

/* 3. 暖木中古 (Caramel Antique - 焦糖暖栗秋日手账) */
[data-theme="caramel"] {
  --header-bg: linear-gradient(135deg, #8C5828, #663C16);
  --card-bg: #FFFDF8;
  --card-border: #E8DAC2;
  --body-bg: #FAF4EB;
  --text-primary: #452A14;
  --text-body: #5E4028;
  --text-secondary: #997C63;
  --btn-bg: #D47833;
  --btn-shadow: #AD5B1F;
  --cover-bg: linear-gradient(135deg, #F8EFE0, #EADBC5);
  --code-bg: #261F1A;
  --dot-color: rgba(140, 88, 40, 0.08);
  --tape-color: rgba(228, 178, 126, 0.55);
}

/* 4. 森系温润 (Forest Warm - 自然青翠纸感) */
[data-theme="forest"] {
  --header-bg: linear-gradient(135deg, #5C8D67, #416B4A);
  --card-bg: #FFFFFF;
  --card-border: #E0E6D8;
  --body-bg: #F7F8F3;
  --text-primary: #2D3B2F;
  --text-body: #445447;
  --text-secondary: #7E9182;
  --btn-bg: #4A855A;
  --btn-shadow: #336341;
  --cover-bg: linear-gradient(135deg, #EBF2EA, #DAE6D8);
  --code-bg: #222923;
  --dot-color: rgba(65, 107, 74, 0.08);
  --tape-color: rgba(148, 196, 158, 0.55);
}

/* 5. 落樱和风 (Sakura Sweet) */
[data-theme="sakura"] {
  --header-bg: linear-gradient(135deg, #E88E9B, #D46F80);
  --card-bg: #FFF5F7;
  --card-border: #FAD9E0;
  --body-bg: #FFF0F3;
  --text-primary: #5C2834;
  --text-body: #733F4C;
  --text-secondary: #AD7986;
  --btn-bg: #E26D82;
  --btn-shadow: #B84A5E;
  --cover-bg: linear-gradient(135deg, #FFE5EC, #FFD1DC);
  --code-bg: #2E2528;
  --dot-color: rgba(232, 142, 155, 0.1);
  --tape-color: rgba(248, 186, 196, 0.6);
}

/* 6. 宇治抹茶 (Matcha Zen) */
[data-theme="matcha"] {
  --header-bg: linear-gradient(135deg, #749550, #527333);
  --card-bg: #F4F7EE;
  --card-border: #DFE6D5;
  --body-bg: #EAF0E2;
  --text-primary: #334725;
  --text-body: #4A613A;
  --text-secondary: #7C946B;
  --btn-bg: #5E823C;
  --btn-shadow: #436125;
  --cover-bg: linear-gradient(135deg, #E0EBD4, #CDE0BC);
  --code-bg: #232B20;
  --dot-color: rgba(82, 115, 51, 0.09);
  --tape-color: rgba(168, 196, 142, 0.55);
}

/* 7. 星野深蓝 (Starry Ocean) */
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
  --dot-color: rgba(46, 75, 114, 0.09);
  --tape-color: rgba(150, 185, 222, 0.55);
}

/* 8. Geist 极简极客 (Geist Monochrome) */
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
  --dot-color: rgba(0, 0, 0, 0.06);
  --tape-color: rgba(200, 205, 212, 0.6);
}

/* 9. 赛博深邃暗夜 (Cyber Dark) */
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
  --dot-color: rgba(56, 189, 248, 0.1);
  --tape-color: rgba(56, 189, 248, 0.25);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-main);
  background-color: var(--body-bg);
  background-image: radial-gradient(var(--dot-color, rgba(120, 80, 40, 0.08)) 1.2px, transparent 1.2px);
  background-size: 22px 22px;
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
.header-season-capsule {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.78em;
  font-weight: 700;
  backdrop-filter: blur(6px);
  letter-spacing: 0.5px;
}
@media (max-width: 720px) {
  .header-season-capsule { display: none; }
}
.status-live-dot {
  width: 7px;
  height: 7px;
  background: #48BB78;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(72, 187, 120, 0.3);
  animation: pulseLiveDot 2s infinite;
}
@keyframes pulseLiveDot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(72, 187, 120, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
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
  padding: 18px 36px;
  position: relative;
  z-index: 5;
  cursor: pointer;
  user-select: none;
  background: rgba(255, 255, 255, 0.16);
  border: 1.5px solid rgba(255, 255, 255, 0.32);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.quote-hero-box:hover {
  background: rgba(255, 255, 255, 0.24);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  border-color: rgba(255, 255, 255, 0.5);
}
.quote-mark {
  position: absolute;
  font-size: 3.8rem;
  font-family: Georgia, serif;
  line-height: 1;
  opacity: 0.22;
  color: #fff;
  pointer-events: none;
}
.quote-mark-left { top: 4px; left: 14px; }
.quote-mark-right { bottom: -12px; right: 14px; }
.quote-text {
  font-size: 1.85em;
  font-weight: 800;
  line-height: 1.45;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 6px rgba(0,0,0,0.15);
  margin-bottom: 10px;
  display: inline-block;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.quote-author {
  opacity: 0.92;
  font-size: 0.95em;
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
  max-width: 520px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
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
.post-list-col { width: min(740px, calc(100vw - 648px)); flex-shrink: 1; display: flex; flex-direction: column; gap: 24px; }

/* 治愈系个人资料卡片 (Profile Card) */
.profile-card {
  position: relative;
  background: var(--card-bg);
  border-radius: 20px;
  padding: 24px 22px;
  box-shadow: 0 4px 14px rgba(107, 92, 67, 0.09);
  border: 2px solid var(--card-border);
}
/* 和纸手账胶带 (Washi Tape) */
.washi-tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-1.5deg);
  width: 110px;
  height: 22px;
  background: var(--tape-color, rgba(230, 180, 130, 0.6));
  border-left: 2px dashed rgba(255, 255, 255, 0.6);
  border-right: 2px dashed rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 5px rgba(0,0,0,0.06);
  z-index: 6;
  pointer-events: none;
  border-radius: 2px;
}
.profile-card .avatar {
  width: 115px;
  height: 115px;
  border-radius: 50%;
  object-fit: cover;
  margin: 6px auto 12px;
  display: block;
  border: 3px solid var(--card-border);
  background: #FFF;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}
.profile-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--body-bg);
  border: 1.5px solid var(--card-border);
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.76em;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
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
  font-size: 0.82em;
  text-align: center;
  margin: 0 auto 14px;
  max-width: 210px;
  line-height: 1.6;
  text-wrap: balance;
  word-break: break-word;
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

/* 治愈系手账便签卡片 (Sticky Note) */
.sticky-note-card {
  position: relative;
  background: #FFFDF0;
  border: 2px solid #EADBB6;
  border-radius: 16px;
  padding: 22px 18px 16px;
  margin-top: 18px;
  box-shadow: 0 6px 16px rgba(130, 100, 60, 0.1);
  transform: rotate(-1.5deg);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
[data-theme="cyber"] .sticky-note-card {
  background: #1C2333;
  border-color: #2E3852;
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
}
.sticky-note-card:hover {
  transform: rotate(0deg) translateY(-2px);
  box-shadow: 0 10px 22px rgba(130, 100, 60, 0.16);
}
.sticky-pin {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.35rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}
.sticky-title {
  font-size: 0.82em;
  font-weight: 800;
  color: #9C6634;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 8px;
  text-transform: uppercase;
}
[data-theme="cyber"] .sticky-title { color: #38BDF8; }
.sticky-text {
  font-size: 0.88em;
  line-height: 1.6;
  color: #5C432D;
  font-weight: 700;
  text-align: center;
  font-style: italic;
  margin-bottom: 10px;
}
[data-theme="cyber"] .sticky-text { color: #E2E8F0; }
.sticky-meta {
  font-size: 0.72em;
  font-weight: 700;
  color: #A88F78;
  text-align: right;
  border-top: 1px dashed #E2CE9F;
  padding-top: 6px;
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
  position: relative;
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(107, 92, 67, 0.08);
  border: 2px solid var(--card-border);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.post-card-pinned {
  border-color: color-mix(in srgb, var(--btn-bg) 35%, var(--card-border));
}
.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(114, 93, 66, 0.14);
  border-color: var(--btn-bg);
}
.post-stamp {
  position: absolute;
  top: 14px;
  right: 16px;
  border: 1.5px dashed var(--btn-bg);
  color: var(--btn-bg);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.7em;
  font-weight: 800;
  letter-spacing: 1px;
  opacity: 0.7;
  pointer-events: none;
  transition: all 0.25s ease;
  background: var(--body-bg);
  z-index: 2;
}
.post-stamp.stamp-pinned {
  border-color: #D95338;
  color: #D95338;
  background: color-mix(in srgb, #D95338 10%, var(--card-bg));
  opacity: 0.92;
}
.post-card:hover .post-stamp {
  opacity: 1;
  transform: scale(1.03);
}
.post-card .post-cover {
  width: 155px;
  min-height: 180px;
  flex-shrink: 0;
  background: var(--cover-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  border-right: 2px solid var(--card-border);
  position: relative;
  overflow: hidden;
}
.post-card .post-cover::before {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid color-mix(in srgb, var(--btn-bg) 24%, transparent);
  border-radius: 16px;
  transform: rotate(-6deg);
  pointer-events: none;
}
.post-card .cover-watermark {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -52%);
  color: color-mix(in srgb, var(--btn-bg) 18%, transparent);
  font-family: Georgia, 'Noto Serif SC', serif;
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  user-select: none;
  pointer-events: none;
}
.post-card .cover-emoji {
  position: relative;
  z-index: 1;
  display: block;
  font-size: 3.2rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12));
}
.post-card .post-content {
  flex: 1;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}
.post-card h2 {
  font-size: 1.3em;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 800;
  line-height: 1.45;
  padding-right: 75px;
  text-wrap: balance;
  word-break: break-word;
}
.post-card h2 a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s;
}
.post-card h2 a:hover {
  color: var(--btn-bg);
}
.post-card .excerpt {
  font-size: 0.88em;
  color: var(--text-body);
  line-height: 1.65;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-card .meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.82em;
  font-weight: 700;
  color: var(--text-secondary);
}
.meta-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--body-bg);
  border: 1px solid var(--card-border);
  padding: 3px 9px;
  border-radius: 50px;
  font-size: 0.86em;
  color: var(--text-body);
}
.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: color-mix(in srgb, var(--btn-bg) 14%, var(--card-bg));
  border: 1px solid color-mix(in srgb, var(--btn-bg) 35%, transparent);
  color: var(--btn-bg) !important;
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 0.86em;
  font-weight: 800;
}

/* 列表末尾贴心提示 */
.list-end-hint {
  text-align: center;
  padding: 20px 0 10px;
  color: var(--text-secondary);
  font-size: 0.84em;
  font-weight: 700;
}
.list-end-hint span {
  display: inline-block;
  padding: 6px 18px;
  background: var(--card-bg);
  border: 1.5px dashed var(--card-border);
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
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
  font-size: 1.95em;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 14px;
  text-wrap: balance;
  word-break: break-word;
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

/* 治愈系多色引用卡片 (Callouts) */
.forest-quote {
  background: var(--body-bg);
  border-left: 5px solid var(--btn-bg);
  border-radius: 0 16px 16px 0;
  padding: 16px 22px;
  margin: 1.6em 0;
  font-style: normal;
  border-top: 1px solid var(--card-border);
  border-right: 1px solid var(--card-border);
  border-bottom: 1px solid var(--card-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.forest-quote p {
  margin-bottom: 0.5em;
}
.forest-quote p:last-child {
  margin-bottom: 0;
}

/* 页脚手账缝线与结构化排版 */
footer {
  margin-top: auto;
  padding: 36px 20px 30px;
  background: var(--card-bg);
  border-top: 2px dashed var(--card-border);
  position: relative;
  text-align: center;
}
.footer-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.footer-brand-line {
  font-size: 0.95em;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-dot {
  opacity: 0.4;
  font-weight: 400;
}
.footer-nav-pills {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 4px 0;
}
.footer-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--body-bg);
  border: 1.5px solid var(--card-border);
  color: var(--text-body) !important;
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 0.82em;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}
.footer-pill:hover {
  background: #FFF;
  border-color: var(--btn-bg);
  color: var(--btn-bg) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
.footer-meta-line {
  font-size: 0.8em;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-meta-line a {
  color: var(--text-secondary);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.footer-meta-line a:hover {
  color: var(--btn-bg);
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
  background: rgba(0,0,0,0.28);
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.8em;
  color: #ABB2BF;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.code-lang {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72em;
  font-weight: 800;
  letter-spacing: 1px;
  color: #E5C07B;
  background: rgba(229, 192, 123, 0.12);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(229, 192, 123, 0.25);
  text-transform: uppercase;
}
.code-lang-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #98C379;
}
.copy-btn {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
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

/* 文章快速判断摘要 */
.article-quick-summary {
  margin: 0 0 24px;
  padding: 16px 18px;
  border: 1.5px solid var(--card-border);
  border-left: 4px solid var(--btn-bg);
  border-radius: 14px;
  background: color-mix(in srgb, var(--btn-bg) 6%, var(--card-bg));
}
.quick-summary-title {
  color: var(--text-primary);
  font-weight: 800;
  margin-bottom: 8px;
}
.quick-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 16px;
  color: var(--text-secondary);
  font-size: 0.88em;
  line-height: 1.55;
}
.quick-summary-grid strong { color: var(--text-primary); }

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
  margin-bottom: 12px;
  font-size: 1.05em;
  display: flex;
  align-items: center;
  gap: 6px;
}
.toc-card ul { list-style: none; padding-left: 0; margin: 0; }
.toc-card li { margin-bottom: 6px; font-size: 0.9em; }
.toc-card .toc-item-3 { padding-left: 16px; font-size: 0.85em; }
.toc-card .toc-item-4 { padding-left: 28px; font-size: 0.82em; }
.toc-card a {
  color: var(--text-body);
  text-decoration: none;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 3px solid transparent;
}
.toc-card a:hover {
  color: var(--btn-bg);
  background: rgba(200, 98, 53, 0.08);
}
.toc-card a.active {
  color: var(--btn-bg);
  background: color-mix(in srgb, var(--btn-bg) 14%, var(--card-bg));
  font-weight: 800;
  border-left-color: var(--btn-bg);
  padding-left: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}

/* 上一篇 / 下一篇 手账双向导航卡片 */
.post-nav-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 2px dashed var(--card-border);
}
.post-nav-card {
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
  border-radius: 14px;
  background: var(--body-bg);
  border: 2px solid var(--card-border);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
a.post-nav-card:hover {
  transform: translateY(-2px);
  border-color: var(--btn-bg);
  background: var(--card-bg);
  box-shadow: 0 6px 18px rgba(114, 93, 66, 0.12);
}
.post-nav-card.post-nav-next {
  text-align: right;
  align-items: flex-end;
}
.post-nav-card.post-nav-empty {
  opacity: 0.55;
  border-style: dashed;
}
.post-nav-card .nav-direction {
  font-size: 0.76em;
  font-weight: 800;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
a.post-nav-card:hover .nav-direction {
  color: var(--btn-bg);
}
.post-nav-card .nav-title {
  font-size: 0.95em;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
  padding: 12px 14px;
  border-radius: 12px;
  display: block;
  text-decoration: none;
  border: 1.5px solid transparent;
  transition: all 0.15s ease;
}
.search-result-item:hover, .search-result-item.selected {
  background: var(--body-bg);
  border-color: var(--btn-bg);
  transform: translateX(2px);
}
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
  .post-card .post-cover {
    width: 108px;
  }
  .post-card .cover-watermark {
    font-size: 5rem;
  }
  .post-card .cover-emoji {
    font-size: 2.5rem;
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
  .quick-summary-grid { grid-template-columns: 1fr; gap: 6px; }
  .post-nav-grid { grid-template-columns: 1fr; gap: 12px; }
  .post-nav-card.post-nav-next { text-align: left; align-items: flex-start; }
}
`;
