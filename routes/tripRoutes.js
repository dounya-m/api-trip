const express = require('express');
const router = express.Router();
const {getTrips, createTrip, updateTrip, deleteTrip, getTripsWithBus, bookingTrip, testTrip} = require('../controllers/tripController');

router.route('/').get(getTrips);
router.route('/newtrip').post(createTrip);
router.route('/updatetrip/:id').put(updateTrip);
router.route('/deletetrip/:id').delete(deleteTrip);
router.route('/bustrip').get(getTripsWithBus);
router.route('/bookingTrip').post(bookingTrip);


module.exports = router;