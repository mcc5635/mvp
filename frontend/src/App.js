
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
//import ProposeContract from "./components/ProposeContract"
//import PayoutTerms from "./components/PayoutTerms"
import Summary from "./components/Summary"
import Feedback from "./components/Feedback"
import "./App.css";
import Organization from "./components/Organization";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Organization />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
        <Feedback />
      </div>
    </Router>
  );
}

export default App;
