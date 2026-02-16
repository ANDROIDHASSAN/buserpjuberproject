
const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const Route = require('../models/Route');

// @desc    Get dashboard stats
// @route   GET /api/reports/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalStudents = await Student.countDocuments({ status: 'active' });
    const totalRoutes = await Route.countDocuments({ status: 'active' });

    // Calculate total revenue from Payments
    const revenueResult = await Payment.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Students with pending fees
    const pendingStudents = await Student.find({ 'fees.balance': { $gt: 0 } }).countDocuments();

    res.json({
        totalStudents,
        totalRoutes,
        totalRevenue,
        pendingFeesCount: pendingStudents
    });
});

// @desc    Get monthly collection data for chart
// @route   GET /api/reports/collection
// @access  Private/Admin
const getMonthlyCollection = asyncHandler(async (req, res) => {
    const data = await Payment.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" }
                },
                totalAmount: { $sum: "$amount" }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format for frontend
    const formattedData = data.map(item => ({
        name: `${item._id.month}/${item._id.year}`,
        amount: item.totalAmount
    }));

    res.json(formattedData);
});

// @desc    Get route distribution for pie chart
// @route   GET /api/reports/routes
// @access  Private/Admin
const getRouteDistribution = asyncHandler(async (req, res) => {
    // Count students per route
    // Lookup route names
    const data = await Student.aggregate([
        { $match: { status: 'active' } },
        {
            $group: {
                _id: "$route",
                count: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "routes",
                localField: "_id",
                foreignField: "_id",
                as: "routeDetails"
            }
        },
        {
            $project: {
                name: { $arrayElemAt: ["$routeDetails.name", 0] },
                value: "$count"
            }
        }
    ]);

    // Filter out null routes if any
    const finalData = data.filter(d => d.name).map(d => ({
        name: d.name,
        value: d.value
    }));

    res.json(finalData);
});

module.exports = { getDashboardStats, getMonthlyCollection, getRouteDistribution };
