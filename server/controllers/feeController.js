
const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Student = require('../models/Student');

// @desc    Record a payment
// @route   POST /api/fees
// @access  Private/Admin
const recordPayment = asyncHandler(async (req, res) => {
    const { studentId, amount, mode, remarks, date } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
        res.status(404);
        throw new Error('Student not found');
    }

    // Generate Receipt Number (Simple sequential or timestamp based for MVP)
    const receiptNumber = `REC-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

    const payment = await Payment.create({
        student: studentId,
        amount,
        mode, // Cash, UPI, etc
        date: date || Date.now(),
        receiptNumber,
        remarks,
        recordedBy: req.user._id
    });

    if (payment) {
        // Update Student Balance
        // Deduct paid amount from balance
        student.fees.balance = (student.fees.balance || 0) - amount;
        student.fees.lastPaymentDate = payment.date;
        await student.save();

        res.status(201).json(payment);
    } else {
        res.status(400);
        throw new Error('Invalid payment data');
    }
});

// @desc    Get payment history for a student
// @route   GET /api/fees/student/:id
// @access  Private
const getStudentPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ student: req.params.id }).sort({ date: -1 });
    res.json(payments);
});

// @desc    Get all payments (Ledger)
// @route   GET /api/fees
// @access  Private
const getAllPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({})
        .populate('student', 'firstName lastName class')
        .sort({ date: -1 });
    res.json(payments);
});

module.exports = { recordPayment, getStudentPayments, getAllPayments };
