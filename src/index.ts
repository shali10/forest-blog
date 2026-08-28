import { Hono } from 'hono';
import { Env } from './types';
import { getSettings, listPosts, getPost, listCategories, listTags, listLinks, getStats } from './db';
import { renderMarkdown } from './markdown';
import { 
  renderHomeView, renderPostView, renderArchivesView, 
  renderLinksView, render404View 
} from './theme/views';
import { apiRouter, handleRssFeed, handleSitemap } from './routes/api';
import { adminRouter, renderAdminHtml } from './routes/admin';

const app = new Hono<{ Bindings: Env }>();

// 1. 全局公开 API 与 管理后台 API
app.route('/api/admin', adminRouter);
app.route('/api', apiRouter);

// 2. 管理后台 UI 路由
app.get('/admin', (c) => c.html(renderAdminHtml()));
app.get('/admin/', (c) => c.html(renderAdminHtml()));

// 3. RSS & Sitemap 路由
app.get('/rss.xml', async (c) => {
  const baseUrl = new URL(c.req.url).origin;
  return handleRssFeed(c.env, baseUrl);
});

app.get('/sitemap.xml', async (c) => {
  const baseUrl = new URL(c.req.url).origin;
  return handleSitemap(c.env, baseUrl);
});

// 4. 静态资源直通 (如 R2 存储桶图片)
app.get('/assets/*', async (c) => {
  if (!c.env.R2) {
    return c.text('R2 bucket not configured', 404);
  }
  const key = c.req.path.replace(/^\/assets\//, 'uploads/');
  const object = await c.env.R2.get(key);
  if (!object) {
    return c.text('Asset not found', 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return new Response(object.body, { headers });
});

// ==========================================================
// 5. 前台 Edge SSR 直出路由
// ==========================================================

// 首页（支持分页、分类筛选、标签筛选）
app.get('/', async (c) => {
  const page = Number(c.req.query('page') || 1);
  const categorySlug = c.req.query('category');
  const tagName = c.req.query('tag');
  
  const [settings, categories, tags, links, stats] = await Promise.all([
    getSettings(c.env),
    listCategories(c.env),
    listTags(c.env),
    listLinks(c.env),
    getStats(c.env)
  ]);

  const { posts, pagination } = await listPosts(c.env, {
    page,
    limit: 10,
    categorySlug,
    tagName,
    status: 'published'
  });

  const html = renderHomeView({
    settings,
    posts,
    categories,
    tags,
    links,
    stats,
    pagination,
    currentCategory: categorySlug,
    currentTag: tagName
  });

  return c.html(html);
});

// 文章详情页 (支持 /p/:slug 与兼容历史 /post/:slug 路由)
const handlePostDetail = async (c: any) => {
  const slug = c.req.param('slug');
  const [settings, categories, tags, links, stats] = await Promise.all([
    getSettings(c.env),
    listCategories(c.env),
    listTags(c.env),
    listLinks(c.env),
    getStats(c.env)
  ]);

  const post = await getPost(c.env, slug, { incViews: true });

  if (!post) {
    return c.html(render404View(settings), 404);
  }

  const { html, toc, wordCount, readTimeMin } = renderMarkdown(post.content);

  const pageHtml = renderPostView({
    settings,
    post,
    htmlContent: html,
    toc,
    wordCount,
    readTimeMin,
    categories,
    tags,
    links,
    stats
  });

  return c.html(pageHtml);
};

app.get('/p/:slug', handlePostDetail);
app.get('/post/:slug', handlePostDetail);
app.get('/post/:date/:slug', handlePostDetail); // 兼容原版 6 位日期路由

// 全量归档页
app.get('/archives', async (c) => {
  const [settings, categories, tags, links, stats] = await Promise.all([
    getSettings(c.env),
    listCategories(c.env),
    listTags(c.env),
    listLinks(c.env),
    getStats(c.env)
  ]);
  const { posts } = await listPosts(c.env, { page: 1, limit: 1000, status: 'published' });
  const html = renderArchivesView({ settings, posts, categories, tags, links, stats });
  return c.html(html);
});

// 友链页
app.get('/links', async (c) => {
  const [settings, categories, tags, links, stats] = await Promise.all([
    getSettings(c.env),
    listCategories(c.env),
    listTags(c.env),
    listLinks(c.env),
    getStats(c.env)
  ]);
  const html = renderLinksView({ settings, links, categories, tags, stats });
  return c.html(html);
});

// 404 兜底
app.notFound(async (c) => {
  const settings = await getSettings(c.env);
  return c.html(render404View(settings), 404);
});

export default app;
