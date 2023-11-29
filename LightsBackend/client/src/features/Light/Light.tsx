import blue_orb from '../../assets/blue_ring.png'
import yellow_orb from '../../assets/light_orb.png'
import './Light.css'

interface LightProps {
    color: string,
    width: string,
    delay: string,
    toggleWordModal: () => void
}

function Light({color, width, delay, toggleWordModal} : LightProps) {
    async function handleClick() {
          toggleWordModal();
        }

  return (
    <>
            <img width={width} style={{animationDelay:delay}} src={color == "yellow" ? yellow_orb : blue_orb} alt="lights" onClick={handleClick}/>
    </>
  )
}

export default Light
