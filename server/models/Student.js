
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    class: { type: String, required: true },
    division: { type: String },
    rollNumber: { type: String },
    bloodGroup: { type: String },

    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',
        required: true
    },

    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    },
    stop: {
        type: String
    },

    fees: {
        monthlyAmount: { type: Number, default: 1500 },
        balance: { type: Number, default: 0 },
        lastPaymentDate: { type: Date }
    },

    status: {
        type: String,
        enum: ['active', 'archived', 'left'],
        default: 'active'
    },

    photoUrl: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
