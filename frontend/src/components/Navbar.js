import React from "react"
import { Link } from "react-router-dom"
import "./styling/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./functions-insurance/assets/logo.webp" alt="logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/sign-in">Sign In</a>
        </li>
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
