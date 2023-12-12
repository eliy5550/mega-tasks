import { useContext, useEffect, useRef, useState } from "react"
import TaskList from "../components/TaskList"
import Title from "../components/Title"
import appConf from "../utilities/appConf";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import EditUser from "../components/EditUser";
import { UserContext } from "../App";
import Popup from "../components/Popup";
import {motion} from 'framer-motion'


//main page , dashboard 
export default (props) => {
    
    //login data
    const [jwt, setJWT, user, setUser] = useContext(UserContext)

    //navigae the react-router-dom
    const navigator = useNavigate()

    //holds all tasks in client
    const [tasks, setTasks] = useState([])
    //varibles for popups
    const [poppedEditProfile, setPoppedEditProfile] = useState(false)
    const [poppedAddTask, setPoppedAddTask] = useState(false)

    //get tasks from server
    const getTasks = async () => {

        const r = await fetch(appConf.BASE_URL + "/tasks/user_tasks/" + user.uid, {
            headers: {
                Authorization: "Bearer " + jwt
            }
        })

        const data = await r.json()


        if (Array.isArray(data)) {
            //populate tasks in client
            setTasks(data)
        }

    }
    
    //check logged in to access this page
    useEffect(() => {
        if ((jwt == "" || !jwt)) {
            navigator('/')
        }
        getTasks()
    }, [])

    //page itself
    return (
        <>
            <Title title='Dashboard' />

            <motion.button whileHover={{scale:1.1}} className="done_btn" onClick={() => { setPoppedAddTask(true) }}>Add Task</motion.button> <t></t>
            <motion.button whileHover={{scale:1.1}} className="edit_profile_btn" onClick={() => { setPoppedEditProfile(true) }}>Edit Profile</motion.button> 

            <br /> <br />

            <p>Click a card for more information about the task.</p>
            <TaskList tasks={tasks} setTasks={setTasks} />

            <Popup on={poppedAddTask} setPopped={setPoppedAddTask}>
                <AddTask tasks={tasks} setTasks={setTasks} />
            </Popup>

            <Popup on={poppedEditProfile} setPopped={setPoppedEditProfile}>
                <EditUser />
            </Popup>


        </>
    )
}