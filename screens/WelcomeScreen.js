import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';

import Logo from '../src/components/Logo';
import Form from '../src/components/Form';

export default class Login extends Component {

	render() {
    //console.log(this.props.navigation);

		return(
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Logo/>      
          <Form type="Login" navigation={this.props.navigation}/>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>מעוניין להירשם לתוכנית?</Text>
            <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> צור קשר </Text></TouchableOpacity>
          </View>
        </View>	
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

		)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#8b96d9',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
    fontWeight:'500',
    
  },
});
