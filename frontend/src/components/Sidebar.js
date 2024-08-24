import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styling/Sidebar.css";
import Icon from '../components/styling/icon';


// Remember <Link to "/"> is excluded from prod.

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li className={location.pathname === "/organization" ? "active" : ""}>
          <Link to="/organization">
            <Icon sx={{ color: 'black', fontSize: 15, mr: 5 }} icon={'mdi:home'} />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
