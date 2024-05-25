// src/components/FlightInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightInfo = () => {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlightData = () => {
    const flightCode = 'SG616'; // Hardcoded flight code

    axios.get(`http://16.16.122.130/flight-safe?flight=6E2343`)
      .then(response => {
        setFlightData(response.data);
        // console.log(flightData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFlightData();

    const intervalId = setInterval(fetchFlightData, 7000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

//   const { flightNumber, departureTime, arrivalTime, status, aircraft, weather } = flightData || {};
  const airline = flightData.flight_details.data.carrierName;
  const flightId = flightData.flight_details.data.flightId;
  const lattitude = flightData.latitude;
  const longitude = flightData.longitude;



  return (
    <section style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Flight Information</h2>
      <p><strong>Airline:</strong> {airline}</p>
      <p><strong>Flight id:</strong> {flightId}</p>
      <p><strong>Lattitude:</strong> {lattitude}</p>
      <p><strong>Longitude:</strong> {longitude}</p>
    </section>
  );
};

export default FlightInfo;
