import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 40, color = '#22a6b3' }) => {
	const spinnerStyle = {
		width: size,
		height: size,
		borderColor: `rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.1) ${color}`,
	};

	return <div className='spinner' style={spinnerStyle}></div>;
};

export default Spinner;
