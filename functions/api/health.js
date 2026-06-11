import { json } from "./_lib.js";
import {
  getDbProvider,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "./_supabase_db.js";

export const onRequestGet = async ({ env }) => {
  const provider = getDbProvider(env);
  const checks = {
    supabaseUrl: Boolean(getSupabaseUrl(env)),
    supabaseServiceRoleKey: Boolean(getSupabaseServiceRoleKey(env)),
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
