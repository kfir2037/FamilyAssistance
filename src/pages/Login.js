import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

	signup() {
    Actions.signup()
	}

	render() {
    console.log(this.props.navigation);

		return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Logo/>      
				<Form type="Login" navigation={this.props.navigation}/>
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>מעוניין להירשם לתוכנית?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> צור קשר</Text></TouchableOpacity>
				</View>
			</View>	
      </TouchableWithoutFeedback>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#5f6ee3',
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
  	fontWeight:'500'
  },
});
