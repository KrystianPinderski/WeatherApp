import Realm from 'realm';
import { CitySchema } from './Models';
const databaseOptions = {
    path: 'cityListApp.realm',
    schema: [CitySchema],
    schemaVersion: 0,
    deleteRealmIfMigrationNeeded: true,
}
export default class DBHandler {
    static getRealm = async () => {
        return Realm.open(databaseOptions)
    }
}