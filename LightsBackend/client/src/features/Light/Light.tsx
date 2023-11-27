import blue_orb from '../../assets/blue_ring.png'
import yellow_orb from '../../assets/light_orb.png'
import './Light.css'

function Light({color, width, delay, toggleWordModal} : any) {
    async function handleClick() {
        /*try {
            const response = await fetch('http://localhost:5000/api/Words');
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API call result:", data); // Logging the message from the API response
          } catch (error) {
            console.error("Error fetching data:", error);
          }   */   
          toggleWordModal();
        }

  return (
    <>
            <img width={width} style={{animationDelay:delay}} src={color == "yellow" ? yellow_orb : blue_orb} alt="lights" onClick={handleClick}/>
    </>
  )
}

export default Light
