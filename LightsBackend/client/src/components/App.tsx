import Lights from './Lights/Lights'
import './App.css'
import Navbar from './Navbar/Navbar'
import { useState } from 'react';
import HomepageContent from './HomepageContent/HomepageContent';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const toggleGameVisibility = () => {
    setGameStarted(!gameStarted);
  };

    return (
    <>
    <Navbar />
      <div className="hero">
        { !gameStarted && <HomepageContent toggleGameVisibility={toggleGameVisibility} />}
        {/* interesting way to conditionally render a component*/}
        { gameStarted && <Lights />}
      </div>
    </>
  )
}

export default App
