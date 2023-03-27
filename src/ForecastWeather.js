import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { TextField, Button } from "@material-ui/core";

const ForecastPage = () => {
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherForecastData(city);
  };

  const fetchWeatherForecastData = async (cityName) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: cityName, days: "3" },
      headers: {
        "X-RapidAPI-Key": "c451f4480cmsh9c5d27d3c3dd6cfp17ab91jsn069a9fa8a2c6",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      setForecastData(response.data); // set the fetched data in the state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "18px" }}></div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Enter city name"
            variant="outlined"
            size="small"
            value={city}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
      </div>
      {forecastData && (
        <div className="container">
          <h2>
            {forecastData.location.name}, {forecastData.location.country}
          </h2>
          <hr />
          {forecastData.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <p>{day.day.condition.text}</p>
              <p>
                <img src={`${day.day.condition.icon}`} alt="Weather Icon" />
              </p>
              <p>
                Max Temperature: {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F
              </p>
              <p>
                Min Temperature: {day.day.mintemp_c}°C / {day.day.mintemp_f}°F
              </p>
              <p>
                Average Temperature: {day.day.avgtemp_c}°C / {day.day.avgtemp_f}
                °F
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
