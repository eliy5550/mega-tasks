const AsyncQuery = require("../repository/db")

//directly accesses database by SQL queries and a helper promise called Async Query

function Task (task ){
    this.uid = task.uid,
    this.time_of_post = task.time_of_post,
    this.deadline = task.deadline,
    this.title = task.title,
    this.t_description = task.t_description,
    this.isDone = task.isDone
    this.tid = "will be generated in the database"
}

Task.getall = async()=>{
    try {
        const r = await AsyncQuery('select * from tasks;')
        return r;
    } catch (error) {
        throw error
    }
}

Task.getTasksOfUser = async(uid)=>{
    try {
        const r = await AsyncQuery(`select * from tasks where uid = ${uid};`)
        return r;
    } catch (error) {
        throw error
    }
}


Task.getByTid =async (tid)=>{
    try {
        if(tid === undefined) {
            throw new Error('NO_TID')
        }
        const r = await AsyncQuery(`select * from tasks where tid=${tid}`)
        if(r.length == 0) throw new Error('TASK_NOT_FOUND')
        return r[0]
    } catch (error) {
        throw error
    }
}

Task.removeByTid = async(tid)=>{
    if (tid === undefined) throw new Error('NO_TID')
    try {
        const r = await AsyncQuery('delete from tasks where tid = ' + tid + ';');
        console.log(JSON.stringify(r))
        if(r.affectedRows == 0) {
            throw new Error("NO_TASK_DELETED")
        }
        return true;
    } catch (error) {
        throw error
    }
}

Task.add = async(task)=>{
    try {
        const r = await AsyncQuery(`insert into tasks (uid , deadline, title , t_description , isDone) values (${task.uid} , "${task.deadline}", "${task.title}" , "${task.t_description}" , ${task.isDone} );`)
        if(r.affectedRows == 0){throw new Error("TASK_NOT_ADDED")}
        return r.insertId  
    } catch (error) {
        throw error
    }
} 

//set to be done or undine ( 0 / 1 )
Task.setStatus = async (tid , status)=>{
    try {
        const r = await AsyncQuery(`update tasks set isDone = ${status} where tid = ${tid};`)
        if(r.affectedRows == 0){throw new Error("TASK_NOT_UPDATED")}
        return true  
    } catch (error) {
        throw error
    }
}

module.exports = Task