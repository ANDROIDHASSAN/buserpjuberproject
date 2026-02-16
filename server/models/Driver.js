
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true
    },
    licenseNumber: {
        type: String,
        required: [true, 'Please add a license number']
    },
    upiId: {
        type: String
    },
    photoUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on_leave'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema);
