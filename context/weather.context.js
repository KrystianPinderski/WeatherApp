import React from 'react';
import ApiHandler from '../API/ApiHandler';
import CityList from '../RealmDatabase/CityList';

export const CurrentWeather = React.createContext({
    weather: null,
    favoritesCities: [],
    showMap:false,
    addFavorites: async (weather) => {
        let added = await CityList.insert({
            name: weather.city.name,
            latitude:weather.city.coord.lat,
            longitude:weather.city.coord.lon
        })
        if (!added) {
            alert("You got it in favorites!")
            return false
        } else {
            alert("Added to Favorites!")
            return true
        }
    },
    deleteAllFavorites: async () => {
        CityList.deleteAll()
        alert("Cleared Favorites List.")
    },
    deleteByCityName: async (city) => {
        CityList.deletCityName(city)
    },
    getExistance: async (cityName) => {
        return await CityList.exist(cityName)
    },
    getFavorites: async () => {
        return await CityList.getAll()
    },
    getFiveDays: async (cityName) => {
        return await ApiHandler.getFiveDayWeather(cityName)
    },
    getGeoCityName: async (longitude, latitude) => {
        baseURL = "https://nominatim.openstreetmap.org/reverse"
        return await ApiHandler.getCityByGeolocation(baseURL, longitude, latitude)
    },
    getWeatherByLoc: async (lat, lon) => {
        return await ApiHandler.getWeatherByLoc(lat, lon)
    }
})
