const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user']
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: [true, 'Booking must belong to a tour']
    },
    state: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },

},{
    timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);