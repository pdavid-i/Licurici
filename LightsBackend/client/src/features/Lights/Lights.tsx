import './Lights.css'
import Light from '../Light/Light'

interface LightsProps {
    toggleWordModal: () => void
}

function Lights({toggleWordModal} : LightsProps) {
  return (
    <>
        <div className="lights">
            <Light color="blue" width="60px" delay="2s" toggleWordModal={toggleWordModal} />
            <Light color="yellow" width="110px" delay="5s" toggleWordModal={toggleWordModal} />
            <Light color="yellow" width="60px" delay="1s" toggleWordModal={toggleWordModal} />
            <Light color="blue" width="140px" delay="3s" toggleWordModal={toggleWordModal} />
            <Light color="blue" width="70px" delay="7s" toggleWordModal={toggleWordModal} />
            <Light color="yellow" width="90px" delay="4s" toggleWordModal={toggleWordModal} />
            <Light color="blue" width="50px" delay="5.5s" toggleWordModal={toggleWordModal} />
        </div>
    </>
  )
}

export default Lights
