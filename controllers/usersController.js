const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.status(200).json({user, token: generateToken(user._id)});
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

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User not found');
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted'});

});

//create login method
const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        res.status(400)
        throw new Error('User not found');
    };
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)});
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
});

//Get user data private 
const getme = asyncHandler(async(req, res) => {

    const {_id, name, email} = await User.findById(req.user._id);

    res.status(200).json({_id, name, email});

});

//generate JWT token
const generateToken = (id) => {

    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = {
    getUsers,
    postUsers,
    updateUser,
    deleteUser,
    login,
    getme,
};
