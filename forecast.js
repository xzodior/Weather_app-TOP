const key = '7WkLIxAG6484EEnjXb1Ra8qwtaldH0DD';

const getWeather = async(id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

const getCity = async(city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

const getForecast = async(id) => {
    
    const base = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/';
    const query = `${id}?apikey=${key}&details=true&metric=true`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

const getDailyForecast = async(id) => {

    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${id}?apikey=${key}&details=true&metric=true`

    const response = await fetch(base + query);
    const data = await response.json();
    
    return data;
}