/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';


let weekArr = []; // reverseする必要あり。

export default class WeekBar extends Component {

  render() {
    moment.lang('ja', {
        weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
        weekdaysShort: ["日","月","火","水","木","金","土"],
    });
    var m = moment();
    for (let i = 0; i < 7; i++ ){
      const day = m.clone().subtract(i, 'days').format("ddd");
      weekArr.push(day);
    }
    weekArr.reverse();
    return (
      <View style={styles.container}>
          <View style={styles.box}><Text style={styles.day}>{weekArr[0]}</Text></View>
          <View style={styles.box}><Text style={styles.day}>{weekArr[1]}</Text></View>
          <View style={styles.box}><Text style={styles.day}>{weekArr[2]}</Text></View>
          <View style={styles.box}><Text style={styles.day}>{weekArr[3]}</Text></View>
          <View style={styles.box}><Text style={styles.day}>{weekArr[4]}</Text></View>
          <View style={styles.box}><Text style={styles.day}>{weekArr[5]}</Text></View>
          <View style={styles.todayContainer}><Text style={{fontSize: 20, fontWeight: 'bold'}}>{weekArr[6]}</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.645,
    marginLeft: Dimensions.get('window').width * 0.33,
    marginRight: Dimensions.get('window').width * 0.025
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  todayContainer:{
    borderWidth: 2,
    borderColor:'rgb(1,15,59)',
    borderRadius: 12,
    width:24,
    width:24
  },
  box: {
    //marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.645,
    marginRight: Dimensions.get('window').width * 0.025
  }
});


//{marginLeft: 20, marginRight:8, width:24, height:24, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}
