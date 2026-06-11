import { json } from "./_lib.js";
import { getDbProvider } from "./_supabase_db.js";

export const onRequestGet = async ({ env }) => {
  const provider = getDbProvider(env);
  const checks = {
    supabaseUrl: Boolean(env.SUPABASE_URL),
    supabaseServiceRoleKey: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
    d1Binding: Boolean(env.DB),
  };

  let ok = true;
  let error = null;
  try {
    const row = await env.DB.prepare("SELECT COUNT(*) AS count FROM products").first();
    checks.products = Number(row && row.count) || 0;
  } catch (err) {
    ok = false;
    error = err && err.message ? err.message : String(err);
  }

  return json({
    ok,
    dbProvider: provider,
    checks,
    error,
    serverTime: Date.now(),
  }, { status: ok ? 200 : 500 });
};

