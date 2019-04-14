import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl'
import { CurrentWeather } from '../context/weather.context';
Mapbox.setAccessToken(/*HERE Your Token*/);
export default class FavoritesMap extends Component {
    static contextType = CurrentWeather;
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.points.length !== this.props.points.length) {
            return true
        }
        return false
    }
    renderAnnotations() {
        return this.props.points.map((value, index) => {
            return (
                <Mapbox.PointAnnotation
                    key={String(index)}
                    id={String(index)}
                    coordinate={[value.longitude, value.latitude]}
                >
                    <Image style={styles.annotationContainer} source={require('../Pictures/Icons/favorites.png')} />
                    <Mapbox.Callout title={value.name} />
                </Mapbox.PointAnnotation>
            )
        })
    }
    getPosition(payload) {
        let position = payload.geometry.coordinates
        let lonPostion = position[0]
        let latPosition = position[1]
        Alert.alert(
            'Adding to Favorites:',
            'Do you want add this position to favorites?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.userPass(latPosition, lonPostion) },
            ],
        )
    }
    async userPass(latPosition, lonPostion) {
        try {
            let weatherResult = await this.context.getWeatherByLoc(latPosition, lonPostion)
            console.log(weatherResult)

            let isAdded = await this.context.addFavorites(weatherResult)
            if (isAdded) {
                this.props.addedToFavorites()
            }
        }
        catch (error) {
            alert("City Not Found.")
        }
    }
    componentDidMount() {
        if (this.props.points.length > 0) {
            let minLat = null
            let maxLat = null
            let minLon = null
            let maxLon = null
            this.props.points.forEach(element => {
                //Latitude szerokość X
                if (minLat === null || element.latitude < minLat) {
                    minLat = element.latitude
                }
                if (maxLat === null || element.latitude > maxLat) {
                    maxLat = element.latitude
                }
                //Longitude wysokość Y
                if (minLon === null || element.longitude < minLon) {
                    minLon = element.longitude
                }
                if (maxLon === null || element.longitude > maxLon) {
                    maxLon = element.longitude
                }
            })
            try{
            setTimeout(() => {
                this.map.fitBounds([maxLon, maxLat], [minLon, minLat],50)
            },20*this.props.points.length);
        }catch(error){
            console.log(error)
        }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    onLongPress={(payload) => this.getPosition(payload)}
                    styleURL={Mapbox.StyleURL.Light}
                    style={styles.container}
                    localizeLabels
                    logoEnabled={false}
                    ref={(ref) => this.map = ref}
                >
                    {this.renderAnnotations()}
                </Mapbox.MapView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    annotationContainer: {
        width: 24,
        height: 24,
        marginBottom: 33,
    },
    annotationFill: {
        width: 20,
        height: 20,
        borderRadius: 15,
        backgroundColor: 'white',
        transform: [{ scale: 0.6 }],
    }
})

