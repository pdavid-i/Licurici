import Lights from '../../features/Lights/Lights'
import './Homepage.css'
import { useState } from 'react';
import HomepageContent from '../HomepageContent/HomepageContent';
import Modal from '../Modal/Modal';
import {motion, AnimatePresence } from 'framer-motion'

function Homepage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showWordModal, setShowWordModal] = useState(false);

  const toggleGameVisibility = () => {
    setGameStarted(!gameStarted);
  };

  const toggleWordModal = () => {
    setShowWordModal(!showWordModal);
  };

    return (
    <>
        <AnimatePresence
          initial={false}
        >
          { showWordModal && <Modal toggleWordModal={toggleWordModal} />}
        </AnimatePresence>
        { !gameStarted && <HomepageContent toggleGameVisibility={toggleGameVisibility} />}
        {/* interesting way to conditionally render a component*/}
        { gameStarted && <Lights  toggleWordModal={toggleWordModal}/>}
    </>
  )
}

export default Homepage
