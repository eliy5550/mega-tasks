const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.SECRET




//this middleware adds a user to the req object to be used in the controllers

const authenticateUser = async (req, res, next) => {

    try {
        //get the token
        const authHeader = req.headers['authorization']
        if(authHeader === undefined){throw new Error('NO_TOKEN')}

        const token = authHeader.split(' ')[1]
        if(token === undefined){throw new Error('NO_TOKEN')}

        //see if valid
        var user = jwt.verify(token, process.env.SECRET)

        //save the use in request
        req.user = user.user

        //go next
        next()
    } catch (error) {
        return res.json(error.message)
    }

}

module.exports = authenticateUser