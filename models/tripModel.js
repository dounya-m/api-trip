const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    busNumber: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter the bus number'],
        ref: 'Bus',
    },
    depart: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter the departure place'],
    },
    arrive: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter the arrival place'],
    },
    dateDep: {
        type: String,
        required: [true, 'Please enter the date'],
    },
    dateArr: {
        type: String,
        required: [true, 'Please enter the date'],
    },
    timeDep: {
        type: String,
        required: [true, 'Please enter the time'],
    },
    timeArr: {
        type: String,
        required: [true, 'Please enter the time'],
    },
    duree:{
        type: String,
        required: [true, 'Please enter the duration'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
    },
    break1: {
        type: String,
        lowercase: true,
    },
    break2: {
        type: String,
        lowercase: true,
    },
    break3: {
        type: String,
        lowercase: true,
    },
    break4: {
        type: String,
        lowercase: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },

},{
    timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);