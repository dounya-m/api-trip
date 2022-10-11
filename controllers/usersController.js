const asyncHandler = require('express-async-handler')

const getUsers =  asyncHandler(async(req, res) => {
    res.status(200).json({ message:'get users'});
});

const postUsers =  asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400).json({ message:'text is required'});
    };
    res.status(200).json({ message:'post users'});
});

const setUser = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('text is required');
    }
    res.status(200).json({ message:'set user'});
});

module.exports = {
    getUsers,
    postUsers,
    setUser,
};
