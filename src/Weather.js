import "./Weather.css";
import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "b44e9c1818c83762ec52820db571b7f1";
  // Replace with your OpenWeatherMap API key

  useEffect(() => {
    // Fetch country list
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);
  // Inside the useEffect for fetching cities
  useEffect(() => {
    if (country) {
      fetchCities(country);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const fetchCities = async (countryName) => {
    try {
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?q=${countryName}&maxRows=10&username=demo`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      const cityNames = data.list.map((city) => city.name);
      setCities(cityNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

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
      <select onChange={(e) => setCountry(e.target.value)} value={country}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>

      {country && (
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="">Select City</option>
          {cities.map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      )}

      <button onClick={fetchWeather} disabled={loading || !city || !country}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
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

export default Weather;
