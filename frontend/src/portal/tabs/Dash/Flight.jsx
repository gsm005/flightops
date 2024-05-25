import React from 'react';

function FlightTracker() {
  return (
    <section style={{ padding: '1rem' }}>
      <div style={{ backgroundColor: '#48bb78', padding: '1rem', borderRadius: '0.25rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Flight Status</h2>
        
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
        <button style={{ backgroundColor: '#ecc94b', padding: '0.5rem', borderRadius: '0.25rem' }}>Get Airport Directions</button>
        <button style={{ backgroundColor: '#ecc94b', padding: '0.5rem', borderRadius: '0.25rem' }}>Get Airport Alerts</button>
        <button style={{ backgroundColor: '#ecc94b', padding: '0.5rem', borderRadius: '0.25rem' }}>On-time Performance</button>
        <button style={{ backgroundColor: '#ecc94b', padding: '0.5rem', borderRadius: '0.25rem' }}>Refresh Data</button>
      </div>
    </section>
  );
}

export default FlightTracker;