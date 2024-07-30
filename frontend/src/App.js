import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import WeatherOptions from "./components/WeatherOptions"
import ProposeContract from "./components/ProposeContract"
import PayoutTerms from "./components/PayoutTerms"
import Summary from "./components/Summary"

import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<WeatherOptions />} />
          <Route path="/propose" element={<ProposeContract />} />
          <Route path="/payout-terms" element={<PayoutTerms />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
