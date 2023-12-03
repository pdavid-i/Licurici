import { useContext } from 'react';
import { UserContext } from '../../helpers/UserContextProvider'
import Icons from '../../constants/Icons'

import './Navbar.css'

function Navbar() {

  const {isAuth} = useContext(UserContext);

  return (
    <>
 <nav className="navbar">
    <ul className="navbar-nav">
      <li className="logo">
        <a href="/" className="nav-link">
          <span className="link-text logo-text">Logos</span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g className="fa-group">
              <path
                fill="currentColor"
                d={Icons.arrowRightSecondary}
                className="fa-secondary"
              ></path>
              <path
                fill="currentColor"
                d={Icons.arrowRightPrimary}
                className="fa-primary"
              ></path>
            </g>
          </svg>
        </a>
      </li>
      {
        isAuth ? <AuthenticatedLinks /> : <UnauthenticatedLinks />
      }
    </ul>
  </nav>

    </>
  )
}

function AuthenticatedLinks() {
  const {logout} = useContext(UserContext);

  return <>
          <li className="nav-item">
      <a href="/profile" className="nav-link">
        <svg
          viewBox="0 0 512 512"
        >
          <g className="fa-group">
            <path
              fill="currentColor"
              d={Icons.avatarFull}
              className="fa-secondary"
            ></path>
          </g>
        </svg>
        <span className="link-text">Profil</span>
      </a>
    </li>

        <li className="nav-item">
      <a href="/catalog" className="nav-link">
        <svg
          viewBox="0 0 512 512"
        >
          <g className="fa-group">
            <path
              fill="currentColor"
              d={Icons.book}
              className="fa-secondary"
            ></path>
          </g>
        </svg>
        <span className="link-text">Catalog</span>
      </a>
    </li>

    <li className="nav-item">
      <a href="/favorites" className="nav-link">
        <svg
          viewBox="0 0 512 512"
        >
          <g className="fa-group">
            <path
              fill="currentColor"
              d={Icons.heartEmpty}
              className="fa-secondary"
            ></path>
          </g>
        </svg>
        <span className="link-text">Favorite</span>
      </a>
    </li>

    <li className="nav-item bottom-item">
      <a onClick={logout} href="#" className="nav-link">
        <svg
          viewBox="0 0 512 512"
        >
          <g className="fa-group">
            <path
              fill="currentColor"
              d={Icons.exit}
              className="fa-secondary"
            ></path>
          </g>
        </svg>
        <span className="link-text">Log out</span>
      </a>
    </li>
  </>
}

function UnauthenticatedLinks() {
  return <>
      <li className="nav-item">
        <a href="/login" className="nav-link">
          <svg
            viewBox="0 0 512 512"
          >
            <g className="fa-group">
              <path
                fill="currentColor"
                d={Icons.avatarEmpty}
                className="fa-secondary"
              ></path>
            </g>
          </svg>
          <span className="link-text">Log in</span>
        </a>
      </li>
  </>
}

export default Navbar
