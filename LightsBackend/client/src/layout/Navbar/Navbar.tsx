import { useContext } from 'react';
import { UserContext } from '../../helpers/UserContextProvider';
import Icons from '../../constants/icons';
import { useLocation } from 'react-router-dom';

import './Navbar.css';
import NavbarItem from './NavbarItem';

function Navbar() {
	const { isAuth } = useContext(UserContext);
	const location = useLocation();

	if (location.pathname == '/') {
		return null;
	}

	return (
		<>
			<nav className='navbar'>
				<ul className='navbar-nav'>
					<li className='logo'>
						<a href='/' className='nav-link'>
							<span className='link-text logo-text'>Logos</span>
							<svg
								aria-hidden='true'
								focusable='false'
								data-prefix='fad'
								data-icon='angle-double-right'
								role='img'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 448 512'
								className='svg-inline--fa fa-angle-double-right fa-w-14 fa-5x'
							>
								<g className='fa-group'>
									<path
										fill='currentColor'
										d={Icons.arrowRightSecondary}
										className='fa-secondary'
									></path>
									<path
										fill='currentColor'
										d={Icons.arrowRightPrimary}
										className='fa-primary'
									></path>
								</g>
							</svg>
						</a>
					</li>
					{isAuth ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
				</ul>
			</nav>
		</>
	);
}

function AuthenticatedLinks() {
	const { logout } = useContext(UserContext);

	return (
		<>
			<NavbarItem text='Profil' link='/profile' svgSource={Icons.avatarFull} />
			<NavbarItem text='Catalog' link='/catalog' svgSource={Icons.book} />

			<li className='nav-item bottom-item'>
				<a onClick={logout} href='#' className='nav-link'>
					<svg viewBox='0 0 512 512'>
						<g className='fa-group'>
							<path
								fill='currentColor'
								d={Icons.exit}
								className='fa-secondary'
							></path>
						</g>
					</svg>
					<span className='link-text'>Log out</span>
				</a>
			</li>
		</>
	);
}

function UnauthenticatedLinks() {
	return (
		<>
			<NavbarItem text='Login' link='/login' svgSource={Icons.avatarEmpty} />
		</>
	);
}

export default Navbar;
