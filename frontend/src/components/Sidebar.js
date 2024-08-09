import React from "react"
import { Link } from "react-router-dom"
import "./styling/Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/favicon-a.png" alt="logo" />
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/">Propose a Contract</Link>
        </li>
        <li>
          <Link to="/accept">Accept a Contract</Link>
        </li>
        <li>
          <Link to="/earth/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/earth/openearth">Open Earth</Link>
        </li>
        <li>
          <Link to="/earth/assetlibrary">Asset Library</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
