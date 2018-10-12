/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import WeekData from './WeekData';

export default class History extends Component {
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <WeekData/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
