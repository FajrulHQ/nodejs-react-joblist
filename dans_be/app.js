const express = require('express');
const router = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  const logMessage = `[${req.method}] ${req.url} | ${res.statusCode} | ${req.get('User-Agent')}`;
  console.log(logMessage);
  next();
});
// Routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});