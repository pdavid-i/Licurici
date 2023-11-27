import './ExpandingButton.css'
import {motion} from 'framer-motion'

function ExpandingButton({text, toggleGameVisibility} : any) {

    const delayedClose = () => {
        setTimeout(() => {
            toggleGameVisibility();
          }, 100);
    }

    return (
        <>
            <motion.button 
                onClick={delayedClose}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 5}}
            > 
                {text}
            </motion.button>
        </>
    )
}

export default ExpandingButton