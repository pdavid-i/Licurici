import './Heart.css'
import { useEffect, useState } from 'react';
import agent from '../../api/agent';
import Icons from '../../constants/icons'

interface HeartProps {
    id: number
}

function Heart({id}: HeartProps) {

    const [isFavorite, setIsFavorite] = useState(false);
    
    useEffect(() => {
        agent.WordInteractions.isFavorite(id)
        .then(res => {
            setIsFavorite(res)
        })
        .catch(err => console.log(err.response))
    }, [])

    function toggleFavoriteWord() {
        agent.WordInteractions.favorite(id)
        .catch(err => console.log(err.response))
        setIsFavorite(!isFavorite);
    }
  
    return (
        <div className="heart-button" onClick={toggleFavoriteWord}>
        <svg
          viewBox="0 0 512 512"
        >
          <g className="fa-group">
            <path
              fill="white"
              d={isFavorite ? Icons.heartFull : Icons.heartEmpty}
              className="fa-secondary"
            ></path>
          </g>
        </svg>
        </div>
  )
}

export default Heart
