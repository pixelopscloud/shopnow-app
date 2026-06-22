const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const productRoutes = require('./routes/product');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'product-service' });
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});

module.exports = app;