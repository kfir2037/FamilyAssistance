import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import adminStackNavigator from './adminStackNavigator';
import adminMainPageStackNavigator from './adminMainPageStackNavigator';

const adminDrawerNavigator = createDrawerNavigator({
    Main:{
      screen:adminMainPageStackNavigator,
    },
    Tasks:{
      screen:adminStackNavigator,
    }
  })
  
  export default adminDrawerNavigator;