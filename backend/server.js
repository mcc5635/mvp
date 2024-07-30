const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors())

// Route to handle form submission
app.post("/propose-contract", (req, res) => {
  const {
    weatherType,
    latitude,
    longitude,
    locationName,
    startDate,
    endDate,
    rainfallIndex,
    payoutType,
    payoutStructure,
    maximumPayout,
    premium,
  } = req.body

  // Handle form submission (save to database, perform calculations, etc.)
  res.json({
    message: "Contract proposed successfully",
    data: {
      weatherType,
      latitude,
      longitude,
      locationName,
      startDate,
      endDate,
      rainfallIndex,
      payoutType,
      payoutStructure,
      maximumPayout,
      premium,
    },
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
