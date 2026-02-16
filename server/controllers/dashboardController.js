
const Student = require('../models/Student');
const Route = require('../models/Route');
const Payment = require('../models/Payment');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        // Get current month start and end dates
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Get previous month for comparison
        const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        // Total Students (active only)
        const totalStudents = await Student.countDocuments({ status: 'active' });
        const prevMonthStudents = await Student.countDocuments({
            status: 'active',
            createdAt: { $lt: monthStart }
        });
        const studentChange = prevMonthStudents > 0
            ? ((totalStudents - prevMonthStudents) / prevMonthStudents * 100).toFixed(1)
            : 0;

        // Active Routes
        const activeRoutes = await Route.countDocuments({ status: 'active' });
        const routesWithDrivers = await Route.countDocuments({
            status: 'active',
            driver: { $ne: null }
        });

        // Revenue for current month
        const currentMonthRevenue = await Payment.aggregate([
            {
                $match: {
                    date: { $gte: monthStart, $lte: monthEnd }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // Revenue for previous month
        const prevMonthRevenue = await Payment.aggregate([
            {
                $match: {
                    date: { $gte: prevMonthStart, $lte: prevMonthEnd }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const currentRevenue = currentMonthRevenue[0]?.total || 0;
        const previousRevenue = prevMonthRevenue[0]?.total || 0;
        const revenueChange = previousRevenue > 0
            ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
            : 0;

        // Fuel Expense (mock calculation - 30% of revenue as fuel cost)
        // In a real app, you'd have a separate Expense model
        const fuelExpense = Math.round(currentRevenue * 0.3);
        const prevFuelExpense = Math.round(previousRevenue * 0.3);
        const fuelChange = prevFuelExpense > 0
            ? ((fuelExpense - prevFuelExpense) / prevFuelExpense * 100).toFixed(1)
            : 0;

        // Format currency (Indian Rupees)
        const formatCurrency = (amount) => {
            if (amount >= 100000) {
                return `₹${(amount / 100000).toFixed(1)}L`;
            } else if (amount >= 1000) {
                return `₹${(amount / 1000).toFixed(0)}k`;
            }
            return `₹${amount}`;
        };

        res.json({
            stats: {
                totalStudents: {
                    value: totalStudents.toLocaleString('en-IN'),
                    change: `${studentChange >= 0 ? '+' : ''}${studentChange}%`
                },
                activeRoutes: {
                    value: activeRoutes,
                    change: `${routesWithDrivers} Running`
                },
                revenue: {
                    value: formatCurrency(currentRevenue),
                    change: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`
                },
                fuelExpense: {
                    value: formatCurrency(fuelExpense),
                    change: `${fuelChange >= 0 ? '+' : ''}${fuelChange}%`
                }
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Error fetching dashboard statistics' });
    }
};

// @desc    Get recent alerts
// @route   GET /api/dashboard/alerts
// @access  Private
const getRecentAlerts = async (req, res) => {
    try {
        const alerts = [];

        // Check for students with pending fees
        const studentsWithPendingFees = await Student.countDocuments({
            status: 'active',
            'fees.balance': { $gt: 0 }
        });

        if (studentsWithPendingFees > 0) {
            alerts.push({
                id: 'fees-pending',
                title: `Fees pending for ${studentsWithPendingFees} students`,
                type: 'error',
                time: '1 day ago'
            });
        }

        // Check for routes without drivers
        const routesWithoutDrivers = await Route.countDocuments({
            status: 'active',
            driver: null
        });

        if (routesWithoutDrivers > 0) {
            alerts.push({
                id: 'routes-no-driver',
                title: `${routesWithoutDrivers} active routes without assigned drivers`,
                type: 'warning',
                time: '2 hours ago'
            });
        }

        // Check for overdue payments (students who haven't paid in 30+ days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const overdueStudents = await Student.countDocuments({
            status: 'active',
            $or: [
                { 'fees.lastPaymentDate': { $lt: thirtyDaysAgo } },
                { 'fees.lastPaymentDate': null }
            ]
        });

        if (overdueStudents > 0) {
            alerts.push({
                id: 'overdue-payments',
                title: `${overdueStudents} students with overdue payments`,
                type: 'warning',
                time: 'Just now'
            });
        }

        res.json({ alerts });
    } catch (error) {
        console.error('Dashboard alerts error:', error);
        res.status(500).json({ message: 'Error fetching alerts' });
    }
};

module.exports = {
    getDashboardStats,
    getRecentAlerts
};
