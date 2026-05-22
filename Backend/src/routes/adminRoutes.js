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

// GET /api/admin/users — fetch all users
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, student_number, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PATCH /api/admin/users/:id/role — toggle a user's role
router.patch('/users/:id/role', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const [[user]] = await pool.query('SELECT role FROM users WHERE id = ?', [id]);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newRole = user.role === 'admin' ? 'student' : 'admin';
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [newRole, id]);
    res.json({ id: Number(id), role: newRole });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

export default router;