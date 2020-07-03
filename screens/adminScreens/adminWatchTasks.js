import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '',
      test:[]
    }
  }

  onChangeDate(date) {
    let arr=[]
    for(let i=0;i<10;i++){
      arr.push(date)
    }
    this.setState({test:arr})
    
    alert(date)

  }

  renderChildDay(day) {
    if (_.includes(['2020-02-12', '2020-02-20', '2018-12-20'], day)) {
      return <Image source={require('../../src/images/ic_lock_green.png')} style={styles.icLockRed} />
    }
    if (_.includes(['2020-02-16', '2020-02-26', '2018-12-21', '2018-12-18'], day)) {
      return <Image source={require('../../src/images/ic_lock_red.png')} style={styles.icLockRed} />
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <DateTime
            date={this.state.time}
            changeDate={(date) => this.onChangeDate(date)}
            format='YYYY-MM-DD'
            renderChildDay={(day) => this.renderChildDay(day)}
          />
        </View>
        <View style={styles.tasks}>          
         <Text>{this.state.test}</Text>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasks:{
    alignItems:"center",
    color:'green',
    width: 400,
    height:250,
    alignSelf:'center',
    borderWidth: 3,
    bottom:-400,
    flex:3,

    
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

