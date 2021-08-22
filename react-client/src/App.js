import React, { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment';
import myLogo from './img/weather_forecast_symbol.png';
import Accordion from './Accordion';

const App = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cityWeatherData, setCityWeatherData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 4) {
      const response = await fetch(
        `http://localhost:3001/getWeatherInfo/city?city=${searchTerm}`,
        {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          })
        }
      );
      const postData = await response.json();
      setCityWeatherData(postData);
      setIsLoading(false);
      setIsSearch(true);
    } else {
      setIsLoading(false);
      setIsSearch(false);
    }
  };

  useEffect(() => {
    let lattitude = 51;
    let longitude = 0;
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        lattitude = geoPosition.coords.latitude;
        longitude = geoPosition.coords.longitude;
        fetchWeatherDetails(lattitude, longitude);
      },
      (geoError) => {
        fetchWeatherDetails(lattitude, longitude);
        // If user denied access to location then default Bengaluru GeoLocations (51,0)
      }
    );
    const fetchWeatherDetails = async (lattitude, longitude) => {
      const response = await fetch(
        `http://localhost:3001/getWeatherInfo/all?lat=${lattitude}&lon=${longitude}`,
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
  }, []);

  const showSearchResults = () => {
    if (isSearch) {
      return (
        <div>
          <table className="today-table-header">
            <thead>
              <td>City </td>
              <td>Country Code </td>
              <td>Current Date </td>
              <td>Current Time </td>
              <td>Current Status</td>
              <td>Temperature</td>
              <td>Pressure</td>
              <td>Humidity</td>
              <td>Cloudiness</td>
              <td>Sunrise</td>
              <td>Sunset</td>
            </thead>
            <tbody className="today-table-body">
              <tr>
                <td><div>{cityWeatherData?.name}</div></td>
                <td><div>{cityWeatherData?.sys?.country}</div></td>
                <td><div>{moment.unix(cityWeatherData?.dt).format("ll")}</div></td>
                <td><div>{moment.unix(cityWeatherData?.dt).format("h:mm a")}</div></td>
                <td><div>{cityWeatherData?.weather[0]?.description}</div></td>
                <td><div>{cityWeatherData?.main?.temp} Celcius</div></td>
                <td><div>{cityWeatherData?.main?.pressure} hPa</div></td>
                <td><div>{cityWeatherData?.main?.humidity}%</div></td>
                <td><div>{cityWeatherData?.clouds.all}%</div></td>
                <td><div>{moment.unix(cityWeatherData?.sys?.sunrise).format("hh:mm a")}</div></td>
                <td><div>{moment.unix(cityWeatherData?.sys?.sunset).format("hh:mm a")}</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }

  return (
    <div className="App">
      {isLoading && <p>Wait we're loading weather details for your location!</p>}
      <header className="App-header">
        <h3> React Node Weather App </h3>
        <img src={myLogo} className="app_logo" alt="logo" />
      </header>
      <div className="search">
        <input
          type="text"
          placeholder="Search by City Name"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {!isSearch && <div>
        <h4>Today's Weather at timezone: {weatherData?.timezone}</h4>
        <h5>at (lattitude,longitude) ({weatherData?.lat},{weatherData?.lon})</h5>
        <table className="today-table-header">
          <thead>
            <td>Current Date </td>
            <td>Current Time </td>
            <td>Current Status</td>
            <td>Temperature</td>
            <td>Pressure</td>
            <td>Humidity</td>
            <td>Cloudiness</td>
            <td>Sunrise</td>
            <td>Sunset</td>
          </thead>
          <tbody className="today-table-body">
            <tr>
              <td><div>{moment.unix(weatherData?.current?.dt).format("ll")}</div></td>
              <td><div>{moment.unix(weatherData?.current?.dt).format("h:mm a")}</div></td>
              <td><div>{weatherData?.current?.weather[0]?.description}</div></td>
              <td><div>{weatherData?.current?.temp} Celcius</div></td>
              <td><div>{weatherData?.current?.pressure} hPa</div></td>
              <td><div>{weatherData?.current?.humidity}%</div></td>
              <td><div>{weatherData?.current?.clouds}%</div></td>
              <td><div>{moment.unix(weatherData?.current?.sunrise).format("hh:mm a")}</div></td>
              <td><div>{moment.unix(weatherData?.current?.sunset).format("hh:mm a")}</div></td>
            </tr>
          </tbody>
        </table>
        <h4>Next 7 days</h4>
        {weatherData.daily && weatherData.daily.map((item, idx) => (
          <div key={idx}>
            <Accordion
              date={moment.unix(item?.dt).format("ll")}
              daily={item}
              weatherData={weatherData}
            />
          </div>
        ))}
      </div>
      }
      {isSearch && showSearchResults()}
    </div>
  );
}

export default App;
