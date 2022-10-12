const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const getUsers =  asyncHandler(async(req, res) => {
    const users = await User.find()

    res.status(200).json(users);
}); 

const postUsers =  asyncHandler(async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).json({ message:'text is required'});
    };
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    res.status(200).json(user);
});

const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User not found');
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
    })
    res.status(200).json(updateUser);
});

module.exports = {
    getUsers,
    postUsers,
    updateUser,
};
