const messageModel = require('../models/message');
const mongoose = require('mongoose');

async function sendMessage(message)
{
    try
    {
        var response = await messageModel.create(message);

        console.log(`create message ::: `, response);
        
        return response ? response?._id : false;
    }
    catch(e)
    {
        console.log(`Here`, e);
        
        return false;
    }
}

async function likeMessage(messageId)
{
    try
    {
        var response = await messageModel.findOne({_id:mongoose.Types.ObjectId(messageId)});

        response.likes++;

        response.save();

        console.log(`like message ::: `, response);
        
        return response ? response?._id : false;
    }
    catch(e)
    {
        return false;
    }
}

module.exports = {
    sendMessage,
    likeMessage
}