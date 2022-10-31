const asyncHandler = require('express-async-handler');
const Trip = require('../models/tripModel');

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
const getTrips = asyncHandler(async (req, res) => {
    const trips = await Trip.find({});
        trips.forEach(trip => {
            if(trip.dateDep < Date.now()){
                trip.status = 'inactive';
                trip.save();
            }
        });
        res.json(trips);
    });

// @desc Create a trip
// @route POST /api/trips
// @access Public
const createTrip = asyncHandler(async (req, res) => {
    const {busNumber, depart, arrive, dateDep, dateArr, time, price, break1, break2, break3, break4} = req.body;

    if(!busNumber || !depart || !arrive || !dateDep || !dateArr || !time || !price || dateDep > dateArr ) {
        res.status(400).json({ message:'text is required or place is not valid or date is not valid'});
    };

    const trip = await Trip.create({
        busNumber,
        depart,
        arrive,
        dateDep,
        dateArr,
        time,
        price,
        break1, 
        break2,
        break3,
        break4,
    });
    res.status(200).json(trip);
});

// @desc Update a trip  
// @route PUT /api/trips/:id
// @access Public
const updateTrip = asyncHandler(async (req, res) => {
    const {busNumber, depart, arrive, dateDep, dateArr, time, price, break1, break2, break3, break4} = req.body;
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400)
        throw new Error('Trip not found');
    }
    const updating = await Trip.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updating);
});

// @desc Delete a trip
// @route DELETE /api/trips/:id
// @access Public
const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400)
        throw new Error('Trip not found');
    }
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Trip deleted'});
});
// @desc    Get all trips with bus information
// @route   GET /api/trips/bus
// @access  Public
const getTripsWithBus = asyncHandler(async (req, res) => {
    const trips = await Trip.find({}).populate('busNumber');
    res.json(trips);
});

//recherche par ville de depart et d'arriver
// @desc    Get all trips with bus information
// @route   GET /api/trips/bus
// @access  Public
const bookingTrip = asyncHandler(async (req, res) => {
    const trips = await Trip.find({depart: req.params.depart, arrive: req.params.arrive}).populate('busNumber');
    res.json(trips);
});

module.exports = { getTrips, createTrip, updateTrip, deleteTrip, getTripsWithBus, bookingTrip };