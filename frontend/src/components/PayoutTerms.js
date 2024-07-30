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
          <label>Choose a Payout Structure</label>
          <input type="text" value={payoutStructure} onChange={(e) => setPayoutStructure(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Contract Overview</label>
          <input type="text" value={contractOverview} onChange={(e) => setContractOverview(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">
          Next
        </button>
      </form>
    </div>
  )
}

export default PayoutTerms
