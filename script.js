

let today = moment().format("dddd, MMMM D, YYYY");

function handleSubmit(event) {
  event.preventDefault();
  let keyword = document.querySelector("#keyword");
  search(keyword.value);
}

function showCurrentWeather(response) {
  console.log(response)
  var condition = response.data.weather[0].main;
  // setIcon(condition);
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

  setIcon(condition);

  const types = [
    "Clear",
    "Drizzle",
    "Rain",
    "Clouds",
    "Atmosphere",
    "Thunderstorm",
    "Snow"
  ];
  types.forEach(type => {
    const musicType = `music${type}`;
    if (response.data.weather[0].main === type) {
      document.getElementById(musicType).style.display = "block";
    } else {
      document.getElementById(musicType).style.display = "none";
    }
  });
};

// function experiment () {
//   $('#experiment').append(<div class=".cloud"></div>);

// }

function setIcon (condition) {

  // console.log("response" + response)
  // let icon = document.getElementById("iconCurrentWeather")

  if (condition === "Clear") {
  document.getElementById("icon sunny").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");
  

  }

  if (condition === "Clouds") {
  document.getElementById("icon cloudy").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");
  // document.getElementById("body").style.backgroundImage = "url('https://64.media.tumblr.com/4044331bcf8e7582ac293e9ddbe29364/tumblr_prel752kFM1unfdido1_400.gifv')";
  console.log("condition=" + condition)
}
  if (condition === "Snow") { 
  document.getElementById("icon flurries").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");

}
  if (condition === "Rain") {
  document.getElementById("intro").classList.add("hide");  
  document.getElementById("icon rainy").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");

}
  if (condition === "Thunderstorm") {
  document.getElementById("icon thunder-storm").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");

}
  if (condition === "Drizzle") {
  document.getElementById("icon sun-shower").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");

}
  // if (condition === "Atmosphere") {
  // document.querySelector("icon foggy").classList.remove("hide");}

};

function search(city) {
  let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
  let urlCurrentCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlCurrentCity).then(showCurrentWeather);
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
  }
  navigator.geolocation.getCurrentPosition(newPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", displayCurrentWeatherCurrentLocation);



const reloadButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload, false);

var div = document.createElement('div')
function experiment () {
  document.getElementById('experiment').appendChild(div);
  div.className = 'cloud'; };
