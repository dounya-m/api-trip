const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = asyncHandler(async (req, res) => {
        const bookings = await Booking.find({});
        res.json(bookings);
    });
// @desc Create a booking
// @route POST /api/bookings
// @access Public
const createBooking = asyncHandler(async (req, res) => {
    const {user, trip, state} = req.body;
    if(!user || !trip) {
        res.status(400).json({ message:'user and trip is required'});
    };
    const booking = await Booking.create({
        user,
        trip,
        state,
    });
    res.status(200).json(booking);
});

// @desc Update a booking
// @route PUT /api/bookings/:id
// @access Public
const updateBooking = asyncHandler(async (req, res) => {
    const {state} = req.body;
    const booking = await Booking.findById(req.params.id);
    if(!booking){
        res.status(400)
        throw new Error('Booking not found');
    }
    const updating = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updating);
});

module.exports = { getBookings, createBooking, updateBooking };