const express = require('express');
const router = express.Router();
const { getUsers, postUsers, updateUser, deleteUser, login, getme } = require('../controllers/usersController');

const {protect} = require('../middleware/authuserMiddleware');

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/login').post(login);
router.get('/me',protect, getme);


module.exports = router;