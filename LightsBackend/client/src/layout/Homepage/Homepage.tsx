import Lights from '../../features/Lights/Lights'
import './Homepage.css'
import { useContext, useState } from 'react';
import HomepageContent from '../HomepageContent/HomepageContent';
import Modal from '../Modal/Modal';
import { AnimatePresence } from 'framer-motion'
import { ModalContext } from '../../helpers/ModalContextProvider';

function Homepage() {
  const [gameStarted, setGameStarted] = useState(false);
  const { showWordModal, toggleWordModal } = useContext(ModalContext);

  const toggleGameVisibility = () => {
    setGameStarted(!gameStarted);
  };

    return (
    <>
        <AnimatePresence
          initial={false}
        >
          { showWordModal && <Modal toggleWordModal={toggleWordModal} wordId={undefined}/>}
        </AnimatePresence>
        { !gameStarted && <HomepageContent toggleGameVisibility={toggleGameVisibility} />}
        { gameStarted && <Lights/> }
    </>
  )
}

export default Homepage
