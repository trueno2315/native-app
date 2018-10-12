

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import ReportScreen from './Report';
import HistoryScreen from './History';
import SettingScreen from './Setting';
import SwipeScreen from './SwipeScreen';
import Card from './Card';
import CompleteScreen from './CompleteScreen';
import RegretScreen from './RegretScreen';
import Intro from './Intro';
import CheckAuthScreen from './CheckAuthScreen';
import AllItems from './AllItems';
import AlergyDetail from './items/AlergyDetail';
import WeekData from './WeekData';

const AppStack = StackNavigator({
  Intro: Intro,
  Report: ReportScreen,
  Setting: SettingScreen,
  History: HistoryScreen,
  SwipeScreen: SwipeScreen,
  CardScreen: Card,
  CompleteScreen: CompleteScreen,
  RegretScreen: RegretScreen,
  AllItems: AllItems,
  AlergyDetail: AlergyDetail,
  WeekData: WeekData
},{ headerMode: 'none' });

// const AuthStack = StackNavigator({
//   Intro: Intro,
//   Test: Test,
// },{ headerMode: 'none' });

export default SwitchNavigator(
  {
    App: AppStack,
    //Auth: AuthStack
  },
  // {
  //   initialRouteName: 'Auth'
  // }
);
