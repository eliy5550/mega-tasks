import { useContext, useState } from "react"
import appConf from "../utilities/appConf"
import { UserContext } from "../App"
import {motion } from 'framer-motion'
export default () => {

    //login data
    const [jwt , setJwt , user , setUser] = useContext(UserContext)

    //form data
    const [u_password, set_u_password] = useState(user.u_password)
    const [firstname, setFirstName] = useState(user.firstname)
    const [lastname, setLastName] = useState(user.lastname)

    //editing user
    const editUser = async (e) => {
        e.preventDefault();

        //update server
        const r = await fetch(appConf.BASE_URL + "/users/edit", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify({
                "uid": user.uid,
                "u_password": u_password,
                "firstname": firstname,
                "lastname": lastname
            })
        })
        const data = await r.json()

        if (data.uid) {
            alert("edited!")
        } else {
            alert('something went wrong , ' + JSON.stringify(data))
        }

    }

    return (
        <>
            <h3>Edit Profile</h3>

            <div className="edit_profile_form">
                <form onSubmit={editUser}>
                    <input defaultValue={user.u_password} onChange={(e) => { set_u_password(e.target.value) }}  type="password" placeholder="password" /> <br />
                    <input defaultValue={user.firstname} onChange={(e) => { setFirstName(e.target.value) }}  type="text" placeholder="firstname" /> <br />
                    <input defaultValue={user.lastname} onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="lastname" /> <br />
                    <motion.input whileHover={{backgroundColor : '#9EB384' , color : 'white'}} type="submit" value="Edit" />
                </form>
            </div>

        </>
    )

}