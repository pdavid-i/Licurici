interface NavbarItemProps {
	svgSource: string;
	text: string;
	link: string;
	width?: string;
	height?: string;
	bottomItem?: boolean;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

function NavbarItem({
	svgSource,
	text,
	link,
	width = '512',
	height = '512',
	bottomItem = false,
	onClick,
}: NavbarItemProps) {
	return (
		<li className={'nav-item' + (bottomItem ? ' bottom-item' : '')}>
			<a
				href={link}
				className='nav-link'
				onClick={(e) => {
					onClick?.(e);
				}}
			>
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
