import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { Button, makeStyles } from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const API_KEY = "c451f4480cmsh9c5d27d3c3dd6cfp17ab91jsn069a9fa8a2c6";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  searchInput: {
    borderBottom: "1px solid black" // add the bottom line
  }
}));

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: city },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [city]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div style={{ marginTop: "18px" }}></div>
      <TextField
        className={classes.searchInput}
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {weatherData && (
        <div className="container">
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <hr />
          <p>{weatherData.current.condition.text}</p>
          <p>
            <img
              src={`${weatherData.current.condition.icon}`}
              alt="Weather Icon"
            />
          </p>
          <hr />
          <p>
            Temperature: {weatherData.current.temp_c}°C /{" "}
            {weatherData.current.temp_f}°F
          </p>
          <hr />
          <p>Humidity: {weatherData.current.humidity}%</p>
          <hr />
          <p>Last Updated: {weatherData.current.last_updated}</p>
          <hr />
          {showMore && (
            <>
              <p>Local Time: {weatherData.location.localtime}</p>
              <hr />
              <p>
                Wind Speed: {weatherData.current.wind_mph}mph /{" "}
                {weatherData.current.wind_kph}kph
              </p>
              <hr />
              <p>Wind Degree: {weatherData.current.wind_degree}</p>
              <hr />
              <p>Wind Direction: {weatherData.current.wind_dir}</p>
              <hr />
              <p>Cloud: {weatherData.current.cloud}</p>
              <hr />
              <p>
                Feels Like: {weatherData.current.feelslike_c}°C /{" "}
                {weatherData.current.feelslike_f}°F
              </p>
            </>
          )}
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
            onClick={toggleShowMore}
            startIcon={showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {showMore ? "Read Less" : "Read More"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Weather;
