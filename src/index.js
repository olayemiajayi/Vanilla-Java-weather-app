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
function displayForecast() {
  let forecast = document.querySelector("#forecastWeather");
  let forecastHTML = `<div class="row">`;
  let days = ["Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-3">
    <div class="weather-date">${day}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png"
      alt=""
      width="42"
    />
    <div class="numberTemperature">
      <span class="weather-temperature-max"> 18°</span>
      <span class="weather-temperature-min"> 12°</span>
    </div>
  </div>

`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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

displayForecast();
