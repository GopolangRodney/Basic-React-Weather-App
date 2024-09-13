import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9c83fa2fd097efcdb73c16e518e5ef0d`

  const searchLocation = (event) => {
    const cityRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces

    // If the user presses 'Enter', start the validation and API request
    if (event.key === 'Enter') {
      // Check if the location is valid
      if (!location || !cityRegex.test(location)) {
        alert('Please enter a valid city name.');
      } else {
        axios.get(url).then((response) => {
          setData(response.data);
          console.log(response.data);
        }).catch((error) => {
          // Optional: handle invalid city response from the API
          alert('City not found. Please enter a valid city name.');
        });
        setLocation('');
      }
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Weather App</h1>
        <p>Find out the current weather in any city.</p>
      </div>
      
      <div className="search">
        <input className='searchbar'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
