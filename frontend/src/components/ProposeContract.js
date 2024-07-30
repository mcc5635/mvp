import React, { useState } from "react"
import MapComponent from "./MapComponent"
import "./styling/ProposeContract.css"

const ProposeContract = () => {
  const [weatherType, setWeatherType] = useState("Low Rainfall")
  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [payoutTerms, setPayoutTerms] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [cityName, setCityName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add logic to handle form submission
    console.log({ weatherType, location, startDate, endDate, payoutTerms, latitude, longitude, cityName })
    // Here you would make a request to the backend script with the gathered data
  }

  return (
    <div className="propose-contract">
      <h2>Propose a Contract</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Type a location to search"
          />
        </div>
        <div className="form-group">
          <label>Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
          />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
          />
        </div>
        <div className="form-group">
          <label>City Name</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
          />
        </div>
        <MapComponent setLatitude={setLatitude} setLongitude={setLongitude} setCityName={setCityName} />
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Payout Terms</label>
          <input
            type="text"
            value={payoutTerms}
            onChange={(e) => setPayoutTerms(e.target.value)}
            placeholder="Describe the payout terms"
          />
        </div>
        <button type="submit" className="next-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProposeContract
