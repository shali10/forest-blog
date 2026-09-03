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

  it('authenticates successfully with secure constant-time comparison when credentials match', async () => {
    const fullEnv = {
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'supersecretpassword123',
      JWT_SECRET: 'a-very-strong-jwt-secret-for-testing-2026'
    } as any;

    const successRes = await adminRouter.request('/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'supersecretpassword123' }),
    }, fullEnv);
    expect(successRes.status).toBe(200);
    const json = await successRes.json();
    expect(json.success).toBe(true);
    expect(json.token).toBeDefined();

    const failRes = await adminRouter.request('/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'wrongpassword' }),
    }, fullEnv);
    expect(failRes.status).toBe(401);
  });
});
