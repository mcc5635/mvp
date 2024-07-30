import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import WeatherOptions from "./components/WeatherOptions"
import ProposeContract from "./components/ProposeContract"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<WeatherOptions />} />
            <Route path="/propose" element={<ProposeContract />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
