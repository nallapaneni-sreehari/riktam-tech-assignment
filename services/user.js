const userModel = require('../models/user');


async function addUser(user)
{
    try
    {
        var response = await userModel.create(user);

        console.log(`addUsr ::: `, response);
        

        return response ? response?._id : false;
    }
    catch(e)
    {
        return false;
    }
}

async function updateUser(email, user)
{
    var query = {};

    try
    {
        var response = await userModel.findOne({email:email});

        for(let key of Object.keys(user))
        {
            response[key] = user[key] != undefined ? user[key] : response[key];
        }
    
        response.save();

        return response;
    }
    catch(e)
    {
        return false;
    }
}


async function login(email, password)
{
    try
    {
        var response = await userModel.findOne({email:email, password:password});

        console.log(`Login ::: `, response);

        return response;
    }
    catch(e)
    {
        return false;
    }
}

async function updateToken(email, token)
{
    try
    {
        var response = await userModel.findOne({email:email});

        response.token = token;

        response.save();

        return response;
    }
    catch(e)
    {
        return false;
    }
}

async function getUserByToken(token)
{
    try
    {
        var response = await userModel.findOne({token:token});

        return response;
    }
    catch(e)
    {
        return false;
    }
}
async function getUserByEmail(email)
{
    try
    {
        var response = await userModel.findOne({email:email});

        return response;
    }
    catch(e)
    {
        return false;
    }
}



module.exports = {
    addUser,
    login,
    updateUser,
    updateToken,
    getUserByToken,
    getUserByEmail
}