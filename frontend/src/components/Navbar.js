import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./styling/Navbar.css"

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-logo" style={{ color: 'rgb(18, 14, 107)' }}>
        {location.pathname === '/earth/openearth' && (
          <h2>Cervet's Asset Library</h2>
        )}
      </div>
      <ul className="navbar-links">
        {/* <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/">Settings</Link>
        </li> */}

        <div className="navbar-logo">
          <img src="/avatar.webp" alt="logo" />
        </div>

      </ul>
    </nav>
  )
}

export default Navbar
