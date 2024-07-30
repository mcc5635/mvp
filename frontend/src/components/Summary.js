import React from "react"
import { useLocation } from "react-router-dom"
import "./styling/Summary.css"

const Summary = () => {
  const location = useLocation()
  const { weatherType, startDate, endDate, rainfallIndex, payoutType, payoutStructure } = location.state

  return (
    <div className="summary">
      <h2>Summary</h2>
      <div className="premium-bar"></div>
      <div className="summary-boxes">
        <div className="summary-box">
          <h3>Weather Type</h3>
          <p>{weatherType}</p>
        </div>
        <div className="summary-box">
          <h3>Time Period</h3>
          <p>
            {startDate} to {endDate}
          </p>
        </div>
        <div className="summary-box">
          <h3>Location</h3>
          <img src="map-location.png" alt="Map location" />
        </div>
        <div className="summary-box">
          <h3>Payout</h3>
          <p>
            {payoutType}: For every 1% that rainfall is less than {payoutStructure}, I will be paid $1000
          </p>
        </div>
      </div>
      <button className="request-quote-button">Request Quote</button>
    </div>
  )
}

export default Summary
