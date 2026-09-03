import { Env } from './types';

// 生成 SHA-256 哈希
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 恒定时间安全比对 (防时序侧信道攻击)
export async function secureCompare(a: string, b: string): Promise<boolean> {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const encoder = new TextEncoder();
  const hashA = await crypto.subtle.digest('SHA-256', encoder.encode(a));
  const hashB = await crypto.subtle.digest('SHA-256', encoder.encode(b));
  const bufA = new Uint8Array(hashA);
  const bufB = new Uint8Array(hashB);
  
  let mismatch = a.length ^ b.length;
  for (let i = 0; i < bufA.length; i++) {
    mismatch |= bufA[i] ^ bufB[i];
  }
  return mismatch === 0;
}

// 生成简单的签名 Token (HMAC-SHA256)
export async function createToken(payload: { username: string; exp: number }, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const data = `${header}.${body}`;
  
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret || 'default-forest-secret-key-2026'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    
  return `${data}.${sigBase64}`;
}

// 验证 Token
export async function verifyToken(token: string, secret: string): Promise<{ valid: boolean; username?: string }> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    
    const [header, body, signature] = parts;
    const data = `${header}.${body}`;
    
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret || 'default-forest-secret-key-2026'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const sigStr = atob(signature.replace(/-/g, '+').replace(/_/g, '/'));
    const sigBytes = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) sigBytes[i] = sigStr.charCodeAt(i);
    
    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data));
    if (!isValid) return { valid: false };
    
    const payload = JSON.parse(atob(body));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return { valid: false };
    }
    
    return { valid: true, username: payload.username };
  } catch (e) {
    return { valid: false };
  }
}
