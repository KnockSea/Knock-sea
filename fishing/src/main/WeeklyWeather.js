import React, { useState, useEffect } from "react";
import axios from "axios";
import "./scss/WeeklyWeather.scss";
import icon01d from "./icons/01d.png";
import icon01n from "./icons/01n.png";
import icon02d from "./icons/02d.png";
import icon02n from "./icons/02n.png";
import icon03d from "./icons/03d.png";
import icon03n from "./icons/03n.png";
import icon04d from "./icons/04d.png";
import icon04n from "./icons/04n.png";
import icon09d from "./icons/09d.png";
import icon09n from "./icons/09n.png";
import icon10d from "./icons/10d.png";
import icon10n from "./icons/10n.png";
import icon11d from "./icons/11d.png";
import icon11n from "./icons/11n.png";
import icon13d from "./icons/13d.png";
import icon13n from "./icons/13n.png";
import icon50d from "./icons/50d.png";
import icon50n from "./icons/50n.png";
import iconUnknown from "./icons/unknown.png";

const WeeklyWeather = () => {
  const [temp, setTemp] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("Seoul");
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  // 이미지 경로 불러오기 함수
  function importAll(r) {
    let images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
  }

  const icons = {
    "01d": icon01d,
    "01n": icon01n,
    "02d": icon02d,
    "02n": icon02n,
    "03d": icon03d,
    "03n": icon03n,
    "04d": icon04d,
    "04n": icon04n,
    "09d": icon09d,
    "09n": icon09n,
    "10d": icon10d,
    "10n": icon10n,
    "11d": icon11d,
    "11n": icon11n,
    "13d": icon13d,
    "13n": icon13n,
    "50d": icon50d,
    "50n": icon50n,
    "unknown": iconUnknown
  };



  useEffect(() => {
    const apiKey = "8507099a51be8da18d7fbb936ef08991";
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

    const weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    axios
      .get(weeklyUrl)
      .then((responseData) => {
        const data = responseData.data;
        const dailyData = data.list.filter((item, index) => index % 8 === 0);
        const formattedData = dailyData.map((item) => {
          const date = new Date(item.dt * 1000);
          const options = { weekday: "short", month: "short", day: "numeric" };
          const formattedDate = date.toLocaleDateString("ko-KR", options);
          const { temp_max: tempMax, temp_min: tempMin } = item.main;
          const { icon } = item.weather[0];
          return {
            date: formattedDate,
            day: date.toLocaleDateString("ko-KR", { weekday: "long" }),
            tempMax,
            tempMin,
            icon,
          };
        });
        setWeeklyWeather(formattedData);
      })
      .catch((error) => console.log(error));
  }, [cityName]);

  const handleCityChange = (event) => {
    setCityName(event.target.value);
    setLoading(true);
  };

  const matchedIcon = icons[icon];
  const imageSrc = matchedIcon || null;

  
  return (
    <div className="weather">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="apiinfo">
          <div className="wttopitem">
            <div className="imgbox111">
              {/* <img src={`https://openweathermap.org/img/w/${icon}.png`} alt={desc} /> */}
              {imageSrc && <img src={imageSrc} alt="" />}
            </div>
            <div className="wtinfo">
              <select onChange={handleCityChange} value={cityName}>
                <option value="Seoul">서울</option>
                <option value="Incheon">인천</option>
                <option value="Busan">부산</option>
                <option value="Daegu">대구</option>
                <option value="Daejeon">대전</option>
                <option value="Gwangju">광주</option>
                <option value="Ulsan">울산</option>
                <option value="Suwon">수원</option>
                <option value="Goyang">고양</option>
                <option value="Yongin">용인</option>
                <option value="Changwon">창원</option>
                <option value="Seongnam">성남</option>
                <option value="Cheongju">청주</option>
                <option value="Cheonan">천안</option>
                <option value="Namyangju">남양주</option>
                <option value="Hwaseong">화성</option>
                <option value="Bucheon">부천</option>
                <option value="Jeonju">전주</option>
                <option value="Ansan">안산</option>
                <option value="Anyang">안양</option>
              </select>
              <div className="w-content-wrap">
                <div>현재온도: {(temp - 273.15).toFixed(0)}°</div>
                <div>최대온도: {(tempMax - 273.15).toFixed(0)}°</div>
                <div>최저온도: {(tempMin - 273.15).toFixed(0)}°</div>
                <div>습도: {humidity} %</div>
              </div>
            </div>
          </div>

          <div className="weekly-weather">
            <div className="weather-list">
              {weeklyWeather.slice(1).map((weather, index) => (
                <div className="weather-item" key={index}>
                   <img src={icons[weather.icon]} alt="" />
                  <div>
                    <p>{weather.date}</p>
                    <p>{weather.day}</p>
                    <p>
                      {(weather.tempMax - 273.15).toFixed(0)}° &nbsp;&nbsp;
                      {(weather.tempMin - 273.15).toFixed(0)}°
                    </p>
                  </div>
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
