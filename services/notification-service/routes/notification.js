const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send notification
router.post('/send', async (req, res) => {
  try {
    const { user_id, email, type, message } = req.body;

    await pool.query(
      'INSERT INTO notifications (user_id, type, message, status) VALUES ($1, $2, $3, $4)',
      [user_id, type, message, 'sent']
    );

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `ShopNow - ${type}`,
      text: message
    });

    res.status(201).json({ message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user notifications
router.get('/user/:user_id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [req.params.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;