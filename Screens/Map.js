import React, { Component } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl'
import { CurrentWeather } from '../context/weather.context';
Mapbox.setAccessToken(/*Here your TOKEN*/);


export default class Maps extends Component {
    static contextType = CurrentWeather;

    renderAnnotations(lon, lat) {
        name = this.context.weather.city.name
        return (
            <Mapbox.PointAnnotation
                key='pointAnnotation'
                id='pointAnnotation'
                coordinate={[lon, lat]}
            >
                <Image style={styles.annotationContainer} source={require('../Pictures/Icons/favorites.png')} />
                <Mapbox.Callout title={name} />
            </Mapbox.PointAnnotation>
        )
    }
    
    render() {
        latitude = this.context.weather.city.coord.lat
        longitude = this.context.weather.city.coord.lon
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Street}
                    zoomLevel={10}
                    centerCoordinate={[longitude, latitude]}
                    style={styles.container}
                >
                    {this.renderAnnotations(longitude, latitude)}
                </Mapbox.MapView>
            </View>
        );
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


