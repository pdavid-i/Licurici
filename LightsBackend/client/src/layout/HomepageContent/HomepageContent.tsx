import ExpandingButton from '../ExtendButton/ExpandingButton'
import './HomepageContent.css'

interface HomepageContentProps {
    toggleGameVisibility: () => void;
}

function HomepageContent({toggleGameVisibility} : HomepageContentProps) {
    return (
        <div className='content'>
            <h1>Logos</h1>
            <p> 4 your eyez only </p>
            <p> <i>Limitele lumii mele sunt limitele limbii mele</i> - Ludwig Wittgenstein</p>
            <ExpandingButton text='Extinde lumea'  toggleGameVisibility={toggleGameVisibility} />
        </div>
    )
}

export default HomepageContent