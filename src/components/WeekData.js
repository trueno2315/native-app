/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  AppState,
} from 'react-native';
import WeekBar from './WeekBar';
import AllItems from './AllItems';
import moment from 'moment';
import firebase from '../firebaseConfig';
import Barometer from './Barometer';

export default class WeekData extends Component {

  constructor(props) {
    super(props);

    this.state = {week:[], weekDataArr: null}; // weekDataArr = [{'アレルギー':2...}....] [0]が今日。
  }

  componentWillMount(){
    this.calWeek();
  }

  calWeek() { // １週間を取得して、this.stateに格納
    const m = moment();
    let week = [];
    for (var i = 0; i < 7; i++){
      const eachDay = m.clone().subtract(i, 'days').format('YYYYMMDD');
      week.push(eachDay);
    }
    this.setState({week}, () => {
      this.fetchAllDayObj(); // 実際にfirebaseからfetchする関数。
    });
  }

  fetchAllDayObj() { // firebaseから1週間分のObjのArr取得し、this.stateに保存。
    const ref = firebase.database().ref('/users/');
    var weekDataArr = [];

    for(let i of this.state.week) {
      const p = i;
      ref.child('testUser1').child('conditions').child(i).on('value', (data) => {
        let obj;
        if (data.val()){
          obj = data.val();
        } else {
          obj = {
            'アレルギー':4,
            '下痢': 4,
            '便秘': 4,
            '口内炎': 4,
            '吐き気': 4,
            '味覚の変化': 4,
            '嘔吐': 4,
            '手足の感覚': 4,
            '手足症候群': 4,
            '涙目': 4,
            '疲労感': 4,
            '色素沈着': 4,
            '食欲': 4 };
        }
        weekDataArr.push(obj);
        this.setState({weekDataArr});
      });
    }
  }

  render() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20, marginBottom: 10, alignItems: 'center'}}><Text>{`${year}年${month}月${day}日`}</Text></View>
        <View style={{marginBottom: 10}}><Barometer/></View>
        <WeekBar/>
        <AllItems weekDataArr={this.state.weekDataArr} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white'
  },
});
