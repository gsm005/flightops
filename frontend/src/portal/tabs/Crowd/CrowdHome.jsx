import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightTracker from "./Ftrack1";

const parentStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  background: 'grey',
  padding: '10px',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  height: '50%', // Each row takes up 50% of the height
};

const childDivStyle = {
  flex: '1', // Each child container takes up equal width
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: '10px',
  background: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
};

const valueBoxStyle = {
  flex: '1', // Ensure it takes up equal width
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  background: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflowY: 'auto',
};

const mapContainerStyle = {
  width: '100vw',
  height: '100vh', // Use 100% to fit the parent container height
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const valueStyle = {
  marginBottom: '5px',
  fontSize: '14px',
  color: '#008080',
  fontWeight: 'bold',
  textAlign: 'left',
  backgroundColor: '#f0f0f0',
  padding: '8px',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const defaultStart = [30.3165, 78.0322];
const defaultEnd = [13.1989, 77.7069];
const intermediatePoints1 = [
  [28.7041, 77.1025], // Delhi
  [17.4065,78.4772]  // hyderabad
];
const intermediatePoints2 = [
  [27.1767, 78.0081], // Agra
  [15.3173, 75.7139]  // Hubli
];

export function CrowdHome() {
  const [weatherData, setWeatherData] = useState(null);
  const [bengaluruWeatherData, setBengaluruWeatherData] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [bengaluruTemperature, setBengaluruTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [bengaluruWindSpeed, setBengaluruWindSpeed] = useState(null);
  const [weather, setWeather] = useState(null);
  const [bengaluruWeather, setBengaluruWeather] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [bengaluruPressure, setBengaluruPressure] = useState(null);
  const [longi, setLongi] = useState(null);
  const [lati, setLati] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [winddegree, setWd] = useState(null);
  const [windgust, setWg] = useState(null);
  const [cloudiness, setCd] = useState(null);
  const [bengaluruLongi, setBengaluruLongi] = useState(null);
  const [bengaluruLati, setBengaluruLati] = useState(null);
  const [bengaluruHumidity, setBengaluruHumidity] = useState(null);
  const [bengaluruVisibility, setBengaluruVisibility] = useState(null);
  const [bengaluruWinddegree, setBengaluruWd] = useState(null);
  const [bengaluruWindgust, setBengaluruWg] = useState(null);
  const [bengaluruCloudiness, setBengaluruCd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bengaluruLoading, setBengaluruLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bengaluruError, setBengaluruError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const lat = '30.3165';
      const lon = '78.0322';
      const apiKey = '712e1060d3f6deb0f0bbbe599ed4bd96';

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      console.log("Request URL: ", url);

      try {
        const response = await axios.get(url);
        console.log("API Response: ", response);
        const data = response.data;
        setWeatherData(data);
        setTemperature((data.main.temp - 273.15).toFixed(2));
        setPressure((data.main.pressure * 0.000987).toFixed(2));
        setWindSpeed(data.wind.speed);
        setWd(data.wind.deg);
        setLongi(data.coord.lon);
        setLati(data.coord.lat);
        setWg(data.wind.gust);
        setCd(data.clouds.all);
        setHumidity(data.main.humidity);
        setVisibility((data.visibility / 1000).toFixed(2));
        setWeather(data.weather[0].description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchBengaluruWeatherData = async () => {
      const lat = '12.9716';
      const lon = '77.5946';
      const apiKey = '712e1060d3f6deb0f0bbbe599ed4bd96';

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      console.log("Bengaluru Request URL: ", url);

      try {
        const response = await axios.get(url);
        console.log("Bengaluru API Response: ", response);
        const data = response.data;
        setBengaluruWeatherData(data);
        setBengaluruTemperature((data.main.temp - 273.15).toFixed(2));
        setBengaluruPressure((data.main.pressure * 0.000987).toFixed(2));
        setBengaluruWindSpeed(data.wind.speed);
        setBengaluruWd(data.wind.deg);
        setBengaluruLongi(data.coord.lon);
        setBengaluruLati(data.coord.lat);
        setBengaluruWg(data.wind.gust);
        setBengaluruCd(data.clouds.all);
        setBengaluruHumidity(data.main.humidity);
        setBengaluruVisibility((data.visibility / 1000).toFixed(2));
        setBengaluruWeather(data.weather[0].description);
        setBengaluruLoading(false);
      } catch (error) {
        console.error("Error fetching Bengaluru weather data: ", error);
        setBengaluruError(error);
        setBengaluruLoading(false);
      }
    };

    fetchWeatherData();
    fetchBengaluruWeatherData();
  }, []);

  if (loading || bengaluruLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (bengaluruError) {
    return <div>Error: {bengaluruError.message}</div>;
  }

  return (
    <div style={parentStyle}>
      <div style={rowStyle}>
        <div style={childDivStyle}>
          <Map name="Route-1" start={defaultStart} end={defaultEnd} intermediatePoints={intermediatePoints1} />
        </div>
        <div style={childDivStyle}>
          <Values
            temperature={temperature}
            windSpeed={windSpeed}
            weather={weather}
            pressure={pressure}
            winddegree={winddegree}
            longi={longi}
            lati={lati}
            humidity={humidity}
            visibility={visibility}
            windgust={windgust}
            cloudiness={cloudiness}
          />
        </div>
      </div>
      <div style={rowStyle}>
        <div style={childDivStyle}>
          <Map name="Route-2" start={defaultStart} end={defaultEnd} intermediatePoints={intermediatePoints2} />
        </div>
        <div style={childDivStyle}>
          <Values
            temperature={bengaluruTemperature}
            windSpeed={bengaluruWindSpeed}
            weather={bengaluruWeather}
            pressure={bengaluruPressure}
            winddegree={bengaluruWinddegree}
            longi={bengaluruLongi}
            lati={bengaluruLati}
            humidity={bengaluruHumidity}
            visibility={bengaluruVisibility}
            windgust={bengaluruWindgust}
            cloudiness={bengaluruCloudiness}
          />
        </div>
      </div>
    </div>
  );
}

function Map({ name, start, end, intermediatePoints }) {
  return (
    <div style={mapContainerStyle}>
      <FlightTracker start={start} end={end} intermediateMarkers={intermediatePoints} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function Values({ temperature, windSpeed, weather, pressure, winddegree, longi, lati, humidity, visibility, windgust, cloudiness }) {
  return (
    <div style={valueBoxStyle}>
      <Value label="Temperature(C)" value={temperature} />
      <Value label="Wind Speed(m/s)" value={windSpeed} />
      <Value label="Weather" value={weather} />
      <Value label="Pressure(atm)" value={pressure} />
      <Value label="Wind Degree" value={winddegree} />
      <Value label="Longitude" value={longi} />
      <Value label="Latitude" value={lati} />
      <Value label="Humidity(%)" value={humidity} />
      <Value label="Visibility(km)" value={visibility} />
      <Value label="Wind Gust(m/s)" value={windgust} />
      <Value label="Cloudiness(%)" value={cloudiness} />
    </div>
  );
}

function Value({ label, value }) {
  return (
    <div style={valueStyle}>
      <strong>{label}: </strong>{value}
    </div>
  );
}
