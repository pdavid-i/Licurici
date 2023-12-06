import './Lights.css'
import Light from '../Light/Light'

function Lights() {
  return (
    <>
        <div className="lights">
            <Light color="blue" width="60px" delay="2s" />
            <Light color="yellow" width="110px" delay="5s" />
            <Light color="yellow" width="60px" delay="1s" />
            <Light color="blue" width="140px" delay="3s" />
            <Light color="blue" width="70px" delay="7s" />
            <Light color="yellow" width="90px" delay="4s" />
            <Light color="blue" width="50px" delay="5.5s" />
        </div>
    </>
  )
}

export default Lights
