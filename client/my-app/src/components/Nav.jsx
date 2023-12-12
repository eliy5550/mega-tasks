import { useContext, useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { motion } from 'framer-motion'

const Nav = () => {

    //login data
    const [contextJWT, contextSetJWT, contextUser, contextSetUser] = useContext(UserContext)

    //react-router-dom object for redirecting
    const navigate = useNavigate()

    //logout
    const logout = (e) => {
        e.preventDefault()
        //clear login data variables
        contextSetJWT('')
        contextSetUser({})
        navigate('/')
    }

    //display nav based on login data (if logged in or not)
    return (
        <div className="navbox">
            <motion.div whileHover={{ scale: 1.1 }}>
                <Link className="nav_item" to='/'>Home</Link>
            </motion.div>


            {(contextJWT == "" || !contextJWT) ? (
                <>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link className="nav_item" to='/login'>Login</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link className="nav_item" to='/register'>Register</Link>
                    </motion.div>
                </>
            ) : (
                <>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link className="nav_item" to='/dashboard'>Dashboard</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Link className="nav_item" onClick={logout}>Logout</Link>
                    </motion.div>
                </>
            )}

        </div>
    )
}


export default Nav