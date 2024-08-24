import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import '../styling/MapComponentArc.css';

const MapComponentArc = ({ height, showSearch = false, showRange = false }) => {
    return (
        <MapContainer
            center={[40.505, -100.09]}
            zoom={10}
            zoomControl={false}
            style={{ height: `${height}px`, position: 'relative' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright"></a>'
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
            
        </MapContainer>
    );
};

export default MapComponentArc;
