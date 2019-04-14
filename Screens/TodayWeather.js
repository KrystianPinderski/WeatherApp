import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList,Image,Text } from 'react-native';
import { CurrentWeather } from '../context/weather.context'
import moment from 'moment';
import Weather from '../API/Weather';
class TodayWeather extends PureComponent {
    static contextType = CurrentWeather;
    dates = [];
    constructor(props) {
        super(props);
        this.state = {
            oneDayData: [],
        }
    }
    componentDidMount() {
        let dateTab = [];
        this.context.weather.list.forEach(element => {
            let dateString = moment().format("DD-MM-YYYY");
            let actualDate = moment(element.dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY")
            if (dateString === actualDate) {
                dateTab.push(element)
            }
        });
        this.setState({
            oneDayData: dateTab,
        })
    }
    render() {
        return (
            <FlatList
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <Image source={require('../Pictures/Icons/cloud.png')}></Image>
                        <Text style={styles.emptyText}>
                            It's after 22:00 please check next tab "4Days" for more weather.
                        </Text>
                    </View>
                }
                style={styles.flatList}
                data={this.state.oneDayData}
                keyExtractor={(item, index) => String(item.id) + index}
                renderItem={({ item }) => {
                    return (
                        <Weather style={styles.button} data={item} />
                    )
                }
                }
            />
        )
    };
}
const styles = StyleSheet.create({
    flatList: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF',
    },
    button: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    emptyText: {
        fontSize: 12,
        marginLeft:50,
        marginRight:50,
        textAlign:'center'
    },
    emptyList: {
        marginTop:20,
        alignItems: 'center',
        flexDirection: 'column',
    },
});
export default TodayWeather;