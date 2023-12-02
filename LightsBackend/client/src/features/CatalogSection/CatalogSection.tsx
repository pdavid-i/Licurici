import './CatalogSection.css'
import Section from '../../layout/Section/Section'
import { useEffect, useState } from 'react';
import agent from '../../api/agent';

interface Word {
  name: string
  id: number
}

function CatalogSection() {
    const [words, setWords] = useState<Word[]>();

    useEffect(() => {
      agent.WordInteractions.mine()
      .then(res => {
          setWords(res)          
      })
      .catch(err => console.log(err.response))
  }, [])
  
    return (
    <Section>
        <h1>Catalog</h1>
        <ul className="word-list">
          {words?.map(word => (
            <li key={word.id}>{word.name}</li>
          ))}
        </ul>
    </Section>
  )
}

export default CatalogSection
