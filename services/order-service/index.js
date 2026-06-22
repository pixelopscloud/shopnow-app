const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const orderRoutes = require('./routes/order');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'order-service' });
});

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});

module.exports = app;