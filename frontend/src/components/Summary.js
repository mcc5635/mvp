import React from "react"
import "./styling/Summary.css"

const summaryData = [
  {
    key: "weatherType",
    title: "Weather Type",
    content: "Low Rainfall",
  },
  {
    key: "timePeriod",
    title: "Time Period",
    content: "July 2019 to November 2019",
  },
  {
    key: "location",
    title: "Location",
    content: "Southampton, Suffolk County, New York, US",
    map: true,
  },
  {
    key: "payout",
    title: "Payout",
    content: "For every 1% that rainfall is less than NASA CHIRPS Rainfall (0.25 deg), I will be paid $1000",
  },
]

const Summary = () => {
  return (
    <div className="summary">
      <h2>Summary</h2>
      <div className="premium-bar">Net Zero's estimated premium cost is: $23007</div>
      <div className="summary-boxes">
        {summaryData.map((item) => (
          <div key={item.key} className="summary-box">
            <h3>{item.title}</h3>
            {item.map ? <img src="map-location.png" alt="Map location" /> : <p>{item.content}</p>}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="request-quote-button">Request Quote</button>
      </div>
    </div>
  )
}

export default Summary
