import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, FlatList, StyleSheet, View } from 'react-native';
import { CurrentWeather } from '../../context/weather.context';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

class FiveDayList extends Component {
    static contextType = CurrentWeather;
    dates = [];
    constructor(props) {
        super(props);
        for (let i = 1; i <= 4; i++) {
            let now = moment();
            now.add(i, "d");
            this.dates.push(now);
        }
    }
    render() {
        return (
            <FlatList
                style={styles.flatList}
                data={this.dates}
                keyExtractor={(item, index) => String(item.id) + index}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemComponent}
                            onPress={() => Actions.jump('fiveDetails', { date: item })}
                        >
                            <Image style={styles.iconCalendar} source={require('../../Pictures/Icons/calendar.png')}></Image>
                            <Text style={styles.textItems}>{`${item.format("dddd")}`}</Text>
                            <Text style={styles.textDate}>{`${item.format("DD-MM-YYYY")}`}</Text>
                        </TouchableOpacity>
                    )
                }
                }
            />

        );
    }
};

const styles = StyleSheet.create({
    flatList: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF',
    },
    itemComponent: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
    },
    textItems: {
        fontSize: 20,
        height: 60,
        color: '#000',
        justifyContent: 'center',
        margin: 20,
        marginTop: 50,

    },
    textDate: {
        fontSize: 18,
        height: 35,
        color: '#FFF',
        justifyContent: 'center',
        margin: 20,
        marginTop: 50,
        padding: 5,
        backgroundColor: '#F25A7B',
        borderRadius: 10,
    },
    iconCalendar: {
        margin: 20,
        marginTop: 50,
    }
}
);

export default FiveDayList;