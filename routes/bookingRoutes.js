const express = require('express');
const router = express.Router();
const {getBookings, createBooking, updateBooking, getBookinguser} = require('../controllers/bookingController')

router.route('/').get(getBookings).put(updateBooking)
router.route('/:user/:trip').post(createBooking)
router.route('/bookuser/:idUser').get(getBookinguser)
module.exports = router;