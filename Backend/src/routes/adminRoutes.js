import express from 'express';
import pool from '../config/db.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [[{ totalItems }]] = await pool.query('SELECT COUNT(*) AS totalItems FROM items');
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [[{ pendingClaims }]] = await pool.query("SELECT COUNT(*) AS pendingClaims FROM claims WHERE status = 'pending'");
    const [[{ resolvedItems }]] = await pool.query("SELECT COUNT(*) AS resolvedItems FROM items WHERE status = 'resolved'");

    res.json({ totalItems, totalUsers, pendingClaims, resolvedItems });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;