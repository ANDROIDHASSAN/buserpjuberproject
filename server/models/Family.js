
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    fatherName: { type: String, required: true },
    motherName: { type: String },
    primaryPhoneNumber: { type: String, required: true, unique: true },
    secondaryPhoneNumber: { type: String },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, default: 'Hyderabad' },
    pincode: { type: String },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Family', familySchema);
