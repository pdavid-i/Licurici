import { Word } from '../../features/CatalogSection/CatalogSection';
import WordBox from '../WordBox/WordBox';
import './WordsContainer.css'

interface WordsContainerProps {
    words: Word[] | undefined;
}

function WordsContainer({words} : WordsContainerProps) {

    return <div className="words-container">
        {words?.map(word => (
            <WordBox key={word.id} word={word} />
    ))}
</div>
}

export default WordsContainer
