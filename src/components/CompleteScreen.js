

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Progress from 'react-native-progress';
import firebase from '../firebaseConfig';



export default class CompleteScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: this.props.navigation.state.params.count,
      revel: this.props.navigation.state.params.revel,
      isRevelUp: this.props.navigation.state.params.isRevelUp
    };
    this.goReport = this.goReport.bind(this);
  };



  goReport = () => {
    // firebaseにcountとrevelの登録。
    firebase.database().ref('/users/').child('testUser1').child('status')
    .set({count:this.state.count, revel: this.state.revel})
    .then(this.props.navigation.navigate('Report'));
  }

  render() {
    return (
      <View style={styles.container}>
            <Text　style={styles.textStyle}>記録できました！</Text>
            <Text style={styles.textStyle}>おめでとうございます！</Text>
            <Image source={require('../images/levelup.png')} style={{width:140, height:140}}/>
            {this.state.isRevelUp?
            <View><Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: 'rgba(52, 73, 94, 1)'}}>{`伝えるレベル${this.state.revel}`}</Text>
            <Text style={{fontSize: 26, textAlign: 'center', fontWeight: 'bold', color: 'rgba(52, 73, 94, 1)'}}>になりました！</Text></View>:
            <View><Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: 'rgba(52, 73, 94, 1)'}}>毎日記録して</Text>
            <Text style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: 'rgba(52, 73, 94, 1)'}}>レベルアップしましょう！</Text></View>
            }
            <View style={styles.progressContainer}>
              <Progress.Bar
                progress={this.state.count}
                width={190}
                height={24}
                borderRadius={10}
                borderWidth={1}
                color={'rgb(77, 19, 209)'}
                borderColor={'rgba(179, 168, 211, 0.7)'}
                unfilledColor={'rgba(179, 168, 211, 0.1)'} />
            </View>
          <TouchableOpacity onPress={this.goReport}>
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>わかりました！</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width-20,
    height: Dimensions.get('window').height-110,
    margin:10,
    borderRadius: 14
  },
  textStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgba(52, 73, 94, 1)',
  },
  buttonContainer: {
    backgroundColor: 'rgb(1,15,59)',
    borderRadius: 30,
    width: Dimensions.get('window').width -45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15
  },
  progressContainer:{
    margin: 10,
  }
});
