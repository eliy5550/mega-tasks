const Task = require("../models/Task");

//controller for the Task model
//admin can get whatever they want, users can get thier own data

const tasksController = {
    //get all tasks on server (everyone) only admins can do this
    getAll: async (req, res) => {
        try {
            if (req.user.role != 'admin') {
                throw new Error('ADMINS_ONLY')
            }
            const r = await Task.getall()
            return res.json(r)
        } catch (error) {
            return res.json(error.message)
        }

    },

    //get task of one user by user id
    getTasksOfUser: async (req, res) => {
        try {
            if (req.user.u_role == "admin") {
                const r = await Task.getTasksOfUser(req.params.uid)
                return res.json(r)
            } else {
                if (req.params.uid == req.user.uid) {
                    const r = await Task.getTasksOfUser(req.params.uid)
                    return res.json(r)
                } else {
                    throw new Error('CANT_ACCESS_THOSE_TASKS')
                }
            }

        } catch (error) {
            return res.json(error.message)
        }
    },

    //removes task
    removeTaskByTid: async (req, res) => {
        try {
            const task = await Task.getByTid(req.body.tid)
            if (task.uid == req.user.uid || req.user.role == 'admin') {
                const r = await Task.removeByTid(req.body.tid)
                return res.json(r)
            }
            throw new Error('UNAUTH_DELETE_TASK')

        } catch (error) {
            return res.json(error.message)
        }
    },

    //get one task data
    getTaskByTid: async (req, res) => {
        try {
            const task = await Task.getByTid(req.body.tid)
            if(task.uid != req.user.uid){throw new Error('UNAUTH_GET_TASK')}
            return res.json(r)
        } catch (error) {
            return res.json(error.message)
        }
    },

    //adds a task , obviously :)
    addTask: async (req, res) => {
        try {
            const task = req.body
            const r = await Task.add(task)
            const user = await Task.getByTid(r)
            return res.json(user)
        } catch (error) {
            return res.json(error.message)
        }
    },

    //sets a task to be done task id
    done: async (req, res) => {
        try {
            const task = await Task.getByTid(req.body.tid)
            if (task.uid != req.user.uid) { throw new Error('UNAUTH_EDIT_TASK') }

            const r = await Task.setStatus(req.body.tid, 1)
            return res.json(r)
        } catch (error) {
            return res.json(error.message)
        }
    },

    //sets a task to be undone by task id
    undone: async (req, res) => {
        try {
            const task = await Task.getByTid(req.body.tid)
            if (task.uid != req.user.uid) { throw new Error('UNAUTH_EDIT_TASK') }

            const r = await Task.setStatus(req.body.tid, 0)
            return res.json(r)
        } catch (error) {
            return res.json(error.message)
        }
    }
}

module.exports = tasksController