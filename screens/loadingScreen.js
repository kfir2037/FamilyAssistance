import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import firebase from '../config/config';
import Logo from '../src/components/Logo';
import Spinner from '../src/components/Spinner';

import { Actions } from 'react-native-router-flux';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      errorMessage: '',
      loggedIn: false
    };

    var that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      user = firebase.auth().currentUser;
      //console.log('Loading   '+user);
      if (user) {
        that.props.navigation.navigate('SwDashboard');
      } else {
        that.props.navigation.navigate('Welcome');
      }
    })

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if(user){
    //     that.setState({ loggedIn:true });
    //     that.props.navigation.navigate('ParentsDashboard');
    //     //this.navigation.navigate('SwDashboard');
    //   }else{
    //     that.setState({ loggedIn: false });
    //     that.props.navigation.navigate('Welcome');
    //   }
    // });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#8b96d9' }}>
        <View style={styles.container}>
          <Logo />
          <Spinner />

        </View>
      </TouchableWithoutFeedback>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8b96d9',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});