import React from 'react';
import Halp from '../../assets/lifeline.svg';
import './Lifeline.css';

function Lifeline({ tooltipText }: { tooltipText: string }) {
	return (
		<div
			id='lifeline'
			style={{ display: 'flex', alignItems: 'center' }}
			title={tooltipText}
		>
			<img src={Halp} alt='Helpful icon' />
		</div>
	);
}

export default Lifeline;
