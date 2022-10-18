const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'Pleas entre youre name']
    },
    email:{
        type: String,
        required: [true, 'Pleas entre youre email'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Pleas entre youre password']
    }

},{
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);