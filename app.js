const form = document.querySelector('form');
const container = document.querySelector('.weather-container');
const card = document.querySelector('.card');
const weatherDetails = document.querySelector('.weather-details-container');
const icon = document.querySelector('.weather-info-icon img');
const forecast = new Forecast();
console.log(forecast)

const updateUI = (data) => {

    const cityDets = data.cityDetails;
    const weather = data.weather;

    function time(){
        let date = new Date();
        let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        let newDate = new Date(utc+(3600000*cityDets.TimeZone.GmtOffset))
        return newDate.toLocaleString();
    }
    
    const body = document.querySelector('body')
    const iconSrc = `Images/icons/${weather.WeatherIcon}.svg`;
    let viewport = window.matchMedia("(max-width: 1000px)")

    if (weather.IsDayTime){
        document.body.style.backgroundImage = "url('./Images/day.jpg')"
    } else {
        document.body.style.backgroundImage = "url('./Images/night.jpg')"
    }

    card.innerHTML = `
    <p class="weather-conditions">${weather.WeatherText}</p>
    <div class="date-time">
        <h1>${cityDets.EnglishName}</h1>
        <p class="time">${time()}</p>
    </div>
    <div class="weather-info">
        <span>${weather.Temperature.Metric.Value} &deg;</span>
    </div>
    <div class="weather-info-icon">
        <img class='image-icon' src="${iconSrc}" alt="Weather image">
    </div>`;
}

const updateForecastUI = (data) => {
    
    const forecastDetails = data.forecastDetails;

    weatherDetails.innerHTML = `
    <div class="weather-details">
        <i class="fa-solid fa-wind fa-2x"></i>
        <div class="weather-details-info">
            <div class="weather-details-label">Wind Speed</div>
            <div class="weather-details-data" id="wind">${forecastDetails.Wind.Speed.Value} km/h</div>
        </div>
    </div>
    <div class="weather-details">
        <i class="fa-solid fa-temperature-half fa-2x"></i>
        <div class="weather-details-info">
            <div class="weather-details-label">Feels Like</div>
            <div class="weather-details-data" id="feels">${forecastDetails.RealFeelTemperature.Value} &deg;</div>
        </div>
    </div>
    <div class="weather-details">
        <i class="fa-solid fa-droplet fa-2x"></i>
        <div class="weather-details-info">
            <div class="weather-details-label">Humidity</div>
            <div class="weather-details-data" id="humidity">${forecastDetails.RelativeHumidity}%</div>
        </div>
    </div>
    <div class="weather-details">
        <i class="fa-solid fa-cloud-showers-heavy fa-2x"></i>
        <div class="weather-details-info">
            <div class="weather-details-label">Chance of Rain</div>
            <div class="weather-details-data" id="rain">${forecastDetails.RainProbability / 100}%</div>
        </div>
    </div>`
}

const errorInfo = document.querySelector('.error-info')

form.addEventListener('submit', event => {
    event.preventDefault();

    const input = form.search.value.trim();
    form.reset();

    forecast.updateCity(input)
        .then(data => {
            updateUI(data);
            errorInfo.classList.remove('error')
        })
        .catch(error => {
            errorInfo.textContent = 'Please enter a valid city name';
            errorInfo.classList.toggle('error')
        })

    forecast.updateForecast(input)
        .then(data => updateForecastUI(data))
        .catch(error => console.log(error))

    forecast.updateDailyForecast(input)
        .then(data => updateDailyForecastUI(data))
        .catch(error => console.log(error))

    localStorage.setItem('city', input)
})

if (localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(error => console.log(error))

    forecast.updateForecast(localStorage.getItem('city'))
        .then(data => updateForecastUI(data))
        .catch(error => console.log(error))

    forecast.updateDailyForecast(localStorage.getItem('city'))
        .then(data => updateDailyForecastUI(data))
        .catch(error => console.log(error))
}