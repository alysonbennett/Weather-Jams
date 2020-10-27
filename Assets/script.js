//FUNCTION FOR CALLING AND GENERATING QUOTES/////
$("#sub").click(function() {
  $("#intro").hide();
  $("#quote").empty();
  fetch("https://type.fit/api/quotes")
  .then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data);
  console.log(data[ Math.floor(Math.random() * data.length) ]);
  
  var obj = data[ Math.floor(Math.random() * data.length) ];
  console.log(obj.text, obj.author)
  //QUOTES BUILT DYNAMICALLY===============================
  var quoteDiv = document.createElement("div")
  quoteDiv.innerHTML = obj.text;
  $("#quote").append(quoteDiv);
  var authorDiv = document.createElement("div2")
  authorDiv.innerHTML = obj.author;
  $("#quote").append(authorDiv);
});
});

let today = moment().format("dddd, MMMM D, YYYY");

function handleSubmit(event) {
  event.preventDefault();
  let keyword = document.querySelector("#keyword");
  search(keyword.value);
}

//======THIS PULLS WEATHER CONDITIONS AS WELL AS SETS BACKGROUND BASED ON CONDITIONS
//GIPHY IS FED 'Q' BY OPENWEATHERMAP THROUGH VAR CONDITION
function showCurrentWeather(response) {
  console.log(response)
  var condition = response.data.weather[0].main;
  
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = "Temperature: " + `${Math.round(response.data.main.temp * 1.8) + 32}°F`;

  let place = document.querySelector("#place");
  place.innerHTML = response.data.name;

  var details = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = "Condition: " + response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;

  let displayCurrentDate = document.querySelector("#currentDate");
  displayCurrentDate.innerHTML = `${today}`;

  setIcon(condition);
  setBackground(details)

  //GIPHY API CALL
  function setBackground() {

    
    var api = 'https://api.giphy.com/v1/gifs/search?q=weather+nature+';
    var limit = '&limit=24';
    var userInput = condition
    var key = '&api_key=EpDzh9Dsr3OzGQ5SJOd1EIPs3Y36wth1';
    var queryURL = api + userInput + key + limit /*+ rating */;
    console.log(queryURL)

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({url: queryURL, method: 'GET'}).done(function(response){

// This is the API response data. It's a JSON object of 24 gifs

var dada = (response.data)
console.log(dada)
var weatherBg = (dada[ Math.floor(Math.random() * dada.length) ]);
var switchBG = (weatherBg.images.original.url);
$("body").css("background-image", `url(${switchBG})`);


});}

}

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


  