import { json, notFound } from "../_lib.js";

export const onRequestGet = async ({ env, params }) => {
  const head = await env.DB.prepare(`SELECT * FROM sales WHERE id = ?`)
    .bind(params.id).first();
  if (!head) return notFound();
  const { results: items } = await env.DB.prepare(
    `SELECT si.*, COALESCE(p.unit, '') AS unit
     FROM sale_items si
     LEFT JOIN products p ON p.id = si.product_id
     WHERE si.sale_id = ?
     ORDER BY si.id`
  ).bind(params.id).all();
  return json({ ok: true, sale: head, items: items || [] });
};
