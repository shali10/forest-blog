import { describe, expect, it } from 'vitest';
import { adminRouter } from '../src/routes/admin';

const env = { ADMIN_USERNAME: 'admin' } as any;

describe('admin authentication fails closed', () => {
  it('rejects login when required secrets are missing', async () => {
    const response = await adminRouter.request('/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin123' }),
    }, env);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Admin secrets are not configured',
    });
  });
});
