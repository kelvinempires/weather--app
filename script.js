document.getElementById("search-btn").addEventListener("click", fetchWeather);

function fetchWeather() {
  const city = document.getElementById("city-input").value;
  const apiKey = "dd8f7fe30a9074a90644bb2edc49a308";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Clear previous weather result
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = "Loading..."; // Show loading text

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data.main) {
        weatherResult.innerHTML = `
          <div class="weather-info">
            <h3>${data.name}</h3>
            <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>${data.weather[0].description}</p>
          </div>
        `;
      } else {
        weatherResult.innerHTML = `<p>Weather data not found. Please try again.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherResult.innerHTML = `<p>${error.message}</p>`;
    });
}
