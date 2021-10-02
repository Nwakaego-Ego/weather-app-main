function currentTime(timestamp) {
  let date = new Date(timestamp);
  let weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let week = weeks[date.getDay()];
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds;
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${week} ${hour} : ${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  let days = day[date.getDay()];

  return days;
}

function weatherForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2">
                ${formatDay(forecastDay.dt)}
                <img class="weather-forecast-image" src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="">
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span> 
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                </div>
                </div> 
                `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getCurrentWeather(coordinates) {
  console.log(coordinates);
  let apiKey = "49d8a1330406cb9ac92bd472b6ff3770";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weatherForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#time").innerHTML = currentTime(
    response.data.dt * 1000
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  // iconElement.classList.remove("fas");
  // iconElement.classList.add(`https://openweathermap.org/img/wn/10d@2x.png`);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusElement = Math.round(response.data.main.temp);

  getCurrentWeather(response.data.coord);
}

function search(city) {
  let apiKey = "49d8a1330406cb9ac92bd472b6ff3770";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayTemperature);
}

function searchForm(event) {
  event.preventDefault();
  let elementCity = document.querySelector("#city-input");
  search(elementCity.value);

  //   elementCity.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);

function displayFahrenheit(event) {
  event.preventDefault();

  let fahrenheiTemperatureElement = document.querySelector("#temperature");

  displayCelsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");

  let fahrenheiTemperature = (celsiusElement * 9) / 5 + 32;
  fahrenheiTemperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let celsiusElement = null;

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temperature");

  fahrenheitElement.classList.remove("active");
  displayCelsiusElement.classList.add("active");

  celsiusTemperature.innerHTML = Math.round(celsiusElement);
}

let displayCelsiusElement = document.querySelector("#celsius");
displayCelsiusElement.addEventListener("click", displayCelsius);

search("Nigeria");

// ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// forecastElement.forEach(function (forecast) {
//     elementWeatherForecast.innerHTML = `
//           <div class="row">
//             <div class="col-2">
//                 wed
//                <img class="weather-forecast-image" src="https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png" alt="">
//               <div class="weather-forecast-temperature">
//                 <span class="weather-forecast-temperature-max">18</span>
//                 <span class="weather-forecast-temperature-min">12</span>
//               </div>
//            </div>
//          </div>`;
//   });

// currentWeatherForeCast = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
