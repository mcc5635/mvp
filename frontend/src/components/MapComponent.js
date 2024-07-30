import React, { useRef, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch"
import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css"
import "./styling/MapComponent.css"

const MapComponent = ({ setLatitude, setLongitude, setCityName }) => {
  const mapRef = useRef()

  const GeoSearchControlComponent = () => {
    const map = useMap()

    useEffect(() => {
      const provider = new OpenStreetMapProvider()

      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: true,
        autoComplete: true,
        autoCompleteDelay: 250,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        searchLabel: "Type a location to search",
      })

      map.addControl(searchControl)

      map.on("geosearch/showlocation", (result) => {
        const { y: lat, x: lon, label: name } = result.location
        setLatitude(lat)
        setLongitude(lon)
        setCityName(name)
      })

      return () => map.removeControl(searchControl)
    }, [map, setLatitude, setLongitude, setCityName])

    return null
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} ref={mapRef} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>Selected Location</Popup>
      </Marker>
      <GeoSearchControlComponent />
    </MapContainer>
  )
}

export default MapComponent
