import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const API_KEY = "0c06be41077041e9ba7f4dfd01e38c82"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}`;

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const fetchWeatherData = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLocation(`${response.data.name}, ${response.data.sys.country}`);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  };

  useEffect(() => {
    if (searchInput) {
      fetchWeatherData();
    }
  }, [apiUrl]);

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Weather App</h1>
        </div>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <div className="top">
          <div className="location">
            <p>{location}</p>
          </div>
          {weatherData && (
            <>
              <div className="temperature">
                <h2>{`${Math.round(weatherData.main.temp - 273.15)}°C`}</h2>
              </div>
              <div className="description">
                <p>{weatherData.weather[0].main}</p>
              </div>
            </>
          )}
        </div>
        {weatherData && (
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              <p className="bold">{`${Math.round(
                weatherData.main.feels_like - 273.15
              )}°C`}</p>
            </div>
            <div className="humidity">
              <p>Humidity</p>
              <p className="bold">{`${weatherData.main.humidity}%`}</p>
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              <p className="bold">{`${weatherData.wind.speed} m/s`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
