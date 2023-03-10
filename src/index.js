let city = document.querySelector("#date-time");
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hour = date.getHours();
let minute = date.getMinutes();
console.log(date);
console.log(date.getDay());
console.log(date.getMinutes());
console.log(date.getHours());
city.innerHTML = `${day}, ${hour}:${minute}`;

//search engine and current weather
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  let cast = response.data.daily;
  let forecast = document.querySelector("#forecastWeather");
  let forecastHTML = `<div class="row">`;

  cast.forEach(function (castDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-3">
    <div class="weather-date">${formatDay(castDay.time)}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        castDay.condition.icon
      }.png"
      alt=""
      width="42"
    />
    <div class="numberTemperature">
      <span class="weather-temperature-max">${Math.round(
        castDay.temperature.maximum
      )}°</span>
      <span class="weather-temperature-min">${Math.round(
        castDay.temperature.minimum
      )}°</span>
    </div>
  </div>

`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "308ee4b586fftbc5ce47ob29fd3f7a87";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=308ee4b586fftbc5ce47ob29fd3f7a87&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  console.log(response.data.temperature.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.condition.description);
  console.log(response.data.condition.icon);
  windTemp = Math.round(response.data.wind.speed);

  let temperature = document.querySelector("#temperature-app");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let humidity = document.querySelector("#humidity-weather");
  humidity.innerHTML = `Humidity:${response.data.temperature.humidity}`;
  let wind = document.querySelector("#wind-weather");
  wind.innerHTML = `Wind:${windTemp}Km/h`;
  let description = document.querySelector("#description-weather");
  description.innerHTML = response.data.condition.description;
  let icon = document.querySelector("#icon-weather");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "308ee4b586fftbc5ce47ob29fd3f7a87";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=308ee4b586fftbc5ce47ob29fd3f7a87`;
  axios.get(apiUrl).then(displayWeather);
}

function townShip(event) {
  event.preventDefault();
  let weather = document.querySelector("#input-form");
  search(weather.value);
  let heading = document.querySelector("#cityTown");
  heading.innerHTML = `${weather.value}`;
}

let buttonSearch = document.querySelector("#form-weather");
buttonSearch.addEventListener("submit", townShip);
