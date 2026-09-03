import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '../src/markdown';

describe('renderMarkdown normalization', () => {
  it('decodes escaped newlines even when real newlines are also present', () => {
    const input = '导语\n\n```yaml\\ndisplay:\\n  language: zh\\n```';
    const result = renderMarkdown(input);
    expect(result.html).toContain('<pre><code class="language-yaml">display:\n  language: zh</code></pre>');
    expect(result.html).not.toContain('```yaml\\n');
  });

  it('does not render a duplicate body h1 when content starts with the post title', () => {
    const result = renderMarkdown('# ForestBlog 部署手记\n\n正文');
    expect(result.html).not.toContain('<h1');
    expect(result.html).toContain('<p>正文</p>');
  });

  it('sanitizes dangerous script, iframe, and inline on* event attributes', () => {
    const malicious = `
# 标题
<script>alert("xss")</script>
<iframe src="https://evil.com"></iframe>
<img src="x" onerror="alert(1)">
<a href="javascript:stealToken()">恶意超链接</a>
    `;
    const result = renderMarkdown(malicious);
    expect(result.html).not.toContain('<script');
    expect(result.html).not.toContain('<iframe');
    expect(result.html).not.toContain('onerror=');
    expect(result.html).not.toContain('href="javascript:stealToken()"');
    expect(result.html).toContain('href="#"');
  });
});
