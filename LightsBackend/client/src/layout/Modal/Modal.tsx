import { motion } from "framer-motion";
import Focus from "../Focus/Focus";
import "./Modal.css";
import { useEffect, useState } from "react";
import {Word} from "../../types/Word";
import agent from "../../api/agent";
import Heart from "../../features/Heart/Heart";

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
        .then(res => {
            setWord(res)
            // Prepare the interaction data
            console.log('PULAAAA')

                    console.log(res)

            const interactionData = {
                wordId: res.id,
                favourite: res.favorite, // default value or based on user action
                uses: [] // default value or based on user input
            };
    
            // Record the interaction
            agent.WordInteractions.new(interactionData)
                .catch(err => console.log("Error recording interaction:", err.response));
            
        })
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
               {word && <Heart id={word.id} />}
                <h3 id="word-name">{word?.name}</h3>
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