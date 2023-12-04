import { useNavigate } from 'react-router-dom';
import { Word } from '../../features/CatalogSection/CatalogSection';
import Modal from '../Modal/Modal';
import './WordBox.css'
import { useContext } from 'react';
import { ModalContext } from '../../helpers/ModalContextProvider';

interface WordBoxProps {
    word: Word;
}

function WordBox({word} : WordBoxProps) {
    const { wordId, setWordId, showWordModal, setShowWordModal } = useContext(ModalContext);

    const navigate = useNavigate();
    function goToWord(): void {
        setWordId(word.id);
        setShowWordModal(true);
    }

    return <>
        <div onClick={goToWord} key={word.id} className="word-box">
            {word.name}
        </div>
    </>
}

export default WordBox
