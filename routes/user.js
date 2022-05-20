const express = require('express');
const router = express.Router();
const {authenticateUser, isAdmin} = require('../middlewares/authenticate');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');

router.post('/login', async (req, res)=>{

    const {email, password} = req.body;

    if(!email || !password)
    {
        res.status(400).send({status:'failed', message:'Email and Password are required'});
    }
    
    const userInDb = await userService.login(email, password);
    
    if(userInDb && userInDb?.email)
    {
        const token = jwt.sign({email:userInDb.email, role:userInDb.role}, 'MY_SECRETE');

        await userService.updateToken(userInDb.email, token);

        res.status(200).send({status:'success', message:'Login success', token:token});
    }
    else
    {
        res.status(403).send({status:'failed', message:'Invalid credentials'});
    }

});

router.post('/logout', async (req, res)=>{

    
    const token = req.headers['authorization']?.split(' ')[1]; //Get token from headers

    if(!token)
    {
        res.status(403).send({status:'failed', message:'token required'});
    }

    try {
        var userInDb = await userService.getUserByToken(token); //Get user details by using token
        
        if(userInDb == null)
        {
            res.status(500).send({status:'failed', message:'Missing or Expired token'});
        }
        else
        {
            await userService.updateToken(userInDb?.email, null); //set token to null for that user to logout that user
        
            res.status(200).send({status:'success', message:'User logged out'});
        }
    } catch (e) {
        res.status(500).send({status:'failed', message:'failed to logout, try again later'});
    }
});


module.exports = router;