const express = require('express');
const router = express.Router();
const { getUsers, postUsers, setUser } = require('../controllers/usersController');

router.route('/').get( getUsers).post(postUsers).put(setUser);


module.exports = router;