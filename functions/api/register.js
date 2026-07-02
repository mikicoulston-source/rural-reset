export async function onRequestPost(context) {
  try {
    const request = context.request;
    const env = context.env || {};
    const body = await request.json();

    const name = clean(body.name, 120);
    const email = clean(body.email, 180).toLowerCase();
    const load = clean(body.load, 1200);
    const consent = body.consent === true;
    const website = clean(body.website, 200);

    if (website) {
      return json({ ok: true });
    }

    if (!name || !email || !consent || !isEmail(email)) {
      return json({ error: "Please provide a valid name, email, and consent." }, 400);
    }

    if (!env.DB) {
      return json({ error: "Signup database is not configured yet." }, 500);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "";
    const userAgent = request.headers.get("User-Agent") || "";
    const createdAt = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO signups (name, email, load, consent, source, ip, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET
         name = excluded.name,
         load = excluded.load,
         consent = excluded.consent,
         source = excluded.source,
         ip = excluded.ip,
         user_agent = excluded.user_agent,
         updated_at = excluded.created_at`
    )
      .bind(name, email, load, 1, "rural-reset", ip, userAgent, createdAt)
      .run();

    return json({ ok: true });
  } catch (error) {
    return json({ error: "Something went wrong saving your spot." }, 500);
  }
}

function clean(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
