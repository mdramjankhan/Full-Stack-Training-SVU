import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const search = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });

      const url = `https://api.openweathermap.org/data/2.5/weather`;
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      try {
        const result = await axios.get(url, {
          params: {
            q: input,
            units: "metric",
            appid: API_KEY,
          },
        });
        console.log(result.data);
        setWeather({ data: result.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, loading: false, error: true });
        console.error("Error fetching data", error);
      }
    }
  };

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${weekDays[
      currentDate.getDay()
    ].toUpperCase()}      ${currentDate.getDate()}/ ${currentDate.getMonth()}`;
    return date;
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter City"
          className="city-search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={search}
        />
      </div>

      {weather.loading && (
        <div className="loading-spinner">
          <br />
          <Oval
            height={100}
            width={100}
            color="#000"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
          />
        </div>
      )}
      {weather.error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faFrown} size="2x" />
          <span style={{ fontSize: "20px" }}> City Not found .. </span>
        </div>
      )}
      {weather.data?.main && (
        <div className="weather-info">
          <div className="city-name">
            <h2>
              {weather.data?.name}
              <span> {weather.data?.sys?.country} </span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>

          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />

            <span>
              {Math.round(weather.data.main.temp)}
              <sup className="deg">°C</sup>
            </span>
          </div>

          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed : {weather.data.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
