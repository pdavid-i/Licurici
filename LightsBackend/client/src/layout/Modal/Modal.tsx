import { motion } from "framer-motion";
import Focus from "../Focus/Focus";
import "./Modal.css";

const Modal = ({toggleWordModal} : any)  => {

    const whatTheFuck = () => {
        console.log("Cuke");
        toggleWordModal();
    }
    return (
        <Focus toggleWordModal={whatTheFuck}>
            <motion.div
                className="modal"
            >
                <h3>DaveBoss</h3>
                <p>Lots of content adsasd aslj asdna asna asd asdasda ere tre treyre dsasdafgs fsfsd </p>

            </motion.div>
        </Focus>
    )
}

export default Modal;