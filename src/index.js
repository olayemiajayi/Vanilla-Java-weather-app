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
function displayWeather(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.weather[0].description);
  console.log(response.data.weather[0].icon);
  windTemp = Math.round(response.data.wind.speed);

  let temperature = document.querySelector("#temperature-app");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity-weather");
  humidity.innerHTML = `Humidity:${response.data.main.humidity}`;
  let wind = document.querySelector("#wind-weather");
  wind.innerHTML = `Wind: ${windTemp}Km/h`;
  let description = document.querySelector("#description-weather");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon-weather");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(city) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8944afa6845bd7c413a687258d3211ef&units=metric`;
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
