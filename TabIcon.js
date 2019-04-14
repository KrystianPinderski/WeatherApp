import React, { Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';

export default class TabIcon extends Component {
  render() {
      console.log(this.props.selected)
    return (
        <Image source={this.props.icon} style={styles.activeTab}></Image>
    
    )
  }
}
const styles = StyleSheet.create({
    activeTab:{
        tintColor:'#73C1C9',
        width:24,
        height:24
    },
    tab:{
        tintColor:'white'
    }
})

