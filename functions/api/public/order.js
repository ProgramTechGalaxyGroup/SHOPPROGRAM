import { json, readJson } from "../_lib.js";

export const onRequestPost = async ({ request, env }) => {
  try {
    const body = await readJson(request);
    if (!body || !body.items || body.items.length === 0) {
      return json({ ok: false, error: "Empty order" }, { status: 400 });
    }

    const {
      clientOpId,
      id,
      customerName,
      customerPhone,
      deliveryAddress,
      orderType,
      subtotal,
      total,
      paymentMethod,
      items
    } = body;

    // Validate basic requirements
    if (!customerName) return json({ ok: false, error: "Missing customer name" }, { status: 400 });
    if (orderType === "delivery" && !deliveryAddress) {
      return json({ ok: false, error: "Missing delivery address" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    
    // Construct customer note
    let fullNote = "";
    if (orderType === "delivery") {
      fullNote = `Giao hàng (Ship đi)\nSĐT: ${customerPhone || "Không có"}\nĐịa chỉ: ${deliveryAddress}`;
    } else {
      fullNote = `Lấy tại quán\nSĐT: ${customerPhone || "Không có"}`;
    }

    const db = env.DB;
    
    // Insert into sales table
    // We set status='held' and prep_status='pending' so it appears on POS/Kitchen as an incoming order to be confirmed.
    await db.prepare(
      `INSERT INTO sales 
       (id, shift_id, start_time, end_time, subtotal, discount, total, payment_method, status, prep_status, customer_name, customer_note, cashier_id, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      "public-order", // Dummy shift ID for online orders
      timestamp,
      null, // Not ended yet
      subtotal || total,
      0,
      total,
      paymentMethod || "cash",
      "held", 
      "pending",
      customerName,
      fullNote,
      "online-kiosk", // Dummy cashier ID
      timestamp
    ).run();

    // Insert sale_items
    const stmt = db.prepare(
      `INSERT INTO sale_items 
       (id, sale_id, product_id, product_name, qty, price, note, options, status, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    const batch = [];
    for (const item of items) {
      batch.push(
        stmt.bind(
          item.id || crypto.randomUUID(),
          id,
          item.productId,
          item.productName,
          item.qty,
          item.price,
          item.note || "",
          JSON.stringify(item.options || []),
          "pending",
          timestamp
        )
      );
    }
    
    if (batch.length > 0) {
      await db.batch(batch);
    }

    return json({ ok: true, orderId: id });
  } catch (err) {
    return json({ ok: false, error: err.message }, { status: 500 });
  }
};
