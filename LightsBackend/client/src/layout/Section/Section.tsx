import { ReactNode, useContext } from 'react'
import './Section.css'
import { ModalContext } from '../../helpers/ModalContextProvider';
import Modal from '../Modal/Modal';

interface SectionProps {
    children: ReactNode
}

function Section({children} : SectionProps) {
    const { wordId, setWordId, showWordModal, setShowModal, toggleWordModal } = useContext(ModalContext);

    return <>
    {showWordModal && <Modal toggleWordModal={toggleWordModal} wordId={wordId}/>}
    <div className='section'>
        {children}
    </div>
    </>
}

export default Section
