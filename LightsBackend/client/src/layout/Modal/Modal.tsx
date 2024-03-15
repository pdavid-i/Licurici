import { motion } from "framer-motion";
import Focus from "../Focus/Focus";
import "./Modal.css";
import { useEffect, useState } from "react";
import {Word} from "../../types/Word";
import agent from "../../api/agent";
import Heart from "../../features/HeartWord/HeartWord";

interface ModalProps {
    toggleWordModal: () => void;
    wordId: number | undefined;
}

const Modal = ({ toggleWordModal, wordId} : ModalProps)  => {

    const [word, setWord] = useState<Word>();
    const [userInput, setUserInput] = useState('');
    const [inputFeedback, setInputFeedback] = useState('');
    const [inputRating, setInputRating] = useState(0);

    const riseUp = {
        hidden: {
            opacity: 0,
            y: "100vh"
        }, 
        visible: {
            opacity: 1,
            y: "0",
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: "-30vh",
            transition: {
                ease: "easeIn"
            }
        }
    }

    useEffect(() => {
        (wordId ? agent.Words.getWord(wordId) : agent.Words.random())
        .then(res => {
            setWord(res)

            
        })
        .catch(err => console.log(err.response))
    }, [])


    const checkFeedback = () => {
        if (!word) return;

        const examplePayload = {
            word: word.name,
            context: userInput
        };

        agent.WordInteractions.checkUsage(examplePayload)
        .then(res => {
            setInputFeedback(res.comments)
            setInputRating(res.rating)
            console.log(res)
        })
        .catch(err => console.log(err.response))

        if (inputRating > 1) {
            console.log('Recorded')
            recordInteraction();
        }
    }

    const recordInteraction = () => {
        const interactionData = {
            wordId: word.id,
            usage: userInput
        };

        // Record the interaction
        agent.WordInteractions.new(interactionData)
            .catch(err => console.log("Error recording interaction:", err.response));
    }

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
                        return <li key={index}><WordMeaning definition={definition} /></li>;
                    })}
                    <p className="example"><i>{word?.examples[0]}</i></p>
                </ul>

                <input 
                    type="text" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} 
                    placeholder="Type a sentence" 
                />
                <button onClick={checkFeedback}>Check</button>
                {/* Display API response */}
                {inputRating && <p>{inputRating}</p>}
                {inputFeedback && <p>{inputFeedback}</p>}

            </motion.div>
        </Focus>
    )
}

const WordMeaning = ({definition} : {definition: string}) => {
    return (
        <>
            <p className="definition">{definition}</p>
        </>
    )
}

export default Modal;