const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Create payment
router.post('/', async (req, res) => {
  try {
    const { order_id, user_id, amount, payment_method } = req.body;

    const result = await pool.query(
      'INSERT INTO payments (order_id, user_id, amount, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [order_id, user_id, amount, payment_method, 'completed']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payment by order
router.get('/order/:order_id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE order_id = $1',
      [req.params.order_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user payments
router.get('/user/:user_id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [req.params.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;