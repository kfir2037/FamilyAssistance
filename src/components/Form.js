import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity 
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class Form extends Component {

  constructor(props){
    super(props);
    this.state ={
      id:'',
      password:''};
  }

	render(){
		return(
			<View style={styles.container}>
          <TextInput onChangeText={(id)=>this.setState({id})} value={this.state.id} style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="תעודת זהות"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              keyboardType="numeric"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput onChangeText={(password)=>this.setState({password})} value={this.state.password} style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="סיסמה"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              ref={(input) => this.password = input}
              /> 

          <TouchableOpacity onPress={this.login} style={styles.button}>
            <Text style={styles.buttonText}>התחברות</Text>
          </TouchableOpacity>
  		</View>
			)
  }

  
  login =()=>{
    if(this.state.id==1){
      this.props.navigation.navigate('Dashboard');
    }
    else if(this.state.id==2){
      this.props.navigation.navigate('SwDashboard');
    }
    else if(this.state.id==3){
      this.props.navigation.navigate('KidsDashboard');
    }else{
      this.props.navigation.navigate('SwDashboard');
    }
    //alert(this.state.id);
    
  }
  

}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 22,
    paddingHorizontal:16,
    fontSize:20,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});