import { useEffect, useState } from "react";

const Weather = ({ latlng }) => {
  const [lat, lng] = latlng;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading && !weather) {
      (async () => {
        const res = await fetch(
          `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      })();
    }
  }, [weather, loading, lat, lng]);

  if (loading) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <p>Temperature: {weather.temp}&#8451;</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
        alt={"weather icon"}
      />
      <p>Wind: {weather.current.wind_speed} m/s</p>
    </div>
  );
};

export default Weather;
