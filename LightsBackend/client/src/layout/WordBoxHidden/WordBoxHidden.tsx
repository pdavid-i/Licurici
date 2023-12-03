import './WordBoxHidden.css'
import Icons from '../../constants/Icons'

interface WordBoxHiddenProps {
    id: number;
}

function WordBoxHidden({id} : WordBoxHiddenProps) {
    return <div key={id} className="word-box-hidden">
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
