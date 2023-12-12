const User = require("../models/User");
const jwt = require('jsonwebtoken')

//controller for User model
//admins can do whatever they want and users can access their own data

const usersController = {
    //admins can see all users
    getAll :async  (req , res)=>{
        try {
            if(req.user.role != 'admin'){throw new Error('UNAUTH_GET_USERS')}
            const r = await User.getAll()
            return res.json(r)
        } catch (error) {
            return res.send(error.message)
        }
    },

    //get user object
    getbyid :async  (req , res)=>{
        try {
            const user = await User.getByUid(req.body.uid)
            if(req.user.role != 'admin' && user.uid != req.user.uid){throw new Error('UNAUTH_GET_USER')}
            return res.json(r)
        } catch (error) {
            return res.send(error.message)
        }
    },

    //removes a user , user deletes himself or admin deletes any user
    removebyid :async  (req , res)=>{
        try {
            const user = await User.getByUid(req.body.uid)
            if(req.user.role != 'admin' && user.uid != req.user.uid){throw new Error('UNAUTH_DEL_USERS')}
            const r = await User.removeUserById(req.body.uid)
            return res.json(r)
        } catch (error) {
            return res.send(error.message)
        }
    },
    
    //adds a user (registering)
    add :async  (req , res)=>{
        try {
            const user = req.body
            const r = await User.add(user)
            return res.json(r)
        } catch (error) {
            return res.send(error.message)
        }
    },

    //authenticating , returns a json web token and a user
    login : async(req , res)=>{
        try {
            const user = await User.getByEmailAndPassword(req.body.email , req.body.password)
            var token = jwt.sign({user} , process.env.SECRET)
            return res.json({token : token , user : user})
        } catch (error) {
            return res.json(error.message)
        }
    },

    //edit a user
    edit : async (req , res)=>{
        try {
            if(req.user.uid != req.body.uid && req.user.role != 'admin'){throw new Error('NOT_ALLOWED_TO_UPDATE_USER')}
            const updatedUser = await User.editByUid(req.body)
            return res.json(await  User.getByUid(req.body.uid))
        } catch (error) {
            return res.json(error.message)
        }
    }
}

module.exports = usersController