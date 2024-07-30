import React from "react"
import { Link } from "react-router-dom"
import "./styling/Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/propose">Propose a Contract</Link>
        </li>
        <li>
          <Link to="/accept">Accept a Contract</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
