import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CurrentWeather } from '../context/weather.context';
class FavoriteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            findMe: false,
        }
    }
    path1 = require('../Pictures/Icons/favorites.png')
    path2 = require('../Pictures/Icons/FavoritiesAdded.png')
    static contextType = CurrentWeather;
    cityChooseHandler = async () => {
        if (this.props.city.name !== '') {
            try {
                this.context.weather = await this.context.getWeatherByLoc(this.props.city.latitude,this.props.city.longitude);
                let existResult = await this.context.getExistance(this.props.city.name)
                Actions.tabbar({ title: this.props.city.name, rightButtonImage: existResult ? this.path2 : this.path1 })
            } catch (error) {
                console.log(error);
            }
        }
    }
    buttonDeleteHandler = () => {
        this.context.deleteByCityName(this.props.city.name)
        this.props.onDeleted()
    }
    render() {
        let { dataSend } = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.item} onPress={this.cityChooseHandler}>
                    <Image style={styles.imageCity} source={require('../Pictures/Icons/city.png')}></Image>
                    <Text style={styles.textData}>{dataSend.name}</Text>
                    <Text style={styles.filler}> </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.buttonDeleteHandler}
                    >
                        <Text style={styles.textDelete}>
                            X
                    </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
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
        textAlignVertical: 'bottom',
        backgroundColor: '#FFF',
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
    },
    filler: {
        flexGrow: 1,
    },
    textData: {
        color: '#73C1C9',
        marginTop: 17,
        fontSize: 18,
    },
    button: {
        height: 24,
        width: 24,
        backgroundColor: '#F25A7B',
        borderRadius: 5,
        margin: 16,
    },
    textDelete: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 2,
    },
    imageCity: {
        width: 40,
        height: 40,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
    },
});
export default FavoriteList;