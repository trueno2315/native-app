/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firebase from '../firebaseConfig';

export default class CheckAuthScreen extends Component {
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
        this.props.navigation.navigate(user ? 'App' : 'App');
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{fontSize: 43, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>支える</Text>
          <Text style={{fontSize: 43, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>ノート</Text>
        </View>
        <ActivityIndicator size='large' style={{marginTop:30}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef'
  },
  box:{
    width:200,
    height: 200,
    backgroundColor:'rgb(1,15,59)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  }
});
