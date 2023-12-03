import { Word } from '../../features/CatalogSection/CatalogSection';
import './WordBox.css'

interface WordBoxProps {
    word: Word;
}

function WordBox({word} : WordBoxProps) {

    return <div key={word.id} className="word-box">
            {word.name}
        </div>
}

export default WordBox
