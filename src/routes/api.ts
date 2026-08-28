import { Hono } from 'hono';
import { Env } from '../types';
import { listPosts, getPost, searchPosts, listCategories, listTags, listLinks, getStats, getSettings } from '../db';

export const apiRouter = new Hono<{ Bindings: Env }>();

// 1. 获取公开文章列表
apiRouter.get('/posts', async (c) => {
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 10);
  const categorySlug = c.req.query('category');
  const tagName = c.req.query('tag');

  const result = await listPosts(c.env, {
    page,
    limit,
    categorySlug,
    tagName,
    status: 'published'
  });

  return c.json(result);
});

// 2. 获取单篇文章详情
apiRouter.get('/post/:slug', async (c) => {
  const slug = c.req.param('slug');
  const post = await getPost(c.env, slug, { incViews: true });
  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }
  return c.json(post);
});

// 3. FTS5 全文搜索
apiRouter.get('/search', async (c) => {
  const q = c.req.query('q') || '';
  const limit = Number(c.req.query('limit') || 15);
  const items = await searchPosts(c.env, q, limit);
  return c.json(items);
});

// 4. 分类列表
apiRouter.get('/categories', async (c) => {
  const categories = await listCategories(c.env);
  return c.json(categories);
});

// 5. 标签列表
apiRouter.get('/tags', async (c) => {
  const tags = await listTags(c.env);
  return c.json(tags);
});

// 6. 友链列表
apiRouter.get('/links', async (c) => {
  const links = await listLinks(c.env);
  return c.json(links);
});

// 7. 站点统计
apiRouter.get('/stats', async (c) => {
  const stats = await getStats(c.env);
  return c.json(stats);
});

// 8. RSS 2.0 订阅源生成器
export async function handleRssFeed(env: Env, baseUrl: string): Promise<Response> {
  const settings = await getSettings(env);
  const { posts } = await listPosts(env, { page: 1, limit: 25, status: 'published' });

  const itemsXml = posts.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/p/${p.slug}</link>
      <guid>${baseUrl}/p/${p.slug}</guid>
      <description><![CDATA[${p.excerpt || p.title}]]></description>
      <category>${p.category_name}</category>
      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
    </item>
  `).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${settings.site_title}]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[${settings.site_description}]]></description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

// 9. Sitemap.xml 站点地图生成器
export async function handleSitemap(env: Env, baseUrl: string): Promise<Response> {
  const { posts } = await listPosts(env, { page: 1, limit: 1000, status: 'published' });

  const staticUrls = [
    `  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${baseUrl}/archives</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`,
    `  <url><loc>${baseUrl}/links</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`
  ];

  const postUrls = posts.map(p => `  <url>
    <loc>${baseUrl}/p/${p.slug}</loc>
    <lastmod>${new Date(p.updated_at || p.created_at).toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join('\n')}
${postUrls.join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
