var gifKey = "EpDzh9Dsr3OzGQ5SJOd1EIPs3Y36wth1"

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


// SETTING ICON AND BACKGROUND==========================//////////////////

function setIcon (condition) { 

  if (condition === "Clear") {
  // document.getElementById("intro").classList.add("hide");
  var sun = '<div class="icon sunny">' +
          '<div class="sun">' +
          '<div class="rays"></div>' +
           '</div>' +
           '</div>';

  $( "#iconCurrentWeather" ).empty().append(sun);
  console.log("condition=" + condition);
  $("body").removeClass().addClass("sunnybg")
}

  if (condition === "Clouds") {
  // document.getElementById("intro").classList.add("hide");
  var cloudy = '<div id="icon cloudy">' +
                '<div class="cloud"></div>'+
                '<div class="cloud"></div>'+
                '</div>';
  $("#iconCurrentWeather").empty().append(cloudy);
  console.log("condition=" + condition);
  $("body").removeClass().addClass("cloudybg")
}

  if (condition === "Snow") { 
  // document.getElementById("intro").classList.add("hide");
  var snow = '<div class="icon flurries">' +
            '<div class="cloud"></div>' +
            '<div class="snow">' +
            '<div class="flake"></div>' +
            '<div class="flake"></div>' +
            '</div>' +
            '</div>';

  $( "#iconCurrentWeather" ).empty().append(snow); 
  console.log("condition=" + condition);
  $("body").removeClass().addClass("snowybg")  
}
  if (condition === "Rain") {
  // document.getElementById("intro").classList.add("hide"); 
  var rain = '<div class="icon rainy">' +  
            '<div class="cloud"></div>' +  
            '<div class="rain"></div>' +
            '</div>';

  $( "#iconCurrentWeather" ).empty().append(rain); 
  console.log("condition=" + condition);
  $("body").removeClass().addClass("rainybg")
}
  if (condition === "Thunderstorm") { 
  var storm = '<div class="icon thunder-storm">' + 
             '<div class="cloud"></div>' +
             '<div class="lightning">' +
              '<div class="bolt"></div>' +
              '<div class="bolt"></div>' +
              '</div>' +
              '</div>';

  $( "#iconCurrentWeather" ).empty().append(storm);
  console.log("condition=" + condition);
  $("body").removeClass().addClass("stormybg")
}

  if (condition === "Drizzle") {
  var shower = '<div class="icon sun-shower">' +
             '<div class="cloud"></div>' +
              '<div class="sun">' +
              '<div class="rays"></div>' +
               '</div>' +
              '<div class="rain"></div>' +
              '</div>';

  $( "#iconCurrentWeather" ).empty().append(shower) 


}
  if (condition === "Mist") {
  var fog = '<div class="icon foggy">' +
           '<div class="cloud"></div>' +
           '<div class="fog"></div>' +
           '</div>';

  $( "#iconCurrentWeather" ).empty().append(fog);
  console.log("condition=" + condition); 
  $("body").removeClass().addClass("fogmist") 
}
  
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


  