class Forecast{
    constructor(){
        this.key = '7WkLIxAG6484EEnjXb1Ra8qwtaldH0DD';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.dailyURI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
        this.forecastURI = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/';
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);

        return {
            cityDetails, 
            weather
        }
    }
    async updateForecast(city){
        const cityDetails = await this.getCity(city);
        const forecastDetails = await this.getForecast(cityDetails.Key)

        return {
            forecastDetails
        }
    }
    async updateDailyForecast(city){
        const cityDetails = await this.getCity(city);
        const dailyDetails = await this.getDailyForecast(cityDetails.Key)

        return {
            dailyDetails
        }
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }
    async getForecast(id){
        const query = `${id}?apikey=${this.key}&details=true&metric=true`;

        const response = await fetch(this.forecastURI + query);
        const data = await response.json();

        return data[0];
    }
    async getDailyForecast(id){
        const query = `${id}?apikey=${this.key}&details=true&metric=true`

        const response = await fetch(this.dailyURI + query);
        const data = await response.json();
        
        return data;
    }
}