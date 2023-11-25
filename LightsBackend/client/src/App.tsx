import logo from './assets/light_orb.png'
import blue_orb from './assets/blue_ring.png'
import './App.css'

function App() {
  return (
    <>
      <div className="hero">
        <div className="lights">
          <img src={blue_orb} alt="lights" />
          <img src={logo} alt="lights" />
          <img src={logo} alt="lights" />
          <img src={blue_orb} alt="lights" />
          <img src={logo} alt="lights" />
          <img src={blue_orb} alt="lights" />
          <img src={logo} alt="lights" />
        </div>
      </div>


    </>
  )
}

export default App
