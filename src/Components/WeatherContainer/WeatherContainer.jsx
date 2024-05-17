import React, { useEffect, useState } from 'react';

const WeatherReport = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('Agartala'); // Default query
  const [search, setSearch] = useState('');

  const fetchWeather = async (location) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '80788fe660msh2a2d0abcc31a601p196e5bjsnff5e45309623',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setWeather(result);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city or country"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="weather-container">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        {weather && (
          <>
            <div className="header">
              <div className="location">{weather.location.name}</div>
              <div className="date">{new Date().toLocaleDateString()}</div>
            </div>
            <div className="forecast">
              <div className="title">Weather FORECAST</div>
              <div className="weather-icon">
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
              </div>
              <div className="temperature">
                <div className="description">{weather.current.condition.text}</div>
                <div className="temp">{weather.current.temp_c}°C</div>
              </div>
              <div className="hourly-forecast">
                <div className="hour">
                  <div className="icon small sun-behind-cloud"></div>
                  <div className="time">Now</div>
                </div>
                {/* Additional hourly forecasts can be added here */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherReport;
