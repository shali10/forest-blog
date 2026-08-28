import { Post, Category, Tag, SiteSettings, Pagination, Link } from '../types';
import { TocItem } from '../markdown';
import { forestThemeCss } from './styles';

// 预设好看的标签马卡龙背景色
const TAG_COLORS = [
  '#F8A6B2', // 樱花粉
  '#7DC395', // 薄荷绿
  '#59C2C6', // 湖水青
  '#F4C95D', // 暖麦黄
  '#8D7EC8', // 熏衣紫
  '#E88B68', // 珊瑚橘
  '#6BA4B8'  // 冰川蓝
];

interface BaseLayoutProps {
  settings: SiteSettings;
  title?: string;
  description?: string;
  content: string;
}

export function renderBaseLayout(props: BaseLayoutProps): string {
  const pageTitle = props.title 
    ? `${props.title} - ${props.settings.site_title}` 
    : `${props.settings.site_title} · ${props.settings.site_subtitle}`;
  const pageDesc = props.description || props.settings.site_description;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(pageDesc)}">
  <meta name="author" content="${escapeHtml(props.settings.site_author)}">
  <link rel="alternate" type="application/rss+xml" title="${escapeHtml(props.settings.site_title)}" href="/rss.xml">
  <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
  
  <!-- 零闪烁暗黑模式脚本 -->
  <script>
    (function() {
      const stored = localStorage.getItem('forest-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    })();
  </script>
  
  <style>${forestThemeCss}</style>
</head>
<body>

  <!-- 移动端抽屉开关按钮 -->
  <button class="mobile-nav-toggle" onclick="toggleNav()" title="菜单">☰</button>

  <!-- 移动端抽屉遮罩 -->
  <div class="mobile-overlay" id="mobileOverlay" onclick="toggleNav()"></div>

  <!-- 顶部 Header Banner -->
  <header>
    <div class="header-actions">
      <button class="search-trigger-btn" onclick="openSearch()" title="搜索 (Ctrl+K)">
        🔍 搜索
      </button>
      <button class="theme-btn" onclick="toggleTheme()" title="切换主题">
        🌓 主题
      </button>
    </div>
    <h1><a href="/">${escapeHtml(props.settings.site_title)}</a></h1>
    <p>${escapeHtml(props.settings.site_description)}</p>
  </header>

  <!-- 主体区域 -->
  <main>
    ${props.content}
  </main>

  <!-- 页脚 -->
  <footer>
    <p>© ${new Date().getFullYear()} <a href="/">${escapeHtml(props.settings.site_title)}</a> · Powered by Cloudflare Workers + D1 · <a href="/rss.xml">RSS</a></p>
  </footer>

  <!-- FTS5 实时搜索弹窗 -->
  <div id="search-modal" class="modal-backdrop" onclick="if(event.target===this)closeSearch()">
    <div class="search-dialog">
      <div class="search-input-box">
        <span>🔍</span>
        <input type="text" id="search-input" class="search-input" placeholder="输入关键词全文检索..." autocomplete="off">
        <button style="background:transparent;border:none;font-size:1.2em;cursor:pointer;color:var(--text-secondary);" onclick="closeSearch()">✕</button>
      </div>
      <div id="search-results" class="search-results">
        <div style="padding:2rem;text-align:center;color:var(--text-secondary);font-size:0.95em;font-weight:600;">
          支持标题、正文全量检索 (按 ESC 关闭)
        </div>
      </div>
    </div>
  </div>

  <script>
    // 移动端抽屉切换
    function toggleNav() {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.getElementById('mobileOverlay');
      const toggle = document.querySelector('.mobile-nav-toggle');
      if (sidebar) sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
      if (toggle) toggle.classList.toggle('nav-open');
    }

    function toggleTheme() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('forest-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('forest-theme', 'dark');
      }
    }

    const modal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchDebounce = null;

    function openSearch() {
      modal.classList.add('open');
      setTimeout(() => searchInput.focus(), 50);
    }
    function closeSearch() {
      modal.classList.remove('open');
    }

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        modal.classList.contains('open') ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeSearch();
      }
    });

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      const q = e.target.value.trim();
      if (!q) {
        searchResults.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-secondary);font-size:0.95em;">请输入搜索关键词</div>';
        return;
      }
      searchDebounce = setTimeout(async () => {
        try {
          const res = await fetch('/api/search?q=' + encodeURIComponent(q));
          const items = await res.json();
          if (!items || items.length === 0) {
            searchResults.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-secondary);font-size:0.95em;">未找到相关文章</div>';
            return;
          }
          searchResults.innerHTML = items.map(it => \`
            <a href="/p/\${it.slug}" class="search-result-item">
              <div class="search-result-title">\${escapeHtml(it.title)}</div>
              <div class="search-result-snippet">\${it.snippet || it.excerpt || ''}</div>
            </a>
          \`).join('');
        } catch(err) {
          searchResults.innerHTML = '<div style="padding:1rem;text-align:center;color:#E87A5D;">检索失败</div>';
        }
      }, 200);
    });

    function escapeHtml(s) {
      return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
  </script>
</body>
</html>`;
}

// 统一左侧边栏 (完美复刻移动端抽屉与桌面端 Profile Card)
export function renderSidebar(props: {
  settings: SiteSettings;
  categories: Category[];
  tags: Tag[];
  links: Link[];
  stats: { post_count: number; category_count: number; tag_count: number };
  currentCategory?: string;
}): string {
  return `
    <aside class="sidebar">
      <div class="profile-card">
        <img class="avatar" src="https://api.dicebear.com/7.x/bottts/svg?seed=forest&backgroundColor=e6f9f6" alt="${escapeHtml(props.settings.site_author)}">
        <div class="name">${escapeHtml(props.settings.site_author)}</div>
        <div class="bio">${escapeHtml(props.settings.site_subtitle)}</div>
        
        <div class="stats">
          <div class="stat-item">
            <div class="stat-num">${props.stats.post_count}</div>
            <div class="stat-label">文章</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${props.stats.category_count}</div>
            <div class="stat-label">分类</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${props.stats.tag_count}</div>
            <div class="stat-label">标签</div>
          </div>
        </div>

        <div style="border-bottom:2px solid var(--card-border);margin-bottom:14px"></div>

        <h4>📁 分类</h4>
        <div class="category-list">
          <a href="/" style="${!props.currentCategory ? 'border-color:var(--btn-bg);background:#E6F9F6;color:var(--btn-shadow);' : ''}">
            <span>全部</span>
            <span style="opacity:0.75;">${props.stats.post_count}</span>
          </a>
          ${props.categories.map(c => `
            <a href="/?category=${encodeURIComponent(c.slug)}" style="${props.currentCategory === c.slug ? 'border-color:var(--btn-bg);background:#E6F9F6;color:var(--btn-shadow);' : ''}">
              <span>${escapeHtml(c.name)}</span>
              <span style="opacity:0.75;">${c.post_count || 0}</span>
            </a>
          `).join('')}
        </div>

        ${props.links.length > 0 ? `
          <h4>🤝 友链</h4>
          <div class="link-list">
            ${props.links.map(l => `
              <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">
                <span>${escapeHtml(l.name)}</span>
                <span>↗</span>
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="profile-card" style="margin-top:16px;">
        <div class="tag-cloud">
          ${props.tags.map((t, i) => {
            const color = TAG_COLORS[i % TAG_COLORS.length];
            return `
              <a href="/?tag=${encodeURIComponent(t.name)}" class="tag-badge" style="background:${color};">
                ${escapeHtml(t.name)}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </aside>
  `;
}

// 首页三栏渲染
export function renderHomeView(props: {
  settings: SiteSettings;
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  links: Link[];
  stats: { post_count: number; category_count: number; tag_count: number };
  pagination: Pagination;
  currentCategory?: string;
  currentTag?: string;
}): string {

  const leftSidebar = renderSidebar({
    settings: props.settings,
    categories: props.categories,
    tags: props.tags,
    links: props.links,
    stats: props.stats,
    currentCategory: props.currentCategory
  });

  // 中间文章列表
  const postCards = props.posts.length > 0 ? props.posts.map((p, idx) => {
    const dateStr = p.created_at.slice(0, 10);
    const emojis = ['📖', '💡', '🌲', '⚡', '🍂', '☕', '🎨'];
    const emoji = emojis[idx % emojis.length];

    return `
      <article class="post-card">
        <div class="post-cover">${emoji}</div>
        <div class="post-content">
          <div>
            <h2><a href="/p/${p.slug}">${escapeHtml(p.title)}</a></h2>
            <div class="excerpt">${escapeHtml(p.excerpt || '')}</div>
          </div>
          <div class="meta-bar">
            <div class="meta-left">
              <span>📅 ${dateStr}</span>
              <span>·</span>
              <span>👁️ ${p.views} 次浏览</span>
            </div>
            <a href="/p/${p.slug}" class="read-more-btn">阅读全文 →</a>
          </div>
        </div>
      </article>
    `;
  }).join('') : `
    <div class="profile-card" style="text-align:center;padding:3rem;">
      <div style="font-size:3rem;margin-bottom:1rem;">🍃</div>
      <div style="font-weight:700;color:var(--text-secondary);">该分类下暂无手记</div>
    </div>
  `;

  const paginationHtml = props.pagination.total_pages > 1 ? `
    <nav class="pagination">
      ${props.pagination.page > 1 ? `<a href="/?page=${props.pagination.page - 1}${props.currentCategory ? '&category=' + props.currentCategory : ''}">上一页</a>` : ''}
      <span class="current">${props.pagination.page} / ${props.pagination.total_pages}</span>
      ${props.pagination.page < props.pagination.total_pages ? `<a href="/?page=${props.pagination.page + 1}${props.currentCategory ? '&category=' + props.currentCategory : ''}">下一页</a>` : ''}
    </nav>
  ` : '';

  const centerCol = `
    <div class="post-list-col">
      ${postCards}
      ${paginationHtml}
    </div>
  `;

  // 右侧导航栏
  const rightSidebar = `
    <aside class="sidebar-right">
      <div class="profile-card">
        <h4 style="margin-top:0;">📌 快速导航</h4>
        <div class="category-list">
          <a href="/archives"><span>📜 全站文章归档</span><span>→</span></a>
          <a href="/links"><span>🤝 邻里友链</span><span>→</span></a>
          <a href="/rss.xml" target="_blank"><span>📡 RSS 订阅源</span><span>→</span></a>
          <a href="/sitemap.xml" target="_blank"><span>🗺️ 站点地图</span><span>→</span></a>
        </div>
      </div>
    </aside>
  `;

  return renderBaseLayout({
    settings: props.settings,
    content: leftSidebar + centerCol + rightSidebar
  });
}

// 文章详情页渲染
export function renderPostView(props: {
  settings: SiteSettings;
  post: Post;
  htmlContent: string;
  toc: TocItem[];
  wordCount: number;
  readTimeMin: number;
  categories: Category[];
  tags: Tag[];
  links: Link[];
  stats: { post_count: number; category_count: number; tag_count: number };
}): string {
  const dateStr = props.post.created_at.slice(0, 10);

  const leftSidebar = renderSidebar({
    settings: props.settings,
    categories: props.categories,
    tags: props.tags,
    links: props.links,
    stats: props.stats
  });

  const tocHtml = props.toc.length > 0 ? `
    <div class="toc-card">
      <div class="toc-card-title">📑 目录导航</div>
      <ul>
        ${props.toc.map(item => `
          <li class="toc-item-${item.level}">
            <a href="#${item.id}">${escapeHtml(item.text)}</a>
          </li>
        `).join('')}
      </ul>
    </div>
  ` : '';

  const mainArticleCol = `
    <div style="flex:1;min-width:0;">
      <div class="article-container">
        <header class="article-header">
          <h1 class="article-title">${escapeHtml(props.post.title)}</h1>
          <div class="article-meta">
            <span>🏷️ ${escapeHtml(props.post.category_name)}</span>
            <span>📅 ${dateStr}</span>
            <span>👁️ ${props.post.views} 次浏览</span>
            <span>⏱️ ${props.readTimeMin} 分钟 (${props.wordCount} 字)</span>
          </div>
        </header>

        ${tocHtml}

        <div class="article-body">
          ${props.htmlContent}
        </div>

        <div style="margin-top:35px;padding-top:20px;border-top:2px dashed var(--card-border);display:flex;justify-content:space-between;align-items:center;">
          <div class="tag-cloud">
            ${props.post.tags.split(',').filter(Boolean).map((t, i) => `
              <span class="tag-badge" style="background:${TAG_COLORS[i % TAG_COLORS.length]};">
                ${escapeHtml(t.trim())}
              </span>
            `).join(' ')}
          </div>
          <a href="/" class="read-more-btn">← 返回首页</a>
        </div>
      </div>
    </div>
  `;

  return renderBaseLayout({
    settings: props.settings,
    title: props.post.title,
    description: props.post.excerpt,
    content: leftSidebar + mainArticleCol
  });
}

// 归档页
export function renderArchivesView(props: {
  settings: SiteSettings;
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  links: Link[];
  stats: { post_count: number; category_count: number; tag_count: number };
}): string {
  const leftSidebar = renderSidebar({
    settings: props.settings,
    categories: props.categories,
    tags: props.tags,
    links: props.links,
    stats: props.stats
  });

  const groups = new Map<string, Post[]>();
  for (const p of props.posts) {
    const year = p.created_at.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(p);
  }

  let listHtml = '';
  for (const [year, list] of groups.entries()) {
    listHtml += `
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.4em;color:var(--text-primary);margin-bottom:12px;border-bottom:2px solid var(--card-border);padding-bottom:6px;">
          ${year} 年 (${list.length} 篇)
        </h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${list.map(p => `
            <div style="display:flex;justify-content:space-between;align-items:center;background:var(--body-bg);padding:10px 16px;border-radius:12px;font-weight:700;">
              <a href="/p/${p.slug}" style="color:var(--text-primary);">${escapeHtml(p.title)}</a>
              <span style="color:var(--text-secondary);font-size:0.85em;">${p.created_at.slice(5, 10)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  const mainCol = `
    <div style="flex:1;min-width:0;">
      <div class="article-container">
        <h1 class="article-title" style="margin-bottom:20px;">📜 文章全量归档</h1>
        ${listHtml}
      </div>
    </div>
  `;

  return renderBaseLayout({
    settings: props.settings,
    title: '文章归档',
    content: leftSidebar + mainCol
  });
}

// 友链页
export function renderLinksView(props: {
  settings: SiteSettings;
  links: Link[];
  categories: Category[];
  tags: Tag[];
  stats: { post_count: number; category_count: number; tag_count: number };
}): string {
  const leftSidebar = renderSidebar({
    settings: props.settings,
    categories: props.categories,
    tags: props.tags,
    links: props.links,
    stats: props.stats
  });

  const linksGrid = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:16px;margin-top:20px;">
      ${props.links.map(l => `
        <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="profile-card" style="text-decoration:none;display:block;">
          <div style="font-weight:800;color:var(--text-primary);margin-bottom:6px;font-size:1.1em;">${escapeHtml(l.name)}</div>
          <div style="font-size:0.88em;color:var(--text-secondary);">${escapeHtml(l.description || l.url)}</div>
        </a>
      `).join('')}
    </div>
  `;

  const mainCol = `
    <div style="flex:1;min-width:0;">
      <div class="article-container">
        <h1 class="article-title">🤝 邻里友链</h1>
        <p style="color:var(--text-secondary);font-weight:600;">常来常往，在数字花园里互联互通。</p>
        ${linksGrid}
      </div>
    </div>
  `;

  return renderBaseLayout({
    settings: props.settings,
    title: '友情链接',
    content: leftSidebar + mainCol
  });
}

// 404 页面
export function render404View(settings: SiteSettings): string {
  const content = `
    <div style="max-width:600px;width:100%;margin:0 auto;text-align:center;">
      <div class="profile-card" style="padding:4rem 2rem;">
        <div style="font-size:4rem;margin-bottom:1rem;">🍃</div>
        <h1 style="font-size:1.8em;color:var(--text-primary);margin-bottom:0.8rem;">404 - 迷失在林间深处</h1>
        <p style="color:var(--text-secondary);margin-bottom:2rem;font-weight:600;">页面可能已被移动或不存在。</p>
        <a href="/" class="read-more-btn">返回首页</a>
      </div>
    </div>
  `;
  return renderBaseLayout({
    settings,
    title: '404 未找到',
    content
  });
}

function escapeHtml(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
