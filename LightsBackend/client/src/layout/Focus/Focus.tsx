import { motion } from "framer-motion";
import "./Focus.css";

const Focus = ({children, toggleWordModal} : any)  => {

    return (
        <motion.div 
            className="focus"
            onClick={toggleWordModal}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}
        </motion.div>
    )
}

export default Focus;