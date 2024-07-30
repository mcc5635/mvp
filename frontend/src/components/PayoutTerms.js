import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./styling/PayoutTerms.css"

const PayoutTerms = () => {
  const [rainfallIndex, setRainfallIndex] = useState("")
  const [payoutType, setPayoutType] = useState("")
  const [payoutStructure, setPayoutStructure] = useState("")
  const [maxPayout, setMaxPayout] = useState(0)
  const [premiumCost, setPremiumCost] = useState(0)
  const location = useLocation()
  const { weatherType, latitude, longitude, locationName, startDate, endDate } = location.state || {}

  const navigate = useNavigate()

  useEffect(() => {
    // Update maxPayout and premiumCost based on selected values
    if (rainfallIndex && payoutType && payoutStructure) {
      let calculatedMaxPayout = 100000 // Base max payout
      let calculatedPremiumCost = 23007 // Base premium cost

      // Calculate multiplier based on payout structure
      let multiplier
      switch (payoutStructure) {
        case "120% of Average (485mm)":
          multiplier = 1.2
          break
        case "110% of Average (445mm)":
          multiplier = 1.1
          break
        case "Average (405mm)":
          multiplier = 1.0
          break
        case "90% of Average (364mm)":
          multiplier = 0.9
          break
        case "80% of Average (324mm)":
          multiplier = 0.8
          break
        case "70% of Average (283mm)":
          multiplier = 0.7
          break
        default:
          multiplier = 1.0
          break
      }

      calculatedMaxPayout *= multiplier
      calculatedPremiumCost *= multiplier

      setMaxPayout(calculatedMaxPayout)
      setPremiumCost(calculatedPremiumCost)
    }
  }, [rainfallIndex, payoutType, payoutStructure])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    navigate("/summary", {
      state: {
        rainfallIndex,
        weatherType,
        startDate,
        endDate,
        payoutType,
        payoutStructure,
        maxPayout,
        premiumCost,
      },
    })
  }

  return (
    <div className="payout-terms">
      <h2>Payout Terms</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Choose a Rainfall Index</label>
          <select value={rainfallIndex} onChange={(e) => setRainfallIndex(e.target.value)}>
            <option value="">Select a Rainfall Index</option>
            <option value="NASA CHIRPS Rainfall (0.25 deg)">NASA CHIRPS Rainfall (0.25 deg)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Choose a Payout Type</label>
          <select value={payoutType} onChange={(e) => setPayoutType(e.target.value)}>
            <option value="">Select a Payout Type</option>
            <option value="Linear Progressive">Linear Progressive</option>
          </select>
        </div>
        <div className="form-group">
          <label>Choose a Payout Structure: For every 1% that rainfall is less than</label>
          <select value={payoutStructure} onChange={(e) => setPayoutStructure(e.target.value)}>
            <option value="">Select a Payout Structure</option>
            <option value="120% of Average (485mm)">120% of Average (485mm)</option>
            <option value="110% of Average (445mm)">110% of Average (445mm)</option>
            <option value="Average (405mm)">Average (405mm)</option>
            <option value="90% of Average (364mm)">90% of Average (364mm)</option>
            <option value="80% of Average (324mm)">80% of Average (324mm)</option>
            <option value="70% of Average (283mm)">70% of Average (283mm)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contract Overview</label>
          <div>
            The maximum payout you can receive with this payout structure is ${maxPayout.toFixed(2)}.<br />
            Premium Cost: ${premiumCost.toFixed(2)}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Next
        </button>
      </form>
    </div>
  )
}

export default PayoutTerms
