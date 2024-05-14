const TabButton = ({ onClick, icon, isActive }) => {
	return (
		<button className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
			<svg viewBox='0 0 512 512'>
				<g>
					<path fill='white' d={icon}></path>
				</g>
			</svg>
		</button>
	);
};

export default TabButton;
