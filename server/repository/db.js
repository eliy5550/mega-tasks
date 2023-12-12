const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

//connection to database
var connection = mysql.createConnection({
    host: process.env.DATABASE_URL,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE
})

//I wanted to use await when accessing the database so I created : 
//a promise that returns a js array or object as a result
//rejects if there's an error with the SQL or on the connection

const AsyncQuery = (sql)=>{
    return new Promise((resolve , reject)=>{
        try {
            connection.query(sql , (err , result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = AsyncQuery