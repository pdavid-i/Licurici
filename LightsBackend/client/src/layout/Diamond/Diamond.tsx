import Icons from '../../constants/icons';
import './Diamond.css';

function Diamond() {
	return (
		<svg id='diamond' viewBox='0 0 512 512'>
			<g>
				<path fill='#99ffeb' d={Icons.diamond}></path>
			</g>
		</svg>
	);
}

export default Diamond;
