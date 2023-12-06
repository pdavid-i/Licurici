import { useContext } from 'react';
import blue_orb from '../../assets/blue_ring.png'
import yellow_orb from '../../assets/light_orb.png'
import './Light.css'
import { ModalContext } from '../../helpers/ModalContextProvider';

interface LightProps {
    color: string,
    width: string,
    delay: string,
}

function Light({color, width, delay} : LightProps) {
  const { toggleWordModal } = useContext(ModalContext);

  return (
    <>
            <img width={width} style={{animationDelay:delay}} src={color == "yellow" ? yellow_orb : blue_orb} alt="lights" onClick={toggleWordModal}/>
    </>
  )
}

export default Light
