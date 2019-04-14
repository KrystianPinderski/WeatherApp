import axios from 'react-native-axios';
export default class ApiHandler {
    static getAxios(baseURL) {
        return axios.create({
            baseURL: baseURL || 'http://api.openweathermap.org/data/2.5/'
        })
    }
    static getTodayWeather = async (cityName) => {
        try {
            let apiResponse = await ApiHandler.getAxios().get("weather?q=" + cityName + "&APPID="/*HERE your APPID*/)
            return apiResponse.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static getFiveDayWeather = async (cityName) => {
        try {
            let apiResponse = await ApiHandler.getAxios().get("forecast?q=" + cityName + "&APPID="/*HERE your APPID */"&units=metric&lang=pl ")
            return apiResponse.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static getCityByGeolocation = async (baseURL,latitude,longitude) => {
        try{
            let geoResponse = await ApiHandler.getAxios(baseURL).get("?lat="+latitude+"&lon="+longitude+"&format=json")
            return geoResponse.data.address.city;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    static getWeatherByLoc = async (lat,lon) => {
        try{
            let apiResponse=await ApiHandler.getAxios().get("forecast?lat="+lat+"&lon="+lon+"&APPID="/*HERE your APPID*/"&units=metric&lang=pl" )
            return apiResponse.data;
        }catch(error){
            console.log(error);
            throw error
        }
    }
}