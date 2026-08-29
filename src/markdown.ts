import { marked } from 'marked';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface MarkdownRenderResult {
  html: string;
  toc: TocItem[];
  wordCount: number;
  readTimeMin: number;
}

export function renderMarkdown(markdownText: string): MarkdownRenderResult {
  if (!markdownText) {
    return { html: '', toc: [], wordCount: 0, readTimeMin: 1 };
  }

  // 1. 归一化数据库/API 导入留下的字面量换行。只排除已转义
  // 的 "\\\\n"，避免重复解码；不能因为正文里已有真实换行就跳过。
  let cleanMd = markdownText.replace(/(?<!\\)\\r\\n/g, '\n').replace(/(?<!\\)\\n/g, '\n');

  // 页面模板已经渲染文章标题，正文开头的 H1 会形成重复标题。
  cleanMd = cleanMd.replace(/^\uFEFF?\s*#\s+[^\n]+\n+/, '');

  // 2. 清理常见扩展锚点语法中的污染，如 "## 标题 {#features}"
  cleanMd = cleanMd.replace(/\s*\{#[a-zA-Z0-9_-]+\}/g, '');

  // 3. 统计字数与估算阅读时间
  const cleanText = cleanMd.replace(/[#*`~>_[\]()\-+]/g, ' ').replace(/\s+/g, ' ');
  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (cleanText.match(/[a-zA-Z0-9_-]+/g) || []).length;
  const wordCount = chineseChars + englishWords;
  const readTimeMin = Math.max(1, Math.ceil(chineseChars / 350 + englishWords / 160));

  // 4. 提取 TOC
  const toc: TocItem[] = [];
  let headingIdCounter = 1;

  const renderer = new marked.Renderer();

  // 自定义标题渲染（生成锚点与 TOC）
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const rawText = text.replace(/<[^>]+>/g, '').trim();
    const anchorId = `heading-${headingIdCounter++}-${rawText.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')}`;
    
    if (depth >= 2 && depth <= 4) {
      toc.push({
        id: anchorId,
        text: rawText,
        level: depth
      });
    }

    return `<h${depth} id="${anchorId}" class="article-heading">
      <a href="#${anchorId}" class="heading-anchor" aria-hidden="true" tabindex="-1">#</a>
      <span>${text}</span>
    </h${depth}>`;
  };

  // 自定义代码块渲染（支持语言徽章与复制属性）
  renderer.code = function ({ text, lang }) {
    const language = (lang || 'text').trim();
    const displayLang = language.toUpperCase();
    const escapedCode = escapeHtml(text);
    return `<div class="code-block" data-lang="${escapeHtml(language)}">
      <div class="code-header">
        <span class="code-lang"><span class="code-lang-dot"></span>${escapeHtml(displayLang)}</span>
        <button class="copy-btn" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(text)}')).then(()=>{this.textContent='已复制!';setTimeout(()=>this.textContent='复制',2000)})">复制</button>
      </div>
      <pre><code class="language-${escapeHtml(language)}">${escapedCode}</code></pre>
    </div>`;
  };

  // 自定义表格渲染（完美解析表头与单元格内联元素，自动包裹响应式滚动容器）
  renderer.table = function (token) {
    const headerHtml = '<tr>' + token.header.map(cell => {
      const alignAttr = cell.align ? ` align="${cell.align}"` : '';
      const cellContent = this.parser.parseInline(cell.tokens);
      return `<th${alignAttr}>${cellContent}</th>`;
    }).join('') + '</tr>';

    const bodyHtml = token.rows.map(row => {
      return '<tr>' + row.map(cell => {
        const alignAttr = cell.align ? ` align="${cell.align}"` : '';
        const cellContent = this.parser.parseInline(cell.tokens);
        return `<td${alignAttr}>${cellContent}</td>`;
      }).join('') + '</tr>';
    }).join('');

    return `<div class="table-container">
      <table class="forest-table">
        <thead>${headerHtml}</thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>`;
  };

  // 自定义引用块
  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote class="forest-quote">${body}</blockquote>`;
  };

  // 自定义链接（安全外链属性）
  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
    return `<a href="${escapeHtml(href)}"${titleAttr}${targetAttr}>${text}</a>`;
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
    renderer
  });

  const rawHtml = marked.parse(cleanMd) as string;

  return {
    html: rawHtml,
    toc,
    wordCount,
    readTimeMin
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
