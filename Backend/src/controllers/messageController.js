import pool from "../config/db.js";

// POST /api/conversations
// Body: { itemId, recipientId }
export async function getOrCreateConversation(req, res) {
  const { itemId, recipientId } = req.body;
  const userId = req.user.id;

  if (!itemId || !recipientId) {
    return res.status(400).json({ message: "itemId and recipientId are required" });
  }
  if (userId === recipientId) {
    return res.status(400).json({ message: "Cannot message yourself" });
  }

  const user1 = Math.min(userId, recipientId);
  const user2 = Math.max(userId, recipientId);

  try {
    const [existing] = await pool.query(
      `SELECT * FROM conversations WHERE item_id = ? AND user1_id = ? AND user2_id = ?`,
      [itemId, user1, user2]
    );

    if (existing.length > 0) {
      return res.status(200).json(existing[0]);
    }

    const [result] = await pool.query(
      `INSERT INTO conversations (item_id, user1_id, user2_id) VALUES (?, ?, ?)`,
      [itemId, user1, user2]
    );

    const [created] = await pool.query(
      `SELECT * FROM conversations WHERE id = ?`, [result.insertId]
    );

    return res.status(201).json(created[0]);
  } catch (error) {
    console.error("getOrCreateConversation error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/conversations
export async function getMyConversations(req, res) {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.created_at,
              i.title AS item_title, i.type AS item_type,
              i.user_id AS poster_id,
              u1.name AS user1_name, u2.name AS user2_name,
              (SELECT body FROM messages WHERE conversation_id = c.id ORDER BY sent_at DESC LIMIT 1) AS last_message,
              (SELECT sent_at FROM messages WHERE conversation_id = c.id ORDER BY sent_at DESC LIMIT 1) AS last_message_at,
              (SELECT COUNT(*) FROM messages WHERE conversation_id = c.id AND sender_id != ? AND is_read = FALSE) AS unread_count
       FROM conversations c
       JOIN items i ON c.item_id = i.id
       JOIN users u1 ON c.user1_id = u1.id
       JOIN users u2 ON c.user2_id = u2.id
       WHERE c.user1_id = ? OR c.user2_id = ?
       ORDER BY last_message_at DESC`,
      [userId, userId, userId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("getMyConversations error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/conversations/:id/messages
export async function getMessages(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const [conv] = await pool.query(
      `SELECT * FROM conversations WHERE id = ?`, [id]
    );
    if (conv.length === 0) return res.status(404).json({ message: "Conversation not found" });
    if (conv[0].user1_id !== userId && conv[0].user2_id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const [messages] = await pool.query(
      `SELECT m.id, m.body, m.sent_at, m.is_read, m.sender_id,
              u.name AS sender_name
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.sent_at ASC`,
      [id]
    );

    // Mark messages as read
    await pool.query(
      `UPDATE messages SET is_read = TRUE WHERE conversation_id = ? AND sender_id != ?`,
      [id, userId]
    );

    return res.status(200).json(messages);
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// POST /api/conversations/:id/messages
export async function sendMessage(req, res) {
  const { id } = req.params;
  const { body } = req.body;
  const userId = req.user.id;

  if (!body?.trim()) {
    return res.status(400).json({ message: "Message body is required" });
  }

  try {
    const [conv] = await pool.query(
      `SELECT * FROM conversations WHERE id = ?`, [id]
    );
    if (conv.length === 0) return res.status(404).json({ message: "Conversation not found" });
    if (conv[0].user1_id !== userId && conv[0].user2_id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const [result] = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, body) VALUES (?, ?, ?)`,
      [id, userId, body.trim()]
    );

    const [created] = await pool.query(
      `SELECT m.*, u.name AS sender_name FROM messages m
       JOIN users u ON m.sender_id = u.id WHERE m.id = ?`,
      [result.insertId]
    );

    return res.status(201).json(created[0]);
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// PATCH /api/conversations/:id/resolve
export async function resolveConversation(req, res) {
  const { id } = req.params;
  const { action } = req.body;
  const userId = req.user.id;

  if (!["approved", "rejected"].includes(action)) {
    return res.status(400).json({ message: "action must be 'approved' or 'rejected'" });
  }

  try {
    const [conv] = await pool.query(
      `SELECT c.*, i.user_id AS poster_id FROM conversations c
       JOIN items i ON c.item_id = i.id
       WHERE c.id = ?`,
      [id]
    );

    if (conv.length === 0)
      return res.status(404).json({ message: "Conversation not found" });
    if (conv[0].poster_id !== userId)
      return res.status(403).json({ message: "Only the item owner can resolve a claim" });

    const [existing] = await pool.query(
      `SELECT id FROM messages
       WHERE conversation_id = ?
       AND (body LIKE '__APPROVED__%' OR body LIKE '__REJECTED__%')
       LIMIT 1`,
      [id]
    );
    if (existing.length > 0)
      return res.status(409).json({ message: "Claim already resolved" });

    const systemMsg = action === "approved"
      ? `__APPROVED__ The owner approved this claim. Item marked as resolved.`
      : `__REJECTED__ The owner rejected this claim.`;

    const [result] = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, body) VALUES (?, ?, ?)`,
      [id, userId, systemMsg]
    );

    if (action === "approved") {
      await pool.query(`UPDATE items SET status = 'resolved' WHERE id = ?`, [conv[0].item_id]);
    }

    const [created] = await pool.query(
      `SELECT m.*, u.name AS sender_name FROM messages m
       JOIN users u ON m.sender_id = u.id WHERE m.id = ?`,
      [result.insertId]
    );

    return res.status(201).json(created[0]);
  } catch (error) {
    console.error("resolveConversation error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}