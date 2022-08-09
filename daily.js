const dailyForecast = document.querySelector('.daily-forecast-container');

const updateDailyForecast = async(city) => {

    const cityDetails = await getCity(city);
    const dailyDetails = await getDailyForecast(cityDetails.Key)

    return {
        dailyDetails
    }
}

const updateDailyForecastUI = (data) => {

    const dailyDets = data.dailyDetails.DailyForecasts;

    const day1 = dailyDets[0];
    const day1Day = checkDailyForecast(day1.EpochDate);
    
    const day2 = dailyDets[1];
    const day2Day = checkDailyForecast(day2.EpochDate);

    const day3 = dailyDets[2];
    const day3Day = checkDailyForecast(day3.EpochDate);
    
    const day4 = dailyDets[3];
    const day4Day = checkDailyForecast(day4.EpochDate);

    const day5 = dailyDets[4];
    const day5Day = checkDailyForecast(day5.EpochDate);


    dailyForecast.innerHTML = `
    <div class="daily-forecast" id="current-day">
        <div class="daily-forecast-day">${day1Day}</div>
        <div class="daily-forecast-temperature">
            <div class="daily-forecast-temperature-max">${Math.round(day1.Temperature.Maximum.Value)} &deg;</div>
            <div class="daily-forecast-temperature-min">${Math.round(day1.Temperature.Minimum.Value)} &deg;</div>
        </div>
        <div class="daily-forecast-image">
            <img src="Images/icons/${day1.Day.Icon}.svg" alt="weather image">
        </div>
    </div>
    <div class="daily-forecast" id="current-day-plus-1">
        <div class="daily-forecast-day">${day2Day}</div>
        <div class="daily-forecast-temperature">
            <div class="daily-forecast-temperature-max">${Math.round(day2.Temperature.Maximum.Value)} &deg;</div>
            <div class="daily-forecast-temperature-min">${Math.round(day2.Temperature.Minimum.Value)} &deg;</div>
        </div>
        <div class="daily-forecast-image">
            <img src="Images/icons/${day2.Day.Icon}.svg" alt="weather image">
        </div>
    </div>
    <div class="daily-forecast" id="current-day-plus-2">
        <div class="daily-forecast-day">${day3Day}</div>
        <div class="daily-forecast-temperature">
            <div class="daily-forecast-temperature-max">${Math.round(day3.Temperature.Maximum.Value)} &deg;</div>
            <div class="daily-forecast-temperature-min">${Math.round(day3.Temperature.Minimum.Value)} &deg;</div>
        </div>
        <div class="daily-forecast-image">
            <img src="Images/icons/${day3.Day.Icon}.svg" alt="weather image">
        </div>
    </div>
    <div class="daily-forecast" id="current-day-plus-3">
        <div class="daily-forecast-day">${day4Day}</div>
        <div class="daily-forecast-temperature">
            <div class="daily-forecast-temperature-max">${Math.round(day4.Temperature.Maximum.Value)} &deg;</div>
            <div class="daily-forecast-temperature-min">${Math.round(day4.Temperature.Minimum.Value)} &deg;</div>
        </div>
        <div class="daily-forecast-image">
            <img src="Images/icons/${day4.Day.Icon}.svg" alt="weather image">
        </div>
    </div>
    <div class="daily-forecast" id="current-day-plus-4">
        <div class="daily-forecast-day">${day5Day}</div>
        <div class="daily-forecast-temperature">
            <div class="daily-forecast-temperature-max">${Math.round(day5.Temperature.Maximum.Value)} &deg;</div>
            <div class="daily-forecast-temperature-min">${Math.round(day5.Temperature.Minimum.Value)} &deg;</div>
        </div>
        <div class="daily-forecast-image">
            <img src="Images/icons/${day5.Day.Icon}.svg" alt="weather image">
        </div>
    </div>`
}

const checkDailyForecast = (epoch) => {

    const date = new Date(epoch*1000).getDay();         // multiply by 1000 to get current day
    let day;

    // date returns a number between 0 - 6
    // used switch case to return the name of the day based on the number returned from the variable date
    
    switch (date){
        case 1:
            day = 'Monday'
            break;
        case 2:
            day = 'Tuesday'
            break;
        case 3:
            day = 'Wednesday'
            break;
        case 4:
            day = 'Thursday'
            break;
        case 5:
            day = 'Friday'
            break;
        case 6:
            day = 'Saturday'
            break;
        case 0:                     // 7 return undefined. Instead use 0 to get sunday
            day = 'Sunday'
            break;
    }
    return day;
}