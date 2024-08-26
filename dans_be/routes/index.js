const express = require('express');
const { register, login } = require('../controllers/auth');
const { getPosition, getPositionByID } = require('../controllers/recruitment');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Authentication Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Recruitment Routes
router.get('/recruitment/positions', authMiddleware, getPosition)
router.get('/recruitment/positions/:id', authMiddleware, getPositionByID)

module.exports = router;
