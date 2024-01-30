import './WordBoxHidden.css'
import Icons from '../../constants/Icons'

function WordBoxHidden() {
    
    return <div className="word-box">
            <svg  viewBox="0 0 512 512">
                <g className="fa-group">
    <path
      fill="white"
      d={Icons.questionMark}
      className="fa-secondary"
    ></path>
                </g>
            </svg>
        </div>
}

export default WordBoxHidden
