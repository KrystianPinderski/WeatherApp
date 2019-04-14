import React, { Component } from 'react';
import { Switch, Image, Text, FlatList, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CurrentWeather } from '../context/weather.context';
import FavoriteListItem from './FavoriteListItem';
import { PermissionsAndroid } from 'react-native';
import FavoritesMap from './FavoritesMap';
class HomeScreen extends Component {
    path1 = require('../Pictures/Icons/favorites.png')
    path2 = require('../Pictures/Icons/FavoritiesAdded.png')
    static contextType = CurrentWeather;
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            showMap: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.buttonHandlerSend = this.buttonHandlerSend.bind(this);
    }
    handleChange(cityName) {
        this.setState({ cityName });
    }
    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getLocation();
            } else {
                alert('Permissions denied')
            }
        } catch (err) {
            console.warn(err)
        }
    }
    async getLocation() {
        try {
            await navigator.geolocation.getCurrentPosition(
                (location) => {
                    let { latitude, longitude } = location.coords
                    this.getCityFromApi(latitude, longitude);
                },
                (error) => {
                    alert('Location not found')
                    console.log(error)
                },
                { enableHighAccuracy: false }
            )
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async getCityFromApi(lat, lon) {
        let cityResult = await this.context.getGeoCityName(lat, lon)
        console.log(cityResult)
        this.handleChange(cityResult)
    }
    async buttonHandlerSend() {
        if (this.state.cityName !== '') {
            try {
                this.context.weather = await this.context.getFiveDays(this.state.cityName);
                let existResult = await this.context.getExistance(this.state.cityName)
                Actions.tabbar({
                    title: this.context.weather.city.name,
                    rightButtonImage: existResult ? this.path2 : this.path1
                })
            } catch (error) {
                console.log(error.message);
                alert("City not found.")
            }
        } else {
            alert("Please enter a city")
        }
    }
    async getDataDB() {
        this.context.favoritesCities = await this.context.getFavorites();
        this.forceUpdate();
    }
    componentDidMount() {
        this.getDataDB();
        this.requestLocationPermission();
        this.setState({
            showMap:this.context.showMap
        })
    }
    renderFavorites() {
        if (this.state.showMap) {
            return this.renderMap();
        }
        return this.renderList();
    }
    renderList() {
        return (
            <FlatList
                contentContainerStyle={styles.contentContainer}
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <Image source={require('../Pictures/Icons/cloud.png')}></Image>
                        <Text style={styles.emptyText}>
                            Add some cities to Favorite List !
                    </Text>
                    </View>
                }
                style={styles.flatList}
                key={this.props.refreshDate}
                data={this.context.favoritesCities}
                keyExtractor={(item, index) => String(item.name) + index}
                renderItem={({ item }) => {
                    return (
                        <FavoriteListItem style={styles.listItemBox} dataSend={item} city={item} onDeleted={() => { this.getDataDB() }} />
                    )
                }
                }
            />
        )
    }
    
    addedToFavorites=()=>{
        this.getDataDB()
    }
    renderMap() {
        return (
            <FavoritesMap styles={styles.map} points={this.context.favoritesCities} addedToFavorites={this.addedToFavorites}></FavoritesMap>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.topSearch}>
                    <TextInput style={styles.userDataCityName}
                        type="text" value={this.state.cityName}
                        onChangeText={this.handleChange}
                        placeholder="Type Here City Name..."
                        placeholderTextColor='rgba(0,0,0,0.55)'
                    />
                    <TouchableOpacity
                        onPress={this.buttonHandlerSend}
                        title="Search"
                        style={styles.buttonSearch}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>

                </View>
                <Switch value={this.state.showMap} onValueChange={showMap => {
                    this.setState({ showMap })
                    this.context.showMap=showMap
                }} />
                {this.renderFavorites()}
            </View>
        );
    }
}
HomeScreen.defaultProps = {
    refreshDate: new Date().toISOString()
}
const styles = StyleSheet.create({
    topSearch: {
        padding: 16,
        flexDirection: 'row',
    },
    buttonSearch: {
        width: 80,
        height: 40,
        backgroundColor: '#73C1C9',
        marginTop: 25,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        padding: 8,
    },
    userDataCityName: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        color: '#000',
    },
    flatList: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 10,
    },
    listItemBox: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: 'rgba(66, 66, 66, 1)',
    },
    emptyText: {
        fontSize: 18,
    },
    emptyList: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    map: {
        flex: 1,
    }
});
export default HomeScreen;