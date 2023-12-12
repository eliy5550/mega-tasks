import { motion, AnimatePresence } from "framer-motion"

export default (props) => {
    //popup with enter and exit animations
    return (
        
        <AnimatePresence>
            {props.on && (

                <div className="popup" >
                    <motion.div
                        key="popup"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="popup_center card">
                        {props.children}

                        <motion.button
                            onClick={() => { props.setPopped(false) }}
                            className="delete_btn">x</motion.button>
                    </motion.div>
                </div>

            )}
        </AnimatePresence>

    )
}