
const express = require('express');
const router = express.Router();
const { getDashboardStats, getMonthlyCollection, getRouteDistribution } = require('../controllers/reportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/collection', protect, admin, getMonthlyCollection);
router.get('/routes', protect, admin, getRouteDistribution);

module.exports = router;
