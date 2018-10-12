/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import QuestionParams from '../QuestionConfig';
import AlergyDetail from './items/AlergyDetail';
import GeriDetail from './items/GeriDetail';
import BenpiDetail from './items/BenpiDetail';
import KounaienDetail from './items/KounaienDetail';
import HakikeDetail from './items/HakikeDetail';
import MikakuDetail from './items/MikakuDetail';
import OutoDetail from './items/OutoDetail';
import TeasiDetail from './items/TeasiDetail';
import SyoukougunDetail from './items/SyoukougunDetail';
import NamidameDetail from './items/NamidameDetail';
import HiroukanDetail from './items/HiroukanDetail';
import SikisoDetail from './items/SikisoDetail';
import SyokuyokuDetail from './items/SyokuyokuDetail';

const allItemArr = [
"アレルギー",
"下痢",
"便秘",
"口内炎",
"吐き気",
"味覚の変化",
"嘔吐",
"手足の感覚",
"手足症候群",
"涙目",
"疲労感",
"色素沈着",
"食欲"];
let alergyArr = [];
let geriArr = [];
let benpiArr = [];
let kounaiennArr = [];
let hakikeArr = [];
let mikakuArr = [];
let outoArr = [];
let teasiArr = [];
let syoukougunnArr = [];
let namidameArr = [];
let hiroukannArr = [];
let sikisoArr = [];
let syokuyokuArr = [];

export default class AllItems extends Component {

  constructor(props) {
    super(props);

    this.state = {arr:[]};
    this.renderTest = this.renderTest.bind(this);
  }

  renderTest () {
    const data = this.props.weekDataArr;

    if(Array.isArray(data) && data.length > 6){
     // console.log('入ったData：：：：', data);
      for (oneData of data) {
         alergyArr.push(oneData['アレルギー']);
         geriArr.push(oneData['下痢']);
         benpiArr.push(oneData['便秘']);
         kounaiennArr.push(oneData['口内炎']);
         hakikeArr.push(oneData['吐き気']);
         mikakuArr.push(oneData['味覚の変化']);
         outoArr.push(oneData['嘔吐']);
         teasiArr.push(oneData['手足の感覚']);
         syoukougunnArr.push(oneData['手足症候群']);
         namidameArr.push(oneData['涙目']);
         hiroukannArr.push(oneData['疲労感']);
         sikisoArr.push(oneData['色素沈着']);
         syokuyokuArr.push(oneData['食欲']);
      }
       //this.setState({alergyArr});
      console.log(alergyArr);
      // if (alergyArr.length > 6 ){
      //   this.props.navigation.navigate('AlergyDetail', {alergyArr: alergyArr});
      // }
    } else {
     // まだnullの場合　loadingにしておくのがbetterかも。
      console.log('まだnull');
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderTest()}
        <AlergyDetail alergyArr={alergyArr.reverse()}/>
        <GeriDetail geriArr={geriArr.reverse()}/>
        <BenpiDetail benpiArr={benpiArr.reverse()}/>
        <KounaienDetail kounaiennArr={kounaiennArr.reverse()}/>
        <HakikeDetail hakikeArr={hakikeArr.reverse()}/>
        <MikakuDetail mikakuArr={mikakuArr.reverse()}/>
        <OutoDetail outoArr={outoArr.reverse()}/>
        <TeasiDetail teasiArr={teasiArr.reverse()}/>
        <SyoukougunDetail syoukougunnArr={syoukougunnArr.reverse()}/>
        <NamidameDetail namidameArr={namidameArr.reverse()}/>
        <HiroukanDetail hiroukannArr={hiroukannArr.reverse()}/>
        <SikisoDetail sikisoArr={sikisoArr.reverse()}/>
        <SyokuyokuDetail syokuyokuArr={syokuyokuArr.reverse()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row'
    marginTop: 15,
  },
});
