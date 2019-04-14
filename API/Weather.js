import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
class Weather extends PureComponent {
    godzina = this.props.data.dt_txt.slice(11, 16);
    render() {
        let { data } = this.props;
        let iconURL = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        return (
            <View style={styles.item}>
                <Image style={styles.weatherIcon} source={{ uri: iconURL }}></Image>
                <View style={styles.spacer}>
                    <Text style={styles.textData}>{data.name}</Text>
                    <Text style={styles.textData}>Temp: {data.main.temp}°</Text>
                    <Text style={styles.rainOrNo}>{data.weather[0].main}</Text>
                    <Text style={styles.textData}>{this.godzina}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 2,
        height: 72,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
    },
    weatherIcon: {
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
        height: 56,
        width: 56,
    },
    textData: {
        color: '#73C1C9',
        marginTop: 25,
    },
    rainOrNo: {
        marginTop: 25,
        color: '#F25A7B',
    },
    spacer: {
        justifyContent: 'space-between',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 16,
    }
}
);
export default Weather;