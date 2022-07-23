const form = document.querySelector('form');
const container = document.querySelector('.weather-container');
const card = document.querySelector('.card')

const updateUI = (data) => {

    const cityDets = data.cityDetails;
    const weather = data.weather;

    card.innerHTML = `
    <h1>${cityDets.EnglishName}</h1>
    <p class="weather-conditions">${weather.WeatherText}</p>
    <div class="weather-info">
        <span>${weather.Temperature.Metric.Value} &deg;</span>
    </div>
    <div class="weather-info-icon">
        <img src="" alt="">
    </div>`;
}

const updateCity = async(city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    console.log(cityDetails)
    console.log(weather)

    return {
        cityDetails, 
        weather
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const input = form.search.value.trim();
    form.reset();

    updateCity(input)
        .then(data => updateUI(data))
        .catch(error => console.log(error))
})