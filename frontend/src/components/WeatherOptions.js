import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styling/WeatherOptions.css"

const weatherOptionsData = [
  {
    key: "low",
    title: "Low Rainfall",
    description: "Payout if rainfall is below average in your area",
    iconClass: "low-rainfall-icon",
  },
  {
    key: "excess",
    title: "Excess Rainfall",
    description: "Payout if rainfall is above average in your area",
    iconClass: "excess-rainfall-icon",
  },
  {
    key: "thermal",
    title: "High Power Demand",
    description: "Payout if power demand is higher than expected",
    iconClass: "thermal-icon",
  },
  {
    key: "wind",
    title: "Lower Wind Generation",
    description: "Payout if wind generation is lower than expected",
    iconClass: "wind-icon",
  },
  {
    key: "solar",
    title: "Cloudier Than Average",
    description: "Payout if solar generation is lower than expected",
    iconClass: "solar-icon",
  },
]

const WeatherOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const navigate = useNavigate()

  const handleSelect = (option) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    const selectedWeatherOption = weatherOptionsData.find((option) => option.key === selectedOption)
    navigate("/propose", { state: { weatherType: selectedWeatherOption ? selectedWeatherOption.title : "" } })
  }

  return (
    <div className="weather-options">
      <h2>Select the weather type covered by the contract</h2>
      <div className="options">
        {weatherOptionsData.map((option) => (
          <div
            key={option.key}
            className={`option ${selectedOption === option.key ? "selected" : ""}`}
            onClick={() => handleSelect(option.key)}
          >
            <div className={`icon ${option.iconClass}`}></div>
            <p>{option.title}</p>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default WeatherOptions
