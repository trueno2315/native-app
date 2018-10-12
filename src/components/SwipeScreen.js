
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import Card from './Card';
import QuestionParams from '../QuestionConfig';
import CompleteScreen from './CompleteScreen';
import moment from 'moment';
import firebase from '../firebaseConfig';

const questionArr = Object.keys(QuestionParams);


export default class SwipeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      selected:false
    };

    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this.handleBackScroll = this.handleBackScroll.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.recordLastDate = this.recordLastDate.bind(this);
  }

  _onScroll({nativeEvent}) {
    let currentPage = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (this.state.currentPage !== currentPage) {
      this.setState({currentPage});
    }
  };

  handleScroll(){
    if(this.state.currentPage === 0){
      this.scroller.scrollTo({x:Dimensions.get('window').width});
    }else if(this.state.currentPage === 1){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 2});
    }else if(this.state.currentPage === 2){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 3});
    }else if(this.state.currentPage === 3){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 4});
    }else if(this.state.currentPage === 4){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 5});
    }else if(this.state.currentPage === 5){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 6});
    }else if(this.state.currentPage === 6){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 7});
    }else if(this.state.currentPage === 7){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 8});
    }else if(this.state.currentPage === 8){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 9});
    }else if(this.state.currentPage === 9){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 10});
    }else if(this.state.currentPage === 10){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 11});
    }else if(this.state.currentPage === 11){
      this.scroller.scrollTo({x:Dimensions.get('window').width * 12});
    }else if(this.state.currentPage === 12){
      this.recordLastDate();
    }else{
      return;
    }
  };

  handleBackScroll(){
    if(this.state.currentPage === 1){
      this.scroller.scrollTo({x:0});
    }else if(this.state.currentPage === 2){
      this.scroller.scrollTo({x:Dimensions.get('window').width});
    }else if(this.state.currentPage === 3){
      this.scroller.scrollTo({x:Dimensions.get('window').width*2});
    }else if(this.state.currentPage === 4){
      this.scroller.scrollTo({x:Dimensions.get('window').width*3});
    }else if(this.state.currentPage === 5){
      this.scroller.scrollTo({x:Dimensions.get('window').width*4});
    }else if(this.state.currentPage === 6){
      this.scroller.scrollTo({x:Dimensions.get('window').width*5});
    }else if(this.state.currentPage === 7){
      this.scroller.scrollTo({x:Dimensions.get('window').width*6});
    }else if(this.state.currentPage === 8){
      this.scroller.scrollTo({x:Dimensions.get('window').width*7});
    }else if(this.state.currentPage === 9){
      this.scroller.scrollTo({x:Dimensions.get('window').width*8});
    }else if(this.state.currentPage === 10){
      this.scroller.scrollTo({x:Dimensions.get('window').width*9});
    }else if(this.state.currentPage === 11){
      this.scroller.scrollTo({x:Dimensions.get('window').width*10});
    }else if(this.state.currentPage === 12){
      this.scroller.scrollTo({x:Dimensions.get('window').width*11});
    }else if(this.state.currentPage === 13){
      this.scroller.scrollTo({x:Dimensions.get('window').width*12});
    }else{
      return
    }
  };

  recordLastDate = () => {
    // ***firebaseに最終記録日を保存&&連続なのかの判定及び,count revelの登録***
    console.log('recordLastDate関数に入った');
    let count = 0;
    let revel = 1;
    let isRevelUp = false;
    moment.defaultFormat = 'YYYY/MM/DD';
    const m = moment();
    const formattedToday = m.format('YYYYMMDD');
    let lastDayinFirebase;
    // if 初回の挙動　// もしlastDayinFirebaseが無かったら、formattedTodayをlastDayとしてfirebaseへ登録して終了。
    // else 差分が１日かどうか判定する　//
    firebase.database().ref('/users/').child('testUser1').child('lastDay').on('value',(data)=>{
      lastDayinFirebase = data.val();
      if (!lastDayinFirebase){
          console.log('初回の挙動');
          firebase.database().ref('/users/').child('testUser1').child('lastDay').set(formattedToday);
          this.props.navigation.navigate('Report');
          return ;
      } else if (formattedToday === lastDayinFirebase){
          console.log('同じ日の入力です。このまま終了します');
          this.props.navigation.navigate('Report');
          return ;
      } else {
      　　const serialDay = moment(lastDayinFirebase).add(1, 'days').format('YYYYMMDD');
         if(serialDay === formattedToday){
            console.log('連続入力です！count増やします！');
            firebase.database().ref('/users/').child('testUser1').child('status').on('value', (data)=>{
                count = data.val().count;
                revel = data.val().revel;
                let newCount = count + 0.2;
                if(newCount >= 1){
                  newCount = 0;
                  revel += 1;
                  isRevelUp = true;
                }
              　this.props.navigation.navigate('CompleteScreen',{count: newCount, revel: revel, isRevelUp: isRevelUp});
            });
         } else {
            console.log('連続入力失敗の処理');
            firebase.database().ref('/users/').child('testUser1').child('status').child('count').set(0)
            .then(this.props.navigation.navigate('RegretScreen'));
         }
         firebase.database().ref('/users/').child('testUser1').child('lastDay').set(formattedToday);
      }
    });
  };


  handleAlert = ()=> {
    Alert.alert(
      'どれかを選んでから「次へ」を押してください。',
      '', // 無いと動かない。
      [{text: 'OK'}]);
  };

  goBack = (where)=> {
    if(where === "1"){
        Alert.alert(
          '確認',
          '途中までの記録が失われますが、戻りますか？',
          [{text: 'キャンセル'},
           {text: 'はい', onPress: this.handleBack}
          ]
        );
    } else {
      this.handleBackScroll();
    }
  };

  handleBack = () => {
    // Reportから,更新前の状態を受け取っている。
    // 戻る場合、firebaseを前の状態にもどす。
    const m = moment();
    const formattedToday = m.format('YYYYMMDD');
    const conditionsInFirebase = this.props.navigation.state.params.conditionsInFirebase;
    firebase.database().ref('/users/').child('testUser1').child('conditions').child(formattedToday)
      .set(conditionsInFirebase)
      .then(this.props.navigation.navigate('Report'));
      console.log('Reportへ戻る');
  };

  goNext = () => {
      this.setState({selected:true});
      this.handleScroll();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainerStyle}>
          <Text style={styles.textStyle}>本日の体調にもっとも近い</Text>
          <Text style={styles.textStyle}>ものを押してください。</Text>
        </View>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        pagingEnabled={true}
        ref={(scroller) => {this.scroller = scroller}}
        onScroll={this._onScroll}
        scrollEventThrottle={16}>
          {questionArr.map((q, i) => {
          return <Card key={i} goBack={this.goBack} goNext={this.goNext} handleAlert={this.handleAlert} params={QuestionParams[q]}/>
          })}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(1,15,59)'
  },
  textContainerStyle: {
    paddingTop: 25,
    marginTop:5
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    margin:5
  },
});
