import './Heart.css';
import Icons from '../../constants/icons';

interface HeartProps {
	isFull: boolean;
}

function Heart({ isFull }: HeartProps) {
	return (
		<svg viewBox='0 0 512 512'>
			<g>
				<path
					fill='white'
					d={isFull ? Icons.heartFull : Icons.heartEmpty}
				></path>
			</g>
		</svg>
	);
}

export default Heart;
