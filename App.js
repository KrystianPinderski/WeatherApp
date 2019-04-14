import React, { Component } from 'react';
import { Router, Scene, Actions, Image, Text, View } from 'react-native-router-flux';
import { Alert } from 'react-native';
import HomeScreen from './Screens/Home';
import TodayWeather from './Screens/TodayWeather';
import Maps from './Screens/Map';
import FiveDayDetails from './Screens/FiveDaysWeather/FiveDayDetails';
import FiveDayList from './Screens/FiveDaysWeather/FiveDayList';
import { CurrentWeather } from './context/weather.context';
import TabIcon from './TabIcon';

export default class App extends Component {
  static contextType = CurrentWeather;
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
    }
  }
  deleteHandler() {
    this.context.deleteAllFavorites()
    this.forceUpdate()
  }
  render() {
    const refreshOnBack = () => {
      setTimeout(() => {
        if (Actions.currentScene === "home") {
          Actions.refresh({ refreshDate: new Date().toISOString() });
        }
      }, 0)
    }

    return (
      <Router>
        <CurrentWeather.Provider>
          <Scene key="home"
            animationEnabled
            rightButtonImage={require('./Pictures/Icons/clean.png')}
            onRight={() => {
              Alert.alert(
                'Deleting Favorites List',
                'Are you sure you want to delete all favorites?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'OK', onPress: () => this.deleteHandler() },
                ],
              )

            }}
            component={HomeScreen}
            title="Home"
            initial
          />
          <Scene key="fiveDetails"
            component={FiveDayDetails}
            title="Details"
          />
          <Scene
            tabs
            rightButtonImage={require('./Pictures/Icons/favorites.png')}
            onRight={() => {
              this.context.addFavorites(this.context.weather);
            }}

            key="tabbar"
          >
            <Scene key="today"
              onExit={refreshOnBack}
              component={TodayWeather}
              title="Today Weather"
              hideNavBar
              activeTintColor={'green'}
              icon={() => <TabIcon icon={require('./Pictures/Icons/today.png')} />}

            />
            <Scene key="fiveList"
              onExit={refreshOnBack}
              component={FiveDayList}
              title="4Days"
              hideNavBar
              tabBarLabel="4Days"
              icon={() => <TabIcon icon={require('./Pictures/Icons/area.png')} />}
            />
            <Scene key="map"
              onExit={refreshOnBack}
              component={Maps}
              title="Map"
              hideNavBar
              tabBarLabel="Map"
              icon={() => <TabIcon icon={require('./Pictures/Icons/map.png')} />}
            />
          </Scene>
        </CurrentWeather.Provider>
      </Router >
    );
  }
}
App.defaultProps = {
  rightButtonImage: require('./Pictures/Icons/favorites.png')
}

