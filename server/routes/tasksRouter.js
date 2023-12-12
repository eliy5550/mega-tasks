const express = require('express');
const tasksController = require('../controllers/tasksController');
const authenticateUser = require('../middlewares/authenticateUser');

const tasksRouter = express.Router();

//routes for the '/tasks' to access the tasks controller

tasksRouter.get('/getall' , authenticateUser, tasksController.getAll)
tasksRouter.get('/getById' , authenticateUser, tasksController.getTaskByTid)
tasksRouter.delete('/removeById' , authenticateUser, tasksController.removeTaskByTid)
tasksRouter.put('/add' , authenticateUser, tasksController.addTask)
tasksRouter.get('/user_tasks/:uid' , authenticateUser , tasksController.getTasksOfUser)
tasksRouter.post('/undone'  , authenticateUser, tasksController.undone)
tasksRouter.post('/done'  , authenticateUser, tasksController.done)

module.exports = tasksRouter