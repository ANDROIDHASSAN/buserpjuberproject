
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // console.log('Token received:', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log('Decoded ID:', decoded.id);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.error('User not found with ID:', decoded.id);
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            // console.log('User authenticated:', req.user.email, req.user.role);
            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        console.error('No token provided in headers');
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin' || req.user.role === 'superadmin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
