import { useContext, useState } from "react"
import appConf from "../utilities/appConf"
import { UserContext } from "../App"
import {motion} from 'framer-motion'

export default (props) => {
    //User context, login data
    const [jwt , setJwt , user , setUser] = useContext(UserContext)

    //form data in this page
    const [deadline, setDeadline] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    //adding a task
    const addTask = async (e) => {
        e.preventDefault()

        //update server
        const r = await fetch(appConf.BASE_URL + '/tasks/add', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify({
                "uid": user.uid,
                "time_of_post": new Date().getDate(),
                "deadline": deadline,
                "title": title,
                "t_description": description,
                "isDone": 0
            })
        })

        const data = await r.json()

        if(data.tid){
            alert("success : " + JSON.stringify(data))
            //update client
            props.setTasks([...props.tasks , data])
        }else{
            alert("failed : " + JSON.stringify(data))
        }
    }

    return (

        <div>
            <h3>Add Task</h3>
            <form onSubmit={addTask}>
                <input required onChange={(e) => { setDeadline(e.target.value) }} type="date" />
                <input required onChange={(e) => { setTitle(e.target.value) }} placeholder="Title" type="text" />
                <textarea required cols="30" rows="5" onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" type="text"></textarea>
                <motion.input whileHover={{backgroundColor : '#9EB384' , color : 'white'}} type="submit" value="Add Task" />

            </form>
        </div>  
    )
}