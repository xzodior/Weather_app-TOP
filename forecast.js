const key = 'fnV2wsEztWouMTPlmKz8BRYELQh4bvGc';

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

const getForecast = async(city) => {
    
    const base = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/';
    const query = `329260?apikey=${key}&details=true`;

    const response = await fetch(base + query);
    const data = await response.json();

    console.log(data[0]);
}