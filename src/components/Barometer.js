/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class Barometer extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{marginLeft:Dimensions.get('window').width * 0.6 , justifyContent: 'center'}}><Text style={{fontSize: 18}}>軽</Text></View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 3}}>
          <View style={{marginLeft: 10,marginRight: 10, backgroundColor: 'rgb(148,152,186)', borderRadius: 4, width: 8, height:8}}/>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 3}}>
          <View style={{marginRight: 10, backgroundColor: 'rgb(51,65,133)', borderRadius: 6, width: 11, height:11}}/>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 3}}>
          <View style={{marginRight: 10, backgroundColor: 'rgb(0,31,109)', borderRadius: 8, width: 15, height:15}}/>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 3}}>
          <View style={{marginRight: 8, backgroundColor: 'rgb(1,15,59)', borderRadius: 11, width: 22, height:22}}/>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 3}}>
          <View style={{marginRight:15}}><Text style={{fontSize: 18}}>重</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    marginRight: Dimensions.get('window').width * 0.025,
  },
});
