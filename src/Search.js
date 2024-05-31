import "./Weather.css";
import React, { useState } from "react";

const Search = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "b44e9c1818c83762ec52820db571b7f1";
  // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("Response status:", response.status); // Log the response status
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData); // Log the error data
        throw new Error(errorData.message || "City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="weather">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <p>{error}</p>}

      {weather && (
        <div className="weather2">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind speed: {weather.wind.speed} m/s</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
