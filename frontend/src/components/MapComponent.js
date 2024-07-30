import React, { useEffect } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css"
import L from "leaflet"
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch"

const MapComponent = ({ setLatitude, setLongitude, setCityName }) => {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "", // Set attribution to an empty string
    }).addTo(map)

    const provider = new OpenStreetMapProvider()

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: false,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Enter address",
      keepResult: true,
    })

    map.addControl(searchControl)

    map.on("geosearch/showlocation", (result) => {
      setLatitude(result.location.y)
      setLongitude(result.location.x)
      setCityName(result.location.label)
    })

    return () => {
      map.remove()
    }
  }, [setLatitude, setLongitude, setCityName])

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>
}

export default MapComponent
