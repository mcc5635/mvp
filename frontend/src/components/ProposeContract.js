// src/components/ProposeContract.js
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MapComponent from "./MapComponent"
import "./styling/ProposeContract.css"

const ProposeContract = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const weatherTypeFromState = location.state?.weatherType || "Low Rainfall"
  const [weatherType, setWeatherType] = useState(weatherTypeFromState)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [locationName, setLocationName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleNext = (e) => {
    e.preventDefault()
    navigate("/payout-terms", { state: { weatherType, latitude, longitude, locationName, startDate, endDate } })
  }

  return (
    <div className="propose-contract">
      <h2>Propose a Contract</h2>
      <form onSubmit={handleNext}>
        <div className="form-group">
          <label>Weather Type</label>
          <select value={weatherType} onChange={(e) => setWeatherType(e.target.value)}>
            <option value="Low Rainfall">Low Rainfall</option>
            <option value="Excess Rainfall">Excess Rainfall</option>
            <option value="High Power Demand">High Power Demand</option>
            <option value="Lower Wind Generation">Lower Wind Generation</option>
            <option value="Cloudier Than Average">Cloudier Than Average</option>
          </select>
        </div>
        <div className="form-group">
          <label>Latitude</label>
          <input type="text" value={latitude} readOnly />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input type="text" value={longitude} readOnly />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" value={locationName} readOnly />
        </div>
        <MapComponent setLatitude={setLatitude} setLongitude={setLongitude} setCityName={setLocationName} />
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit" className="next-button">
          Next
        </button>
      </form>
    </div>
  )
}

export default ProposeContract
