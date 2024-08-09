import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import WeatherOptions from "./components/WeatherOptions"
import ProposeContract from "./components/ProposeContract"
import PayoutTerms from "./components/PayoutTerms"
import Summary from "./components/Summary"
import Earth from "./components/earth/OpenEarth"
import AssetLibrary from "./components/earth/AssetLibrary"
import Portfolio from "./components/earth/Portfolio"

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
          <Route path="/earth/openearth" element={<Earth />} />
          <Route path="/earth/assetlibrary" element={<AssetLibrary />} />
          <Route path="/earth/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
