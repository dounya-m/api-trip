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
    const {busNumber, depart, arrive, dateDep, dateArr, timeDep, timeArr, duree, price, break1, break2, break3, break4} = req.body;

        if(!busNumber || !depart || !arrive || !dateDep || !dateArr || !duree || !price || dateDep > dateArr ) {
            res.status(400).json({ message:'text is required or place is not valid or date is not valid'});
        };

    const trip = await Trip.create({
        busNumber,
        depart,
        arrive,
        dateDep,
        dateArr,
        timeDep,
        timeArr,
        duree,
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
// const bookingTrip = asyncHandler(async (req, res) => {
    // const {...others} = req.headers;
    // const searchTrip =  [];
    // const time_now = new Date().toLocaleTimeString();
    // const date_now = new Date().toLocaleDateString();
    // const trips = await Trip.find({...others}).populate('busNumber');
    // // if(trips.length){
    //     for(let i=0; i<trips.length; i++){
    //         if(trips.dateDep >= date_now ){
    //             searchTrip.push(trips[i]);
    //         }
    //     }
    //     // searchTrip ? res.status(200).json(searchTrip) : res.status(400).json({message: 'No trip found'});
    // // }    
    // res.json(trips);
// });

//@desc get trips where search = true
// @route POST /api/trips/search
// @access Public
const bookingTrip = asyncHandler(async (req, res) => {
    const time_now = new Date().toLocaleTimeString();
    const date_now = new Date().toLocaleDateString();
    const { ...others } = req.query;
    const trips = await Trip.find({ ...others }).populate('busNumber'); 
    const searchTrips = [];
        if (trips.length) {
        for (let i = 0; i < trips.length; i++) {
            if (trips[i].timeDep > time_now || trips[i].dateDep >= date_now) {
            searchTrips.push(trips[i]);
            }
        }
        searchTrips.length
            ? res.status(200).json(searchTrips)
            : res.status(404).json({ message: "No bus are available for this trip"});
        } else {
        res.status(404).json({
            message: "No bus are available for this trip",
        });
        }
});


module.exports = { getTrips, createTrip, updateTrip, deleteTrip, getTripsWithBus, bookingTrip };