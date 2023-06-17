import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeeklyWeather = () => {
  const [temp, setTemp] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState('Incheon');

  useEffect(() => {
    const apiKey = '8507099a51be8da18d7fbb936ef08991';
    const cityName = 'Seoul';
    console.log(process.env.REACT_APP_WEATHER_KEY);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(url)
      .then((responseData) => {
        console.log(responseData);
        const data = responseData.data;
        setTemp(data.main.temp);
        setTempMax(data.main.temp_max);
        setTempMin(data.main.temp_min);
        setHumidity(data.main.humidity);
        setDesc(data.weather[0].description);
        setIcon(data.weather[0].icon);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [cityName]);

  const handleCityChange = (event) => {
    setCityName(event.target.value);
    setLoading(true);
  };

  const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;
  // const imgSrc = `https://openweathermap.com/img/w/${this.state.icon}.png`;
  return (
    <div>
      <h2>일주일 날씨</h2>
      <select onChange={handleCityChange} value={cityName}>
        <option value="Seoul">Seoul</option>
        <option value="Incheon">Incheon</option>
        {/* 다른 도시 옵션들 추가 */}
      </select>

      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <h3>{cityName}</h3>
          <p>Temperature: {temp}</p>
          <p>Max Temperature: {(tempMax- 273.15).toFixed(0)}°</p>
          <p>Min Temperature: {(tempMin- 273.15).toFixed(0)}°</p>
          <p>Humidity: {humidity}</p>
          <p>Description: {desc}</p>
          <img src={imgSrc} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default WeeklyWeather;