const express = require('express');
const router = express.Router();
const { getUsers, postUsers, updateUser, deleteUser, login } = require('../controllers/usersController');

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/login').post(login);


module.exports = router;