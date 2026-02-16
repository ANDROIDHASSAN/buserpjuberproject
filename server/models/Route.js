
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a route name'],
        unique: true
    },
    startPoint: {
        type: String,
        required: [true, 'Please add a start point']
    },
    endPoint: {
        type: String,
        required: [true, 'Please add an end point']
    },
    stops: [{
        name: { type: String, required: true },
        order: { type: Number, required: true }
    }],
    capacity: {
        type: Number,
        required: [true, 'Please add vehicle capacity']
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Route', routeSchema);
