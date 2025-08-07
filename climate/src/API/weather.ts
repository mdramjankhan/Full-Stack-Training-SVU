class WeatherAPI {

    // Private function cannot be accessed from outside
    private createUrl(endpoint:string, params:Record<string, string | number>) {

    }

    private async fetchData(){}


    // Public functions to interact with the API, and accessed from outside
    async getCurrentWeather(){}

    async getForecast(){}

    async reverseGeocode(){}
}