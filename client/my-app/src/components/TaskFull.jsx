import { motion } from "framer-motion"


//display full details of task in popup
export default (props) => {
    if (props.t === {}) {
        return (<></>)
    }

    if(props.on == false){
        return (<></>)
    }

    return (
        <motion.div >

            <div className="title left_align" ><b>{props.t.title}</b></div>
            <hr />
            <div className="left_align">
                <div className="date">Description: <br />
                <textarea readOnly={true}   cols="30" rows="5">
                 {props.t.t_description}

                </textarea>
                 </div>

                <br /><br />
                <div className="date">Added at : {props.t.time_of_post}</div>
                <div className="date">Deadline : {props.t.deadline}</div>
            </div>


            <hr />
            {(props.t.isDone === 1) ? (
                <motion.button whileHover={{scale:1.1}} className="undone_btn" onClick={(e) => { props.undone(e, props.t.tid); props.setPopped(false) }}>Undone</motion.button>
            ) : (
                <motion.button whileHover={{scale:1.1}} className="done_btn" onClick={(e) => { props.done(e, props.t.tid); props.setPopped(false) }}>Done</motion.button>
            )}
            <motion.button whileHover={{scale:1.1}} className="delete_btn exitButton"  onClick={(e) => { props.deleteTask(e, props.t.tid); props.setPopped(false) }} >x</motion.button>
        </motion.div>
    )
}