import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './scss/WeeklyWeather.scss';

const WeeklyWeather = () => {
  const [temp, setTemp] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState('Incheon');
  const [weeklyWeather, setWeeklyWeather] = useState([
    // 가상의 주간 날씨 데이터
    { icon: '01d', tempMax: 302, tempMin: 293 },
    { icon: '02d', tempMax: 298, tempMin: 291 },
    { icon: '03d', tempMax: 297, tempMin: 289 },
  ]);

  useEffect(() => {
    const apiKey = '8507099a51be8da18d7fbb936ef08991';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(url)
      .then((responseData) => {
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

  const imgSrc = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <div className='weather'>
      <select onChange={handleCityChange} value={cityName}>
        <option value='Seoul'>서울</option>
        <option value='Incheon'>인천</option>
        {/* 다른 도시 옵션들 추가 */}
      </select>

      {loading ? (
        <p>Loading</p>
      ) : (
        <div className='apiinfo'>
          {/* <h3>{cityName}</h3> */}
          {/* <div>Description: {desc}</div> */}
          <div className='imgbox111'><img src={imgSrc} alt={desc} /></div> 
          <div>현재온도: {(temp - 273.15).toFixed(0)}°</div>
          <div>최대온도: {(tempMax - 273.15).toFixed(0)}°</div>
          <div>최저온도: {(tempMin - 273.15).toFixed(0)}°</div>
          <div>습도: {humidity} %</div>

          <div className='weekly-weather'>
            <div className='weather-list'>
              {weeklyWeather.map((weather, index) => (
                <div className='weather-item' key={index}>
                  <img src={`https://openweathermap.org/img/w/${weather.icon}.png`} alt='' />

                  <div>{(weather.tempMax - 273.15).toFixed(0)}° {(weather.tempMin - 273.15).toFixed(0)}°</div>
                  {/* <p>{(weather.tempMin - 273.15).toFixed(0)}°</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyWeather;
