import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styling/OpenEarth.css"

const OpenEarth = () => {
  const navigate = useNavigate()

  return (
    <div className="open-earth">
      <h2>Welcome to Open Earth</h2>
    </div>
  )
}

export default OpenEarth
