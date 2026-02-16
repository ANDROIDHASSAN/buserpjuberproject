
const asyncHandler = require('express-async-handler');
const Driver = require('../models/Driver');

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private
const getDrivers = asyncHandler(async (req, res) => {
    const drivers = await Driver.find({});
    res.json(drivers);
});

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Private
const getDriverById = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params.id);
    if (driver) {
        res.json(driver);
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});

const User = require('../models/User');

// ...

// @desc    Create a driver
// @route   POST /api/drivers
// @access  Private/Admin
const createDriver = asyncHandler(async (req, res) => {
    const { name, phone, licenseNumber, upiId, photoUrl } = req.body;

    const driverExists = await Driver.findOne({ phone });

    if (driverExists) {
        res.status(400);
        throw new Error('Driver already exists');
    }

    const driver = await Driver.create({
        name,
        phone,
        licenseNumber,
        upiId,
        photoUrl
    });

    // Check if User exists for this phone (in email field or new phone field on User?)
    // Using email for login currently. Let's assume email = phone@buserp.com for now or add phone to User.
    // Task says "Phone Number (Login ID)".
    // I should update User model to allow phone login or mapping.
    // For MVP, I'll use fake email: phone@driver.com and password: phone

    const userExists = await User.findOne({ email: `${phone}@driver.com` });
    if (!userExists) {
        await User.create({
            name,
            email: `${phone}@driver.com`,
            password: phone, // Default password
            role: 'driver'
        });
    }

    if (driver) {
        res.status(201).json(driver);
    } else {
        res.status(400);
        throw new Error('Invalid driver data');
    }
});

// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Private/Admin
const updateDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params.id);

    if (driver) {
        driver.name = req.body.name || driver.name;
        driver.phone = req.body.phone || driver.phone;
        driver.licenseNumber = req.body.licenseNumber || driver.licenseNumber;
        driver.upiId = req.body.upiId || driver.upiId;
        driver.photoUrl = req.body.photoUrl || driver.photoUrl;
        driver.status = req.body.status || driver.status;

        const updatedDriver = await driver.save();
        res.json(updatedDriver);
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private/Admin
const deleteDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params.id);

    if (driver) {
        await driver.deleteOne();
        res.json({ message: 'Driver removed' });
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});

module.exports = { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver };
