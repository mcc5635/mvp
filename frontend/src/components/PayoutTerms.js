import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styling/PayoutTerms.css"

const PayoutTerms = () => {
  const [rainfallIndex, setRainfallIndex] = useState("")
  const [payoutType, setPayoutType] = useState("")
  const [payoutStructure, setPayoutStructure] = useState("")
  const [contractOverview, setContractOverview] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    navigate("/summary", {
      state: {
        rainfallIndex,
        payoutType,
        payoutStructure,
        contractOverview,
      },
    })
  }

  const calculateOverview = () => {
    const maxPayout = 100000 // Replace with actual calculation logic
    const premiumCost = 23007 // Replace with actual calculation logic
    return `The maximum payout you can receive with this payout structure is $${maxPayout}. \nPremium Cost: $${premiumCost}`
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
          <p>{calculateOverview()}</p>
        </div>
        <button type="submit" className="submit-button">
          Next
        </button>
      </form>
    </div>
  )
}

export default PayoutTerms
