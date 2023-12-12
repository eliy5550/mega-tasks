import { useContext, useEffect, useRef, useState } from "react"
import Popup from "./Popup"
import TaskFull from "./TaskFull"
import appConf from "../utilities/appConf"
import { UserContext } from "../App"
import { motion } from "framer-motion"



const TaskList = (props) => {
    const [jwt, setJwt, user, setUser] = useContext(UserContext)

    const [popped, setPopped] = useState(false)

    const [trackedTask, setTrackedTask] = useState({})

    const done = async (e, tid) => {
        e.stopPropagation();
        //change to 1 in tasks
        props.setTasks(props.tasks.map(t => {
            if (t.tid == tid) {
                return { ...t, isDone: 1 }
            } else {
                return t
            }
        }))

        const result = await fetch(appConf.BASE_URL + '/tasks/done', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(
                {
                    'tid': tid
                }
            )
        }
        )

        const data = await result.json()
        alert(JSON.stringify(data))


    }

    const undone = async (e, tid) => {
        e.stopPropagation();

        //change to 1

        props.setTasks(props.tasks.map(t => {
            if (t.tid == tid) {
                return { ...t, isDone: 0 }
            } else return t;
        }))

        const result = await fetch(appConf.BASE_URL + '/tasks/undone', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(
                {
                    'tid': tid
                }
            )
        }
        )

        const data = await result.json()
        alert(JSON.stringify(data))
    }

    const deleteTask = async (e, tid) => {
        e.stopPropagation();
        props.setTasks(props.tasks.filter(t => t.tid != tid))

        const result = await fetch(appConf.BASE_URL + '/tasks/removebyid', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(
                {
                    'tid': tid
                }
            )
        }
        )

        const data = await result.json()
        alert(JSON.stringify(data))
    }


    const pop = (t) => {
        setTrackedTask(t)
        setPopped(true)
    }



    //showing a list of all the tasks
    return (
        <div className="cards">


            {(props.tasks.length == 0) ? (
                <>No Tasks yet...</>
            ) : (<></>)}

            {props.tasks.map((t) => (
                <motion.div key={t.tid} className="card" onClick={(e) => { pop(t) }}
                    initial={{
                        opacity: 0, y: -100,
                    }}
                    animate={{
                        scale: 0.9, y: 0, rotate: [350, 360], opacity: 1,
                    }}
                    whileHover={{
                        scale: 1.0
                    }}
                >
                    <div className="title left_align" ><b>{t.title}</b></div>
                    <hr />
                    <div className="left_align">
                        <div className="date">Added at : {t.time_of_post}</div>
                        <div className="date">Deadline : {t.deadline}</div>
                    </div>


                    <hr />
                    {(t.isDone === 1) ? (
                        <motion.button whileHover={{scale:1.1}}  className="undone_btn" onClick={(e) => { undone(e, t.tid) }}>Undone</motion.button>
                    ) : (
                        <motion.button whileHover={{scale:1.1}} className="done_btn" onClick={(e) => { done(e, t.tid) }}>Done</motion.button>
                    )}
                    <motion.button whileHover={{scale:1.1}} onClick={(e) => { deleteTask(e, t.tid) }} className="delete_btn">x</motion.button>

                </motion.div>
            ))}


            <Popup on={popped} setPopped={setPopped} >
                <TaskFull t={trackedTask} setPopped={setPopped} done={done} undone={undone} />
            </Popup>

        </div>
    )
}

export default TaskList