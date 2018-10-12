import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  AppState,
  Alert,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import firebase from '../firebaseConfig';
import HistoryScreen from './History';
import SettingScreen from './Setting';
import {createBottomTabNavigator} from 'react-navigation';
import moment from 'moment';

class ReportScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      revel: 1,
      isLogin: false,
      done: false,
      isLoading: true,
      score: 0,
      appState:AppState.currentState,
      conditionsInFirebase: null};
    this.goToSwipeScreen = this.goToSwipeScreen.bind(this);
    this.showText = this.showText.bind(this);
    this.handleComeFromBackground = this.handleComeFromBackground.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.goRestart = this.goRestart.bind(this);

  }

  componentWillMount(){
    this.handleComeFromBackground();
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

// ＊＊＊＊＊＊こいつのお陰で、backgroundからactiveになったことを検知。
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        this.handleComeFromBackground();
    }
    this.setState({appState: nextAppState});
  };

  // firebaseから今日のdataを取ってきて、記録が完了しているかの判定、scoreの計算をする.
  handleComeFromBackground = () => {
    firebase.database().ref('/users/').child('testUser1').child('status').on('value', (data)=> {
      if(data.val()){
        this.setState({count: data.val().count, revel: data.val().revel, done: true});
      } else {
        this.setState({count: 0, done: false});
      }
    });
    const m = moment();
    const formattedToday = m.format('YYYYMMDD');
    console.log('formattedToday', formattedToday);
    firebase.database().ref('/users/').child('testUser1').child('conditions').child(formattedToday).on('value',(data)=>{
      if (data.val()){
        // すでに記録されているcase(体調スコアの表示).
        const scoreArr = Object.values(data.val());
        let countOf0 = 0;
        for(i of scoreArr){
          if (i === 0){
            countOf0 += 1;
          }
        }
        const score = Math.round(countOf0 / 13 * 100) / 100;
        this.setState({isLoading: false, done: true, score: score});
      } else {
        this.setState({isLoading: false, done: false});
      }
    });
  };

  goToSwipeScreen = () => {
    // handleComeFromBackgroundでの記録判定が終わってから、かつ、done=trueでないとき。
    if(!this.state.isLoading && !this.state.done ){
       //this.props.navigation.navigate('SwipeScreen');
       const m = moment();
       const formattedToday = m.format('YYYYMMDD');
       let conditionsInFirebase;
       firebase.database().ref('/users/').child('testUser1').child('conditions').child(formattedToday).on('value', (data)=> {
         conditionsInFirebase = data.val();
       });
       this.setState({conditionsInFirebase}, ()=>{
         this.props.navigation.navigate('SwipeScreen', {conditionsInFirebase: this.state.conditionsInFirebase});
       });
    }　
  };

  handleRestart = () => {
    Alert.alert(
      '確認',
      '本日の全ての体調を入力しなおしますか？',
      [
        {text: 'キャンセル', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'はい', onPress: this.goRestart},
      ],
      { cancelable: false }
    );
  };

  goRestart = () => {
    const m = moment();
    const formattedToday = m.format('YYYYMMDD');
    let conditionsInFirebase;
    firebase.database().ref('/users/').child('testUser1').child('conditions').child(formattedToday).on('value', (data)=> {
      conditionsInFirebase = data.val();
    })
    this.setState({conditionsInFirebase}, ()=>{
      this.props.navigation.navigate('SwipeScreen', {conditionsInFirebase: this.state.conditionsInFirebase});
    });
  };


  // indicatorにscoreのtextを表示するfunction
  showText = () => {
    let score = this.state.score * 100
    return(
      <View style={styles.showTextStyle}>
        <Text style={styles.textStyle}>体調スコア</Text>
        <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>{score} %</Text>
      </View>);
  };

  updateCount = (newCount) => {
    this.setState({count: newCount });
  };


  renderRestartButton () {
    if(this.state.done){
      return (
        <TouchableOpacity onPress={this.handleRestart}>
          <View style={styles.buttonContainer}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>記録しなおす</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return;
    }
  }

  render() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const whaleStatus = '赤ちゃんクジラ';
      return (
        <View style={styles.container}>

          <Text style={{fontSize:18}}>{`${year}年${month}月${day}日　今日`}</Text>
          {this.state.done
              ? // 記録が完了している場合
              <TouchableOpacity onPress={this.goToSwipeScreen}>
                <ImageBackground style={{margin:10, width: 200, height: 200}} source={require('../images/record.png')}>

                    { this.state.isLoading
                    ?　// loading中
                    (<View style={styles.textBox}><Progress.Circle size={200} indeterminate={true} color={'rgba(213, 184, 255, 0.8)'} borderWidth={10}/></View>)
                    :　// loading終了後
                    (<View style={styles.textBox}>
                        <Progress.Circle
                        size={200}
                        color={'rgb(77, 19, 209)'}
                        borderColor={'rgba(213, 184, 255, 0.8)'}
                        unfilledColor={'rgba(179, 168, 211, 0.1)'}
                        borderWidth={1}
                        thickness={11.5}
                        progress={this.state.score}
                        showsText={true}
                        formatText={(progress)=> this.showText(progress)}/>
                     </View>) }

                </ImageBackground>
              </TouchableOpacity>
              : //　未完了の場合
              <TouchableOpacity onPress={this.goToSwipeScreen}>
                <ImageBackground style={{margin:10, width: 200, height: 200}} source={require('../images/record.png')}>
                { this.state.isLoading
                ?　// loading中
                 (<View style={styles.textBox}><Progress.Circle size={200} color={'rgba(213, 184, 255, 0.8)'} borderWidth={10} indeterminate={true} /></View>)
                :　// loading終了後
                (<View style={styles.textBox}><Text style={styles.textStyle}>今日の記録</Text>
                 <Text style={styles.textStyle}>スタート！</Text></View>) }
                </ImageBackground>
             </TouchableOpacity>
          }
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{`伝えるレベル：${this.state.revel}（${whaleStatus})`}</Text>
          </View>
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
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>連日入力すると経験値が増え、</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>経験値が貯まるとレベルアップ！</Text>
          <Image source={require('../images/levelup.png')} style={{marginTop: 15, marginBottom: 10, width:140, height:100}}/>
          {this.renderRestartButton()}
        </View>
      );
  };
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 0
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  revelContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer:{
    //flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  showTextStyle: {
    width:120,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  buttonContainer: {
    backgroundColor: 'rgb(1,15,59)',
    borderRadius: 30,
    width: Dimensions.get('window').width -45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom: 20
  },
});



// Tabvarの設定
export default createBottomTabNavigator(
  {
    伝える: ReportScreen,
    振り返る: HistoryScreen,
    設定: SettingScreen,
   },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
          let imagePath;
          const { routeName } = navigation.state;
          if (routeName === '伝える') {
             imagePath = focused ? require('../images/selectedRecord.png') : require('../images/normalRecord.png');
          } else if (routeName === '振り返る') {
             imagePath = focused ? require('../images/selectedChart.png') : require('../images/normalChart.png');
          } else if(routeName === '設定') {
            imagePath = focused ? require('../images/setting.png') : require('../images/setting_normal.png');
          }
          return <Image source={imagePath} style={{width: 40, height: 40}}/>
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      style:{
        height:60
      },
    }
  }
);
