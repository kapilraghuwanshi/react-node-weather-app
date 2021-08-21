import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import myLogo from './img/weather_forecast_symbol.png';
import Accordion from './Accordion';
 
const App = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherDetails = async () => {
    const response = await fetch(
      //`http://localhost:3001/getWeatherInfo?lat=${geoLocation.lattitude}&lon=${geoLocation.longitude}`,
      `http://localhost:3001/getWeatherInfo?lat=20&lon=30`,
      {
        method: "GET",
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        })
      }
    );
      const postData = await response.json();
      setWeatherData(postData);
      setIsLoading(false);
    };
    fetchWeatherDetails();
  }, []);

  console.log(weatherData);
  
  return (
    <div className="App">
      <header className="App-header">
        <h3> React Node Weather App </h3>
        <img src={myLogo} className="app_logo" alt="logo" />
      </header>
      {isLoading && <p>Wait we're loading weather details for your location!</p>}
      <h4>Today's Weather at timezone: {weatherData.timezone}</h4>
      <table>
        <tr>
        <td><div>{moment(weatherData.current.dt).toDate()}</div></td>
          <td><div>{weatherData.current.weather[0].description}</div></td>
          <td><img src={weatherData.current.weather[0].icon} alt="icon"></img></td>
          <td><div>{weatherData.current.humidity}</div></td>
          <td><div>{weatherData.current.pressure}</div></td>
          <td><div>{weatherData.current.sunrise}</div></td>
          <td><div>{weatherData.current.sunset}</div></td>
        </tr>
      </table>
     
      {weatherData.daily && weatherData.daily.map((item, idx) => (
        <div key={idx}>
          <div>{item.weather[0].description}</div>
          {/* <Accordion title={title} content={content} /> */}
        </div>
      ))}
    </div>
  );
}

export default App;
