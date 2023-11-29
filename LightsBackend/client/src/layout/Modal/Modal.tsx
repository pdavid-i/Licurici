import { motion } from "framer-motion";
import Focus from "../Focus/Focus";
import "./Modal.css";
import { useEffect, useState } from "react";
import {Word} from "../../types/Word";
import agent from "../../api/agent";

interface ModalProps {
    toggleWordModal: () => void;
}

const Modal = ({ toggleWordModal} : ModalProps)  => {

    const [word, setWord] = useState<Word>();

    const riseUp = {
        hidden: {
            opacity: 0,
            y: "100vh"
        }, 
        visible: {
            opacity: 1,
            y: "0",
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            y: "-100vh"
        }
    }

    useEffect(() => {
        agent.Words.random()
        .then(res => setWord(res))
        .catch(err => console.log(err.response))
    }, [])

    return (
        <Focus toggleWordModal={toggleWordModal}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal"
                variants={riseUp}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h3>{word?.name}</h3>
                <hr></hr>
                <ul>
                    {word?.definitions.map((definition, index) => {
                        return <li key={index}><WordMeaning definition={definition} example={word.examples[index]} /></li>;
                    })}
                </ul>

            </motion.div>
        </Focus>
    )
}

const WordMeaning = ({definition, example} : {definition: string, example: string}) => {
    return (
        <>
            <p className="definition">{definition}</p>
            <p className="example"><i>{example}</i></p>
        </>
    )
}

export default Modal;