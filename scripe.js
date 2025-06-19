const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");

const API_KEY = `76bc2e0fabeb484080b43913251906`;

button.addEventListener("click", async () => {
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

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();
    console.log(data);

    const name = data.location.name;
    const country = data.location.country;
    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const description = data.current.condition.text;
    const icon = data.current.condition.icon;

    weatherResult.innerHTML = `
      <h2 class="text-xl font-bold">${name}, ${country}</h2>
      <img src="https:${icon}" alt="${description}" class="mx-auto" />
      <p class="text-lg">🌡️ Temperature: ${temp}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬️ Wind: ${wind} kph</p>
      <p class="capitalize">🌤️ ${description}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p class='text-red-600'>${error.message}</p>`;
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});
