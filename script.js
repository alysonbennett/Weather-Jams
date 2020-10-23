let today = moment().format("dddd, MMMM D, YYYY");
let tomorrow = moment(new Date())
  .add(1, "days")
  .format("dddd");
let dayAfterTomorrow = moment(new Date())
  .add(2, "days")
  .format("dddd");
let twoDaysAfterTomorrow = moment(new Date())
  .add(3, "days")
  .format("dddd");

function handleSubmit(event) {
  event.preventDefault();
  let keyword = document.querySelector("#keyword");
  search(keyword.value);
}

function showCurrentWeather(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = "Temperature: " + `${Math.round(response.data.main.temp * 1.8) + 32}°F`;

  let place = document.querySelector("#place");
  place.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = "Condition: " + response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;

  let displayCurrentDate = document.querySelector("#currentDate");
  displayCurrentDate.innerHTML = `${today}`;

  let iconCurrentWeather = document.querySelector("#iconCurrentWeather");
  iconCurrentWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
  );

  const types = [
    "Clear",
    "Drizzle",
    "Rain",
    "Clouds",
    "Atmosphere",
    "Thunderstorm"
  ];
  types.forEach(type => {
    const musicType = `music${type}`;
    if (response.data.weather[0].main === type) {
      document.getElementById(musicType).style.display = "block";
    } else {
      document.getElementById(musicType).style.display = "none";
    }
  });
}

function showForecast(response) {
  console.log(response.data);
  let displayTomorrow = document.querySelector("#tomorrow");
  displayTomorrow.innerHTML = `${tomorrow}`;
  let iconTomorrowWeather = document.querySelector("#iconTomorrowWeather");
  iconTomorrowWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" +
      response.data.list[7].weather[0].icon +
      ".png"
  );
  let tomorrowTemperature = document.querySelector("#tomorrowTemperature");
  tomorrowTemperature.innerHTML = `${Math.round(
    response.data.list[7].main.temp
  )}°C`;

  let displayDayAfterTomorrow = document.querySelector("#dayAfterTomorrow");
  displayDayAfterTomorrow.innerHTML = `${dayAfterTomorrow}`;
  let iconDayAfterTomorrowWeather = document.querySelector(
    "#iconDayAfterTomorrowWeather"
  );
  iconDayAfterTomorrowWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" +
      response.data.list[15].weather[0].icon +
      ".png"
  );
  let dayAfterTomorrowTemperature = document.querySelector(
    "#dayAfterTomorrowTemperature"
  );
  dayAfterTomorrowTemperature.innerHTML = `${Math.round(
    response.data.list[15].main.temp
  )}°C`;

  let displayTwoDaysAfterTomorrow = document.querySelector(
    "#twoDaysAfterTomorrow"
  );
  displayTwoDaysAfterTomorrow.innerHTML = `${twoDaysAfterTomorrow}`;
  let iconTwoDaysAfterTomorrowWeather = document.querySelector(
    "#iconTwoDaysAfterTomorrowWeather"
  );
  iconTwoDaysAfterTomorrowWeather.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" +
      response.data.list[23].weather[0].icon +
      ".png"
  );
  let twoDaysAfterTomorrowTemperature = document.querySelector(
    "#twoDaysAfterTomorrowTemperature"
  );
  twoDaysAfterTomorrowTemperature.innerHTML = `${Math.round(
    response.data.list[23].main.temp
  )}°C`;
}

function search(city) {
  let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
  let urlCurrentCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlCurrentCity).then(showCurrentWeather);
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(showForecast);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function displayCurrentWeatherCurrentLocation() {
  function showWeatherCurrentLocation(response) {
    let place = document.querySelector("#place");
    place.innerHTML = response.data.name;

    let currentTemperature = document.querySelector("#currentTemperature");
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

    let weatherDescription = document.querySelector("#weatherDescription");
    weatherDescription.innerHTML = response.data.weather[0].description;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;

    let displayCurrentDate = document.querySelector("#currentDate");
    displayCurrentDate.innerHTML = `${today}`;
  }

  function newPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
    let urlCurrentGPS = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(urlCurrentGPS).then(showCurrentWeather);
    let urlForecastGPS = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(urlForecastGPS).then(showForecast);
  }
  navigator.geolocation.getCurrentPosition(newPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", displayCurrentWeatherCurrentLocation);

const reloadtButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload, false);
