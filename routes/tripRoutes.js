const express = require('express');
const router = express.Router();
const {getTrips, createTrip, updateTrip, deleteTrip, getTripsWithBus, bookingTrip} = require('../controllers/tripController');

router.route('/').get(getTrips);
router.route('/newtrip').post(createTrip);
router.route('/updatetrip/:id').put(updateTrip);
router.route('/deletetrip/:id').delete(deleteTrip);
router.route('/bustrip').get(getTripsWithBus);
router.route('/bookingtrip').post(bookingTrip);

module.exports = router;