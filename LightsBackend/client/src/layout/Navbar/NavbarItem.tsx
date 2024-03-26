interface NavbarItemProps {
	svgSource: string;
	text: string;
	link: string;
	width: string;
	height: string;
}

function NavbarItem({
	svgSource,
	text,
	link,
	width = '512',
	height = '512',
}: NavbarItemProps) {
	return (
		<li className='nav-item'>
			<a href={link} className='nav-link'>
				<svg viewBox={`0 0 ${width} ${height}`}>
					<g className='fa-group'>
						<path
							fill='currentColor'
							d={svgSource}
							className='fa-secondary'
						></path>
					</g>
				</svg>
				<span className='link-text'>{text}</span>
			</a>
		</li>
	);
}

export default NavbarItem;
