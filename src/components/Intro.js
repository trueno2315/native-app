import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Report from './Report';

const styles = StyleSheet.create({
  buttonCircle: {
    marginBottom: 5,
    width: 80,
    height: 80,
    backgroundColor: 'rgb(1,15,59)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
  },
  buttonContainer: {
    backgroundColor: 'rgb(1,15,59)',
    borderRadius: 30,
    width: Dimensions.get('window').width -45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },
});

const slides = [
  {
    key: 'somethun',
    title: '1',
    text: '支えるノートに体調をコツコツ記録していけば...',
    image: require('../images/syncSucess.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
    textStyle:{
      fontSize:30,
      fontWeight: 'bold',
      color: "rgb(1,15,59)"
    }
  },
  {
    key: 'somethun-dos',
    title: '2',
    text: 'ご家族や先生に簡単に体調を伝えられるよ！',
    image: require('../images/invalidName.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
    textStyle:{
      fontSize:30,
      fontWeight: 'bold',
      color: "rgb(1,15,59)"
    }
  },
  {
    key: 'somethun1',
    title: '3',
    text: 'さあ、コツコツ体調を記録していきましょう！',
    image: require('../images/doctor.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
    textStyle:{
      fontSize:30,
      fontWeight: 'bold',
      color: "rgb(1,15,59)",
    }
  }
];



export default class Intro extends React.Component {

  constructor(props) {
    super(props);

    this.state = {showRealApp: false};
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}><Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>次へ</Text></View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}><Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>次へ</Text></View>
    );
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../images/seiyaku.png')} style={{width: 200, height: 200, marginBottom: 15}}/>
          <Text　style={{fontSize: 25, fontWeight: 'bold', color: 'rgb(1,15,59)', textAlign: 'center'}}>製薬会社等にも</Text>
          <Text　style={{fontSize: 25, fontWeight: 'bold', color: 'rgb(1,15,59)', textAlign: 'center'}}>情報を共有</Text>
          <Text　style={{fontSize: 25, fontWeight: 'bold', color: 'rgb(1,15,59)', textAlign: 'center'}}>いただけますか？</Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Report')}>
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>協力する！</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Report')}>
            <View style={styles.buttonContainer}>
              <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>今はやめておく</Text>
            </View>
          </TouchableOpacity>
        </View>)
    } else {
      return (
        <View style={{flex: 1, marginTop: 15}}>
          <AppIntroSlider
            slides={slides}
            onDone={this._onDone}
            renderNextButton={this._renderNextButton}
            renderDoneButton={this._renderDoneButton}
            dotStyle={{backgroundColor: 'grey'}}
            activeDotStyle={{backgroundColor:'rgb(1,15,59)'}}/>
        </View>
      );
    }
  }
}
