
const express = require('express');
const router = express.Router();
const { getDashboardStats, getRecentAlerts } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getDashboardStats);
router.get('/alerts', protect, getRecentAlerts);

module.exports = router;
