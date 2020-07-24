import React, { Component } from 'react';
import {
  Text,
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
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends Component {
  render() {
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground style={styles.image} source={require('../assets/new_background07.png')} >
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
              <View style={styles.logoContainer}>
                <Logo />
              </View>
              <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                <Form type="Login" navigation={this.props.navigation} />
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')} style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#0ca5e5' }}>שכחת סיסמה?</Text>
                </TouchableOpacity> */}
              </View>
            </KeyboardAvoidingView>
            <Image style={{ alignSelf: 'center', marginBottom: 15, height: 40, width: 160, bottom: 17 }} source={require('../assets/logo_b7.png')} />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',

  },

  image: {
    flex: 1,
    width: '100%',
    opacity: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  logoContainer: {
    top: -5,
    //marginBottom: 20
  }
});
