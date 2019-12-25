import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar 
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import SwMainPage from './src/pages/SocialWorker/SwMainPage';
import SwMainPage from '../pages/SocialWorker/SwMainPage';
// import LoginPage from './src/pages/Login';
import LoginPage from '../pages/Login';
import DrawerNavigator from '../../navigation/DrawerNavigator';

import DrawerNavigator from '../navigation/DrawerNavigator'
<DrawerNavigator/>


const RootStack = createStackNavigator(
  {
    SwMain:{
      screen: SwMainPage,
    },
    
    Login:{      
       screen: LoginPage,
       navigationOptions: {
        header: null,
      },
    }
  },
  {
    initialRouteName: 'Login',
    
  }
);

export default createAppContainer(RootStack);


const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
});