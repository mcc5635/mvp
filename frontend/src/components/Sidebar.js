import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styling/Sidebar.css";
import Icon from '../components/styling/icon';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:home'} />
          </Link>
        </li>
        <li className={location.pathname === "/organisation" ? "active" : ""}>
          <Link to="/organisation">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:abc'} />
          </Link>
        </li>
        <li className={location.pathname === "/earth/portfolio" ? "active" : ""}>
          <Link to="/earth/portfolio">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:earth'} />
          </Link>
        </li>
        <li className={location.pathname === "/earth/openearth" ? "active" : ""}>
          <Link to="/earth/openearth">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:ac-unit'} />
          </Link>
        </li>
        <li className={location.pathname === "/earth/assetlibrary" ? "active" : ""}>
          <Link to="/earth/assetlibrary">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:web-asset'} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
