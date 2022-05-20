const userService = require('../services/user');
const jwt = require('jsonwebtoken');


async function authenticateUser(req, res, next){
    const email = req.body?.email;
    const password = req.body?.password;

    if(!email || !password)
    {
        res.status(400);
        return res.send({status:'failed', message:'Email and Password are required'});
    }
    
    const userInDb = await userModel.findOne({email:email, password:password});

    console.log(`userInDb :::: `, userInDb);
    
    if(!userInDb || !userInDb?.length>0)
    {
        res.status(403);
        return res.send({status:'failed', message:'Failed to authenticate credentials'});
    }

    next();
}

async function isAdmin(req, res, next){

    const token = req.headers['authorization']?.split(' ')[1];

    if(!token)
    {
        res.status(400);
        return res.send({status:'failed', message:'Please provide a admin token to perform this action'});
    }
    
    try {
        const tokenData = jwt.verify(token, 'MY_SECRETE'); // Verify the token by using jwt

        if(!tokenData || !tokenData?.email)
        {
            res.status(403);
            return res.send({status:'failed', message:'Invalid Token'});
        }
    
        const userDataFromToken = await userService.getUserByToken(token); //Check if user is present in database with that token
    
        if(!userDataFromToken || !userDataFromToken?.email)
        {
            res.status(403);
            return res.send({status:'failed', message:'User not found'});
        }
    
        if(userDataFromToken?.role != 'admin')
        {
            res.status(403);
            return res.send({status:'failed', message:'Only admins can perform this action'});
        }
    
        next();
    } catch (e) {
        res.status(403);
        return res.send({status:'failed', message:'Invalid Token'});
    }

}

async function validateUser(req, res, next){

    const token = req.headers['authorization']?.split(' ')[1];

    if(!token)
    {
        res.status(400);
        return res.send({status:'failed', message:'Please provide a user token to perform this action'});
    }
    
    try {
        console.log(`token ::: `, token);
        
        const tokenData = jwt.verify(token, 'MY_SECRETE'); // Verify the token by using jwt

        if(!tokenData || !tokenData?.email)
        {
            res.status(400);
            return res.send({status:'failed', message:'Invalid Token'});
        }

        const userDataFromToken = await userService.getUserByToken(token); //Check if user is present in database with that token

        if(!userDataFromToken || !userDataFromToken?.email)
        {
            res.status(400);
            return res.send({status:'failed', message:'User not found'});
        }

        next();
    } catch (e) {
        res.status(500);
        return res.send({status:'failed', message:'Invalid Token'});
    }
}

module.exports = {
    authenticateUser,
    isAdmin,
    validateUser
}