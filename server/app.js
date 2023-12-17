const express = require('express')
const tasksRouter = require('./routes/tasksRouter')
const bp = require('body-parser')
const usersRoutes = require('./routes/usersRouter')
const cors = require('cors')
const app = express()

const dotenv = require('dotenv');

dotenv.config();


//any app can access this server
app.use(cors({
    origin: '*'
}));

//all request will be in json so parse json..
app.use(bp.json())

//serve react client
app.use(express.static('./client'))

//tasks routes
app.use('/tasks' , tasksRouter)

//user routes
app.use('/users' , usersRoutes)


//listen for requests
app.listen(5001 , ()=>{
    console.log('running server on \nhttp://127.0.0.1:5001/')
})