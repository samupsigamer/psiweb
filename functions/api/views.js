// Cloudflare Pages Function: contador de vistas por pieza del portfolio.
//
// Requiere una KV namespace enlazada a este proyecto de Pages con el
// nombre de binding "VIEWS" (Settings → Functions → KV namespace bindings).
// Sin esa KV enlazada, estas rutas devuelven un error controlado y la web
// sigue funcionando con normalidad (los contadores solo se quedan en 0).
//
// GET  /api/views        -> { "slug-1": 12, "slug-2": 4, ... }
// POST /api/views        -> body { "slug": "slug-1" }
//                            responde { "slug": "slug-1", "count": 13 }
//                            (solo suma 1 la primera vez que ve ese
//                            dispositivo/IP para esa pieza; si repite,
//                            devuelve el recuento sin volver a sumar)

const SLUG_RE = /^[a-z0-9-]{1,80}$/;
const SEEN_TTL_SECONDS = 60 * 60 * 24 * 365; // 1 año

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}

async function hashIp(ip, slug) {
  const enc = new TextEncoder().encode(`${ip}:${slug}`);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function onRequestGet({ env }) {
  if (!env.VIEWS) {
    return jsonResponse({ error: "KV 'VIEWS' no está enlazada a este proyecto." }, 501);
  }

  const result = {};
  let cursor;
  do {
    const list = await env.VIEWS.list({ prefix: "count:", cursor });
    for (const key of list.keys) {
      const slug = key.name.slice("count:".length);
      const value = await env.VIEWS.get(key.name);
      result[slug] = parseInt(value || "0", 10);
    }
    cursor = list.list_complete ? undefined : list.cursor;
  } while (cursor);

  return jsonResponse(result);
}

export async function onRequestPost({ request, env }) {
  if (!env.VIEWS) {
    return jsonResponse({ error: "KV 'VIEWS' no está enlazada a este proyecto." }, 501);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "JSON inválido" }, 400);
  }

  const slug = body && body.slug;
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
    return jsonResponse({ error: "slug inválido" }, 400);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const seenKey = `seen:${slug}:${await hashIp(ip, slug)}`;
  const countKey = `count:${slug}`;

  const alreadySeen = await env.VIEWS.get(seenKey);
  let count = parseInt((await env.VIEWS.get(countKey)) || "0", 10);

  if (!alreadySeen) {
    count += 1;
    await env.VIEWS.put(countKey, String(count));
    await env.VIEWS.put(seenKey, "1", { expirationTtl: SEEN_TTL_SECONDS });
  }

  return jsonResponse({ slug, count });
}
