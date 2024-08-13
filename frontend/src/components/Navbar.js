import React from "react"
import { useLocation } from "react-router-dom"
import "./styling/Navbar.css"

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar" style={{height: '50px'}}>
      <div className="navbar-logo" style={{ color: 'rgb(18, 14, 107)' }}>
        {location.pathname === '/earth/openearth' ? (
          <h2 style={{fontSize: 25, fontWeight:'bold'}}>Interstellar Asset Library</h2>
        ) : location.pathname === '/earth/portfolio' ? (
          <h2 style={{fontSize: 25, fontWeight:'bold'}}>Commercial Real Estate</h2>
        ) : null}

      </div>
      <ul className="navbar-links">
        {/* <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/">Settings</Link>
        </li> */}

        <div className="navbar-logo">
          {location.pathname === '/earth/openearth' && (
            <img src="/avatar.webp" alt="logo" className="user-avatar" />

          )}
        </div>

      </ul>
    </nav>
  )
}

export default Navbar
