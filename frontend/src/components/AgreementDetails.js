import React, { useState } from "react"
import "./styling/AgreementDetails.css"

const AgreementDetails = () => {
  const [selectedOption, setSelectedOption] = useState("weather-type")

  return (
    <div className="agreement-details">
      <p>Your agreement is for</p>
      <div className="options">
        <label>
          <input
            type="radio"
            value="weather-type"
            checked={selectedOption === "weather-type"}
            onChange={() => setSelectedOption("weather-type")}
          />
          Weather Type
        </label>
        <label>
          <input
            type="radio"
            value="location"
            checked={selectedOption === "location"}
            onChange={() => setSelectedOption("location")}
          />
          Location
        </label>
        <label>
          <input
            type="radio"
            value="start-date"
            checked={selectedOption === "start-date"}
            onChange={() => setSelectedOption("start-date")}
          />
          Start Date
        </label>
        <label>
          <input
            type="radio"
            value="end-date"
            checked={selectedOption === "end-date"}
            onChange={() => setSelectedOption("end-date")}
          />
          End Date
        </label>
        <label>
          <input
            type="radio"
            value="payout-terms"
            checked={selectedOption === "payout-terms"}
            onChange={() => setSelectedOption("payout-terms")}
          />
          Payout Terms
        </label>
      </div>
    </div>
  )
}

export default AgreementDetails
