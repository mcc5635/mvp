import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import '../styling/MapComponentOpenStreet.css';

const MapComponentOpenStreet = ({ height, showSearch = false, showRange = false }) => {
    return (
        <MapContainer
            center={[40.505, -100.09]}
            zoom={10}
            zoomControl={false}
            style={{ height: `${height}px`, position: 'relative' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                opacity={0.5}
            />
            <Marker position={[40.505, -100.09]}>
                <Popup>I am a pop-up!</Popup>
            </Marker>
            <ZoomControl position="bottomright" />
            {showSearch && (
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder="Search for locations"
                        className='map-search-field'
                    />
                </div>
            )}
            {showRange && (
                <div className='range-container'>
                    <text style={{fontSize: 15, fontWeight: 400, marginBottom: '10%', textAlign:'left'}}>Combined Physical Risk</text>
                    <div className="progress-bar-map" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0px' }}>
                        <span>Very Low</span>
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                        <span>Very High</span>
                    </div>
                </div>
            )}
        </MapContainer>
    );
};

export default MapComponentOpenStreet;
