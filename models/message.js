const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sentBy:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    sentdAt:{
        type:Date,
        required:false,
        default: Date.now
    }
});

module.exports = mongoose.model('message', messageSchema);