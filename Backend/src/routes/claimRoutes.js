import express from 'express';
import pool from '../config/db.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/claims — submit a claim on an item
router.post('/', requireAuth, async (req, res) => {
  const { item_id, secret_answer } = req.body;
  const claimant_id = req.user.id;

  if (!item_id || !secret_answer) {
    return res.status(400).json({ message: 'item_id and secret_answer are required' });
  }

  try {
    // Check the item exists and is still open
    const [[item]] = await pool.query(
      'SELECT id, user_id, status FROM items WHERE id = ?',
      [item_id]
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.status === 'resolved') return res.status(409).json({ message: 'This item is already resolved' });
    if (item.user_id === claimant_id) return res.status(409).json({ message: 'You cannot claim your own item' });

    // Prevent duplicate pending claims from the same user
    const [[existing]] = await pool.query(
      "SELECT id FROM claims WHERE item_id = ? AND claimant_id = ? AND status = 'pending'",
      [item_id, claimant_id]
    );
    if (existing) return res.status(409).json({ message: 'You already have a pending claim on this item' });

    const [result] = await pool.query(
      'INSERT INTO claims (item_id, claimant_id, claimant_answer) VALUES (?, ?, ?)',
      [item_id, claimant_id, secret_answer]
    );

    res.status(201).json({ message: 'Claim submitted successfully', claimId: result.insertId });
  } catch (err) {
    console.error('Claim error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/claims — list all claims with item + claimant info (admin only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [claims] = await pool.query(`
      SELECT
        c.id, c.status, c.claimant_answer, c.created_at,
        i.id AS item_id, i.title AS item_title, i.type AS item_type,
        u.id AS claimant_id, u.name AS claimant_name, u.email AS claimant_email
      FROM claims c
      JOIN items i ON c.item_id = i.id
      JOIN users u ON c.claimant_id = u.id
      ORDER BY c.created_at DESC
    `);
    res.json(claims);
  } catch (err) {
    console.error('Get claims error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/claims/:id/approve — approve a claim and resolve the item (admin only)
router.patch('/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const [[claim]] = await pool.query('SELECT * FROM claims WHERE id = ?', [id]);
    if (!claim) return res.status(404).json({ message: 'Claim not found' });
    if (claim.status !== 'pending') return res.status(409).json({ message: 'Claim is no longer pending' });

    await pool.query("UPDATE claims SET status = 'approved' WHERE id = ?", [id]);
    await pool.query("UPDATE items SET status = 'resolved' WHERE id = ?", [claim.item_id]);

    res.json({ message: 'Claim approved and item resolved' });
  } catch (err) {
    console.error('Approve claim error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/claims/:id/reject — reject a claim (admin only)
router.patch('/:id/reject', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const [[claim]] = await pool.query('SELECT * FROM claims WHERE id = ?', [id]);
    if (!claim) return res.status(404).json({ message: 'Claim not found' });
    if (claim.status !== 'pending') return res.status(409).json({ message: 'Claim is no longer pending' });

    await pool.query("UPDATE claims SET status = 'rejected' WHERE id = ?", [id]);

    res.json({ message: 'Claim rejected' });
  } catch (err) {
    console.error('Reject claim error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;