import blue_orb from '../../assets/blue_ring.png'
import './Light.css'

function Light() {
    async function handleClick() {
        try {
            const response = await fetch('http://localhost:5000/api/Words');
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API call result:", data); // Logging the message from the API response
          } catch (error) {
            console.error("Error fetching data:", error);
          }      }

  return (
    <>
            <img src={blue_orb} alt="lights" id="firstLight" onClick={handleClick}/>
    </>
  )
}

export default Light
