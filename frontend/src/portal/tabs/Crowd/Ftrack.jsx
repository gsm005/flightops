import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const airplaneIcon = new L.Icon({
    iconUrl: 'https://icon2.cleanpng.com/20180414/jxw/kisspng-airplane-icon-a5-computer-icons-flight-airplane-5ad24caedae127.4080163515237316308965.jpg',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

let lat = "30.32443";

let lon ="78.03392";

const FlightTracker = ( {positions} ) => {
    const BASE_URL = "http://localhost:5000";
    console.log("ftrck",positions);
    const mapRef = useRef(null);
    const latitude = positions &&positions.length && positions[0].lat ;
    const longitude = positions &&positions.length && positions[0].lon;
    // if(lat ==  0 || lon == 0 ){
    //     lat = latitude;
    //     lon = longitude
    // }
  
    return ( 
        <MapContainer center={[lat, lon]} zoom={13} ref={mapRef} style={{height: "60vh", width: "90vw"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions && (
                <>
                    <Polyline
                        positions={positions.map(position => [position.lat, position.lon])}
                        color="red"
                        weight={3}
                        opacity={0.7}
                    />

                    <Marker position={[ positions.length && positions[0].lat, positions.length && positions[0].lon]} icon={airplaneIcon}>
                        <Popup>Airplane</Popup>
                    </Marker>

                </>
            )}
        </MapContainer>
    );
};

export default FlightTracker;
