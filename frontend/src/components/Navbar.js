import React from "react"
import "./styling/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/path-to-your-logo.svg" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Network</a>
        </li>
        <li>
          <a href="/propose">Current User</a>
        </li>
        <li>
          <a href="/accept">User Balances</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
