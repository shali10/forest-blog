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
});
