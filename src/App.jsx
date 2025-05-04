import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "./assets/assets";
import { HashLoader } from "react-spinners";

const App = () => {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  // Get country and city
  useEffect(() => {
    axios
      .get("https://ipwho.is/")
      .then((response) => setLocation(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Get weather data
  useEffect(() => {
    if (!location.city) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=17b1a6efeae3fa20a41b81c4a5ef12e4&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [location]);

  // Get weather image based on weather condition
  const getWeatherImage = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return assets.clear;
      case "Clouds":
        return assets.clouds;
      case "Wind":
        return assets.wind;
      case "Rain":
        return assets.rain;
      case "Snow":
        return assets.snow;
      case "Drizzle":
        return assets.drizzle;
      default:
        return assets.clouds;
    }
  };

  return (
    <div className="weather-container m-auto mt-10 rounded-lg shadow-lg max-w-[95%] sm:max-w-[600px]">
      <h1 className="logo mt-5 text-center text-xl sm:text-2xl font-bold">
        <span>WEATHER</span> APP
      </h1>

      {loading ? (
        <HashLoader color="rgba(246,244,235, 1)" size={30} className="m-auto my-10"/>
      ) : (
        <div className="weather-details flex flex-col justify-center items-center capitalize p-2">
          <img
            src={getWeatherImage(weather.weather?.[0]?.main)}
            className="w-32 h-32 sm:w-40 sm:h-40"
          />
          <p className="text-[30px] sm:text-[35px]">{weather.main?.temp} °C</p>
          <p className="text-[30px] sm:text-[35px]">{location.city}</p>

          <div className="weather-box flex flex-col sm:flex-row justify-between items-center gap-5 p-4 w-full sm:w-[400px]">
            <div className="flex gap-3 items-center">
              <img src={assets.humidity} className="w-10 h-10" />
              <p className="text-lg sm:text-xl">
                <span>{weather.main?.humidity}%</span> <br />
                humidity
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <img src={assets.wind} className="w-10" />
              <p className="text-lg sm:text-xl">
                <span>{weather.wind?.speed} kM/h</span> <br />
                wind speed
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
