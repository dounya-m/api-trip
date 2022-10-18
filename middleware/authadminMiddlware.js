    const jwt = require("jsonwebtoken");
    const asyncHandler = require("express-async-handler");
    const Admin = require("../models/adminModel");
    const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
        //Get Token from Header
        token = req.headers.authorization.split(" ")[1];
        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Get User From Token
        req.user = await User.findById(decoded.id).select("-password");
        next();
        } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, No token");
    }
    });
    module.exports = { protect };