const groupModel = require('../models/group');


async function createGroup(group)
{
    try
    {
        var response = await groupModel.create(group);

        console.log(`create group ::: `, response);
        
        return response ? response?._id : false;
    }
    catch(e)
    {
        return false;
    }
}

async function deleteGroup(groupName)
{
    try
    {
        var response = await groupModel.deleteOne({name:groupName});

        console.log(`delete group ::: `, response);
        
        return response;
    }
    catch(e)
    {
        return false;
    }
}

async function searchGroup(searchString)
{
    try
    {
        var response = await groupModel.find({name:{$regex:searchString}});

        return response;
    }
    catch(e)
    {
        return [];
    }
}

async function getGroupByName(name)
{
    try
    {
        var response = await groupModel.find({name:name});

        return response;
    }
    catch(e)
    {
        return false;
    }
}

async function addMemberToGroup(groupName, memberEmail)
{
    try
    {
        var response = await groupModel.findOne({name:groupName});

        if(response && response?._id)
        {
            response?.members.push(memberEmail);
        }

        response.save();
        
        return response;
    }
    catch(e)
    {
        return false;
    }
}

module.exports = {
    createGroup,
    deleteGroup,
    searchGroup,
    getGroupByName,
    addMemberToGroup
}