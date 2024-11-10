const contactBtn = document.querySelector("#contactBtn");
const homeBtn = document.querySelector("#homeBtn");
contactBtn.addEventListener("click", () => {
  homeBtn.classList.remove("active");
  contactBtn.classList.add("active");
  setTimeout(() => {
    window.location.href = "./contact.html";
  }, 100);
});
homeBtn.addEventListener("click", () => {
  contactBtn.classList.remove("active");
  homeBtn.classList.add("active");
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 100);
});

let currentDay,
  currentDate,
  tomorrowDay,
  tomorrowDate,
  afterTomorrowDay,
  afterTomorrowDate;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date();
document.querySelector("#currentDay").innerHTML = `${days[today.getDay()]}`;
document.querySelector("#currentDate").innerHTML = `${today.getDate()} ${
  months[today.getMonth()]
}`;
document.querySelector("#tomorrowDay").innerHTML = `${
  days[today.getDay() + 1]
}`;
document.querySelector("#afterTomorrowDay").innerHTML = `${
  days[today.getDay() + 2]
}`;

const locationInput = document.querySelector("#locationInput");
const userLocation = document.querySelector(".location");
const currentDeg = document.querySelector(".current-deg");
const todayStatus = document.querySelector(".todayStatus");
const dayForecast = document.querySelector(".dayForecast");
const tomorrowStatus = document.querySelector(".tomorrowStatus");
const tomorrowInfo = document.querySelector(".tomorrowInfo");
const afterTomorrowStatus = document.querySelector(".afterTomorrowStatus");
const afterTomorrowInfo = document.querySelector(".afterTomorrowInfo");

const apiKey = "602fdacff35c41ee96a213638242209";
let searchLocation = "Cairo";
let apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=3`;
// console.log(searchLocation, apiUrl);
let todayData, tomorrowData, dayAfterTomorrowData;
function updateCards(
  searchLocation,
  todayData,
  tomorrowData,
  dayAfterTomorrowData
) {
  userLocation.innerHTML = searchLocation;
  currentDeg.innerHTML = `<h2>${todayData.day.avgtemp_c} <sup>o</sup> C</h2>`;
  todayStatus.innerHTML = `<img src="${todayData.day.condition.icon}" alt="status"/>
    <p class="status text-capitalize">${todayData.day.condition.text}</p>`;
  dayForecast.innerHTML = `<div class="d-flex me-3">
                  <img
                    src="./imgs/icon-umberella@2x.png"
                    class="forecast-icon me-2"
                    alt=""
                  />
                  <p>${todayData.day.totalprecip_mm} %</p>
                </div>
                <div class="d-flex me-3">
                  <img
                    src="./imgs/icon-wind@2x.png"
                    class="forecast-icon me-2"
                    alt=""
                  />
                  <p>${todayData.day.maxwind_kph} km/h</p>
                </div>
                <div class="d-flex me-3">
                  <img
                    src="./imgs/icon-compass@2x.png"
                    class="forecast-icon me-2"
                    alt=""
                  />
                  <p>${todayData.hour[0].wind_dir}</p>
                </div>`;

  tomorrowStatus.innerHTML = `<img src="${tomorrowData.day.condition.icon}" alt="status"/>`;
  tomorrowInfo.innerHTML = `<div class="max-deg mt-3">
                  <h3 class="text-white">${tomorrowData.day.maxtemp_c} <sup>o</sup>C</h3>
                </div>
                <div class="min-deg">
                  <p>${tomorrowData.day.mintemp_c} <sup>o</sup></p>
                </div>
                <div class="status text-capitalize mt-3">${tomorrowData.day.condition.text}</div>`;
  afterTomorrowStatus.innerHTML = `<img src="${dayAfterTomorrowData.day.condition.icon}" alt="status"/>`;
  afterTomorrowInfo.innerHTML = `<div class="max-deg mt-3">
                              <h3 class="text-white">${dayAfterTomorrowData.day.maxtemp_c} <sup>o</sup>C</h3>
                            </div>
                            <div class="min-deg">
                              <p>${dayAfterTomorrowData.day.mintemp_c} <sup>o</sup></p>
                            </div>
                            <div class="status text-capitalize mt-3">${dayAfterTomorrowData.day.condition.text}</div>`;
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    let forecast = data.forecast.forecastday;
    todayData = forecast[0];
    tomorrowData = forecast[1];
    dayAfterTomorrowData = forecast[2];
    updateCards(searchLocation, todayData, tomorrowData, dayAfterTomorrowData);
  });

locationInput.addEventListener("input", () => {
  if (locationInput.value) {
    searchLocation =
      locationInput.value.charAt(0).toUpperCase() +
      locationInput.value.slice(1);
  }
  apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchLocation}&days=3`;
  //   console.log(searchLocation, apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let forecast = data.forecast.forecastday;
      todayData = forecast[0];
      tomorrowData = forecast[1];
      dayAfterTomorrowData = forecast[2];
      updateCards(
        data.location.name,
        todayData,
        tomorrowData,
        dayAfterTomorrowData
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
