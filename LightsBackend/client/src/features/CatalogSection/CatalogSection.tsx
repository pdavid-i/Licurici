import './CatalogSection.css'
import Section from '../../layout/Section/Section'
import { useContext, useEffect, useState } from 'react';
import agent from '../../api/agent';
import WordsContainer from '../../layout/WordsContainer/WordsContainer';
import Modal from '../../layout/Modal/Modal';
import { ModalContext } from '../../helpers/ModalContextProvider';

export interface Word {
  name: string
  id: number
}

function CatalogSection() {

    const [words, setWords] = useState<Word[]>([]);

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
        <WordsContainer words={words} totalCount={30}/>
    </Section>
  )
}

export default CatalogSection
