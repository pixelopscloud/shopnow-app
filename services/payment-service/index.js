const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const paymentRoutes = require('./routes/payment');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'payment-service' });
});

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});

module.exports = app;