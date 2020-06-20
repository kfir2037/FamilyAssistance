import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  ImageBackground
} from 'react-native';

import Logo from '../src/components/Logo';
import Form from '../src/components/Form';

export default class Login extends Component {

  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <ImageBackground style={styles.image} source={require('../assets/background.png')} > */}
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
              <View style={styles.logoContainer}>
                <Logo />
              </View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
                <Form type="Login" navigation={this.props.navigation} />
              </View>
              <Image style={{ marginBottom: 15, height: 30, width: 150, position: 'absolute', bottom: 0 }} source={require('../assets/logo_b7.png')} />
            </KeyboardAvoidingView>
          {/* </ImageBackground> */}
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
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    flex: 1,
    width:'100%',
    opacity: 1 ,
    resizeMode: "cover",
    justifyContent: "center"
  },

  logoContainer: {
    marginBottom: 20
  }
});
