const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  Admin  = require('../models/adminModel')

const getAdmin =  asyncHandler(async(req, res) => {
    const admin = await Admin.find()

    res.status(200).json(admin);
});

// register admin
const register =  asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400).json({ message:'text is required'});
    };

    const admin = await Admin.create({
        name,
        email,
        password,
    });
    //hash password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    await admin.save();

    res.status(200).json({admin, token: generateToken(admin._id)});
});

// update admin 
const updating =  asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    const admin = await Admin.findById(req.params.id);
    if(!admin){
        res.status(400)
        throw new Error('Admin not found');
    }
    const updating = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updating);
});

//delet admin
const deleting = asyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.params.id);
    if(!admin){
        res.status(400)
        throw new Error('Admin not found');
    }
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Admin deleted'});
});

//login admin
const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if(admin && (await bcrypt.compare(password, admin.password))){
        res.status(200).json({admin, token: generateToken(admin._id)});
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});



//generate JWT token
const generateToken = (id) => {

    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    getAdmin,
    register,
    updating,
    deleting,
    login
}