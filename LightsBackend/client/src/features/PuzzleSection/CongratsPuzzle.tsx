import { useState } from 'react';
import './CongratsPuzzle.css';
import xmark from '../../assets/xmark.svg';

function CongratsMessage() {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) {
		return null;
	}

	return (
		<div id='puzzleFinished'>
			<div id='headerClose'>
				<img
					title='Gata cu vrăjeala!'
					id='closeButton'
					src={xmark}
					onClick={() => setIsVisible(false)}
				></img>
			</div>
			<div id='congratsMessage'>
				<p>Felicitări, ai găsit toate piesele.</p>
				<i>Poți juca în continuare, de amorul artei.</i>
				<i> Plus că se mai consolidează și cuvintele.</i>
			</div>
			<hr></hr>
		</div>
	);
}

export default CongratsMessage;
