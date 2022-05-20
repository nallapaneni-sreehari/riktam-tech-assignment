const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    createdAt:{
        type:Date,
        required:false,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);