import { Word } from '../../features/CatalogSection/CatalogSection';
import WordBox from '../WordBox/WordBox';
import WordBoxHidden from '../WordBoxHidden/WordBoxHidden';
import './WordsContainer.css'

interface WordsContainerProps {
    words: Word[];
    totalCount: number;
}

interface WordPokedex {
    words: Word[];
    totalCount: number;
}

function WordsContainer({words, totalCount} : WordsContainerProps) {

    return <div className="words-container">
        {
        totalCount > 0 ? WordPokedexList({words, totalCount})
        :
        words?.map(word => ( <WordBox key={word.id} word={word} />))
        }
</div>
}

function WordPokedexList({ words, totalCount } : WordPokedex) {
    const wordComponents = [];
  
    for (let id = 1; id <= totalCount; id++) {
        const word = words?.find(word => word.id === id);
        if (word)
        wordComponents.push(<WordBox key={id} word={word} />);
        else
        wordComponents.push(<WordBoxHidden id={id} />);
    }
  
    return <>{wordComponents}</>;
  }

export default WordsContainer
