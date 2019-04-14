import DBHandler from '../RealmDatabase/DBHandler';
import _ from 'lodash';
import CurrentWeather from '../context/weather.context';
export default class CityList {
    static contextType = CurrentWeather;
    static insert = async (newCity) => {
        let realm = await DBHandler.getRealm();
        let exist = await CityList.exist(newCity.name)
        if (!exist) {
            realm.write(() => {
                realm.create("City", newCity);
            });
            return true
        }
        return false
    }
    static exist = async (cityName) => {
        let realm = await DBHandler.getRealm();
        let exist = realm.objects('City').filtered(`name = "${cityName}"`)
        console.log(cityName,_.size(exist))
        if (_.size(exist) === 0) {
            return false;
        } else {
            return true;
        }
    }
    static getAll = async () => {
        let realm = await DBHandler.getRealm();
        return realm.objects('City');
    }
    static deleteAll = async () => {
        let realm = await DBHandler.getRealm();
        realm.write(() => {
            realm.deleteAll()
        })
    }
    static deletCityName = async (city) => {
        let realm = await DBHandler.getRealm();
        let cityToDelete = realm.objects('City').filtered(`name = "${city}"`)
        realm.write(() => {
            realm.delete(cityToDelete)
        })
    }
}