
const asyncHandler = require('express-async-handler');
const Route = require('../models/Route');

// @desc    Get all routes
// @route   GET /api/routes
// @access  Private
const getRoutes = asyncHandler(async (req, res) => {
    const routes = await Route.find({}).populate('driver', 'name phone');
    res.json(routes);
});

// @desc    Get single route
// @route   GET /api/routes/:id
// @access  Private
const getRouteById = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id).populate('driver', 'name phone');
    if (route) {
        res.json(route);
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

// @desc    Create a route
// @route   POST /api/routes
// @access  Private/Admin
const createRoute = asyncHandler(async (req, res) => {
    const { name, startPoint, endPoint, stops, capacity, driver } = req.body;

    const routeExists = await Route.findOne({ name });

    if (routeExists) {
        res.status(400);
        throw new Error('Route already exists');
    }

    const route = await Route.create({
        name,
        startPoint,
        endPoint,
        stops,
        capacity,
        driver
    });

    if (route) {
        res.status(201).json(route);
    } else {
        res.status(400);
        throw new Error('Invalid route data');
    }
});

// @desc    Update route
// @route   PUT /api/routes/:id
// @access  Private/Admin
const updateRoute = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);

    if (route) {
        route.name = req.body.name || route.name;
        route.startPoint = req.body.startPoint || route.startPoint;
        route.endPoint = req.body.endPoint || route.endPoint;
        route.stops = req.body.stops || route.stops;
        route.capacity = req.body.capacity || route.capacity;
        route.driver = req.body.driver || route.driver;
        route.status = req.body.status || route.status;

        const updatedRoute = await route.save();
        res.json(updatedRoute);
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

// @desc    Delete route
// @route   DELETE /api/routes/:id
// @access  Private/Admin
const deleteRoute = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);

    if (route) {
        await route.deleteOne();
        res.json({ message: 'Route removed' });
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

module.exports = { getRoutes, getRouteById, createRoute, updateRoute, deleteRoute };
