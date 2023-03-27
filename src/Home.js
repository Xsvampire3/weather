import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLoading(false);
          setError(
            "Unable to retrieve your location. Please allow location access and refresh the page."
          );
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${latitude},${longitude}` },
      headers: {
        "X-RapidAPI-Key": "c451f4480cmsh9c5d27d3c3dd6cfp17ab91jsn069a9fa8a2c6",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      {loading && <CircularProgress size={80} />}
      {error && (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      )}
      {weatherData && (
        <>
          <Grid item xs={12}>
            <Typography variant="h4">
              {weatherData.location.name}, {weatherData.location.region},{" "}
              {weatherData.location.country}
            </Typography>
            <Typography variant="subtitle1">
              {weatherData.location.localtime}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              src={weatherData.current.condition.icon}
              alt={weatherData.current.condition.text}
            />
            <Typography variant="h4">
              {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F
            </Typography>
            <Typography variant="subtitle1">
              {weatherData.current.condition.text}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
