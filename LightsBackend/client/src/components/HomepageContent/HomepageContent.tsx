import './HomepageContent.css'

function HomepageContent({toggleGameVisibility} : any) {


    return (
        <div className='content'>
            <h1>Logos</h1>
            <p> <i>Limitele lumii mele sunt limitele limbii mele</i> - Ludwig Wittgenstein</p>
            <button onClick={toggleGameVisibility}> Exploreaza lumea </button>
        </div>
    )
}

export default HomepageContent