const express = require('express')
const tasksRouter = require('./routes/tasksRouter')
const bp = require('body-parser')
const usersRoutes = require('./routes/usersRouter')
const cors = require('cors')
//const session = require('express-session')
const dotenv = require('dotenv');

dotenv.config();
const app = express()

//all request will be in json so parse json..
app.use(bp.json())

app.use(express.static('./client'))

//any app can access this server
app.use(cors({
    origin: '*'
}));

//serve client
app.get('/' , (req , res)=>{ res.send('server send - Hello!')})

//tasks routes
app.use('/tasks' , tasksRouter)

//user routes
app.use('/users' , usersRoutes)


//listen for requests
app.listen(process.env.PORT , ()=>{
    console.log('running server on \nhttp://127.0.0.1:5000/')
})