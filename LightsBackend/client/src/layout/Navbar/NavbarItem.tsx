interface NavbarItemProps {
    svgSource: string,
    text: string,
    link: string
}

function NavbarItem({svgSource, text, link}: NavbarItemProps) {
  return <li className="nav-item">
    <a href={link} className="nav-link">
      <svg
        viewBox="0 0 512 512"
      >
        <g className="fa-group">
          <path
            fill="currentColor"
            d={svgSource}
            className="fa-secondary"
          ></path>
        </g>
      </svg>
      <span className="link-text">{text}</span>
    </a>
  </li>
}

export default NavbarItem;