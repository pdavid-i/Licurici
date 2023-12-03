import { motion } from "framer-motion";
import Focus from "../Focus/Focus";
import "./FullModal.css";
import { useEffect, useState } from "react";
import {Word} from "../../types/Word";
import agent from "../../api/agent";
import Heart from "../../features/Heart/Heart";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FullModal = ()  => {

    const {id} = useParams();
    const [word, setWord] = useState<Word>();

    const navigate = useNavigate();
    const location = useLocation();
  
    const redirectToPreviousPage = () => {
      // Use the state from location to access the previous path
      const previousPath = location.state?.from || '/defaultpath'; // Fallback to a default path
      navigate(previousPath);
    };

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
        (agent.Words.getWord(id))
        .then(res => {
            console.log('dick')
            console.log(id)
            console.log(res)
            setWord(res)
        })
        .catch(err => console.log(err.response))
    }, [])


    return (
        <Focus toggleWordModal={redirectToPreviousPage}>
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

export default FullModal;