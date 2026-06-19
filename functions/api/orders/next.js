import { json, now, nextDocId } from "../_lib.js";

function orderIdFromSaleId(saleId) {
  const match = String(saleId || "").match(/^HD-(\d{4})(\d{2})(\d{2})-(\d+)$/i);
  if (!match) return "";
  return `${match[3]}/${match[2]}/${match[1]}-${String(Number(match[4]) || 0).padStart(3, "0")}`;
}

// Reserve a globally unique bill number before staff starts editing an order.
// The same reserved sale id is later submitted to POST /api/sales.
export const onRequestPost = async ({ env }) => {
  const saleId = await nextDocId(env.DB, "HD", now());
  return json({ ok: true, saleId, orderId: orderIdFromSaleId(saleId) });
};
