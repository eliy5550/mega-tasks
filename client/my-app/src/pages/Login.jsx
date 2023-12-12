import React, { useContext, useState } from "react"
import Title from "../components/Title"
import appConf from "../utilities/appConf"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"



export default () => {

    //login data context
    const [jwt, setJwt, user, setUser] = useContext(UserContext)
    //form
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    //navigation object
    const navigate = useNavigate()


    //login , connect to servet and authenticate
    const login = async (e) => {
        e.preventDefault();

        const r = await fetch(appConf.BASE_URL + "/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": loginEmail, "password": loginPassword })
        })

        const data = await r.json()

        // alert(JSON.stringify(data))

        if (data.token) {
            setJwt(data.token)
            setUser(data.user)

            // alert(JSON.stringify(data.user))
            navigate('/dashboard')
        } else {
            alert('wrong credentials')
        }
    }

    return (
        <div className="form_box">

            <Title title='Login' />

            <form onSubmit={login}>
                <input onChange={(e) => setLoginEmail(e.target.value)} className="textInput" type="text" id='email' name="email" placeholder="Email" /> <br />
                <input onChange={(e) => setLoginPassword(e.target.value)} className="textInput" type="password" itemID="password" name="password" placeholder="Password" /> <br />
                <input type="submit" value="Login" /> <br />
            </form>
        </div>

    )
}