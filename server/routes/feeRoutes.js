
const express = require('express');
const router = express.Router();
const { recordPayment, getStudentPayments, getAllPayments } = require('../controllers/feeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllPayments).post(protect, admin, recordPayment);
router.route('/student/:id').get(protect, getStudentPayments);

module.exports = router;
