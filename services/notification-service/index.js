const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const notificationRoutes = require('./routes/notification');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

module.exports = app;