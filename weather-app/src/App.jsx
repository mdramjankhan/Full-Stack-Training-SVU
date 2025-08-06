import './App.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'

function App() {
  // const [input, setInput] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [weather, setWeather] = useState(null);
  // const [error, setError] = useState('');

  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading:false,
    data:{},
    error:""
  });

  // Edit: Please replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const API_KEY = '19043ab032e614fef02e1cfe9a0adce9';

  async function getData() {
    // Guard against empty input
    if (!input) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(input)}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError("City not found or network error!");
      setWeather(null);
      setLoading(false);
      console.error(error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getData();
    }
  }

  return (
    <div className='app'>
      <h1 className='app-name'>Weather-Now</h1>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Enter City Name"
          value={input}
          onChange={e => setInput(e.target.value)}
          className='city-search'
          onKeyDown={handleKeyDown}
        />
        {loading && (
          <div className='loading-spinner'>
            <br />
            <Oval
              height={80}
              width={80}
              radius={9}
              color="#4fa94d"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        {error && (
          <div className='error-message'>
            <p>{error}</p>
          </div>
        )}
        {weather && (
          <div className='weather-info'>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temp: {weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
            {/* Add other weather data here as needed */}
          </div>
        )}

        {
          weather.data?.main && ( // there will hit some error need to fix
            <div className='weather-info'>
              <div className='city-name'>
                  <h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
              </div>
              <div className='date'>
                <span>
                  {toDateFunction()}
                </span>
              </div>
              <div className='icon-temp'>
                <img src={'http://openweathermap.org/img/wn/' + weather.data.weather[0].icon + '@2x.png'} alt="" />
              <span>
                {
                  Math.round(weather.data.main.temp) + '°C'
                }
              </span>
              </div>

              <div className='des-wind'>
                <p>{weather.data.weather[0].description.toUpperCase()} | </p>
                <p>Wind Speed :{weather.data.wind.speed} m/s</p>

              </div>


            </div>
          )
        }
        <br />
        <button onClick={getData}>Get Weather</button>
      </div>
    </div>
  );
}

export default App;
