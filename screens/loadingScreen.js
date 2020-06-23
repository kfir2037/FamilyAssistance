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
      try {
        user = firebase.auth().currentUser;
        if (user) {
          let userUid = user.uid;
          console.log(userUid)
          firebase.firestore().collection('users').doc(userUid).get()
            .then(doc => {
              console.log('loading')
              let role = doc._document.proto.fields.role.stringValue;
              if (role == 'sw') {
                that.props.navigation.navigate('SwDashboard');
              }
              else if (role == 'parent') {
                that.props.navigation.navigate('ParentsDashboard');
              }
              else if (role == 'child') {
                that.props.navigation.navigate('KidsDashboard');
              } else {
                that.props.navigation.navigate('Welcome');
              }
            })
            .catch((err)=>{console.log('loading', err)})
        } else {
          that.props.navigation.navigate('Welcome');
        }
        // if (userUid) {
        //   that.props.navigation.navigate('SwDashboard');
        // } else {
        // }
      } catch {
        console.log('error get current user 2');
      }
      // user = firebase.auth().currentUser;
      // //console.log('Loading   '+user);
      // console.log('loading');
      // if (user) {
      //   that.props.navigation.navigate('SwDashboard');
      // } else {
      //   that.props.navigation.navigate('Welcome');
      // }
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
    backgroundColor: '#fbc213',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});