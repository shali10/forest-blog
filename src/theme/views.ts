import { Post, Category, Tag, SiteSettings, Pagination, Link } from '../types';
import { TocItem } from '../markdown';
import { forestThemeCss } from './styles';

interface BaseLayoutProps {
  settings: SiteSettings;
  title?: string;
  description?: string;
  content: string;
  activeNav?: string;
  canonicalUrl?: string;
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
  
  <!-- 零闪烁暗黑模式优先初始化脚本 -->
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
  <!-- 阅读进度条 -->
  <div id="read-progress"></div>

  <!-- 顶栏导航 -->
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand-group">
        <span class="brand-logo">🌿</span>
        <span class="brand-name">${escapeHtml(props.settings.site_title)}</span>
      </a>
      <nav class="nav-links">
        <a href="/" class="nav-item ${props.activeNav === 'home' ? 'active' : ''}">首页</a>
        <a href="/archives" class="nav-item ${props.activeNav === 'archives' ? 'active' : ''}">归档</a>
        <a href="/links" class="nav-item ${props.activeNav === 'links' ? 'active' : ''}">友链</a>
        
        <!-- 搜索按钮 -->
        <button class="icon-btn" onclick="openSearch()" title="搜索 (Ctrl+K)">
          🔍
        </button>

        <!-- 主题切换按钮 -->
        <button class="icon-btn" id="theme-toggle-btn" onclick="toggleTheme()" title="切换主题">
          🌓
        </button>
      </nav>
    </div>
  </header>

  <!-- 正文容器 -->
  <main class="main-wrapper">
    ${props.content}
  </main>

  <!-- 页脚 -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-links">
        <a href="/">首页</a> ·
        <a href="/archives">文章归档</a> ·
        <a href="/links">友情链接</a> ·
        <a href="/rss.xml" target="_blank">RSS 订阅</a> ·
        <a href="/admin/">管理后台</a>
      </div>
      <div>
        © ${new Date().getFullYear()} ${escapeHtml(props.settings.site_title)} · Powered by <strong>Cloudflare Workers + D1</strong>
      </div>
    </div>
  </footer>

  <!-- FTS5 全文搜索弹窗 -->
  <div id="search-modal" class="modal-backdrop" onclick="if(event.target===this)closeSearch()">
    <div class="search-dialog">
      <div class="search-input-box">
        <span>🔍</span>
        <input type="text" id="search-input" class="search-input" placeholder="输入关键词全文检索..." autocomplete="off">
        <button class="icon-btn" onclick="closeSearch()">✕</button>
      </div>
      <div id="search-results" class="search-results">
        <div style="padding:1.5rem;text-align:center;color:var(--text-light);font-size:0.9rem;">
          支持标题、正文全文检索 (ESC 关闭)
        </div>
      </div>
    </div>
  </div>

  <!-- 全局前端交互脚本 -->
  <script>
    // 1. 主题切换
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

    // 2. 阅读进度条
    window.addEventListener('scroll', () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) {
        const pct = (window.scrollY / total) * 100;
        document.getElementById('read-progress').style.width = pct + '%';
      }
    });

    // 3. 搜索弹窗与 FTS5 接口调用
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
        searchResults.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--text-light);font-size:0.9rem;">请输入搜索关键词</div>';
        return;
      }
      searchDebounce = setTimeout(async () => {
        try {
          const res = await fetch('/api/search?q=' + encodeURIComponent(q));
          const items = await res.json();
          if (!items || items.length === 0) {
            searchResults.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.9rem;">未检索到相关内容</div>';
            return;
          }
          searchResults.innerHTML = items.map(it => \`
            <a href="/p/\${it.slug}" class="search-result-item">
              <div class="search-result-title">\${escapeHtml(it.title)}</div>
              <div class="search-result-snippet">\${it.snippet || it.excerpt || ''}</div>
            </a>
          \`).join('');
        } catch(err) {
          searchResults.innerHTML = '<div style="padding:1rem;text-align:center;color:#E87A5D;">检索异常，请稍后再试</div>';
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

// 首页视图
export function renderHomeView(props: {
  settings: SiteSettings;
  posts: Post[];
  categories: Category[];
  pagination: Pagination;
  currentCategory?: string;
}): string {
  const heroHtml = `
    <section class="hero-card">
      <h1 class="hero-title">${escapeHtml(props.settings.site_title)}</h1>
      <p class="hero-desc">${escapeHtml(props.settings.site_description)}</p>
    </section>
  `;

  const categoryPills = `
    <div class="filter-bar">
      <a href="/" class="filter-pill ${!props.currentCategory ? 'active' : ''}">全部</a>
      ${props.categories.map(c => `
        <a href="/?category=${encodeURIComponent(c.slug)}" class="filter-pill ${props.currentCategory === c.slug ? 'active' : ''}">
          ${escapeHtml(c.name)} (${c.post_count || 0})
        </a>
      `).join('')}
    </div>
  `;

  const postCards = props.posts.length > 0 ? `
    <div class="post-list">
      ${props.posts.map(p => {
        const dateStr = p.created_at.slice(0, 10);
        return `
          <article class="post-card">
            <div class="post-card-header">
              ${p.pinned ? `<span class="pinned-badge">置顶</span>` : ''}
              <span class="post-cat">${escapeHtml(p.category_name)}</span>
              <span>·</span>
              <time datetime="${p.created_at}">${dateStr}</time>
              <span>·</span>
              <span>${p.views} 次阅读</span>
            </div>
            <h2 class="post-card-title">
              <a href="/p/${p.slug}">${escapeHtml(p.title)}</a>
            </h2>
            <p class="post-card-excerpt">${escapeHtml(p.excerpt || '')}</p>
            <div class="post-card-footer">
              <div class="post-tags">
                ${p.tags.split(',').filter(Boolean).map(t => `
                  <span class="tag-item">#${escapeHtml(t.trim())}</span>
                `).join(' ')}
              </div>
              <a href="/p/${p.slug}">阅读全文 →</a>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  ` : `<div style="text-align:center;padding:3rem;color:var(--text-light);">暂无手记</div>`;

  const paginationHtml = props.pagination.total_pages > 1 ? `
    <nav class="pagination">
      ${props.pagination.page > 1 ? `<a href="/?page=${props.pagination.page - 1}${props.currentCategory ? '&category=' + props.currentCategory : ''}" class="page-btn">← 上一页</a>` : ''}
      <span class="page-btn active">${props.pagination.page} / ${props.pagination.total_pages}</span>
      ${props.pagination.page < props.pagination.total_pages ? `<a href="/?page=${props.pagination.page + 1}${props.currentCategory ? '&category=' + props.currentCategory : ''}" class="page-btn">下一页 →</a>` : ''}
    </nav>
  ` : '';

  const mainContent = heroHtml + categoryPills + postCards + paginationHtml;
  return renderBaseLayout({
    settings: props.settings,
    content: mainContent,
    activeNav: 'home'
  });
}

// 文章详情页视图
export function renderPostView(props: {
  settings: SiteSettings;
  post: Post;
  htmlContent: string;
  toc: TocItem[];
  wordCount: number;
  readTimeMin: number;
}): string {
  const dateStr = props.post.created_at.slice(0, 10);

  const tocHtml = props.toc.length > 0 ? `
    <aside class="toc-box">
      <div class="toc-title">📑 目录导航</div>
      <ul class="toc-list">
        ${props.toc.map(item => `
          <li class="toc-item-${item.level}">
            <a href="#${item.id}">${escapeHtml(item.text)}</a>
          </li>
        `).join('')}
      </ul>
    </aside>
  ` : '';

  const contentHtml = `
    <article>
      <header class="article-header">
        <h1 class="article-title">${escapeHtml(props.post.title)}</h1>
        <div class="article-meta">
          <span class="post-cat">${escapeHtml(props.post.category_name)}</span>
          <span>📅 ${dateStr}</span>
          <span>👁️ ${props.post.views} 次浏览</span>
          <span>⏱️ ${props.readTimeMin} 分钟阅读 (${props.wordCount} 字)</span>
        </div>
      </header>

      ${tocHtml}

      <div class="article-content">
        ${props.htmlContent}
      </div>

      <div style="margin-top:3rem;padding-top:1.5rem;border-top:1px dashed var(--border);display:flex;justify-content:space-between;align-items:center;font-size:0.9rem;">
        <div>
          ${props.post.tags.split(',').filter(Boolean).map(t => `<span class="tag-item">#${escapeHtml(t.trim())}</span> `).join('')}
        </div>
        <a href="/">← 返回手记列表</a>
      </div>
    </article>
  `;

  return renderBaseLayout({
    settings: props.settings,
    title: props.post.title,
    description: props.post.excerpt,
    content: contentHtml
  });
}

// 归档页视图
export function renderArchivesView(props: {
  settings: SiteSettings;
  posts: Post[];
}): string {
  // 按年份分组
  const groups = new Map<string, Post[]>();
  for (const p of props.posts) {
    const year = p.created_at.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(p);
  }

  let html = `<h1 class="hero-title" style="margin-bottom:2rem;">📜 文章全量归档</h1>`;

  for (const [year, list] of groups.entries()) {
    html += `
      <div style="margin-bottom:2.5rem;">
        <h2 style="font-size:1.4rem;color:var(--primary);margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:0.4rem;">
          ${year} 年 (${list.length} 篇)
        </h2>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          ${list.map(p => `
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.95rem;">
              <a href="/p/${p.slug}" style="color:var(--text-main);">${escapeHtml(p.title)}</a>
              <span style="color:var(--text-light);font-size:0.85rem;white-space:nowrap;">${p.created_at.slice(5, 10)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return renderBaseLayout({
    settings: props.settings,
    title: '文章归档',
    content: html,
    activeNav: 'archives'
  });
}

// 友链页视图
export function renderLinksView(props: {
  settings: SiteSettings;
  links: Link[];
}): string {
  const linksHtml = `
    <h1 class="hero-title" style="margin-bottom:1rem;">🤝 邻里友链</h1>
    <p class="hero-desc" style="margin-bottom:2rem;">常来常往，在数字森林里互联互通。</p>
    
    <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:1.2rem;">
      ${props.links.map(l => `
        <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="post-card" style="display:block;">
          <div style="font-weight:700;color:var(--text-main);margin-bottom:0.3rem;">${escapeHtml(l.name)}</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">${escapeHtml(l.description || l.url)}</div>
        </a>
      `).join('')}
    </div>
  `;

  return renderBaseLayout({
    settings: props.settings,
    title: '友情链接',
    content: linksHtml,
    activeNav: 'links'
  });
}

// 404 页面
export function render404View(settings: SiteSettings): string {
  const content = `
    <div style="text-align:center;padding:5rem 1rem;">
      <div style="font-size:4rem;margin-bottom:1rem;">🍃</div>
      <h1 style="font-size:1.8rem;color:var(--text-main);margin-bottom:0.8rem;">404 - 迷失在林间深处</h1>
      <p style="color:var(--text-muted);margin-bottom:2rem;">你访问的手记可能已被移动、重命名或随风飘散。</p>
      <a href="/" class="filter-pill active" style="padding:0.5rem 1.2rem;display:inline-block;">返回林间首页</a>
    </div>
  `;
  return renderBaseLayout({
    settings,
    title: '404 页面未找到',
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
