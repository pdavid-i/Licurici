import logo from '../../assets/light_orb.png'
import blue_orb from '../../assets/blue_ring.png'
import './Lights.css'
import Light from '../Light/Light'

function Lights() {
  return (
    <>
        <div className="lights">
            <Light />
            <a href="https://www.youtube.com/watch?v=QQu1_bf1Bdo&ab_channel=Fireship"><img src={logo} alt="lights" /></a>
            <a href="https://www.youtube.com/watch?v=QQu1_bf1Bdo&ab_channel=Fireship"><img src={logo} alt="lights" /></a>
            <img src={blue_orb} alt="lights" />
            <img src={logo} alt="lights" />
            <img src={blue_orb} alt="lights" />
            <img src={logo} alt="lights" />
        </div>
    </>
  )
}

export default Lights
