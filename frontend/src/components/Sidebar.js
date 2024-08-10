import React from "react";
import { Link } from "react-router-dom";
import "./styling/Sidebar.css";
import Icon from '../components/styling/icon';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:home'} />
          </Link>
        </li>
        <li>
          <Link to="/accept">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:abc'} />
          </Link>
        </li>
        <li>
          <Link to="/earth/portfolio">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:earth'} />
          </Link>
        </li>
        <li>
          <Link to="/earth/openearth">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:ac-unit'} />
          </Link>
        </li>
        <li>
          <Link to="/earth/assetlibrary">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:web-asset'} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
