// This is the background script for the extension

// Replace 'API_KEY' with your own OpenWeatherMap API key
const API_KEY = "c3a14b64fd3eb5f994230183700f79d1";

// Request the current weather and forecast data for the user's location
async function getWeather() {
  // Get the user's location
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
console.log(lat + "  " + lon);
  // Make a request to the OpenWeatherMap API
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
console.log(data);
    // Update the extension badge with the current temperature
    chrome.browserAction.setBadgeText({
      text: `${Math.round(data.main.temp)}°C`
    });

    // Update the extension popup with the current weather and forecast
    chrome.browserAction.setPopup({
      popup: 'popup.html'
    });

    document.getElementById("name").innerText = (data.name);
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("forecast").innerText = `Forecast: ${data.weather[0].main}`;
    document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

  } catch (error) {
    // Error :(
    console.error(error);
  }
}
// Update the weather data every 10 minutes
setInterval(getWeather, 1000 * 60 * 10);

// Get the weather data when the extension is first installed
getWeather();