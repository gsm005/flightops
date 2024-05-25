import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center = [20.5937, 78.9629];

const FlightTracker = ({ start, end, intermediateMarkers }) => {
  const markers = [start, ...intermediateMarkers, end];
  const polylinePoints = [start, ...intermediateMarkers, end];

  return (
    <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position} />
      ))}
      <Polyline positions={polylinePoints} color="green" />
    </MapContainer>
  );
};

export default FlightTracker;
