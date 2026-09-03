import { describe, expect, it } from 'vitest';
import { shouldCountView } from '../src/index';

describe('shouldCountView bot and prefetch filtering', () => {
  it('identifies and skips common search engine bots and crawlers', () => {
    const googleBotHeaders = { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' };
    expect(shouldCountView((k) => googleBotHeaders[k.toLowerCase() as keyof typeof googleBotHeaders])).toBe(false);

    const bingBotHeaders = { 'user-agent': 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' };
    expect(shouldCountView((k) => bingBotHeaders[k.toLowerCase() as keyof typeof bingBotHeaders])).toBe(false);

    const curlHeaders = { 'user-agent': 'curl/8.5.0' };
    expect(shouldCountView((k) => curlHeaders[k.toLowerCase() as keyof typeof curlHeaders])).toBe(false);

    const emptyHeaders = {};
    expect(shouldCountView((k) => (emptyHeaders as any)[k.toLowerCase()])).toBe(false);
  });

  it('rejects browser prefetch requests to prevent write quota waste', () => {
    const prefetchHeaders = {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'sec-purpose': 'prefetch'
    };
    expect(shouldCountView((k) => prefetchHeaders[k.toLowerCase() as keyof typeof prefetchHeaders])).toBe(false);
  });

  it('allows normal human browser requests to increment views', () => {
    const humanHeaders = {
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
    };
    expect(shouldCountView((k) => humanHeaders[k.toLowerCase() as keyof typeof humanHeaders])).toBe(true);
  });
});
