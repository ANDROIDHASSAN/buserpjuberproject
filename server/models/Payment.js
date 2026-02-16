
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mode: {
        type: String,
        enum: ['Cash', 'UPI', 'Cheque', 'Online'],
        required: true
    },
    transactionId: {
        type: String
    },
    receiptNumber: {
        type: String,
        required: true,
        unique: true
    },
    remarks: {
        type: String
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
