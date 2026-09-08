function json(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders
    }
  });
}

function apiRequest(pathname) {
  return pathname.startsWith('/api/') || pathname === '/health';
}

async function proxyApi(request, env) {
  const origin = String(env.PAINELURE_API_ORIGIN || '').replace(/\/+$/, '');
  if (!origin) {
    return json({ ok: false, error: 'PAINELURE_API_ORIGIN não configurada.' }, 503);
  }

  const incoming = new URL(request.url);
  const target = `${origin}${incoming.pathname}${incoming.search}`;
  const headers = new Headers(request.headers);
  headers.set('X-Forwarded-Host', incoming.host);
  headers.set('X-Forwarded-Proto', incoming.protocol.replace(':', ''));

  try {
    return await fetch(target, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'manual'
    });
  } catch (error) {
    return json({ ok: false, error: `Falha ao acessar a API: ${error.message}` }, 502);
  }
}

async function serveAsset(request, env) {
  const asset = await env.ASSETS.fetch(request);
  if (asset.status !== 404) return asset;

  const url = new URL(request.url);
  if (request.method === 'GET' && !url.pathname.includes('.')) {
    return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
  }
  return asset;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Key',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        }
      });
    }

    const url = new URL(request.url);
    if (apiRequest(url.pathname)) return proxyApi(request, env);
    return serveAsset(request, env);
  }
};
