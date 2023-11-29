import { motion } from "framer-motion";
import "./Focus.css";
import { ReactNode } from "react";

interface FocusProps {
    children: ReactNode,
    toggleWordModal: () => void;
}

const Focus = ({children, toggleWordModal} : FocusProps)  => {

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