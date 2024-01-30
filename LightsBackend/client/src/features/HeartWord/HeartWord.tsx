import './HeartWord.css'
import { useEffect, useState } from 'react';
import agent from '../../api/agent';
import Heart from '../../layout/Heart/Heart';

interface HeartWordProps {
    id: number
}

function HeartWord({id}: HeartWordProps) {

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
          <Heart isFull={isFavorite}></Heart>
        </div>
  )
}

export default HeartWord
