const express = require('express');
const router = express.Router();
const {validateUser} = require('../middlewares/authenticate');
const groupService = require('../services/group');
const userService = require('../services/user');
const messageService = require('../services/message');

router.post('/createGroup', validateUser, async (req, res)=>{
    
    const token = req.headers['authorization']?.split(' ')[1];

    if(!req.body?.name)   //Validate request parameteres
    {
        res.status(403).send({status:'failed', message:'Missing one or more of these parametes `name`'});
    }
    else
    { 
        try {

            const userByToken = await userService.getUserByToken(token);

            const group = {
                name:req.body?.name,
                createdBy:userByToken?.email ?? ''
            };

            var groupExist = await groupService.getGroupByName(group.name); //Check if group already exist with the name

            if(groupExist && groupExist?._id)
            {
                res.status(400).send({status:'failed', message:'group already exist with that name'});
            }
            else
            {
                var response = await groupService.createGroup(group);

                if(response?._id)
                {
                    res.status(201).send({status:'success', message:'Group created successfully'});
                }
                else
                {
                    res.status(500).send({status:'failed', message:'Failed to create group'});
                }
            }
        } catch (e) {
            res.status(500).send({status:'failed', message:'Failed to create group'});
        }
    }
    
});

router.delete('/deleteGroup/:groupName', validateUser, async (req, res)=>{
    
    const groupName = req.params?.groupName;

    if(!groupName)
    {
        res.status(403).send({status:'failed', message:'groupName is required'});
    }

    try {
        var response = await groupService.deleteGroup(groupName);

        console.log(`response ::: `, response);
        
        if(response?.deletedCount>0)
        {
            res.status(200).send({status:'success', message:'successfully deleted the group'});
        }
        else
        {
            res.status(404).send({status:'failed', message:'could not find the group'});
        }


    } catch (e) {
        res.status(500).send({status:'failed', message:'Failed to delete group'});
    }
});

router.get('/searchGroup/:searchstring', validateUser, async (req, res)=>{
    
    const searchstring = req.params?.searchstring;

    if(!searchstring)
    {
        res.status(403).send({status:'failed', message:'searchstring is required'});
    }

    try {
        var response = await groupService.searchGroup(searchstring);
        res.status(200).send({status:'success', message:'successfully fetched groups data', data:response});

    } catch (e) {
        res.status(500).send({status:'failed', message:'Failed to fetch data'});
    }
    
});

router.post('/addMemberToGroup', validateUser, async (req, res)=>{
    
    if(!req.body?.memberEmail || !req.body?.groupName)   //Validate request parameteres
    {
        res.status(403).send({status:'failed', message:'Missing one or more of these parametes `memberEmail`, `groupName`'});
    }
    else
    {
        const group = {
            memberEmail:req.body?.memberEmail,
            groupName:req.body?.groupName
        };

        try {
            var response = await groupService.addMemberToGroup(group.groupName, group.memberEmail);
            
            console.log(`response :::: `, response);
            

            if(response?.members?.includes(group.memberEmail))
            {
                res.status(200).send({status:'success', message:'successfully added member to group'});
            }
            else
            {
                res.status(500).send({status:'failed', message:'failed to add member to group'});
            }

        } catch (e) {
            res.status(500).send({status:'failed', message:'failed to add member to group'});
        }
    }
    
});

router.post('/sendMessageInGroup/:groupName', validateUser, async (req, res)=>{
    
    const token = req.headers['authorization']?.split(' ')[1];

    if(!req.params?.groupName || !req.body?.message)   //Validate request parameteres
    {
        res.status(403).send({status:'failed', message:'Missing one or more of these parametes `groupName` or `message`'});
    }
    else
    { 
        try {

            const userByToken = await userService.getUserByToken(token);

            const message = {
                groupName:req.params?.groupName,
                sentBy:userByToken?.email ?? '',
                message:req.body?.message
            };
            
            var groupExist = await groupService.getGroupByName(message.groupName); //Check if group is present with the name

            if(!groupExist || groupExist?._id)
            {
                res.status(403).send({status:'failed', message:`group doesn't exist with '${message?.groupName}' this name`});
            }

            var response = await messageService.sendMessage(message);

            if(response?._id)
            {
                res.status(201).send({status:'success', message:'message sent successfully'});
            }
            else
            {
                res.status(500).send({status:'failed', message:'Failed to send message in group'});
            }
        } catch (e) {
            console.log(`Here`, e);
            
            res.status(500).send({status:'failed', message:'Failed to send message in group'});
        }
    }
    
});

router.patch('/likeMessage/:messageId', validateUser, async (req, res)=>{
    
    const messageId = req.params?.messageId;

    if(!messageId)   //Validate request parameteres
    {
        res.status(403).send({status:'failed', message:'Missing one or more of these parametes `messageId`'});
    }
    else
    { 
        try {

            var response = await messageService.likeMessage(messageId);

            if(response?._id)
            {
                res.status(200).send({status:'success', message:'message liked successfully'});
            }
            else
            {
                res.status(500).send({status:'failed', message:'Failed to like the message'});
            }
        } catch (e) {
            res.status(500).send({status:'failed', message:'Failed to like the message'});
        }
    }
    
});

module.exports = router;