import { useState } from "react"
import Title from "../components/Title"
import appConf from "../utilities/appConf"
import { useNavigate } from "react-router-dom"

//registring to the system
export default () => {
    //navigation object
    const navigate = useNavigate()

    //form data
    const [email, setEmail] = useState("")
    const [u_password, set_u_password] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")

    //create a user on the server and move to login
    const register = async (e) => {
        e.preventDefault();

        const r = await fetch(appConf.BASE_URL + "/users/add", {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "time_of_joining": new Date().getDate(),
                "email": email,
                "u_password": u_password,
                "firstname": firstname,
                "lastname": lastname,
                "u_role": "user"
            })
        })

        const data = await r.json()

        if (data.uid) {
            alert("registered successfully!")
            navigate('/login')
        } else {
            alert('something went wrong , ' + JSON.stringify(data))
        }

    }
    //form itself
    return (
        <div className="form_box">

            <Title title='Register' />

            <form onSubmit={register}>
                <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="email" /> <br />
                <input onChange={(e) => { set_u_password(e.target.value) }} type="password" placeholder="password" /> <br />
                <input onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="firstname" /> <br />
                <input onChange={(e) => { setLastName(e.target.value) }} type="text" placeholder="lastname" /> <br />

                <input type="submit" value="Register" />

            </form>
        </div>
    )
}