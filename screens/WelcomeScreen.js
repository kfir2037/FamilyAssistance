import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';

import Logo from '../src/components/Logo';
import Form from '../src/components/Form';

export default class Login extends Component {

  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
            <View style={styles.logoContainer}>
              <Logo />
            </View>
            <View>
              <Form type="Login" navigation={this.props.navigation} />
            </View>
          </KeyboardAvoidingView>
        </View>

      </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8b96d9',
    height: '100%',
    width: '100%',
    //flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    marginBottom: 20
    //alignItems: 'center',
    //flex: 2,
    // borderColor:'black',
    // borderWidth:1
  }
});
