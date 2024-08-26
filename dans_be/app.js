const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});