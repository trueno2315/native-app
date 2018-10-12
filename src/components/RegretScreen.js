
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

export default class RegretScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.goReport = this.goReport.bind(this);
  }

  goReport = () => {
    this.props.navigation.navigate('Report');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text　style={styles.textStyle}>連日の記録が</Text>
        <Text style={styles.textStyle}>途切れてしまったので</Text>
        <Text style={styles.textStyle}>経験値が０に戻ります...</Text>
        <Text style={styles.textStyle}>毎日記録して</Text>
        <Text style={styles.textStyle}>経験値を貯めましょう！</Text>
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
});
