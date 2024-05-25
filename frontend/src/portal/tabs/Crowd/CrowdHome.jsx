import axios from "axios";
import { useEffect, useState } from "react";
import FlightTracker from "./Ftrack";

const parentStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // Full viewport height
  background: 'grey',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flex: 1, // Ensures the row divs take equal space
  gap: '10px', // Gap between columns
  overflow: 'hidden', // Prevent overflow
};

const firstRowStyle = {
  ...rowStyle,
  background: 'lightgrey',
};

const secondRowStyle = {
  ...rowStyle,
  background: 'lightgrey',
};

const childDivStyle = {
  flex: 1, // Ensures each child within the row takes equal width
  border: '2px solid black', // Adds a black border
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Ensure no overflow
};

const valueBoxStyle = {
  flex: 1, // Ensures each value box takes equal width
  border: '2px solid black', // Adds a black border
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Ensure no overflow
  padding: '10px', // Add padding for better spacing
  background: 'white', // White background for better contrast
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
  borderRadius: '8px', // Rounded corners
  width: '200px', // Adjust the width as needed to fit the values exactly
};

const mapContainerStyle = {
  flex: 1,
  width: '100%',
  height: '45vh', // Set each map to take less height to fit both in the screen
  overflow: 'hidden',
  borderRadius: '8px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
  position: 'relative', // Ensures the text can be positioned within the map container
};

const routeNameStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  padding: '5px 10px',
  borderRadius: '4px',
  fontWeight: 'bold',
};

const valueStyle = {
  marginBottom: '5px',
  fontSize: '14px',
  color: '#008080', // Change text color to black
  fontWeight: 'bold', // Make text bold
  textAlign: 'left', // Align text to the left
  backgroundColor: '#f0f0f0', // Light background color for the text
  padding: '8px', // Add padding for better spacing
  borderRadius: '4px', // Rounded corners for the text box
  boxShadow: '0 5px 16px 0 rgb(250,128,114)', // Add a subtle shadow
};

export function CrowdHome() {
  const [weatherData, setWeatherData] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weather, setWeather] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [longi, setLongi] = useState(null);
  const [lati, setLati] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [winddegree, setWd] = useState(null);
  const [windgust, setWg] = useState(null);
  const [cloudiness, setCd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const lat = '30.3165'; // Latitude
      const lon = '78.0322'; // Longitude
      const apiKey = '712e1060d3f6deb0f0bbbe599ed4bd96'; // Replace with your actual OpenWeatherMap API key

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      console.log("Request URL: ", url);

      try {
        const response = await axios.get(url);
        console.log("API Response: ", response);
        const data = response.data;
        setWeatherData(data);
        setTemperature(data.main.temp - 273.15);
        setPressure(data.main.pressure * 0.000987);
        setWindSpeed(data.wind.speed);
        setWd(data.wind.deg);
        setLongi(data.coord.lon);
        setLati(data.coord.lat);
        setWg(data.wind.gust);
        setCd(data.clouds.all);
        setHumidity(data.main.humidity);
        setVisibility(data.visibility / 1000);
        setWeather(data.weather[0].description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={parentStyle}>
      <div style={firstRowStyle}>
        <div style={childDivStyle}>
          <Map name="Route-1" />
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
      <div style={secondRowStyle}>
        <div style={childDivStyle}>
          <Map name="Route-2" />
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
    </div>
  );
}

function Map({ name }) {
  return (
    <div style={mapContainerStyle}>
      <div style={routeNameStyle}>{name}</div>
      <FlightTracker style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function Values({ temperature, windSpeed, weather, pressure, winddegree, longi, lati, humidity, visibility, windgust, cloudiness }) {
  return (
    <>
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
    </>
  );
}

function Value({ label, value }) {
  return (
    <div style={valueStyle}>
      <strong>{label}: </strong>{value}
    </div>
  );
}