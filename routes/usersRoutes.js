const express = require('express');
const router = express.Router();
const { getUsers, postUsers, updateUser } = require('../controllers/usersController');

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').put(updateUser);


module.exports = router;