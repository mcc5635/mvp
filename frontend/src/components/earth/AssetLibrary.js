import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styling/AssetLibrary.css"

const AssetLibrary = () => {
  const navigate = useNavigate()

  return (
    <div className="asset-library">
      <h2>Welcome to Asset Library</h2>
    </div>
  )
}

export default AssetLibrary
