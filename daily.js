const dailyForecast = document.querySelector('.daily-forecast-container');

const updateDailyForecast = async(city) => {

    const cityDetails = await getCity(city);
    const dailyDetails = await getDailyForecast(cityDetails.Key)
    console.log(dailyDetails)

    return {
        dailyDetails
    }
}