import { Hono } from 'hono';
import { Env, Post } from '../types';
import { createToken, verifyToken } from '../auth';
import { 
  listPosts, getPost, createPost, updatePost, deletePost, 
  listCategories, listTags, listLinks, getSettings, updateSetting, getStats 
} from '../db';

export const adminRouter = new Hono<{ Bindings: Env }>();

// 1. 登录接口
adminRouter.post('/login', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const username = body.username || '';
  const password = body.password || '';

  const expectedUser = c.env.ADMIN_USERNAME || 'admin';
  const expectedPass = c.env.ADMIN_PASSWORD || 'admin123';
  const secret = c.env.JWT_SECRET || 'forest-default-secret-key-2026';

  if (username === expectedUser && password === expectedPass) {
    // 7 天有效期
    const exp = Math.floor(Date.now() / 1000) + (7 * 24 * 3600);
    const token = await createToken({ username, exp }, secret);
    return c.json({ success: true, token, username });
  }

  return c.json({ success: false, error: '用户名或密码错误' }, 401);
});

// 鉴权中间件
adminRouter.use('/*', async (c, next) => {
  if (c.req.path === '/api/admin/login' || c.req.path.startsWith('/admin')) {
    return next();
  }

  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing token' }, 401);
  }

  const token = authHeader.slice(7);
  const secret = c.env.JWT_SECRET || 'forest-default-secret-key-2026';
  const result = await verifyToken(token, secret);

  if (!result.valid) {
    return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
  }

  return next();
});

// 2. 获取管理端文章列表
adminRouter.get('/posts', async (c) => {
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 50);
  const result = await listPosts(c.env, { page, limit, admin: true, status: 'all' });
  return c.json(result);
});

// 3. 获取单篇待编辑文章
adminRouter.get('/post/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const post = await getPost(c.env, id, { admin: true });
  if (!post) return c.json({ error: 'Post not found' }, 404);
  return c.json(post);
});

// 4. 创建文章
adminRouter.post('/post', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  if (!body.title || !body.content) {
    return c.json({ error: 'Title and content are required' }, 400);
  }

  const id = await createPost(c.env, {
    title: body.title,
    slug: body.slug || `p-${Date.now()}`,
    content: body.content,
    excerpt: body.excerpt,
    category_id: body.category_id || 1,
    category_name: body.category_name || '默认',
    tags: body.tags || '',
    status: body.status || 'published',
    pinned: body.pinned ? 1 : 0
  });

  return c.json({ success: true, id });
});

// 5. 更新文章
adminRouter.put('/post/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json().catch(() => ({}));

  await updatePost(c.env, id, {
    title: body.title,
    slug: body.slug,
    content: body.content,
    excerpt: body.excerpt,
    category_id: body.category_id,
    category_name: body.category_name,
    tags: body.tags,
    status: body.status,
    pinned: body.pinned !== undefined ? (body.pinned ? 1 : 0) : undefined
  });

  return c.json({ success: true });
});

// 6. 删除文章
adminRouter.delete('/post/:id', async (c) => {
  const id = Number(c.req.param('id'));
  await deletePost(c.env, id);
  return c.json({ success: true });
});

// 7. 图片/附件上传接口 (支持 R2 存储桶或 DataURI 兜底)
adminRouter.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return c.json({ error: 'No file provided' }, 400);

    const ext = file.name.split('.').pop() || 'png';
    const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    if (c.env.R2) {
      const buffer = await file.arrayBuffer();
      await c.env.R2.put(filename, buffer, {
        httpMetadata: { contentType: file.type }
      });
      return c.json({ success: true, url: `/assets/${filename}` });
    } else {
      // 若未绑定 R2，转为 base64 dataURI 兜底
      const buffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const dataUri = `data:${file.type};base64,${base64}`;
      return c.json({ success: true, url: dataUri });
    }
  } catch (e: any) {
    return c.json({ error: e.message || 'Upload failed' }, 500);
  }
});

// 8. 站点设置
adminRouter.get('/settings', async (c) => {
  const settings = await getSettings(c.env);
  return c.json(settings);
});

adminRouter.put('/settings', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === 'string') {
      await updateSetting(c.env, k, v);
    }
  }
  return c.json({ success: true });
});

// 9. 全量数据一键备份导出 (JSON 格式)
adminRouter.get('/export', async (c) => {
  const [settings, { posts }, categories, tags, links] = await Promise.all([
    getSettings(c.env),
    listPosts(c.env, { page: 1, limit: 1000, admin: true, status: 'all' }),
    listCategories(c.env),
    listTags(c.env),
    listLinks(c.env)
  ]);

  const backupData = {
    exported_at: new Date().toISOString(),
    version: '1.0.0',
    settings,
    posts,
    categories,
    tags,
    links
  };

  return new Response(JSON.stringify(backupData, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="forest-blog-backup-${new Date().toISOString().slice(0, 10)}.json"`
    }
  });
});

// 10. 管理后台单页应用 (Admin UI)
export function renderAdminHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>数字花园 · 管理后台</title>
  <style>
    :root {
      --bg: #141917;
      --card: #1D2421;
      --border: #2A3630;
      --primary: #5BAA86;
      --text: #E5EDE8;
      --text-muted: #85988E;
      --danger: #E87A5D;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: flex; }
    
    /* 登录视图 */
    #login-view { position: fixed; inset: 0; background: var(--bg); display: flex; align-items: center; justify-content: center; z-index: 999; }
    .login-card { background: var(--card); border: 1px solid var(--border); padding: 2.5rem; border-radius: 12px; width: 100%; max-width: 380px; }
    .login-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1.5rem; text-align: center; color: var(--primary); }
    
    /* 核心布局 */
    #app-view { display: none; width: 100%; min-height: 100vh; }
    .sidebar { width: 230px; background: var(--card); border-right: 1px solid var(--border); padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
    .brand { font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 1.5rem; padding: 0 0.5rem; }
    .menu-item { padding: 0.65rem 0.85rem; border-radius: 6px; color: var(--text-muted); cursor: pointer; transition: all 0.15s; font-size: 0.92rem; }
    .menu-item:hover, .menu-item.active { background: var(--border); color: var(--text); }
    
    .content-pane { flex: 1; padding: 2rem; overflow-y: auto; }
    
    /* 通用控件 */
    .btn { background: var(--primary); color: #FFF; border: none; padding: 0.55rem 1.1rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
    .btn:hover { opacity: 0.9; }
    .btn-danger { background: var(--danger); }
    .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
    .input-control { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 0.65rem 0.85rem; border-radius: 6px; margin-bottom: 1rem; outline: none; font-size: 0.92rem; }
    .input-control:focus { border-color: var(--primary); }
    
    /* 工具栏按钮组 */
    .editor-toolbar { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; background: var(--card); border: 1px solid var(--border); border-bottom: none; border-radius: 8px 8px 0 0; }
    .tool-btn { background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 4px 10px; border-radius: 4px; font-size: 0.85rem; cursor: pointer; font-weight: 600; }
    .tool-btn:hover { background: var(--border); color: var(--primary); }

    /* 文章列表表格 */
    .admin-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .admin-table th, .admin-table td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); text-align: left; font-size: 0.9rem; }
    .admin-table th { color: var(--text-muted); font-weight: 600; }
    
    /* Markdown 编辑器布局 */
    .editor-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; height: calc(100vh - 240px); }
    .editor-area { width: 100%; height: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: 0 0 8px 8px; color: var(--text); padding: 1rem; resize: none; outline: none; font-family: monospace; font-size: 0.95rem; line-height: 1.6; }
    .preview-area { background: var(--card); border: 1px solid var(--border); padding: 1.5rem; border-radius: 8px; overflow-y: auto; line-height: 1.7; }
  </style>
</head>
<body>

  <!-- 1. 登录模块 -->
  <div id="login-view">
    <div class="login-card">
      <div class="login-title">🌿 数字手记 · 后台登录</div>
      <input type="text" id="login-user" class="input-control" placeholder="管理员账号">
      <input type="password" id="login-pass" class="input-control" placeholder="管理员密码">
      <button class="btn" style="width:100%;" onclick="doLogin()">立即登录</button>
      <div id="login-msg" style="color:var(--danger);font-size:0.85rem;margin-top:0.8rem;text-align:center;"></div>
    </div>
  </div>

  <!-- 2. 主管理模块 -->
  <div id="app-view">
    <aside class="sidebar">
      <div class="brand">🌿 Garden Admin</div>
      <div class="menu-item active" onclick="showTab('posts')">📝 文章管理</div>
      <div class="menu-item" onclick="newPost()">✍️ 撰写手记</div>
      <div class="menu-item" onclick="showTab('settings')">⚙️ 站点设置</div>
      <a href="/" target="_blank" class="menu-item" style="text-decoration:none;margin-top:auto;">🌐 查看前台</a>
      <div class="menu-item" style="color:var(--danger);" onclick="doLogout()">🚪 退出登录</div>
    </aside>

    <main class="content-pane">
      <!-- Tab 1: 文章列表 -->
      <section id="tab-posts">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
          <h2>文章列表</h2>
          <div style="display:flex;gap:0.8rem;">
            <button class="btn btn-outline" onclick="exportData()">📥 导出全站备份</button>
            <button class="btn" onclick="newPost()">+ 撰写新文章</button>
          </div>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>标题</th>
              <th>Slug / 别名</th>
              <th>分类</th>
              <th>状态</th>
              <th>阅读</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="posts-tbody">
            <tr><td colspan="6" style="text-align:center;padding:2rem;">加载中...</td></tr>
          </tbody>
        </table>
      </section>

      <!-- Tab 2: 撰写/编辑文章 -->
      <section id="tab-editor" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h2 id="editor-title-label">撰写手记</h2>
          <div style="display:flex;gap:0.6rem;align-items:center;">
            <label style="display:flex;align-items:center;gap:6px;font-size:0.9rem;cursor:pointer;">
              <input type="checkbox" id="post-pinned"> 📌 置顶
            </label>
            <select id="post-status" class="input-control" style="width:auto;margin-bottom:0;padding:0.45rem 0.8rem;">
              <option value="published">立即发布</option>
              <option value="draft">保存草稿</option>
            </select>
            <button class="btn btn-outline" onclick="showTab('posts')">取消</button>
            <button class="btn" onclick="saveCurrentPost()">💾 保存手记</button>
          </div>
        </div>

        <input type="hidden" id="edit-post-id">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:0.8rem;margin-bottom:0.8rem;">
          <input type="text" id="post-title" class="input-control" placeholder="文章标题...">
          <input type="text" id="post-slug" class="input-control" placeholder="URL Slug (如: my-post)">
          <select id="post-category" class="input-control">
            <option value="1">技术札记</option>
            <option value="2">随笔思考</option>
          </select>
        </div>

        <div style="margin-bottom:0.8rem;display:flex;gap:0.8rem;">
          <input type="text" id="post-tags" class="input-control" style="margin-bottom:0;" placeholder="标签 (英文逗号分隔，如: Cloudflare, Linux)">
          <input type="text" id="post-excerpt" class="input-control" style="margin-bottom:0;" placeholder="文章摘要 (选填，默认截取前 180 字)">
        </div>

        <!-- Markdown 快捷工具栏 -->
        <div class="editor-toolbar">
          <button class="tool-btn" type="button" onclick="insertMd('**', '**', '粗体文字')"><strong>B</strong> 粗体</button>
          <button class="tool-btn" type="button" onclick="insertMd('*', '*', '斜体文字')"><em>I</em> 斜体</button>
          <button class="tool-btn" type="button" onclick="insertMd('### ', '', '三级标题')">H3 标题</button>
          <button class="tool-btn" type="button" onclick="insertMd('> ', '', '引用内容')">💬 引用</button>
          <button class="tool-btn" type="button" onclick="insertMd('[', '](https://)', '链接文本')">🔗 链接</button>
          <button class="tool-btn" type="button" onclick="insertMd('![图片描述](', ')', 'https://example.com/img.png')">🖼️ 图片</button>
          <button class="tool-btn" type="button" onclick="insertMd('\n\`\`\`javascript\n', '\n\`\`\`\n', '// 代码块')">💻 代码块</button>
          <button class="tool-btn" type="button" onclick="insertMd('\\n| 表头 1 | 表头 2 |\\n| :--- | :--- |\\n| 内容 1 | 内容 2 |\\n', '', '')">📊 表格</button>
        </div>

        <div class="editor-layout">
          <textarea id="post-content" class="editor-area" placeholder="在此输入 Markdown 正文..."></textarea>
          <div id="post-preview" class="preview-area">
            <div style="color:var(--text-muted);">实时预览区域...</div>
          </div>
        </div>
      </section>

      <!-- Tab 3: 站点设置 -->
      <section id="tab-settings" style="display:none;max-width:680px;">
        <h2 style="margin-bottom:1.5rem;">站点通用配置</h2>
        
        <label style="font-size:0.85rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">站点主标题</label>
        <input type="text" id="set-site-title" class="input-control">
        <label style="font-size:0.85rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">副标题 / Slogan</label>
        <input type="text" id="set-site-subtitle" class="input-control">
        <label style="font-size:0.85rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">全站描述 (SEO)</label>
        <input type="text" id="set-site-desc" class="input-control">
        <label style="font-size:0.85rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">站长作者名</label>
        <input type="text" id="set-site-author" class="input-control">

        <button class="btn" style="margin-top:1.5rem;" onclick="saveSettings()">💾 保存全站配置</button>
      </section>
    </main>
  </div>

  <script>
    const token = localStorage.getItem('forest_token');
    if (token) {
      document.getElementById('login-view').style.display = 'none';
      document.getElementById('app-view').style.display = 'flex';
      loadPosts();
    }

    async function doLogin() {
      const u = document.getElementById('login-user').value.trim();
      const p = document.getElementById('login-pass').value.trim();
      const msg = document.getElementById('login-msg');
      msg.textContent = '';

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('forest_token', data.token);
          document.getElementById('login-view').style.display = 'none';
          document.getElementById('app-view').style.display = 'flex';
          loadPosts();
        } else {
          msg.textContent = data.error || '登录失败';
        }
      } catch (e) {
        msg.textContent = '网络请求异常';
      }
    }

    function doLogout() {
      localStorage.removeItem('forest_token');
      location.reload();
    }

    function showTab(name) {
      document.getElementById('tab-posts').style.display = name === 'posts' ? 'block' : 'none';
      document.getElementById('tab-editor').style.display = name === 'editor' ? 'block' : 'none';
      document.getElementById('tab-settings').style.display = name === 'settings' ? 'block' : 'none';
      if (name === 'posts') loadPosts();
      if (name === 'settings') loadSettings();
    }

    async function loadPosts() {
      const res = await fetch('/api/admin/posts?limit=50', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('forest_token')}
      });
      const data = await res.json();
      const tbody = document.getElementById('posts-tbody');
      if (!data.posts || data.posts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">暂无文章</td></tr>';
        return;
      }
      tbody.innerHTML = data.posts.map(function(p) {
        var pinBadge = p.pinned ? '<span style="background:#EE5253;color:#FFF;padding:2px 6px;border-radius:4px;font-size:0.75rem;margin-right:4px;">置顶</span>' : '';
        var statusBadge = p.status === 'published' ? '<span style="color:var(--primary);">已发布</span>' : '<span style="color:var(--text-muted);">草稿</span>';
        return '<tr>' +
          '<td>' + pinBadge + '<strong>' + escapeHtml(p.title) + '</strong></td>' +
          '<td style="color:var(--text-muted);font-family:monospace;">' + p.slug + '</td>' +
          '<td><span style="background:var(--border);padding:0.2rem 0.4rem;border-radius:4px;font-size:0.8rem;">' + p.category_name + '</span></td>' +
          '<td>' + statusBadge + '</td>' +
          '<td>' + p.views + '</td>' +
          '<td>' +
            '<button class="btn btn-outline" style="padding:0.2rem 0.6rem;font-size:0.8rem;" onclick="editPost(' + p.id + ')">编辑</button> ' +
            '<button class="btn btn-danger" style="padding:0.2rem 0.6rem;font-size:0.8rem;" onclick="deletePostItem(' + p.id + ')">删除</button>' +
          '</td>' +
        '</tr>';
      }).join('');
    }

    function newPost() {
      document.getElementById('edit-post-id').value = '';
      document.getElementById('post-title').value = '';
      document.getElementById('post-slug').value = '';
      document.getElementById('post-content').value = '';
      document.getElementById('post-tags').value = '';
      document.getElementById('post-excerpt').value = '';
      document.getElementById('post-pinned').checked = false;
      document.getElementById('post-status').value = 'published';
      document.getElementById('post-preview').innerHTML = '<div style="color:var(--text-muted);">实时预览...</div>';
      document.getElementById('editor-title-label').textContent = '撰写手记';
      showTab('editor');
    }

    async function editPost(id) {
      const res = await fetch('/api/admin/post/' + id, {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('forest_token')}
      });
      const p = await res.json();
      document.getElementById('edit-post-id').value = p.id;
      document.getElementById('post-title').value = p.title;
      document.getElementById('post-slug').value = p.slug;
      document.getElementById('post-content').value = p.content;
      document.getElementById('post-tags').value = p.tags;
      document.getElementById('post-excerpt').value = p.excerpt || '';
      document.getElementById('post-pinned').checked = p.pinned === 1;
      document.getElementById('post-status').value = p.status || 'published';
      document.getElementById('editor-title-label').textContent = '编辑手记 #' + p.id;
      showTab('editor');
    }

    // Markdown 快捷插入辅助
    function insertMd(prefix, suffix, defaultText) {
      const area = document.getElementById('post-content');
      const start = area.selectionStart;
      const end = area.selectionEnd;
      const selected = area.value.substring(start, end) || defaultText;
      const replacement = prefix + selected + suffix;
      area.value = area.value.substring(0, start) + replacement + area.value.substring(end);
      area.focus();
      area.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }

    async function saveCurrentPost() {
      const id = document.getElementById('edit-post-id').value;
      const title = document.getElementById('post-title').value.trim();
      const slug = document.getElementById('post-slug').value.trim();
      const content = document.getElementById('post-content').value;
      const tags = document.getElementById('post-tags').value.trim();
      const excerpt = document.getElementById('post-excerpt').value.trim();
      const catSelect = document.getElementById('post-category');
      const category_id = Number(catSelect.value);
      const category_name = catSelect.options[catSelect.selectedIndex].text;
      const pinned = document.getElementById('post-pinned').checked ? 1 : 0;
      const status = document.getElementById('post-status').value;

      if (!title || !content) {
        alert('标题与正文不能为空');
        return;
      }

      const method = id ? 'PUT' : 'POST';
      const url = id ? '/api/admin/post/' + id : '/api/admin/post';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('forest_token')
        },
        body: JSON.stringify({ title, slug, content, tags, excerpt, category_id, category_name, status, pinned })
      });

      const data = await res.json();
      if (data.success) {
        alert('保存成功！');
        showTab('posts');
      } else {
        alert('保存失败: ' + (data.error || '未知错误'));
      }
    }

    async function deletePostItem(id) {
      if (!confirm('确定彻底删除这篇手记吗？此操作不可逆。')) return;
      const res = await fetch('/api/admin/post/' + id, {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('forest_token')}
      });
      const data = await res.json();
      if (data.success) {
        loadPosts();
      }
    }

    async function loadSettings() {
      const res = await fetch('/api/admin/settings', {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('forest_token')}
      });
      const s = await res.json();
      document.getElementById('set-site-title').value = s.site_title || '';
      document.getElementById('set-site-subtitle').value = s.site_subtitle || '';
      document.getElementById('set-site-desc').value = s.site_description || '';
      document.getElementById('set-site-author').value = s.site_author || '';
    }

    async function saveSettings() {
      const payload = {
        site_title: document.getElementById('set-site-title').value.trim(),
        site_subtitle: document.getElementById('set-site-subtitle').value.trim(),
        site_description: document.getElementById('set-site-desc').value.trim(),
        site_author: document.getElementById('set-site-author').value.trim(),
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('forest_token')
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) alert('设置已更新！');
    }

    async function exportData() {
      window.open('/api/admin/export', '_blank');
    }

    function escapeHtml(s) {
      return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
  </script>
</body>
</html>`;
}
