const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    createdBy:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    members:{
        type:Array,
        required:true,
        default:[]
    },
    createdAt:{
        type:Date,
        required:false,
        default: Date.now
    }
});

module.exports = mongoose.model('group', groupSchema);