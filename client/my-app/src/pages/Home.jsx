
import {motion } from 'framer-motion'

//stating page
export default () => {
    return (
        <>
        <motion.div initial={{x:'100%'}} animate={{x:0}} className="homepage">
            <h1 className="main_title">MEGA TASKS</h1>
            <p className="first_p"> 
                Welcome to MEGA TASKS, <br />
                {"Node React Project by Eliel :)"}
            </p>
        </motion.div>
        </>
    )
}