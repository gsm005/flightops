import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  return (
    <section style={{ padding: '1rem' }}>
      <MapContainer center={[-6.200, 106.816]} zoom={10} style={{ height: '16rem', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-6.200, 106.816]}>
          <Popup>A popup.</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

 export default Map;