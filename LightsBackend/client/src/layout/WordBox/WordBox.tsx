import { useNavigate } from 'react-router-dom';
import { Word } from '../../features/CatalogSection/CatalogSection';
import Modal from '../Modal/Modal';
import './WordBox.css'

interface WordBoxProps {
    word: Word;
}

function WordBox({word} : WordBoxProps) {
    const navigate = useNavigate();
    function goToWord(): void {
        navigate(`/word/${word.id}`, { state: { from: location.pathname } });
    }

    return <>
        <div onClick={goToWord} key={word.id} className="word-box">
            {word.name}
        </div>
    </>
}

export default WordBox
