const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");

const API_KEY = `76bc2e0fabeb484080b43913251906`;

input.addEventListener("input", () => {
  const city = input.value.trim();
  const url = new URL(window.location);
  if (city) {
    url.searchParams.set("city", city);
  } else {
    url.searchParams.delete("city");
  }
  window.history.replaceState(null, "", url.toString());
});

async function search() {
  const city = input.value.trim();
  if (!city) {
    weatherResult.innerHTML =
      "<p class='text-red-600'>Please enter a city name.</p>";
    return;
  }
  weatherResult.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    let icon = data.current.condition.icon;
    if (icon.startsWith("http:")) icon = icon.replace("http:", "https:");

    weatherResult.innerHTML = `
      <h2 class="text-xl font-bold">${data.location.name}, ${data.location.country}</h2>
      <img src="${icon}" alt="${data.current.condition.text}" class="mx-auto" />
      <p class="text-lg">🌡️ Temperature: ${data.current.temp_c}°C</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>🌬️ Wind: ${data.current.wind_kph} kph</p>
      <p class="capitalize">🌤️ ${data.current.condition.text}</p>
    `;
  } catch (err) {
    weatherResult.innerHTML = `<p class='text-red-600'>${err.message}</p>`;
  }
}

button.addEventListener("click", search);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city");
  if (city) {
    input.value = city;
    search();
  }
});
