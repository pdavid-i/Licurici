import './FavoritesSection.css'
import Section from '../../layout/Section/Section'
import { useState, useEffect } from 'react';
import agent from '../../api/agent';
import { Word } from '../../types/Word';
import WordsContainer from '../../layout/WordsContainer/WordsContainer';


function FavoritesSection() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    agent.WordInteractions.getFavorites()
    .then(res => {
        setWords(res)          
    })
    .catch(err => console.log(err.response))
}, [])

  return (
  <Section>
    <div className='innerSection'>
      <h1 className='sectionHeadline'>Favorite</h1>
      <WordsContainer words={words} totalCount={-1}/>
    </div>
  </Section>
)
}


export default FavoritesSection
