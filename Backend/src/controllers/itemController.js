import pool from "../config/db.js";

export async function getItems(req, res) {
  const { type, category, status, userId } = req.query;

  let sql = `
    SELECT i.id, i.type, i.title, i.description, i.category,
           i.location, i.status, i.created_at,
           u.name AS reporter_name,
           (SELECT image_url FROM images WHERE item_id = i.id LIMIT 1) AS thumbnail
    FROM items i
    JOIN users u ON i.user_id = u.id
    WHERE 1=1
  `;

  const params = [];

  if (status && status !== "all") {
    sql += " AND i.status = ?";
    params.push(status);
  }
  if (type) {
    sql += " AND i.type = ?";
    params.push(type);
  }
  if (category) {
    sql += " AND i.category = ?";
    params.push(category);
  }
  if (userId) {
    sql += " AND i.user_id = ?";
    params.push(userId);
  }

  sql += " ORDER BY i.created_at DESC";

  try {
    const [rows] = await pool.query(sql, params);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("getItems error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}




// ── GET /api/items/:id ─────────────────────────────────────────────────────────
// Public. Returns item + all its images.
export async function getItemById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT i.*, u.name AS reporter_name, u.email AS reporter_email
       FROM items i
       JOIN users u ON i.user_id = u.id
       WHERE i.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const [images] = await pool.query(
      "SELECT id, image_url, uploaded_at FROM images WHERE item_id = ?",
      [id]
    );

    return res.status(200).json({ ...rows[0], images });
  } catch (error) {
    console.error("getItemById error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// ── POST /api/items ────────────────────────────────────────────────────────────
// Protected. Creates a new lost/found report.
// Expects: { type, title, description, category, location }
export async function createItem(req, res) {
  const { type, title, description, category, location } = req.body;

  if (!type || !title || !description || !category || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["lost", "found"].includes(type)) {
    return res.status(400).json({ message: "Type must be 'lost' or 'found'" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO items (user_id, type, title, description, category, location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, type, title, description, category, location]
    );

    return res.status(201).json({
      message: "Item reported successfully",
      itemId: result.insertId,
    });
  } catch (error) {
    console.error("createItem error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// ── PATCH /api/items/:id ───────────────────────────────────────────────────────
// Protected. Owner can update their item's fields.
export async function updateItem(req, res) {
  const { id } = req.params;
  const { title, description, category, location } = req.body;

  try {
    const [rows] = await pool.query("SELECT user_id FROM items WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (rows[0].user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query(
      `UPDATE items SET title = COALESCE(?, title),
                        description = COALESCE(?, description),
                        category = COALESCE(?, category),
                        location = COALESCE(?, location)
       WHERE id = ?`,
      [title ?? null, description ?? null, category ?? null, location ?? null, id]
    );

    return res.status(200).json({ message: "Item updated" });
  } catch (error) {
    console.error("updateItem error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// ── PATCH /api/items/:id/resolve ───────────────────────────────────────────────
// Protected. Owner or admin marks item as resolved.
export async function resolveItem(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT user_id FROM items WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (rows[0].user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query("UPDATE items SET status = 'resolved' WHERE id = ?", [id]);

    return res.status(200).json({ message: "Item marked as resolved" });
  } catch (error) {
    console.error("resolveItem error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteItem(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT user_id FROM items WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (rows[0].user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await pool.query("DELETE FROM items WHERE id = ?", [id]);

    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error("deleteItem error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}