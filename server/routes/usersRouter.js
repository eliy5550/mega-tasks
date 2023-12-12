const express = require('express');
const usersController = require('../controllers/usersController');
const authenticateUser = require('../middlewares/authenticateUser');

const usersRouter = express.Router();

//routes for the '/users' to access the users controller

usersRouter.get('/getall' , authenticateUser ,usersController.getAll)
usersRouter.get('/getbyid' ,authenticateUser , usersController.getbyid)
usersRouter.delete('/removebyid' , authenticateUser, usersController.removebyid)
usersRouter.put('/add' , usersController.add)
usersRouter.post('/login' , usersController.login)
usersRouter.post('/edit' , authenticateUser ,usersController.edit)




module.exports = usersRouter