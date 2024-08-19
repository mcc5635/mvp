// src/components/Layout.js
import React from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-area">{children}</div>
      </div>
    </div>
  )
}

export default Layout
