
const express = require('express');
const router = express.Router();
const { getRoutes, getRouteById, createRoute, updateRoute, deleteRoute } = require('../controllers/routeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRoutes).post(protect, admin, createRoute);
router.route('/:id').get(protect, getRouteById).put(protect, admin, updateRoute).delete(protect, admin, deleteRoute);

module.exports = router;
