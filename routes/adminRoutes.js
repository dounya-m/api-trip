const express = require('express');
const router = express.Router();
const { getAdmin, register, updating, deleting, login } = require('../controllers/adminController');

router.route('/').get(getAdmin);
router.route('/register').post(register)
router.route('/updateAdmin/:id').post(updating);
router.route('/deleteAdmin/:id').delete(deleting);
router.route('/login').post(login);




module.exports = router;