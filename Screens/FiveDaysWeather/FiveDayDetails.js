import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CurrentWeather } from '../../context/weather.context';
import moment from 'moment';
import Weather from '../../API/Weather';
class FiveDayDetails extends PureComponent {
    static contextType = CurrentWeather;
    constructor(props) {
        super(props);
        this.state = {
            oneDayData: [],
        }
    }
    componentDidMount() {
        let dateTab = [];
        this.context.weather.list.forEach(element => {
            let dateString = this.props.date.format("DD-MM-YYYY");
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
            <View style={styles.container}>
                <FlatList
                    
                    data={this.state.oneDayData}
                    keyExtractor={(item, index) => String(item.dt) + index}
                    renderItem={({ item }) => {
                        return (
                            <Weather data={item} />
                        )
                    }
                    }
                />
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#FFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
        color: '#FFF',
    },
});

export default FiveDayDetails;