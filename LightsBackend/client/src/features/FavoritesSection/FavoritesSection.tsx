import './FavoritesSection.css'
import Section from '../../layout/Section/Section'
import { useState, useEffect } from 'react';
import agent from '../../api/agent';
import { Word } from '../../types/Word';


function FavoritesSection() {
  const [words, setWords] = useState<Word[]>();

  useEffect(() => {
    agent.WordInteractions.getFavorites()
    .then(res => {
        setWords(res)          
    })
    .catch(err => console.log(err.response))
}, [])

  return (
  <Section>
      <h1>Favorite</h1>
      <ul className="word-list">
        {words?.map(word => (
          <li key={word.id}>{word.name}</li>
        ))}
      </ul>
  </Section>
)
}


export default FavoritesSection
