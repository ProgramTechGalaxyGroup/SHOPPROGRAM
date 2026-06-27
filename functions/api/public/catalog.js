import { json } from "../_lib.js";

export const onRequestGet = async ({ env }) => {
  try {
    const [categories, products, addOns] = await Promise.all([
      env.DB.prepare(
        `SELECT id, label, icon, sort_order, parent_id, level, code, is_active
         FROM categories WHERE is_active != 0`
      ).all(),

      env.DB.prepare(
        `SELECT p.id, p.name, p.category_id, p.price, p.image, p.description, 
                p.is_active, p.inventory_mode, COALESCE(i.qty_on_hand, 0) AS stock
         FROM products p
         LEFT JOIN inventory i ON i.product_id = p.id
         WHERE p.is_active != 0`
      ).all(),

      env.DB.prepare(
        `SELECT id, label, price, group_key, is_active
         FROM add_ons WHERE is_active != 0`
      ).all(),
    ]);

    return json({
      ok: true,
      categories: categories.results,
      products: products.results,
      addOns: addOns.results
    });
  } catch (err) {
    return json({ ok: false, error: err.message });
  }
};
