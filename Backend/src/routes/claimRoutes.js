import express from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/authMiddleware.js';

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

export default router;