
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';



export default class HakikeDetail extends Component {

  renderAlergyMark(i) {
    if (this.props.hakikeArr[i] === 0){
      return (
          <View style={styles.circleContainer}>
            <View style={{backgroundColor: 'rgb(148,152,186)', borderRadius: 4, width: 8, height:8}}/>
          </View>);
    } else if (this.props.hakikeArr[i] === 1){
      return (
          <View style={styles.circleContainer}>
            <View style={{backgroundColor: 'rgb(51,65,133)', borderRadius: 6, width: 11, height:11}}/>
          </View>);
    } else if (this.props.hakikeArr[i] === 2){
      return (
          <View style={styles.circleContainer}>
            <View style={{backgroundColor: 'rgb(0,31,109)', borderRadius: 8, width: 15, height:15}}/>
          </View>);
    } else if (this.props.hakikeArr[i] === 3){
      return(
          <View style={styles.circleContainer}>
            <View style={{backgroundColor: 'rgb(1,15,59)', borderRadius: 11, width: 22, height:22}}/>
          </View>);
    } else {
      return(
          <View style={styles.circleContainer}>
            <Text style={{fontSize: 26, fontWeight: 'bold', color: 'grey'}}> - </Text>
          </View>);
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.textStyle}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>5.吐き気</Text>
        </View>

        <View style={styles.marksContainer}>
          <View style={{marginRight:0}}>{this.renderAlergyMark(0)}</View>
          <View style={{marginRight:0}}>{this.renderAlergyMark(1)}</View>
          <View style={{marginRight:0}}>{this.renderAlergyMark(2)}</View>
          <View style={{marginRight:0}}>{this.renderAlergyMark(3)}</View>
          <View style={{marginRight:0}}>{this.renderAlergyMark(4)}</View>
          <View style={{marginRight:0}}>{this.renderAlergyMark(5)}</View>
          <View style={{marginRight:0}}>{this.renderAlergyMark(6)}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  circleContainer: {
     width: 24,
     height: 24,
     alignItems: 'center',
     justifyContent: 'center',
  },
  textStyle: {
    width: Dimensions.get('window').width * 0.28,
    marginLeft: Dimensions.get('window').width * 0.025,
    marginRight: Dimensions.get('window').width * 0.025
  },
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.645,
    marginRight: Dimensions.get('window').width * 0.025
  }
});
