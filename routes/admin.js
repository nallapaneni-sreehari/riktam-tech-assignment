const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middlewares/authenticate');
const userService = require('../services/user');

router.post('/addUser', isAdmin, async (req, res)=>{
    
    if(!req.body?.email || !req.body?.password || !req.body?.role)   //Validate request parameteres
    {
        res.status(400).send({status:'failed', message:'Missing one or more of these parametes `Email`, `Password`, `Role`'});
    }

    const user = {
        email:req.body?.email,
        password:req.body?.password,
        role:req.body?.role
    };

    try {
        var userExist = await userService.getUserByEmail(user.email); //Check if user already exist with the email

        if(userExist && userExist?.email)
        {
            res.status(401).send({status:'failed', message:'User already exist with that email'});
        }
        else
        {
            var response = await userService.addUser(user);

            if(response?._id)
            {
                res.status(201).send({status:'success', message:'User added successfully'});
            }
            else
            {
                res.status(500).send({status:'failed', message:'Failed to add user'});
            }
        }
    } catch (e) {
        res.status(500).send({status:'failed', message:'Failed to add user'});
    }
    
});

router.post('/editUser',isAdmin, async (req, res)=>{
    
    if(!req.body?.email)
    {
        res.status(400).send({status:'failed', message:'Email is required'});
    }

    const {email, password, role} = req.body;

    try {
        await userService.updateUser(email, {email, password, role});
        res.status(200).send({status:'success', message:'successfully updated the user'});

    } catch (e) {
        res.status(500).send({status:'failed', message:'Failed to edit user'});
    }
});


module.exports = router;