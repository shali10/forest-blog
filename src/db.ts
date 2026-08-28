import { Env, Post, Category, Tag, Link, SiteSettings, Pagination } from './types';

// 获取站点配置
export async function getSettings(env: Env): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    site_title: env.SITE_TITLE || '林间手记',
    site_subtitle: env.SITE_SUBTITLE || 'Digital Garden',
    site_description: env.SITE_DESCRIPTION || '万物皆有裂痕，那是光照进来的地方',
    site_author: env.SITE_AUTHOR || 'root',
    site_avatar: '/assets/avatar.png',
    site_favicon: '/assets/favicon.svg',
    admin_username: env.ADMIN_USERNAME || 'admin',
    custom_quote: ''
  };

  try {
    const { results } = await env.DB.prepare('SELECT key, value FROM settings').all<{ key: string; value: string }>();
    if (results && results.length > 0) {
      for (const row of results) {
        (defaults as any)[row.key] = row.value;
      }
    }
  } catch (e) {
    console.error('Failed to read settings from DB, using defaults:', e);
  }

  return defaults;
}

// 更新配置
export async function updateSetting(env: Env, key: string, value: string): Promise<boolean> {
  await env.DB.prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
  ).bind(key, value).run();
  return true;
}

// 获取文章列表（支持分页、分类筛选、标签筛选、状态过滤）
export async function listPosts(
  env: Env,
  options: {
    page?: number;
    limit?: number;
    categorySlug?: string;
    tagName?: string;
    status?: 'published' | 'draft' | 'all';
    admin?: boolean;
  } = {}
): Promise<{ posts: Post[]; pagination: Pagination }> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, Math.min(50, options.limit || 10));
  const offset = (page - 1) * limit;

  let whereClauses: string[] = [];
  let params: any[] = [];

  if (!options.admin && options.status !== 'all') {
    whereClauses.push("posts.status = 'published'");
  } else if (options.status && options.status !== 'all') {
    whereClauses.push("posts.status = ?");
    params.push(options.status);
  }

  if (options.categorySlug) {
    whereClauses.push("categories.slug = ?");
    params.push(options.categorySlug);
  }

  if (options.tagName) {
    whereClauses.push("posts.tags LIKE ?");
    params.push(`%${options.tagName}%`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // 统计总数
  const countQuery = `
    SELECT COUNT(*) as total 
    FROM posts 
    LEFT JOIN categories ON posts.category_id = categories.id 
    ${whereSql}
  `;
  const countResult = await env.DB.prepare(countQuery).bind(...params).first<{ total: number }>();
  const total = countResult?.total || 0;

  // 查询数据
  const dataQuery = `
    SELECT 
      posts.id, posts.slug, posts.title, posts.excerpt, posts.content,
      posts.category_id, COALESCE(categories.name, posts.category_name, '默认') as category_name,
      posts.tags, posts.status, posts.pinned, posts.views, posts.created_at, posts.updated_at
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    ${whereSql}
    ORDER BY posts.pinned DESC, posts.created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  const queryParams = [...params, limit, offset];
  const { results } = await env.DB.prepare(dataQuery).bind(...queryParams).all<Post>();

  return {
    posts: results || [],
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit) || 1
    }
  };
}

// 获取单篇文章（按 slug 或 id）
export async function getPost(
  env: Env, 
  identifier: string | number, 
  options: { incViews?: boolean; admin?: boolean } = {}
): Promise<Post | null> {
  const isId = typeof identifier === 'number' || /^\d+$/.test(String(identifier));
  const whereSql = isId ? 'posts.id = ?' : 'posts.slug = ?';
  const param = isId ? Number(identifier) : String(identifier);

  const query = `
    SELECT 
      posts.id, posts.slug, posts.title, posts.content, posts.excerpt,
      posts.category_id, COALESCE(categories.name, posts.category_name, '默认') as category_name,
      posts.tags, posts.status, posts.pinned, posts.views, posts.created_at, posts.updated_at
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    WHERE ${whereSql}
  `;

  const post = await env.DB.prepare(query).bind(param).first<Post>();
  if (!post) return null;

  if (!options.admin && post.status !== 'published') {
    return null;
  }

  // 递增阅读量
  if (options.incViews) {
    try {
      await env.DB.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').bind(post.id).run();
      post.views += 1;
    } catch (e) {
      // 忽略递增失败
    }
  }

  return post;
}

// 全文搜索（支持 FTS5 英文/数字 + LIKE 中文模糊匹配混合双模，完美支持中英文混合检索）
export async function searchPosts(env: Env, keyword: string, limit: number = 20): Promise<Post[]> {
  if (!keyword || !keyword.trim()) return [];
  const cleanKey = keyword.trim().replace(/['"*]/g, '');
  const term = `%${cleanKey}%`;

  // 优先执行混合查询：LIKE 覆盖中文子串 + FTS5 补充英文分词
  const query = `
    SELECT DISTINCT
      posts.id, posts.slug, posts.title, posts.excerpt,
      COALESCE(categories.name, posts.category_name, '默认') as category_name,
      posts.tags, posts.created_at, posts.views,
      substr(posts.content, 1, 120) as snippet
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    WHERE posts.status = 'published' 
      AND (
        posts.title LIKE ? 
        OR posts.content LIKE ? 
        OR posts.tags LIKE ? 
        OR posts.id IN (SELECT rowid FROM posts_fts WHERE posts_fts MATCH ?)
      )
    ORDER BY posts.pinned DESC, posts.created_at DESC
    LIMIT ?
  `;

  try {
    const { results } = await env.DB.prepare(query).bind(term, term, term, cleanKey, limit).all<any>();
    return results || [];
  } catch (e) {
    // 纯 LIKE 降级
    const fallbackQuery = `
      SELECT posts.id, posts.slug, posts.title, posts.excerpt,
             COALESCE(categories.name, posts.category_name, '默认') as category_name,
             posts.tags, posts.created_at, posts.views,
             substr(posts.content, 1, 120) as snippet
      FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      WHERE (posts.title LIKE ? OR posts.content LIKE ? OR posts.tags LIKE ?) AND posts.status = 'published'
      ORDER BY posts.created_at DESC
      LIMIT ?
    `;
    const { results } = await env.DB.prepare(fallbackQuery).bind(term, term, term, limit).all<Post>();
    return results || [];
  }
}

// 创建文章
export async function createPost(env: Env, data: Partial<Post>): Promise<number> {
  const slug = data.slug || `post-${Date.now()}`;
  const title = data.title || '无标题';
  const content = data.content || '';
  const excerpt = data.excerpt || content.slice(0, 180).replace(/[#*`\n]/g, ' ') + '...';
  const categoryId = data.category_id || 1;
  const categoryName = data.category_name || '默认';
  const tags = data.tags || '';
  const status = data.status || 'published';
  const pinned = data.pinned || 0;

  const result = await env.DB.prepare(`
    INSERT INTO posts (slug, title, content, excerpt, category_id, category_name, tags, status, pinned, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(slug, title, content, excerpt, categoryId, categoryName, tags, status, pinned).run();

  return Number(result.meta.last_row_id);
}

// 更新文章
export async function updatePost(env: Env, id: number, data: Partial<Post>): Promise<boolean> {
  const fields: string[] = ['updated_at = CURRENT_TIMESTAMP'];
  const params: any[] = [];

  if (data.title !== undefined) { fields.push('title = ?'); params.push(data.title); }
  if (data.slug !== undefined) { fields.push('slug = ?'); params.push(data.slug); }
  if (data.content !== undefined) { fields.push('content = ?'); params.push(data.content); }
  if (data.excerpt !== undefined) { fields.push('excerpt = ?'); params.push(data.excerpt); }
  if (data.category_id !== undefined) { fields.push('category_id = ?'); params.push(data.category_id); }
  if (data.category_name !== undefined) { fields.push('category_name = ?'); params.push(data.category_name); }
  if (data.tags !== undefined) { fields.push('tags = ?'); params.push(data.tags); }
  if (data.status !== undefined) { fields.push('status = ?'); params.push(data.status); }
  if (data.pinned !== undefined) { fields.push('pinned = ?'); params.push(data.pinned); }

  params.push(id);
  const sql = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
  await env.DB.prepare(sql).bind(...params).run();
  return true;
}

// 删除文章
export async function deletePost(env: Env, id: number): Promise<boolean> {
  await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();
  return true;
}

// 获取分类列表
export async function listCategories(env: Env): Promise<Category[]> {
  const query = `
    SELECT 
      categories.id, categories.slug, categories.name, categories.description, categories.created_at,
      COUNT(posts.id) as post_count
    FROM categories
    LEFT JOIN posts ON categories.id = posts.category_id AND posts.status = 'published'
    GROUP BY categories.id
    ORDER BY categories.id ASC
  `;
  const { results } = await env.DB.prepare(query).all<Category>();
  return results || [];
}

// 获取标签列表
export async function listTags(env: Env): Promise<Tag[]> {
  const { results } = await env.DB.prepare(`
    SELECT tags FROM posts WHERE status = 'published' AND tags != ''
  `).all<{ tags: string }>();

  const tagMap = new Map<string, number>();
  if (results) {
    for (const row of results) {
      const tags = row.tags.split(',').map(t => t.trim()).filter(Boolean);
      for (const t of tags) {
        tagMap.set(t, (tagMap.get(t) || 0) + 1);
      }
    }
  }

  const list: Tag[] = [];
  let id = 1;
  for (const [name, count] of tagMap.entries()) {
    list.push({ id: id++, name, post_count: count });
  }
  return list.sort((a, b) => (b.post_count || 0) - (a.post_count || 0));
}

// 获取全站统计
export async function getStats(env: Env): Promise<{
  post_count: number;
  category_count: number;
  tag_count: number;
  total_views: number;
}> {
  const postStat = await env.DB.prepare(
    "SELECT COUNT(*) as post_count, COALESCE(SUM(views), 0) as total_views FROM posts WHERE status = 'published'"
  ).first<{ post_count: number; total_views: number }>();

  const catStat = await env.DB.prepare(
    "SELECT COUNT(*) as cat_count FROM categories"
  ).first<{ cat_count: number }>();

  const tags = await listTags(env);

  return {
    post_count: postStat?.post_count || 0,
    total_views: postStat?.total_views || 0,
    category_count: catStat?.cat_count || 0,
    tag_count: tags.length
  };
}

// 获取相邻文章 (上一篇 / 下一篇)
export async function getAdjacentPosts(
  env: Env,
  createdAt: string,
  id: number
): Promise<{ prev: { title: string; slug: string } | null; next: { title: string; slug: string } | null }> {
  const prevQuery = `
    SELECT title, slug FROM posts 
    WHERE status = 'published' AND (created_at < ? OR (created_at = ? AND id < ?))
    ORDER BY created_at DESC, id DESC LIMIT 1
  `;
  const nextQuery = `
    SELECT title, slug FROM posts 
    WHERE status = 'published' AND (created_at > ? OR (created_at = ? AND id > ?))
    ORDER BY created_at ASC, id ASC LIMIT 1
  `;

  const [prev, next] = await Promise.all([
    env.DB.prepare(prevQuery).bind(createdAt, createdAt, id).first<{ title: string; slug: string }>(),
    env.DB.prepare(nextQuery).bind(createdAt, createdAt, id).first<{ title: string; slug: string }>()
  ]);

  return { prev: prev || null, next: next || null };
}

// 获取友链
export async function listLinks(env: Env): Promise<Link[]> {
  const { results } = await env.DB.prepare(
    'SELECT id, name, url, avatar, description, sort_order, created_at FROM links ORDER BY sort_order ASC, id ASC'
  ).all<Link>();
  return results || [];
}
