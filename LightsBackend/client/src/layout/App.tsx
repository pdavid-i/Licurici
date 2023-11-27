import Lights from '../features/Lights/Lights'
import './App.css'
import Navbar from './Navbar/Navbar'
import { useState } from 'react';
import HomepageContent from './HomepageContent/HomepageContent';
import Modal from './Modal/Modal';

function App() {
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
      <Navbar />
      <div className="hero">
        { showWordModal && <Modal toggleWordModal={toggleWordModal} />}
        { !gameStarted && <HomepageContent toggleGameVisibility={toggleGameVisibility} />}
        {/* interesting way to conditionally render a component*/}
        { gameStarted && <Lights  toggleWordModal={toggleWordModal}/>}
      </div>
    </>
  )
}

export default App
