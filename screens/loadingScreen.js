import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import firebase from '../config/config';
import Logo from '../src/components/Logo';
import Spinner from '../src/components/Spinner';

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
        let sessionTimeout;
        user = firebase.auth().currentUser;
        if (user) {
          user.getIdTokenResult().then((idTokenResult) => {
            const authTime = idTokenResult.claims.auth_time * 1000;
            console.log('authTime: ', authTime);
            const sessionDuration = 1000 * 60 * 100;
            const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
            sessionTimeout = setTimeout(() => firebase.auth().signOut(), millisecondsUntilExpiration)
          })
          let userUid = user.uid;
          console.log('userUid: ', userUid)
          firebase.firestore().collection('users').doc(userUid).get()
            .then(doc => {
              console.log('loading')
              let role = doc._document.proto.fields.role.stringValue;
              if (role == 'sw') {
                //that.props.navigation.navigate('SwDashboard');
              }
              else if (role == 'parent' || role == 'kid') {
                that.props.navigation.navigate('ParentsDashboard');
              }
              // else if (role == 'kid') {
              //   that.props.navigation.navigate('KidsDashboard');
              // }
              else if (role == 'admin') {
                console.log('1111')
                that.props.navigation.navigate('adminDashboard');
              } else {
                console.log('2222')
                that.props.navigation.navigate('Welcome');
              }
            })
            .catch((err) => {
              console.log('loading', err);
              that.props.navigation.navigate('Welcome');
            })
        } else {
          sessionTimeout && clearTimeout(sessionTimeout);
          sessionTimeout = null;
          that.props.navigation.navigate('Welcome');
        }
      } catch {
        console.log('error get current user 2');
        that.props.navigation.navigate('Welcome');
      }

    })

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