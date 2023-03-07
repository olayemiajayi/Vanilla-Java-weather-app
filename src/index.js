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

let apiKey = "8944afa6845bd7c413a687258d3211ef";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=8944afa6845bd7c413a687258d3211ef";
