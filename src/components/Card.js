
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../firebaseConfig';
import QuestionParams from '../QuestionConfig';
import moment from 'moment';


const questionArr = Object.keys(QuestionParams);

const defaultContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 15,
  backgroundColor: 'rgb(1,15,59)',
  borderRadius: 40,
  width: Dimensions.get('window').width-45,
  height: 90,
};


export default class Card extends Component {


  constructor(props) {
    super(props);

    this.state = {
      selectedNum:null,
      selected:false,
      questionContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'rgb(1,15,59)',
        borderRadius: 40,
        width: Dimensions.get('window').width-45,
        height: 90,
      },
      questionContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'rgb(1,15,59)',
        borderRadius: 40,
        width: Dimensions.get('window').width-45,
        height: 90,
      },
      questionContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'rgb(1,15,59)',
        borderRadius: 40,
        width: Dimensions.get('window').width-45,
        height: 90,
      },
      questionContainer0: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'rgb(1,15,59)',
        borderRadius: 40,
        width: Dimensions.get('window').width-45,
        height: 90,
      }
    };

    this.resetContainer = this.resetContainer.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRecord = this.handleRecord.bind(this);
  };


  handleRecord () {
    //次へbutton(handleNext)をトリガーとして、this.props.params.titleをkey,this.state.selectedNumをvalueとして登録。
    const m = moment();
    const formattedToday = m.format('YYYYMMDD');
    let titleOfKey = this.props.params.title;

    firebase.database().ref('/users/').child('testUser1').child('conditions').child(formattedToday).child(titleOfKey)
     .set(this.state.selectedNum)
     .then(console.log('recorded to firebase'));
  }

  resetContainer() {
    this.setState({
      questionContainer0: defaultContainer,
      questionContainer1: defaultContainer,
      questionContainer2: defaultContainer,
      questionContainer3: defaultContainer
    });
  };

  handleTouch (num) {
      this.setState({selected:true});
      this.resetContainer();
      let newStyle;
      switch (num) {
        case 3: newStyle = {...this.state.questionContainer3,backgroundColor:'rgb(19,19,187)'};
        this.setState({questionContainer3:newStyle, selectedNum: 3});
        break;
        case 2: newStyle = {...this.state.questionContainer3,backgroundColor:'rgb(19,19,187)'};
        this.setState({questionContainer2:newStyle, selectedNum: 2});
        break;
        case 1: newStyle = {...this.state.questionContainer3,backgroundColor:'rgb(19,19,187)'};
        this.setState({questionContainer1:newStyle, selectedNum: 1});
        break;
        case 0: newStyle = {...this.state.questionContainer3,backgroundColor:'rgb(19,19,187)'};
        this.setState({questionContainer0:newStyle, selectedNum: 0});
        break;
        default: break;
      }
  };

  handleNext () {
      if(this.state.selected){
          this.props.goNext();
          this.handleRecord();
      } else {
          this.props.handleAlert();
      }
  };

  render() {

    let imagePath;
    switch (this.props.params.index) {
      case "1": imagePath = require('../images/alergy.png');break;
      case "2": imagePath = require('../images/hirou.png');break;
      case "3": imagePath = require('../images/syoku.png');break;
      case "4": imagePath = require('../images/hakike.png');break;
      case "5": imagePath = require('../images/outo.png');break;
      case "6": imagePath = require('../images/geri.png');break;
      case "7": imagePath = require('../images/benpi.png');break;
      case "8": imagePath = require('../images/kounaienn.png');break;
      case "9": imagePath = require('../images/teasi.png');break;
      case "10": imagePath = require('../images/mikaku.png');break;
      case "11": imagePath = require('../images/namidame.png');break;
      case "12": imagePath = require('../images/teasisyoukougunn.png');break;
      case "13": imagePath = require('../images/sikiso.png');break;
      default: break;
    }

    return (
      <View style={styles.container}>
          <View style={styles.twoButtonsContainer}>
              <TouchableOpacity onPress={()=> this.props.goBack(this.props.params.index)}>
                 <View style={styles.leftButtonContainer}>
                     <Ionicons name={'md-arrow-round-back'} size={36} color={'white'}/>
                     <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 6}}>戻る</Text>
                 </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.handleNext()}>
                 <View style={styles.rightButtonContainer}>
                     <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', marginRight: 6}}>次へ</Text>
                     <Ionicons name={'md-arrow-round-forward'} size={36} color={'white'}/>
                 </View>
              </TouchableOpacity>
          </View>
          <View style={{marginTop: 10 , alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}> {this.props.params.index} / 13</Text>
              <View style={{flexDirection:'row'}}>
                  <Image source={imagePath} style={{width: 45, height: 45}}/>
                  <Text style={{fontSize: 36, marginTop: 8, fontWeight: 'bold'}}>{this.props.params.title}</Text>
              </View>
          </View>


          <TouchableOpacity onPress={()=> this.handleTouch(3)}>
            <View style={this.state.questionContainer3}>
                <View style={styles.circleInQuestion}>
                  <Text style={{fontSize: 64, fontWeight: 'bold', textAlign: 'center', color: 'rgb(1,15,59)'}}>3</Text>
                </View>
                <View style={styles.sentenseContainer}>
                  <Text style={{fontSize: 19, textAlign: 'auto', fontWeight: 'bold', color: 'white'}}>{this.props.params.question3}</Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleTouch(2)}>
            <View style={this.state.questionContainer2}>
                <View style={styles.circleInQuestion}>
                  <Text style={{fontSize: 64, fontWeight: 'bold', textAlign: 'center', color: 'rgb(1,15,59)'}}>2</Text>
                </View>
                <View style={styles.sentenseContainer}>
                  <Text style={{fontSize: 19, textAlign: 'auto', fontWeight: 'bold', color: 'white'}}>{this.props.params.question2}</Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleTouch(1)}>
            <View style={this.state.questionContainer1}>
                <View style={styles.circleInQuestion}>
                  <Text style={{fontSize: 64, fontWeight: 'bold', textAlign: 'center', color: 'rgb(1,15,59)'}}>1</Text>
                </View>
                <View style={styles.sentenseContainer}>
                  <Text style={{fontSize: 19, textAlign: 'auto', fontWeight: 'bold', color: 'white'}}>{this.props.params.question1}</Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleTouch(0)}>
            <View style={this.state.questionContainer0}>
                <View style={styles.circleInQuestion}>
                  <Text style={{fontSize: 64, fontWeight: 'bold', textAlign: 'center', color: 'rgb(1,15,59)'}}>0</Text>
                </View>
                <View style={styles.sentenseContainer}>
                  <Text style={{fontSize: 19, textAlign: 'auto', fontWeight: 'bold', color: 'white'}}>{this.props.params.question0}</Text>
                </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width-20,
    height: Dimensions.get('window').height-110,
    margin:10,
    backgroundColor: 'white',
    borderRadius: 14,
  },
  twoButtonsContainer:　{
    marginTop: 5,
    flexDirection: 'row',
  },
  leftButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 35,
    marginRight: 60,
    backgroundColor: 'rgb(1,15,59)',
    borderRadius: 15,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  rightButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 35,
    marginLeft: 60,
    backgroundColor: 'rgb(1,15,59)',
    borderRadius: 15,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  circleInQuestion: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    width:65,
    height: 65,
    backgroundColor: 'white',
    marginLeft: 10
  },
  sentenseContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 5,
  }
});
